import {
  makeShaderDataDefinitions,
  makeStructuredView,
} from 'webgpu-utils';

export async function DataReduction(inputArray : ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, reduceDim: number){
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }
    
    const {strides, shape} = dimInfo;
    const [zStride, yStride, xStride] = strides;

    const thisShape = shape.filter((e, idx) => idx != reduceDim)
    const dimLength = shape[reduceDim]
    const outputSize = thisShape[0] * thisShape[1];

    let workGroups = thisShape.map(e => Math.ceil(e/16)) //We assume the workgroups are 16 threads. We see how many of those 16 thread workgroups are needed for each dimension
    workGroups = workGroups.map(e => Math.pow(2, Math.ceil(Math.log2(e)))) //Round those up to nearest power of 2

    const shader =  `
            struct Params {
                zStride: u32,
                yStride: u32,
                xStride: u32,
                xSize: u32,
                ySize: u32,
                reduceDim: u32,
                dimLength: u32,
            };
            @group(0) @binding(0) var<storage, read> inputData: array<f32>;
            @group(0) @binding(1) var<storage, read_write> outputData: array<f32>;
            @group(0) @binding(2) var<uniform> params: Params;

            @compute @workgroup_size(16, 16, 1)
            fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
                let zStride = params.zStride;
                let yStride = params.yStride;
                let xStride = params.xStride;
                let xSize = params.xSize;
                let ySize = params.ySize;
                let reduceDim = params.reduceDim;
                let dimLength = params.dimLength;
                                
                let outX = global_id.x;
                let outY = global_id.y;
                
                if (outX >= xSize || outY >= ySize) {
                    return;
                }
                
                var sum: f32 = 0.0;
                var count: u32 = 0u;
                
                // Iterate along the dimension we're averaging
                if (reduceDim == 0u) { // Average along Z
                    let cCoord = outX * xStride + outY * yStride;
                    for (var z: u32 = 0u; z < dimLength; z++) {
                        let inputIndex = cCoord + (z * zStride);
                        sum += inputData[inputIndex];
                        count++;
                    }
                } else if (reduceDim == 1u) { // Average along Y
                    let cCoord = outX * xStride + outY * zStride;
                    for (var y: u32 = 0u; y < dimLength; y++) {
                        let inputIndex = cCoord + (y * yStride);
                        sum += inputData[inputIndex];
                        count++;
                    }
                } else { // Average along X
                    let cCoord = outX * zStride + outY * yStride;
                    for (var x: u32 = 0u; x < dimLength; x++) {
                        let inputIndex = cCoord + (x * xStride);
                        sum += inputData[inputIndex];
                        count++;
                    }
                }
                
                let outputIndex = outY * xSize + outX;
                outputData[outputIndex] = sum / f32(count);
            }
        `


    const module = device.createShaderModule({
        label: 'reduction compute module',
        code:shader,
    });

    const pipeline = device.createComputePipeline({
        label: 'reduction compute pipeline',
        layout: 'auto',
        compute: {
        module,
        },
    });
    console.log(thisShape)
    const defs = makeShaderDataDefinitions(shader);
    const myUniformValues = makeStructuredView(defs.uniforms.params);
    myUniformValues.set({
        zStride,
        yStride,
        xStride,
        xSize: reduceDim != 2 ? thisShape[1] : thisShape[0],
        ySize: reduceDim != 2 ? thisShape[1] : thisShape[0],
        reduceDim,
        dimLength
    });

    // Create buffers
    const inputBuffer = device.createBuffer({
        label: 'Input Buffer',
        size: inputArray.byteLength, 
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        label: 'Output Buffer',
        size: outputSize * 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const uniformBuffer = device.createBuffer({
        size: myUniformValues.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
        label:'Output Buffer',
        size: outputSize * 4,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    // Write Buffers to GPU
    device.queue.writeBuffer(inputBuffer, 0, inputArray);
    device.queue.writeBuffer(uniformBuffer, 0, myUniformValues.arrayBuffer);

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: inputBuffer } },
            { binding: 1, resource: { buffer: outputBuffer } },
            { binding: 2, resource: { buffer: uniformBuffer } },
        ],
    });

    const encoder = device.createCommandEncoder({
        label: 'reduction encoder',
    });
    const pass = encoder.beginComputePass({
        label: 'reduction compute pass',
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workGroups[0], workGroups[1], workGroups[2]);
    pass.end();

    encoder.copyBufferToBuffer(
    outputBuffer, 0,
    readBuffer, 0,
    outputSize * 4
    );

    // Submit work to GPU
    device.queue.submit([encoder.finish()]);

    // Map staging buffer to read results
    await readBuffer.mapAsync(GPUMapMode.READ);
    const resultArrayBuffer = readBuffer.getMappedRange();
    const results = new Float32Array(resultArrayBuffer.slice());

    // Clean up
    readBuffer.unmap();
    return results;

}
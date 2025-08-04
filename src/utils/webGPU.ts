

export async function DataReduction(inputArray : ArrayBufferView, strides : number[], avgDim: number){
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }
    const [dimZ, dimY, dimX] = strides;

    const module = device.createShaderModule({
        label: 'reduction compute module',
        code: `
            @group(0) @binding(0) var<storage, read> inputData: array<f32>;
            @group(0) @binding(1) var<storage, read_write> outputData: array<f32>;
            @group(0) @binding(2) var<uniform> params: array<u32, 5>; // dimX, dimY, dimZ, avgDim, dimLength

            @compute @workgroup_size(8, 8, 1)
            fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
                let dimX = params[0];
                let dimY = params[1];
                let dimZ = params[2];
                let avgDim = params[3];
                
                let outX = global_id.x;
                let outY = global_id.y;
                
                // Calculate output dimensions
                var outDim1: u32;
                var outDim2: u32;
                
                if (avgDim == 0u) { // Average along X
                    outDim1 = dimY;
                    outDim2 = dimZ;
                } else if (avgDim == 1u) { // Average along Y
                    outDim1 = dimX;
                    outDim2 = dimZ;
                } else { // Average along Z
                    outDim1 = dimX;
                    outDim2 = dimY;
                }
                
                if (outX >= outDim1 || outY >= outDim2) {
                    return;
                }
                
                var sum: f32 = 0.0;
                var count: u32 = 0u;
                
                // Iterate along the dimension we're averaging
                if (avgDim == 0u) { // Average along X
                    for (var x: u32 = 0u; x < dimX; x++) {
                        let y = outX; // outX maps to Y
                        let z = outY; // outY maps to Z
                        let inputIndex = z * dimX * dimY + y * dimX + x;
                        sum += inputData[inputIndex];
                        count++;
                    }
                } else if (avgDim == 1u) { // Average along Y
                    for (var y: u32 = 0u; y < dimY; y++) {
                        let x = outX; // outX maps to X
                        let z = outY; // outY maps to Z
                        let inputIndex = z * dimX * dimY + y * dimX + x;
                        sum += inputData[inputIndex];
                        count++;
                    }
                } else { // Average along Z
                    for (var z: u32 = 0u; z < dimZ; z++) {
                        let x = outX; // outX maps to X
                        let y = outY; // outY maps to Y
                        let inputIndex = z * dimX * dimY + y * dimX + x;
                        sum += inputData[inputIndex];
                        count++;
                    }
                }
                
                let outputIndex = outY * outDim1 + outX;
                outputData[outputIndex] = sum / f32(count);
            }
        `,
    });

    const pipeline = device.createComputePipeline({
        label: 'reduction compute pipeline',
        layout: 'auto',
        compute: {
        module,
        },
    });
    // Calculate output dimensions
    let outDim1, outDim2;
    if (avgDim === 0) { // Average along X
        outDim1 = dimY;
        outDim2 = dimZ;
    } else if (avgDim === 1) { // Average along Y
        outDim1 = dimX;
        outDim2 = dimZ;
    } else { // Average along Z
        outDim1 = dimX;
        outDim2 = dimY;
    }

    const outputSize = outDim1 * outDim2;
    // Create buffers
    const inputBuffer = device.createBuffer({
        size: inputArray.byteLength, // 4 bytes per float32
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        size: outputSize * 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const paramsBuffer = device.createBuffer({
        size: 16, // 4 u32 values
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
        size: outputSize * 4,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    device.queue.writeBuffer(inputBuffer, 0, inputArray);
    device.queue.writeBuffer(paramsBuffer, 0, inputArray);

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: inputBuffer } },
            { binding: 1, resource: { buffer: outputBuffer } },
            { binding: 2, resource: { buffer: paramsBuffer } },
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
    pass.dispatchWorkgroups(inputArray.byteLength);
    pass.end();

}
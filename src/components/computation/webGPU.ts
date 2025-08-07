import {
  makeShaderDataDefinitions,
  makeStructuredView,
} from 'webgpu-utils';

import { MeanReduction, MinReduction, MaxReduction, StDevReduction } from './WGSLShaders';

const operations = {
    Mean: MeanReduction,
    Min: MinReduction,
    Max: MaxReduction,
    StDev: StDevReduction
}

export async function DataReduction(inputArray : ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, reduceDim: number, operation: string){
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
    const shader = operations[operation as keyof typeof operations]
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
    
    const defs = makeShaderDataDefinitions(shader);
    const myUniformValues = makeStructuredView(defs.uniforms.params);
    console.log(`xSize: ${thisShape[1]}`)
    myUniformValues.set({
        zStride,
        yStride,
        xStride,
        xSize:  thisShape[1], 
        ySize: thisShape[0],
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
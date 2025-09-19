import {
  makeShaderDataDefinitions,
  makeStructuredView,
} from 'webgpu-utils';

import * as Shaders32 from './WGSLShaders';
import * as Shaders16 from './WGSLShadersF16'

const operations = {
    Mean: "MeanReduction",
    Min: "MinReduction",
    Max: "MaxReduction",
    StDev: "StDevReduction",
    CUMSUM: "CUMSUMReduction",
    LinearSlope: "LinearSlopeReduction"
}

const kernelOperations3D = {
    Mean: "MeanConvolution",
    Min: "MinConvolution",
    Max: "MaxConvolution",
    StDev: "StDevConvolution"
}

const kernelOperations2D = {
    Mean: "MeanConvolution2D",
    Min: "MinConvolution2D",
    Max: "MaxConvolution2D",
    StDev: "StDevConvolution2D"
}

const multiVariateOps = {
    Correlation2D: "Correlation2D",
    Correlation3D: "CorrelationConvolution",
    TwoVarLinearSlope2D: "TwoVarLinearSlopeReduction",
    TwoVarLinearSlope3D: "TwoVarLinearSlopeConvolution",
    Covariance2D: "CovarianceReduction",
    Covariance3D: "CovarianceConvolution"
}


export async function DataReduction(inputArray : ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, reduceDim: number, operation: string, ){
    const adapter = await navigator.gpu?.requestAdapter();
    const maxSize = adapter?.limits.maxBufferSize;
    const maxStorage = adapter?.limits.maxStorageBufferBindingSize;
    const hasF16 = adapter ? adapter.features.has("shader-f16") : false
    const device = hasF16 ? await adapter?.requestDevice({requiredFeatures: ["shader-f16"]}) : 
        await adapter?.requestDevice();
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }


    const {strides, shape} = dimInfo;
    const [zStride, yStride, xStride] = strides;

    const thisShape = shape.filter((e, idx) => idx != reduceDim)
    const dimLength = shape[reduceDim]
    const outputSize = thisShape[0] * thisShape[1];
    const workGroups = thisShape.map(e => Math.ceil(e/16)) //We assume the workgroups are 16 threads. We see how many of those 16 thread workgroups are needed for each dimension

    const shaders = hasF16 ? Shaders16 : Shaders32
    const shaderKey = operations[operation as keyof typeof operations] as keyof typeof shaders;
    const shader = shaders[shaderKey];

    const computeModule = device.createShaderModule({
        label: 'reduction compute module',
        code:shader,
    });

    const pipeline = device.createComputePipeline({
        label: 'reduction compute pipeline',
        layout: 'auto',
        compute: {
        module: computeModule,
        },
    });
    
    const defs = makeShaderDataDefinitions(shader);
    const myUniformValues = makeStructuredView(defs.uniforms.params);
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
        size: inputArray.byteLength * (hasF16 ? 1 : 2),
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        label: 'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const uniformBuffer = device.createBuffer({
        size: myUniformValues.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
        label:'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });
    // Write Buffers to GPU
    device.queue.writeBuffer(inputBuffer, 0, (hasF16 ? inputArray : new Float32Array(inputArray as Float16Array)) as GPUAllowSharedBufferSource);
    device.queue.writeBuffer(uniformBuffer, 0, myUniformValues.arrayBuffer as GPUAllowSharedBufferSource);

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
    pass.dispatchWorkgroups(workGroups[0], workGroups[1]);
    pass.end();

    encoder.copyBufferToBuffer(
    outputBuffer, 0,
    readBuffer, 0,
    outputSize * (hasF16 ? 2 : 4)
    );

    // Submit work to GPU
    device.queue.submit([encoder.finish()]);

    // Map staging buffer to read results
    await readBuffer.mapAsync(GPUMapMode.READ);
    const resultArrayBuffer = readBuffer.getMappedRange();
    const results = hasF16 ? new Float16Array(resultArrayBuffer.slice()) : new Float16Array(new Float32Array(resultArrayBuffer.slice()));

    // Clean up
    readBuffer.unmap();
    return results;

}

export async function BufferCopy(inputArray :  ArrayBufferView, shape: number[]){
    const adapter = await navigator.gpu?.requestAdapter();
    const maxSize = adapter?.limits.maxBufferSize;
    const maxStorage = adapter?.limits.maxStorageBufferBindingSize;
    const hasF16 = adapter ? adapter.features.has("shader-f16") : false
    const device = hasF16 ? await adapter?.requestDevice({requiredFeatures: ["shader-f16"], requiredLimits: {
        maxBufferSize: maxSize,
        maxStorageBufferBindingSize: maxStorage}}) : 
        await adapter?.requestDevice({requiredLimits: {
            maxBufferSize: maxSize,
            maxStorageBufferBindingSize: maxStorage 
    }});
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }
   
    const outputSize = shape[0] * shape[1] * shape[2];

    const inputBuffer = device.createBuffer({
        label: 'Input Buffer',
        size: inputArray.byteLength * (hasF16 ? 1 : 2),
        usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        label: 'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });

    // Write Buffers to GPU
    device.queue.writeBuffer(inputBuffer, 0, (hasF16 ? inputArray : new Float32Array(inputArray as Float16Array)) as GPUAllowSharedBufferSource);

    const commandEncoder = device.createCommandEncoder();
    commandEncoder.copyBufferToBuffer(
        inputBuffer,      // source
        0,              // sourceOffset
        outputBuffer,  // destination
        0,              // destinationOffset
        outputSize * (hasF16 ? 2 : 4),      // size
    );

    const gpuCommands = commandEncoder.finish();

    // Submit the commands to the GPU queue for execution.
    device.queue.submit([gpuCommands]);


    // Map staging buffer to read results
    await outputBuffer.mapAsync(GPUMapMode.READ);
    const resultArrayBuffer = outputBuffer.getMappedRange();
    const results = hasF16 ? new Float16Array(resultArrayBuffer.slice()) : new Float16Array(new Float32Array(resultArrayBuffer.slice()));
    // Clean up
    outputBuffer.unmap();
    return results;

}

export async function Convolve(inputArray :  ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, operation: string, kernel: {kernelSize: number, kernelDepth: number}){
    const adapter = await navigator.gpu?.requestAdapter();
    const maxSize = adapter?.limits.maxBufferSize;
    const maxStorage = adapter?.limits.maxStorageBufferBindingSize;
    const hasF16 = adapter ? adapter.features.has("shader-f16") : false
    const device = hasF16 ? await adapter?.requestDevice({requiredFeatures: ["shader-f16"], requiredLimits: {
        maxBufferSize: maxSize,
        maxStorageBufferBindingSize: maxStorage}}) : 
        await adapter?.requestDevice({requiredLimits: {
            maxBufferSize: maxSize,
            maxStorageBufferBindingSize: maxStorage 
    }});
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }
    const {kernelDepth, kernelSize} = kernel;
    const {strides, shape} = dimInfo;
    const outputSize = shape[0] * shape[1] * shape[2];
    const [zStride, yStride, xStride] = strides;
    const workGroups = shape.map(e => Math.ceil(e/4)); //We assume the workgroups are 4 threads per dimension. We see how many of those 4 thread workgroups are needed for each dimension

    const shaders = hasF16 ? Shaders16 : Shaders32
    const shader = shaders["StDevConvolution" as keyof typeof shaders];

    const computeModule = device.createShaderModule({
        label: 'convolution compute module',
        code:shader,
    });

    const pipeline = device.createComputePipeline({
        label: 'convolution compute pipeline',
        layout: 'auto',
        compute: {
        module: computeModule,
        },
    });
    const defs = makeShaderDataDefinitions(shader);
    const myUniformValues = makeStructuredView(defs.uniforms.params);
    myUniformValues.set({
        xStride,
        yStride,
        zStride,
        xSize: shape[2], 
        ySize: shape[1],
        zSize: shape[0],
        workGroups:[workGroups[2], workGroups[1], workGroups[0]],
        kernelDepth,
        kernelSize
    });

    // Create buffers
    const inputBuffer = device.createBuffer({
        label: 'Input Buffer',
        size: inputArray.byteLength * (hasF16 ? 1 : 2), 
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        label: 'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const uniformBuffer = device.createBuffer({
        label: 'Uniform Buffer',
        size: myUniformValues.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
        label:'Read Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    // Write Buffers to GPU
    device.queue.writeBuffer(inputBuffer, 0, (hasF16 ? inputArray : new Float32Array(inputArray as Float16Array)) as GPUAllowSharedBufferSource);
    device.queue.writeBuffer(uniformBuffer, 0, myUniformValues.arrayBuffer as GPUAllowSharedBufferSource);

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: inputBuffer } },
            { binding: 1, resource: { buffer: outputBuffer } },
            { binding: 2, resource: { buffer: uniformBuffer } },
        ],
    });

    const encoder = device.createCommandEncoder({
        label: 'convolution encoder',
    });
    const pass = encoder.beginComputePass({
        label: 'convolution compute pass',
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workGroups[2], workGroups[1], workGroups[0]);
    pass.end();

    encoder.copyBufferToBuffer(
    outputBuffer, 0,
    readBuffer, 0,
    outputSize * (hasF16 ? 2 : 4)
    );

    // Submit work to GPU
    device.queue.submit([encoder.finish()]);

    // Map staging buffer to read results
    await readBuffer.mapAsync(GPUMapMode.READ);
    const resultArrayBuffer = readBuffer.getMappedRange();
    const results = hasF16 ? new Float16Array(resultArrayBuffer.slice()) : new Float16Array(new Float32Array(resultArrayBuffer.slice()));

    // Clean up
    readBuffer.unmap();
    return results;
}

export async function Multivariate2D(firstArray: ArrayBufferView, secondArray: ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, reduceDim: number, operation:string){
    const adapter = await navigator.gpu?.requestAdapter();
    const maxSize = adapter?.limits.maxBufferSize;
    const maxStorage = adapter?.limits.maxStorageBufferBindingSize;
    const hasF16 = adapter ? adapter.features.has("shader-f16") : false
    const device = hasF16 ? await adapter?.requestDevice({requiredFeatures: ["shader-f16"], requiredLimits: {
        maxBufferSize: maxSize,
        maxStorageBufferBindingSize: maxStorage}}) : 
        await adapter?.requestDevice({requiredLimits: {
            maxBufferSize: maxSize,
            maxStorageBufferBindingSize: maxStorage 
    }});
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }
    const {strides, shape} = dimInfo;
    const [zStride, yStride, xStride] = strides;

    const thisShape = shape.filter((e, idx) => idx != reduceDim)
    const dimLength = shape[reduceDim]
    const outputSize = thisShape[0] * thisShape[1];
    const workGroups = thisShape.map(e => Math.ceil(e/16)) //We assume the workgroups are 16 threads each dimension. We see how many of those 16 thread workgroups are needed for each dimension

    const shaders = hasF16 ? Shaders16 : Shaders32
    const shaderKey = multiVariateOps[operation as keyof typeof multiVariateOps] as keyof typeof shaders
    const shader = shaders[shaderKey]

    const computeModule = device.createShaderModule({
        label: 'Multivariate2D compute module',
        code:shader,
    });

    const pipeline = device.createComputePipeline({
        label: 'Multivariate2D compute pipeline',
        layout: 'auto',
        compute: {
        module: computeModule,
        },
    });
    
    const defs = makeShaderDataDefinitions(shader);
    const myUniformValues = makeStructuredView(defs.uniforms.params);
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
    const firstInputBuffer = device.createBuffer({
        label: 'First Input Buffer',
        size: firstArray.byteLength * (hasF16 ? 1 : 2), 
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const secondInputBuffer = device.createBuffer({
        label: 'Second Input Buffer',
        size: secondArray.byteLength * (hasF16 ? 1 : 2), 
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        label: 'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const uniformBuffer = device.createBuffer({
        size: myUniformValues.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
        label:'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    // Write Buffers to GPU
    device.queue.writeBuffer(firstInputBuffer, 0, (hasF16 ? firstArray : new Float32Array(firstArray as Float16Array)) as GPUAllowSharedBufferSource);
    device.queue.writeBuffer(secondInputBuffer, 0, (hasF16 ? secondArray : new Float32Array(secondArray as Float16Array)) as GPUAllowSharedBufferSource);
    device.queue.writeBuffer(uniformBuffer, 0, myUniformValues.arrayBuffer as GPUAllowSharedBufferSource);

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: firstInputBuffer } },
            { binding: 1, resource: { buffer: secondInputBuffer } },
            { binding: 2, resource: { buffer: outputBuffer } },
            { binding: 3, resource: { buffer: uniformBuffer } },
        ],
    });

    const encoder = device.createCommandEncoder({
        label: 'Multivariate2D encoder',
    });
    const pass = encoder.beginComputePass({
        label: 'Multivariate2D compute pass',
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workGroups[0], workGroups[1]);
    pass.end();

    encoder.copyBufferToBuffer(
    outputBuffer, 0,
    readBuffer, 0,
    outputSize * (hasF16 ? 2 : 4)
    );

    // Submit work to GPU
    device.queue.submit([encoder.finish()]);

    // Map staging buffer to read results
    await readBuffer.mapAsync(GPUMapMode.READ);
    const resultArrayBuffer = readBuffer.getMappedRange();
    const results = hasF16 ? new Float16Array(resultArrayBuffer.slice()) : new Float16Array(new Float32Array(resultArrayBuffer.slice()));

    // Clean up
    readBuffer.unmap();
    return results;
}

export async function Multivariate3D(firstArray: ArrayBufferView, secondArray: ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, kernel: {kernelSize: number, kernelDepth: number}, operation: string){
    const adapter = await navigator.gpu?.requestAdapter();
    const maxSize = adapter?.limits.maxBufferSize;
    const maxStorage = adapter?.limits.maxStorageBufferBindingSize;
    const hasF16 = adapter ? adapter.features.has("shader-f16") : false
    const device = hasF16 ? await adapter?.requestDevice({requiredFeatures: ["shader-f16"], requiredLimits: {
        maxBufferSize: maxSize,
        maxStorageBufferBindingSize: maxStorage}}) : 
        await adapter?.requestDevice({requiredLimits: {
            maxBufferSize: maxSize,
            maxStorageBufferBindingSize: maxStorage 
    }});
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }
    const {kernelDepth, kernelSize} = kernel;
    const {strides, shape} = dimInfo;
    const [zStride, yStride, xStride] = strides;

    const outputSize = shape[0] * shape[1] * shape[2];
    const workGroups = shape.map(e => Math.ceil(e/4)) //We assume the workgroups are 4 threads each dimension. We see how many of those 4 thread workgroups are needed for each dimension

    const shaders = hasF16 ? Shaders16 : Shaders32
    const shaderKey = multiVariateOps[operation as keyof typeof multiVariateOps] as keyof typeof shaders;
    const shader = shaders[shaderKey]

    const computeModule = device.createShaderModule({
        label: 'Multivariate3D compute module',
        code:shader,
    });

    const pipeline = device.createComputePipeline({
        label: 'Multivariate3D compute pipeline',
        layout: 'auto',
        compute: {
        module: computeModule,
        },
    });
    
    const defs = makeShaderDataDefinitions(shader);
    const myUniformValues = makeStructuredView(defs.uniforms.params);
    myUniformValues.set({
        xStride,
        yStride,
        zStride,
        xSize: shape[2], 
        ySize: shape[1],
        zSize: shape[0],
        workGroups:[workGroups[2], workGroups[1], workGroups[0]],
        kernelDepth,
        kernelSize
    });

    // Create buffers
    const firstInputBuffer = device.createBuffer({
        label: 'First Input Buffer',
        size: firstArray.byteLength * (hasF16 ? 1 : 2), 
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const secondInputBuffer = device.createBuffer({
        label: 'Second Input Buffer',
        size: secondArray.byteLength * (hasF16 ? 1 : 2),
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        label: 'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const uniformBuffer = device.createBuffer({
        size: myUniformValues.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
        label:'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    // Write Buffers to GPU
    device.queue.writeBuffer(firstInputBuffer, 0, (hasF16 ? firstArray : new Float32Array(firstArray as Float16Array)) as GPUAllowSharedBufferSource);
    device.queue.writeBuffer(secondInputBuffer, 0, (hasF16 ? secondArray : new Float32Array(secondArray as Float16Array)) as GPUAllowSharedBufferSource);
    device.queue.writeBuffer(uniformBuffer, 0, myUniformValues.arrayBuffer as GPUAllowSharedBufferSource);

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: firstInputBuffer } },
            { binding: 1, resource: { buffer: secondInputBuffer } },
            { binding: 2, resource: { buffer: outputBuffer } },
            { binding: 3, resource: { buffer: uniformBuffer } },
        ],
    });

    const encoder = device.createCommandEncoder({
        label: 'Multivariate3D encoder',
    });
    const pass = encoder.beginComputePass({
        label: 'Multivariate3D compute pass',
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workGroups[2], workGroups[1], workGroups[0]);
    pass.end();

    encoder.copyBufferToBuffer(
    outputBuffer, 0,
    readBuffer, 0,
    outputSize * (hasF16 ? 2 : 4)
    );

    // Submit work to GPU
    device.queue.submit([encoder.finish()]);

    // Map staging buffer to read results
    await readBuffer.mapAsync(GPUMapMode.READ);
    const resultArrayBuffer = readBuffer.getMappedRange();
    const results = hasF16 ? new Float16Array(resultArrayBuffer.slice()) : new Float16Array(new Float32Array(resultArrayBuffer.slice()));

    // Clean up
    readBuffer.unmap();
    return results;
}

export async function CUMSUM3D(inputArray :  ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, reduceDim: number, reverse: number){
    const adapter = await navigator.gpu?.requestAdapter();
    const maxSize = adapter?.limits.maxBufferSize;
    const maxStorage = adapter?.limits.maxStorageBufferBindingSize;
    const hasF16 = adapter ? adapter.features.has("shader-f16") : false
    const device = hasF16 ? await adapter?.requestDevice({requiredFeatures: ["shader-f16"], requiredLimits: {
        maxBufferSize: maxSize,
        maxStorageBufferBindingSize: maxStorage}}) : 
        await adapter?.requestDevice({requiredLimits: {
            maxBufferSize: maxSize,
            maxStorageBufferBindingSize: maxStorage 
    }});
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }

    const {strides, shape} = dimInfo;
    const outputSize = shape[0] * shape[1] * shape[2];
    const [zStride, yStride, xStride] = strides;
    const workGroups = shape.map(e => Math.ceil(e/4)); //We assume the workgroups are 4 threads per dimension. We see how many of those 4 thread workgroups are needed for each dimension

    const shaders = hasF16 ? Shaders16 : Shaders32
    const shader = shaders['CUMSUM3D']

    const computeModule = device.createShaderModule({
        label: 'cumsum3d compute module',
        code:shader,
    });

    const pipeline = device.createComputePipeline({
        label: 'cumsum3d compute pipeline',
        layout: 'auto',
        compute: {
        module: computeModule,
        },
    });
    const defs = makeShaderDataDefinitions(shader);
    const myUniformValues = makeStructuredView(defs.uniforms.params);
    myUniformValues.set({
        xStride,
        yStride,
        zStride,
        xSize: shape[2], 
        ySize: shape[1],
        zSize: shape[0],
        reduceDim,
        reverse,
        workGroups:[workGroups[2], workGroups[1], workGroups[0]],
    });

    // Create buffers
    const inputBuffer = device.createBuffer({
        label: 'Input Buffer',
        size: inputArray.byteLength * (hasF16 ? 1 : 2), 
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        label: 'Output Buffer',
        size: outputSize * 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const uniformBuffer = device.createBuffer({
        label: 'Uniform Buffer',
        size: myUniformValues.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
        label:'Read Buffer',
        size: outputSize * 4,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    // Write Buffers to GPU
    device.queue.writeBuffer(inputBuffer, 0, (hasF16  ? inputArray : new Float32Array(inputArray as Float16Array)) as GPUAllowSharedBufferSource);
    device.queue.writeBuffer(uniformBuffer, 0, myUniformValues.arrayBuffer as GPUAllowSharedBufferSource);

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: inputBuffer } },
            { binding: 1, resource: { buffer: outputBuffer } },
            { binding: 2, resource: { buffer: uniformBuffer } },
        ],
    });

    const encoder = device.createCommandEncoder({
        label: 'cumsum3d encoder',
    });
    const pass = encoder.beginComputePass({
        label: 'cumsum3d compute pass',
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workGroups[2], workGroups[1], workGroups[0]);
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

export async function Convolve2D(inputArray :  ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, operation: string, kernelSize: number){
    const adapter = await navigator.gpu?.requestAdapter();
    const maxSize = adapter?.limits.maxBufferSize;
    const maxStorage = adapter?.limits.maxStorageBufferBindingSize;
    const hasF16 = adapter ? adapter.features.has("shader-f16") : false
    const device = hasF16 ? await adapter?.requestDevice({requiredFeatures: ["shader-f16"], requiredLimits: {
        maxBufferSize: maxSize,
        maxStorageBufferBindingSize: maxStorage}}) : 
        await adapter?.requestDevice({requiredLimits: {
            maxBufferSize: maxSize,
            maxStorageBufferBindingSize: maxStorage 
    }});
    if (!device) {
        Error('need a browser that supports WebGPU');
        return;
    }
    const {strides, shape} = dimInfo;
    const outputSize = shape[0] * shape[1];
    const [yStride, xStride] = [strides[0], strides[1]];
    const workGroups = [Math.ceil(shape[1]/16), Math.ceil(shape[0]/16)]; //We assume the workgroups are 16 threads per dimension. We see how many of those 16 thread workgroups are needed for each dimension
    
    const shaders = hasF16 ? Shaders16 : Shaders32
    const shaderKey = kernelOperations2D[operation as keyof typeof kernelOperations2D] as keyof typeof shaders;
    const shader = shaders[shaderKey]

    const computeModule = device.createShaderModule({
        label: 'convolution2d compute module',
        code:shader,
    });
    const pipeline = device.createComputePipeline({
        label: 'convolution2d compute pipeline',
        layout: 'auto',
        compute: {
        module: computeModule,
        },
    });
    const defs = makeShaderDataDefinitions(shader);
    const myUniformValues = makeStructuredView(defs.uniforms.params);
    myUniformValues.set({
        xStride,
        yStride,
        xSize: shape[1], 
        ySize: shape[0],
        kernelSize
    });
    // Create buffers
    const inputBuffer = device.createBuffer({
        label: 'Input Buffer',
        size: inputArray.byteLength * (hasF16 ? 1 : 2), 
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = device.createBuffer({
        label: 'Output Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const uniformBuffer = device.createBuffer({
        label: 'Uniform Buffer',
        size: myUniformValues.arrayBuffer.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const readBuffer = device.createBuffer({
        label:'Read Buffer',
        size: outputSize * (hasF16 ? 2 : 4),
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    // Write Buffers to GPU
    device.queue.writeBuffer(inputBuffer, 0, (hasF16 ? inputArray : new Float32Array(inputArray as Float16Array)) as GPUAllowSharedBufferSource);
    device.queue.writeBuffer(uniformBuffer, 0, myUniformValues.arrayBuffer as GPUAllowSharedBufferSource);

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: inputBuffer } },
            { binding: 1, resource: { buffer: outputBuffer } },
            { binding: 2, resource: { buffer: uniformBuffer } },
        ],
    });

    const encoder = device.createCommandEncoder({
        label: 'convolution2d encoder',
    });
    const pass = encoder.beginComputePass({
        label: 'convolution2d compute pass',
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workGroups[0], workGroups[1], 1);
    pass.end();

    encoder.copyBufferToBuffer(
    outputBuffer, 0,
    readBuffer, 0,
    outputSize * (hasF16 ? 2 : 4)
    );

    // Submit work to GPU
    device.queue.submit([encoder.finish()]);

    // Map staging buffer to read results
    await readBuffer.mapAsync(GPUMapMode.READ);
    const resultArrayBuffer = readBuffer.getMappedRange();
    const results = hasF16 ? new Float16Array(resultArrayBuffer.slice()) : new Float16Array(new Float32Array(resultArrayBuffer.slice()));

    // Clean up
    readBuffer.unmap();
    return results;
}

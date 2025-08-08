const MeanReduction = /* wgsl */`
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
                        
        let outX = global_id.y;
        let outY = global_id.x;
        
        if (outX >= xSize || outY >= ySize) {
            return;
        }
        
        var sum: f32 = 0.0;
        
        // Iterate along the dimension we're averaging
        if (reduceDim == 0u) { // Average along Z
            let cCoord = outX * xStride + outY * yStride;
            for (var z: u32 = 0u; z < dimLength; z++) {
                let inputIndex = cCoord + (z * zStride);
                sum += inputData[inputIndex];
            }
        } else if (reduceDim == 1u) { // Average along Y
            let cCoord = outX * xStride + outY * zStride;
            for (var y: u32 = 0u; y < dimLength; y++) {
                let inputIndex = cCoord + (y * yStride);
                sum += inputData[inputIndex];
            }
        } else { // Average along X
            let cCoord = outX * yStride + outY * zStride;
            for (var x: u32 = 0u; x < dimLength; x++) {
                let inputIndex = cCoord + (x * xStride);
                sum += inputData[inputIndex];
            }
        }
        
        let outputIndex = outY * xSize + outX;
        outputData[outputIndex] = sum / f32(dimLength);
    }
`

const MinReduction = /* wgsl */`
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
                        
        let outX = global_id.y;
        let outY = global_id.x;
        
        if (outX >= xSize || outY >= ySize) {
            return;
        }
        
        var min: f32 = 1e12;
        
        // Iterate along the dimension we're averaging
        if (reduceDim == 0u) { // Average along Z
            let cCoord = outX * xStride + outY * yStride;
            for (var z: u32 = 0u; z < dimLength; z++) {
                let inputIndex = cCoord + (z * zStride);
                let newMin = inputData[inputIndex];
                if (newMin < min) {
                    min = newMin;
                }
            }
        } else if (reduceDim == 1u) { // Average along Y
            let cCoord = outX * xStride + outY * zStride;
            for (var y: u32 = 0u; y < dimLength; y++) {
                let inputIndex = cCoord + (y * yStride);
                let newMin = inputData[inputIndex];
                if (newMin < min) {
                    min = newMin;
                }
            }
        } else { // Average along X
            let cCoord = outX * yStride + outY * zStride;
            for (var x: u32 = 0u; x < dimLength; x++) {
                let inputIndex = cCoord + (x * xStride);
                let newMin = inputData[inputIndex];
                if (newMin < min) {
                    min = newMin;
                }
            }
        }
        
        let outputIndex = outY * xSize + outX;
        outputData[outputIndex] = min;
    }
`

const MaxReduction = /* wgsl */`
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
                        
        let outX = global_id.y;
        let outY = global_id.x;
        
        if (outX >= xSize || outY >= ySize) {
            return;
        }
        
        var max: f32 = -1e12;
        
        // Iterate along the dimension we're averaging
        if (reduceDim == 0u) { // Average along Z
            let cCoord = outX * xStride + outY * yStride;
            for (var z: u32 = 0u; z < dimLength; z++) {
                let inputIndex = cCoord + (z * zStride);
                let newMax = inputData[inputIndex];
                if (newMax > max) {
                    max = newMax;
                }
            }
        } else if (reduceDim == 1u) { // Average along Y
            let cCoord = outX * xStride + outY * zStride;
            for (var y: u32 = 0u; y < dimLength; y++) {
                let inputIndex = cCoord + (y * yStride);
                let newMax = inputData[inputIndex];
                if (newMax > max) {
                    max = newMax;
                }
            }
        } else { // Average along X
            let cCoord = outX * yStride + outY * zStride;
            for (var x: u32 = 0u; x < dimLength; x++) {
                let inputIndex = cCoord + (x * xStride);
                let newMax = inputData[inputIndex];
                if (newMax > max) {
                    max = newMax;
                }
            }
        }
        
        let outputIndex = outY * xSize + outX;
        outputData[outputIndex] = max;
    }
`

const StDevReduction = /* wgsl */`
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
                        
        let outX = global_id.y;
        let outY = global_id.x;
        
        if (outX >= xSize || outY >= ySize) {
            return;
        }

        var sum: f32 = 0.0;
        // Iterate along the dimension we're averaging
        if (reduceDim == 0u) { // Average along Z
            let cCoord = outX * xStride + outY * yStride;
            for (var z: u32 = 0u; z < dimLength; z++) {
                let inputIndex = cCoord + (z * zStride);
                sum += inputData[inputIndex];
            }
        } else if (reduceDim == 1u) { // Average along Y
            let cCoord = outX * xStride + outY * zStride;
            for (var y: u32 = 0u; y < dimLength; y++) {
                let inputIndex = cCoord + (y * yStride);
                sum += inputData[inputIndex];
            }
        } else { // Average along X
            let cCoord = outX * yStride + outY * zStride;
            for (var x: u32 = 0u; x < dimLength; x++) {
                let inputIndex = cCoord + (x * xStride);
                sum += inputData[inputIndex];
            }
        }
        
        let mean: f32 = sum / f32(dimLength);

        var squaredDiffSum: f32 = 0.0;

        // Iterate along the dimension again
        if (reduceDim == 0u) { // Average along Z
            let cCoord = outX * xStride + outY * yStride;
            for (var z: u32 = 0u; z < dimLength; z++) {
                let inputIndex = cCoord + (z * zStride);
                let diff: f32 = mean - inputData[inputIndex];
                squaredDiffSum += diff*diff;
            }
        } else if (reduceDim == 1u) { // Average along Y
            let cCoord = outX * xStride + outY * zStride;
            for (var y: u32 = 0u; y < dimLength; y++) {
                let inputIndex = cCoord + (y * yStride);
                let diff: f32 = mean - inputData[inputIndex];
                squaredDiffSum += diff*diff;
            }
        } else { // Average along X
            let cCoord = outX * yStride + outY * zStride;
            for (var x: u32 = 0u; x < dimLength; x++) {
                let inputIndex = cCoord + (x * xStride);
                let diff: f32 = mean - inputData[inputIndex];
                squaredDiffSum += diff*diff;
            }
        }

        let stDev: f32 = sqrt(squaredDiffSum / f32(dimLength));
        let outputIndex = outY * xSize + outX;
        outputData[outputIndex] = stDev;
    }
`

const MeanConvolution = /* wgsl */`
    struct Params {
        xStride: u32,
        yStride: u32,
        zStride: u32,
        xSize: u32,
        ySize: u32,
        zSize: u32,
        workGroups: vec3<u32>,
        kernelSize: u32,
        kernelDepth: u32
    };
    @group(0) @binding(0) var<storage, read> inputData: array<f32>;
    @group(0) @binding(1) var<storage, read_write> outputData: array<f32>;
    @group(0) @binding(2) var<uniform> params: Params;

    @compute @workgroup_size(4, 4, 4)
    fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
        let zStride = params.zStride;
        let yStride = params.yStride;
        let xStride = params.xStride; 
        let xSize = params.xSize;
        let ySize = params.ySize;
        let zSize = params.zSize; 
        let workGroups = params.workGroups;
        let kernelSize = params.kernelSize;
        let kernelDepth = params.kernelDepth;

        let outX = global_id.x; 
        let outY = global_id.y;
        let outZ = global_id.z; 

        if (outX >= xSize || outY >= ySize || outZ >= zSize) {
            return;
        }

        let total_threads_per_slice = workGroups.x * workGroups.y * 16;
        let globalIdx = global_id.z * total_threads_per_slice + 
                        global_id.y * (workGroups.x * 4) + 
                        global_id.x;

        let xy_radius: i32 = i32(kernelSize/2u);
        let z_radius: i32 = i32(kernelDepth/2u);

        var sum: f32 = 0.0;
        var count: u32 = 0u;
        for (var kx: i32 = -xy_radius; kx < xy_radius; kx++) {
            for (var ky: i32 = -xy_radius; ky < xy_radius; ky++) {
                for (var kz: i32 = -z_radius; kz < z_radius; kz++){
                    let in_coord = vec3<i32>(global_id) + vec3<i32>(kx, ky, kz);

                    if (in_coord.x >= 0 && in_coord.x < i32(xSize) &&
                        in_coord.y >= 0 && in_coord.y < i32(ySize) &&
                        in_coord.z >= 0 && in_coord.z < i32(zSize)) { //Ensure the sampled point is within 3D dataspace
                        let xOffset = kx * i32(xStride);
                        let yOffset = ky * i32(yStride);
                        let zOffset = kz * i32(zStride);
                        let newIdx = i32(globalIdx) + xOffset + yOffset + zOffset;

                        sum += inputData[u32(newIdx)];
                        count ++;
                    }
                }
            }
        }
        
        outputData[globalIdx] = sum / f32(count);
    }
`

const MinConvolution = /* wgsl */`
    struct Params {
        xStride: u32,
        yStride: u32,
        zStride: u32,
        xSize: u32,
        ySize: u32,
        zSize: u32,
        workGroups: vec3<u32>,
        kernelSize: u32,
        kernelDepth: u32
    };
    @group(0) @binding(0) var<storage, read> inputData: array<f32>;
    @group(0) @binding(1) var<storage, read_write> outputData: array<f32>;
    @group(0) @binding(2) var<uniform> params: Params;

    @compute @workgroup_size(4, 4, 4)
    fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
        let zStride = params.zStride;
        let yStride = params.yStride;
        let xStride = params.xStride; 
        let xSize = params.xSize;
        let ySize = params.ySize;
        let zSize = params.zSize; 
        let workGroups = params.workGroups;
        let kernelSize = params.kernelSize;
        let kernelDepth = params.kernelDepth;

        let outX = global_id.x; 
        let outY = global_id.y;
        let outZ = global_id.z; 

        if (outX >= xSize || outY >= ySize || outZ >= zSize) {
            return;
        }

        let total_threads_per_slice = workGroups.x * workGroups.y * 16;
        let globalIdx = global_id.z * total_threads_per_slice + 
                        global_id.y * (workGroups.x * 4) + 
                        global_id.x;

        let xy_radius: i32 = i32(kernelSize/2u);
        let z_radius: i32 = i32(kernelDepth/2u);

        var minVal: f32 = 1e12;
        var count: u32 = 0u;
        for (var kx: i32 = -xy_radius; kx < xy_radius; kx++) {
            for (var ky: i32 = -xy_radius; ky < xy_radius; ky++) {
                for (var kz: i32 = -z_radius; kz < z_radius; kz++){
                    let in_coord = vec3<i32>(global_id) + vec3<i32>(kx, ky, kz);

                    if (in_coord.x >= 0 && in_coord.x < i32(xSize) &&
                        in_coord.y >= 0 && in_coord.y < i32(ySize) &&
                        in_coord.z >= 0 && in_coord.z < i32(zSize)) { //Ensure the sampled point is within 3D dataspace
                        let xOffset = kx * i32(xStride);
                        let yOffset = ky * i32(yStride);
                        let zOffset = kz * i32(zStride);
                        let newIdx = i32(globalIdx) + xOffset + yOffset + zOffset;
                        let sampledVal = inputData[u32(newIdx)];
                        if (sampledVal < minVal){
                            minVal = sampledVal;
                        }
                    }
                }
            }
        }
        
        outputData[globalIdx] = minVal;
    }
`

const MaxConvolution = /* wgsl */`
    struct Params {
        xStride: u32,
        yStride: u32,
        zStride: u32,
        xSize: u32,
        ySize: u32,
        zSize: u32,
        workGroups: vec3<u32>,
        kernelSize: u32,
        kernelDepth: u32
    };
    @group(0) @binding(0) var<storage, read> inputData: array<f32>;
    @group(0) @binding(1) var<storage, read_write> outputData: array<f32>;
    @group(0) @binding(2) var<uniform> params: Params;

    @compute @workgroup_size(4, 4, 4)
    fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
        let zStride = params.zStride;
        let yStride = params.yStride;
        let xStride = params.xStride; 
        let xSize = params.xSize;
        let ySize = params.ySize;
        let zSize = params.zSize; 
        let workGroups = params.workGroups;
        let kernelSize = params.kernelSize;
        let kernelDepth = params.kernelDepth;

        let outX = global_id.x; 
        let outY = global_id.y;
        let outZ = global_id.z; 

        if (outX >= xSize || outY >= ySize || outZ >= zSize) {
            return;
        }

        let total_threads_per_slice = workGroups.x * workGroups.y * 16;
        let globalIdx = global_id.z * total_threads_per_slice + 
                        global_id.y * (workGroups.x * 4) + 
                        global_id.x;

        let xy_radius: i32 = i32(kernelSize/2u);
        let z_radius: i32 = i32(kernelDepth/2u);

        var maxVal: f32 = -1e12;
        var count: u32 = 0u;
        for (var kx: i32 = -xy_radius; kx < xy_radius; kx++) {
            for (var ky: i32 = -xy_radius; ky < xy_radius; ky++) {
                for (var kz: i32 = -z_radius; kz < z_radius; kz++){
                    let in_coord = vec3<i32>(global_id) + vec3<i32>(kx, ky, kz);

                    if (in_coord.x >= 0 && in_coord.x < i32(xSize) &&
                        in_coord.y >= 0 && in_coord.y < i32(ySize) &&
                        in_coord.z >= 0 && in_coord.z < i32(zSize)) { //Ensure the sampled point is within 3D dataspace
                        let xOffset = kx * i32(xStride);
                        let yOffset = ky * i32(yStride);
                        let zOffset = kz * i32(zStride);
                        let newIdx = i32(globalIdx) + xOffset + yOffset + zOffset;
                        let sampledVal = inputData[u32(newIdx)];
                        if (sampledVal > maxVal){
                            maxVal = sampledVal;
                        }
                    }
                }
            }
        }
        
        outputData[globalIdx] = maxVal;
    }
`

const StDevConvolution = /* wgsl */`
    struct Params {
        xStride: u32,
        yStride: u32,
        zStride: u32,
        xSize: u32,
        ySize: u32,
        zSize: u32,
        workGroups: vec3<u32>,
        kernelSize: u32,
        kernelDepth: u32
    };
    @group(0) @binding(0) var<storage, read> inputData: array<f32>;
    @group(0) @binding(1) var<storage, read_write> outputData: array<f32>;
    @group(0) @binding(2) var<uniform> params: Params;

    @compute @workgroup_size(4, 4, 4)
    fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
        let zStride = params.zStride;
        let yStride = params.yStride;
        let xStride = params.xStride; 
        let xSize = params.xSize;
        let ySize = params.ySize;
        let zSize = params.zSize; 
        let workGroups = params.workGroups;
        let kernelSize = params.kernelSize;
        let kernelDepth = params.kernelDepth;

        let outX = global_id.x; 
        let outY = global_id.y;
        let outZ = global_id.z; 

        if (outX >= xSize || outY >= ySize || outZ >= zSize) {
            return;
        }

        let total_threads_per_slice = workGroups.x * workGroups.y * 16;
        let globalIdx = global_id.z * total_threads_per_slice + 
                        global_id.y * (workGroups.x * 4) + 
                        global_id.x;

        let xy_radius: i32 = i32(kernelSize/2u);
        let z_radius: i32 = i32(kernelDepth/2u);

        var sum: f32 = 0.0;
        var count: u32 = 0u;
        for (var kx: i32 = -xy_radius; kx < xy_radius; kx++) {
            for (var ky: i32 = -xy_radius; ky < xy_radius; ky++) {
                for (var kz: i32 = -z_radius; kz < z_radius; kz++){
                    let in_coord = vec3<i32>(global_id) + vec3<i32>(kx, ky, kz);

                    if (in_coord.x >= 0 && in_coord.x < i32(xSize) &&
                        in_coord.y >= 0 && in_coord.y < i32(ySize) &&
                        in_coord.z >= 0 && in_coord.z < i32(zSize)) { //Ensure the sampled point is within 3D dataspace
                        let xOffset = kx * i32(xStride);
                        let yOffset = ky * i32(yStride);
                        let zOffset = kz * i32(zStride);
                        let newIdx = i32(globalIdx) + xOffset + yOffset + zOffset;

                        sum += inputData[u32(newIdx)];
                        count ++;
                    }
                }
            }
        }
        
        let mean: f32 = sum / f32(count);

        var squaredDiffSum: f32 = 0.0;

        for (var kx: i32 = -xy_radius; kx < xy_radius; kx++) {
            for (var ky: i32 = -xy_radius; ky < xy_radius; ky++) {
                for (var kz: i32 = -z_radius; kz < z_radius; kz++){
                    let in_coord = vec3<i32>(global_id) + vec3<i32>(kx, ky, kz);

                    if (in_coord.x >= 0 && in_coord.x < i32(xSize) &&
                        in_coord.y >= 0 && in_coord.y < i32(ySize) &&
                        in_coord.z >= 0 && in_coord.z < i32(zSize)) { //Ensure the sampled point is within 3D dataspace
                        let xOffset = kx * i32(xStride);
                        let yOffset = ky * i32(yStride);
                        let zOffset = kz * i32(zStride);
                        let newIdx = i32(globalIdx) + xOffset + yOffset + zOffset;

                        let diff: f32 = mean - inputData[u32(newIdx)];
                        squaredDiffSum += diff*diff;
                    }
                }
            }
        }

        let stDev: f32 = sqrt(squaredDiffSum / f32(count));

        outputData[globalIdx] = stDev;
    }
`

export {
    MeanReduction,
    MinReduction,
    MaxReduction,
    StDevReduction,
    MeanConvolution,
    MinConvolution,
    MaxConvolution,
    StDevConvolution
}
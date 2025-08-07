const MeanReduction = `
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

const MinReduction = `
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

const MaxReduction = `
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

const StDevReduction = `
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


export {
    MeanReduction,
    MinReduction,
    MaxReduction,
    StDevReduction
}
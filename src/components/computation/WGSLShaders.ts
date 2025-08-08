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
        zStride: u32,
        yStride: u32,
        xStride: u32,
        xSize: u32,
        ySize: u32,
        zSize: u32,
        kernelSize: u32,  // Width and height of the kernel (X, Y)
        kernelDepth: u32, // Depth of the kernel (Z)
    };

    // Input data buffer (read-only).
    @group(0) @binding(0) var<storage, read> inputData: array<f32>;

    // Output data buffer (writeable).
    @group(0) @binding(1) var<storage, read_write> outputData: array<f32>;

    // Uniforms provided by the host.
    @group(0) @binding(2) var<uniform> params: Params;

    // The main compute function, dispatched in 3D workgroups.
    @compute @workgroup_size(4, 4, 4)
    fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
        // This is the 3D coordinate for the output voxel this invocation will calculate.
        let out_coord = global_id.xyz;

        // Boundary check: If this invocation is outside the dimensions of the
        // output data, do nothing and exit early.
        if (out_coord.x >= params.xSize || out_coord.y >= params.ySize || out_coord.z >= params.zSize) {
            return;
        }

        // Calculate the radius (half-size) of the kernel for each dimension.
        // Using signed integers here makes the subsequent loop logic simpler.
        let radius_xy = i32(params.kernelSize / 2u);
        let radius_z = i32(params.kernelDepth / 2u);

        var sum: f32 = 0.0;
        // Use f32 for the count to avoid a type cast during the final division.
        var count: f32 = 0.0;

        // Iterate through the kernel using relative offsets from the center.
        // The loop runs from -radius to +radius for each dimension.
        for (var kz: i32 = -radius_z; kz <= radius_z; kz = kz + 1) {
            for (var ky: i32 = -radius_xy; ky <= radius_xy; ky = ky + 1) {
                for (var kx: i32 = -radius_xy; kx <= radius_xy; kx = kx + 1) {
                    
                    // Calculate the 3D coordinate of the input voxel to sample by adding the kernel offset.
                    let in_coord = vec3<i32>(out_coord) + vec3<i32>(kx, ky, kz);

                    // Boundary check for the input sample. This is a much cleaner and safer
                    // way to ensure the coordinate we want to sample is valid.
                    if (in_coord.x >= 0 && in_coord.x < i32(params.xSize) &&
                        in_coord.y >= 0 && in_coord.y < i32(params.ySize) &&
                        in_coord.z >= 0 && in_coord.z < i32(params.zSize)) {
                        
                        // If the coordinate is valid, convert it to a 1D array index.
                        // We can safely cast to u32 now because we've passed the ">= 0" check.
                        let in_coord_u = vec3<u32>(in_coord);
                        let in_index = in_coord_u.z * params.zStride +
                                    in_coord_u.y * params.yStride +
                                    in_coord_u.x * params.xStride;

                        // Accumulate the value and increment the count.
                        sum = sum + inputData[in_index];
                        count = count + 1.0;
                    }
                }
            }
        }

        // Calculate the final 1D index for the output voxel.
        let out_index = out_coord.z * params.zStride +
                        out_coord.y * params.yStride +
                        out_coord.x * params.xStride;

        // Write the final averaged value. Avoid division by zero, although this is
        // unlikely to happen with a valid kernel size.
        if (count > 0.0) {
            outputData[out_index] = sum / count;
        } else {
            outputData[out_index] = 0.0;
        }
    }
`


export {
    MeanReduction,
    MinReduction,
    MaxReduction,
    StDevReduction,
    MeanConvolution
}
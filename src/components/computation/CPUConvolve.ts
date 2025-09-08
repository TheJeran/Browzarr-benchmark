interface Params {
    xStride: number;
    yStride: number;
    zStride: number;
    xSize: number;
    ySize: number;
    zSize: number;
    kernelSize: number;
    kernelDepth: number;
}

export default function CPUConvolve(inputArray :  ArrayBufferView, dimInfo : {shape: number[], strides: number[]}, kernel: {kernelSize: number, kernelDepth: number}){
    const {kernelDepth, kernelSize} = kernel;
    const {strides, shape} = dimInfo;
    const outputSize = shape[0] * shape[1] * shape[2];
    const [zStride, yStride, xStride] = strides;

    const params: Params = {
        xStride,
        yStride,
        zStride,
        xSize: shape[2],
        ySize: shape[1],
        zSize: shape[0],
        kernelSize,
        kernelDepth
    };
    const outputArray = new Float32Array(outputSize);

    compute3DStandardDeviation(
        inputArray as Float32Array,
        outputArray,
        params
    );
}

function compute3DStandardDeviation(
    inputData: Float32Array,
    outputData: Float32Array,
    params: Params
): void {
    const {
        xStride,
        yStride,
        zStride,
        xSize,
        ySize,
        zSize,
        kernelSize,
        kernelDepth
    } = params;

    const xyRadius = Math.floor(kernelSize / 2);
    const zRadius = Math.floor(kernelDepth / 2);

    // Handle kernel size of 1 edge cases
    const xyOffset = xyRadius === 0 ? -1 : 0;
    const zOffset = zRadius === 0 ? -1 : 0;

    // Iterate through each output position (equivalent to each GPU thread)
    for (let outZ = 0; outZ < zSize; outZ++) {
        for (let outY = 0; outY < ySize; outY++) {
            for (let outX = 0; outX < xSize; outX++) {
                
                // Calculate the linear index for this position
                const globalIdx = outZ * zStride + outY * yStride + outX * xStride;

                let sum = 0.0;
                let count = 0;

                // First pass: calculate mean
                for (let kx = -xyRadius + xyOffset; kx < xyRadius; kx++) {
                    for (let ky = -xyRadius + xyOffset; ky < xyRadius; ky++) {
                        for (let kz = -zRadius + zOffset; kz < zRadius; kz++) {
                            const inX = outX + kx;
                            const inY = outY + ky;
                            const inZ = outZ + kz;

                            // Bounds check
                            if (inX >= 0 && inX < xSize &&
                                inY >= 0 && inY < ySize &&
                                inZ >= 0 && inZ < zSize) {
                                
                                const xOffset = kx * xStride;
                                const yOffset = ky * yStride;
                                const zOffsetVal = kz * zStride;
                                const newIdx = globalIdx + xOffset + yOffset + zOffsetVal;

                                sum += inputData[newIdx];
                                count++;
                            }
                        }
                    }
                }

                const mean = sum / count;
                let squaredDiffSum = 0.0;

                // Second pass: calculate variance
                for (let kx = -xyRadius + xyOffset; kx < xyRadius; kx++) {
                    for (let ky = -xyRadius + xyOffset; ky < xyRadius; ky++) {
                        for (let kz = -zRadius + zOffset; kz < zRadius; kz++) {
                            const inX = outX + kx;
                            const inY = outY + ky;
                            const inZ = outZ + kz;

                            // Bounds check
                            if (inX >= 0 && inX < xSize &&
                                inY >= 0 && inY < ySize &&
                                inZ >= 0 && inZ < zSize) {
                                
                                const xOffset = kx * xStride;
                                const yOffset = ky * yStride;
                                const zOffsetVal = kz * zStride;
                                const newIdx = globalIdx + xOffset + yOffset + zOffsetVal;

                                const diff = mean - inputData[newIdx];
                                squaredDiffSum += diff * diff;
                            }
                        }
                    }
                }

                const stDev = Math.sqrt(squaredDiffSum / count);
                outputData[globalIdx] = stDev;
            }
        }
    }
}
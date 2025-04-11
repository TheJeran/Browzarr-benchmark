//This File will have functions converting the array information into 2D or 3D textures that we will pass to the corresponding 2D or 3D object
import * as THREE from 'three'

interface Array {
    shape: number[];
    data: number[];
    stride:number[]
}


// ? Please, try when possible to define the types of your variables. Otherwise building will fail.
function ArrayTo2D(array: Array){
    //We assume there is no slicing here. That will occur in the ZarrLoader stage. This is just pure data transfer
    const shape = array.shape;
    const data = array.data;

    const width = shape[0];
    const height = shape[1];

    const textureData = new Uint8Array(width * height);

    const maxVal = data.reduce((a, b) => {
        if (isNaN(a)) return b;
        if (isNaN(b)) return a;
        return a > b ? a : b;
    });

    const minVal = data.reduce((a, b) => {
        if (isNaN(a)) return b;
        if (isNaN(b)) return a;
        return a > b ? b : a;
    });

    const normed = data.map((i)=>(i-minVal)/(maxVal-minVal))

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const srcIdx = y * width + x;
            // Assuming data is normalized 0-1 or 0-255
            const value = normed[srcIdx];
            textureData[srcIdx] = value*255;     // We use single values cause we use luminance format. All coloring will be handled in the shader
        }
    }

    const texture = new THREE.DataTexture(
        textureData,
        width,
        height,
        THREE.LuminanceFormat,
        THREE.UnsignedByteType
    );

    // Update texture
    texture.needsUpdate = true;
    return texture
}

function ArrayTo3D(array: Array){
    const shape = array.shape;
    const data = array.data;

    const width = shape[0];
    const height = shape[1];
    const depth = shape[2]; //Need to verify this order. Might need to have a function that reorders the array when loaded in Zarr to specify correct order

    const textureData = new Uint8Array(width * height * depth);

    const maxVal = data.reduce((a, b) => {
        if (isNaN(a)) return b;
        if (isNaN(b)) return a;
        return a > b ? a : b;
    });

    const minVal = data.reduce((a, b) => {
        if (isNaN(a)) return b;
        if (isNaN(b)) return a;
        return a > b ? b : a;
    });

    const normed = data.map((i)=>(i-minVal)/(maxVal-minVal))

    for (let z = 0; z < depth; z++) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const srcIdx = z * width * height + y * width + x;
                // Assuming data is normalized 0-1 or 0-255
                const value = normed[srcIdx];
                textureData[srcIdx] = value*255;     // We use single values cause we use luminance format. All coloring will be handled in the shader
            }
        }
    }
    const volTexture = new THREE.Data3DTexture(textureData, width, height, depth);
    volTexture.format = THREE.RedFormat;
    volTexture.minFilter = THREE.NearestFilter;
    volTexture.magFilter = THREE.NearestFilter;
    volTexture.unpackAlignment = 1;
    volTexture.needsUpdate = true;

    return volTexture

}

export function ArrayToTexture(array: Array){
    const shape = array.shape;
    const texture = shape.length == 3 ? ArrayTo3D(array) : ArrayTo2D(array);
    return texture;
}
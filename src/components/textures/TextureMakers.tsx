//This File will have functions converting the array information into 2D or 3D textures that we will pass to the corresponding 2D or 3D object
import * as THREE from 'three'
import { ArrayMinMax} from '@/utils/HelperFuncs';
import { useZarrStore, useGlobalStore } from '@/utils/GlobalStates';

interface Array {
    data: Float32Array | Float64Array | Int32Array | Uint32Array;
    shape: number[];
    valueScales:{minVal:number, maxVal:number}
}


// ? Please, try when possible to define the types of your variables. Otherwise building will fail.
function ArrayTo2D(array: Array){
    //We assume there is no slicing here. That will occur in the ZarrLoader stage. This is just pure data transfer
    const compress = useZarrStore.getState().compress
    const shape = array.shape;
    const data = array.data;
    const width = shape[1];
    const height = shape[0];
    let textureData;
    let minVal: number, maxVal:number;
    if (!compress){
        [minVal,maxVal] = ArrayMinMax(data)
        const normed = data.map((i)=>(i-minVal)/(maxVal-minVal))
        textureData = new Uint8Array(normed.map((i)=>i*255))
    }
    else{
        const valueScales = useGlobalStore.getState().valueScales
        minVal = valueScales.minVal
        maxVal = valueScales.maxVal
        textureData = array.data
    }
    const texture = new THREE.DataTexture(
        textureData,
        width,
        height,
        THREE.RedFormat,
        THREE.UnsignedByteType
    );

    // Update texture
    texture.needsUpdate = true;
    return [texture, {maxVal,minVal}]
}

export function ArrayTo3D(array: Array){
    const compress = useZarrStore.getState().compress
    const shape = array.shape;
    const data = array.data;
    const [lz,ly,lx] = shape
    let textureData;
    let minVal: number, maxVal:number;
    if (!compress){
        [minVal,maxVal] = ArrayMinMax(data)
        const normed = data.map((i)=>(i-minVal)/(maxVal-minVal))
        textureData = new Uint8Array(normed.map((i)=>i*255))
    }
    else{
        const valueScales = useGlobalStore.getState().valueScales
        minVal = valueScales.minVal
        maxVal = valueScales.maxVal
        textureData = array.data
    }
    const volTexture = new THREE.Data3DTexture(textureData, lx, ly, lz);
    volTexture.format = THREE.RedFormat;
    volTexture.minFilter = THREE.NearestFilter;
    volTexture.magFilter = THREE.NearestFilter;
    volTexture.needsUpdate = true;
    return [volTexture, {maxVal,minVal}]
}

export function ArrayToTexture(array: Array){
    const shape = array.shape;
    const prevScales = array.valueScales;
    const [texture,scales] = shape.length == 3 ? ArrayTo3D(array) : ArrayTo2D(array);
    return [texture, prevScales ? prevScales : scales];
}

export function DefaultCubeTexture() {
    // Create a Float32Array instead of regular array
    const data = new Float32Array(1000);
    // Fill with random values
    for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() < 0.2 ? NaN : Math.random();
    }
    
    const shape = [10, 10, 10];
    const array: Array = {
        data,
        shape,
        valueScales:{minVal:0, maxVal:1}
    }
    const [texture, _scaling] = ArrayTo3D(array)
    return texture
}
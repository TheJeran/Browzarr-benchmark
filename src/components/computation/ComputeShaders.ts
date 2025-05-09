'use client';
import * as THREE from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/Addons.js'
import { MeanFrag, MaxFrag, MinFrag, StDevFrag } from './shaders'


interface Array{
    data:number[],
    shape:number[],
    stride:number[]
}

export class OneArrayCompute{
    private data: number[];
    private shape: number[];
    private stride: number[];
    private renderer: THREE.WebGLRenderer;
    private GPUCompute: GPUComputationRenderer;
    private texture: THREE.Data3DTexture | null;
    private targetAxis: number;
    private renderTarget: THREE.WebGLRenderTarget<THREE.Texture>;
    private initTexture: THREE.DataTexture

    constructor(array: Array, webGL:THREE.WebGLRenderer, scales: {maxVal:number,minVal:number}){
        
        this.data = array.data;
        this.shape = array.shape;
        this.stride = array.stride;
        this.renderer = webGL
        this.GPUCompute = new GPUComputationRenderer(10,10,this.renderer)
        this.initTexture = this.GPUCompute.createTexture()
        this.targetAxis = 5;
        this.renderTarget = this.GPUCompute.createRenderTarget(10,10,THREE.ClampToEdgeWrapping,THREE.ClampToEdgeWrapping,1006,1006);
        const size = array.shape[0]*array.shape[1]*array.shape[2]
        const newArray = new Uint8Array(size)

        const {minVal ,maxVal} = scales
        for (let i = 0; i<size; i++){
            const newVal = ((this.data[i]-minVal)/(maxVal-minVal))*254
            newArray[i] = isNaN(this.data[i]) ? 255 : newVal
        }
        this.texture = new THREE.Data3DTexture(newArray,this.shape[2],this.shape[1],this.shape[0])
        this.texture.format = THREE.RedFormat;
        this.texture.needsUpdate = true;
    }
    
    private initAxis(axis:number){
        const resolution = this.shape.filter((_val,idx)=> idx !== axis)
        this.GPUCompute = new GPUComputationRenderer(resolution[0],resolution[1],this.renderer)
        this.targetAxis = axis;
        this.renderTarget = this.GPUCompute.createRenderTarget(resolution[0],resolution[1],THREE.ClampToEdgeWrapping,THREE.ClampToEdgeWrapping,1006,1006)
    }

    Mean(axis:number){
        if (axis !== this.targetAxis){
            this.initAxis(axis)
        }
        const reducer = this.GPUCompute.addVariable("reduction", MeanFrag, this.initTexture);
        reducer.material.uniforms[`dataArray`] = { value: this.texture };
        reducer.material.uniforms['axisSize'] = { value: this.shape[this.targetAxis]}
        reducer.material.uniforms['axis'] = { value: this.targetAxis}
        this.GPUCompute.doRenderTarget(reducer.material,this.renderTarget)
        const pixelBuffer = new Float32Array(this.renderTarget.width * this.renderTarget.height * 4)
        this.renderer.readRenderTargetPixels(this.renderTarget, 0,0,this.renderTarget.width,this.renderTarget.height,pixelBuffer)
        console.log(reducer.material)
        return this.renderTarget.texture
    }

    Max(axis:number){
        if (axis !== this.targetAxis){
            this.initAxis(axis)
        }
        const reducer = this.GPUCompute.addVariable("reduction", MaxFrag, this.initTexture);
        reducer.material.uniforms[`dataArray`] = { value: this.texture };
        reducer.material.uniforms['axisSize'] = { value: this.shape[this.targetAxis]}
        reducer.material.uniforms['axis'] = { value: this.targetAxis}
        this.GPUCompute.doRenderTarget(reducer.material,this.renderTarget)
        return this.renderTarget.texture
    }

    Min(axis:number){
        if (axis !== this.targetAxis){
            this.initAxis(axis)
        }
        const reducer = this.GPUCompute.addVariable("reduction", MinFrag, this.initTexture);
        reducer.material.uniforms[`dataArray`] = { value: this.texture };
        reducer.material.uniforms['axisSize'] = { value: this.shape[this.targetAxis]}
        reducer.material.uniforms['axis'] = { value: this.targetAxis}
        this.GPUCompute.doRenderTarget(reducer.material,this.renderTarget)
        return this.renderTarget.texture
    }
    
    StDev(axis:number){
        if (axis !== this.targetAxis){
            this.initAxis(axis)
        }
        const reducer = this.GPUCompute.addVariable("reduction", StDevFrag, this.initTexture);
        reducer.material.uniforms[`dataArray`] = { value: this.texture };
        reducer.material.uniforms['axisSize'] = { value: this.shape[this.targetAxis]}
        reducer.material.uniforms['axis'] = { value: this.targetAxis}
        this.GPUCompute.doRenderTarget(reducer.material,this.renderTarget)
        return this.renderTarget.texture
    }
}
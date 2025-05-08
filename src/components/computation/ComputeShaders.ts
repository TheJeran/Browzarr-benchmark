'use client';

import * as THREE from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/Addons.js'
import { useThree } from '@react-three/fiber'
import { MeanFrag, MaxFrag, MinFrag, StDevFrag } from './shaders'

interface Array {
    data: number[],
    shape: number[],
    stride: number[]
}

export function useOneArrayCompute(array: Array) {
    const renderer = useThree(state => state.gl)
    const data = array.data
    const shape = array.shape
    const stride = array.stride
    let GPUCompute = new GPUComputationRenderer(10, 10, renderer)
    const initTexture = GPUCompute.createTexture()
    let targetAxis = 5
    let renderTarget = GPUCompute.createRenderTarget(10, 10, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, 1006, 1006)
    const size = array.shape[0] * array.shape[1] * array.shape[2]
    const newArray = new Float32Array(size)
    for (let i = 0; i < size; i++) {
        newArray[i] = data[i]
    }
    const texture = new THREE.Data3DTexture(newArray, shape[2], shape[1], shape[0])

    const initAxis = (axis: number) => {
        const resolution = shape.filter((_val, idx) => idx !== axis)
        GPUCompute = new GPUComputationRenderer(resolution[0], resolution[1], renderer)
        targetAxis = axis
        renderTarget = GPUCompute.createRenderTarget(resolution[0], resolution[1], THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping, 1006, 1006)
    }

    const Mean = (axis: number) => {
        if (axis !== targetAxis) {
            initAxis(axis)
        }
        const reducer = GPUCompute.addVariable("reduction", MeanFrag, initTexture)
        reducer.material.uniforms[`dataArray]`] = { value: texture }
        reducer.material.uniforms['axisSize'] = { value: shape[targetAxis] }
        reducer.material.uniforms['axis'] = { value: targetAxis }
        GPUCompute.doRenderTarget(reducer.material, renderTarget)
        const pixelBuffer = new Float32Array(renderTarget.width * renderTarget.height * 4)
        renderer.readRenderTargetPixels(renderTarget, 0, 0, renderTarget.width, renderTarget.height, pixelBuffer)
        console.log(pixelBuffer)
        return renderTarget.texture
    }

    const Max = (axis: number) => {
        if (axis !== targetAxis) {
            initAxis(axis)
        }
        const reducer = GPUCompute.addVariable("reduction", MaxFrag, initTexture)
        reducer.material.uniforms[`dataArray]`] = { value: texture }
        reducer.material.uniforms['axisSize'] = { value: shape[targetAxis] }
        reducer.material.uniforms['axis'] = { value: targetAxis }
        GPUCompute.doRenderTarget(reducer.material, renderTarget)
        return renderTarget.texture
    }

    const Min = (axis: number) => {
        if (axis !== targetAxis) {
            initAxis(axis)
        }
        const reducer = GPUCompute.addVariable("reduction", MinFrag, initTexture)
        reducer.material.uniforms[`dataArray]`] = { value: texture }
        reducer.material.uniforms['axisSize'] = { value: shape[targetAxis] }
        reducer.material.uniforms['axis'] = { value: targetAxis }
        GPUCompute.doRenderTarget(reducer.material, renderTarget)
        return renderTarget.texture
    }

    const StDev = (axis: number) => {
        if (axis !== targetAxis) {
            initAxis(axis)
        }
        const reducer = GPUCompute.addVariable("reduction", StDevFrag, initTexture)
        reducer.material.uniforms[`dataArray]`] = { value: texture }
        reducer.material.uniforms['axisSize'] = { value: shape[targetAxis] }
        reducer.material.uniforms['axis'] = { value: targetAxis }
        GPUCompute.doRenderTarget(reducer.material, renderTarget)
        return renderTarget.texture
    }

    return {
        Mean,
        Max,
        Min,
        StDev
    }
}
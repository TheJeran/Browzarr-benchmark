'use client';

import React, { useEffect, useState, useMemo } from 'react'
import { OneArrayCompute } from './ComputeShaders'
import * as THREE from 'three'
import { fragShader, vertShader } from './shaders'
import { useThree } from '@react-three/fiber';

interface Array{
    data:number[],
    shape:number[],
    stride:number[]
}

interface StateVars{
  axis:number,
  operation:string,
  execute:boolean,
}

interface ComputeModule{
  arrays:{
    firstArray:Array;
    secondArray: Array | null;
  },
  values:{
    cmap:THREE.DataTexture;
    stateVars:StateVars;
    valueScales:{maxVal:number,minVal:number}
  }
}


const ComputeModule = ({arrays,values}:ComputeModule) => {
    const {stateVars,cmap,valueScales} = values
    const {firstArray, secondArray} = arrays;
    const {axis, operation, execute} = stateVars;
    const shape = firstArray.shape
    const [planeShape,setPlaneShape] = useState<number[]>(shape.filter((_val,idx)=> idx !== axis))
    const {gl} = useThree()

    const GPUCompute = new OneArrayCompute(firstArray,gl,valueScales)
    const [texture,setTexture] = useState<THREE.Texture | null>(null)

    const shaderMaterial = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms:{
          data : {value: texture},
          cmap : { value : cmap},
        },
        vertexShader: vertShader,
        fragmentShader: fragShader,
        side: THREE.DoubleSide,
    })

    useEffect(()=>{
      if (firstArray){
        let newText: THREE.Texture | null;
        switch(operation){
          case "Max":
            newText =  GPUCompute.Max(axis);
            break
          case "Min":
            newText =  GPUCompute.Min(axis);
            break
          case "Mean":
            newText =  GPUCompute.Mean(axis);
            break
          case "StDev":
            newText =  GPUCompute.StDev(axis);
            break;
          default:
            newText = texture;
            break
        }
          setTexture(newText)
          setPlaneShape(shape.filter((_val,idx)=> idx !== axis))
      }
    },[execute])

  return (
    <mesh material={shaderMaterial}>
      {texture && <planeGeometry args={[2,planeShape[0]/planeShape[1]*2]} />}
    </mesh>
  )
}

export default ComputeModule
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
  active:boolean
}


const ComputeModule = ({array,cmap,stateVars,valueScales}:{array: Array,cmap:THREE.DataTexture,stateVars:StateVars,valueScales:{maxVal:number,minVal:number}}) => {
    const {axis, operation, execute, active} = stateVars;
    const shape = array.shape
    const [planeShape,setPlaneShape] = useState<number[]>(shape.filter((_val,idx)=> idx !== axis))
    const {gl} = useThree()

    const GPUCompute = new OneArrayCompute(array,gl,valueScales)
    const [texture,setTexture] = useState<THREE.Texture>(new THREE.Texture())

    const shaderMaterial = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms:{
          data : {value: texture},
          cmap : { value : cmap},
        },
        vertexShader: vertShader,
        fragmentShader: fragShader,
        side: THREE.DoubleSide
    })

    useEffect(()=>{
      if (array){
        let newText: THREE.Texture;
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
      <planeGeometry args={[planeShape[1],planeShape[0]]} />
    </mesh>
  )
}

export default ComputeModule
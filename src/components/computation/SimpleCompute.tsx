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
  execute:boolean
}


const SimpleCompute = ({array,cmap,render}:{array: Array,cmap:THREE.DataTexture,render:boolean}) => {
    const shape = array.shape
    const operation = "Mean"
    const axis = 0
    const [planeShape,setPlaneShape] = useState<number[]>(shape.filter((_val,idx)=> idx !== axis))
    // const {gl} = useThree;
    const GPUCompute = new OneArrayCompute(array)
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
        newText = GPUCompute.Mean(axis)
          setTexture(newText)
          setPlaneShape(shape.filter((_val,idx)=> idx !== axis))
      }
    },[render])

  return (
    <mesh material={shaderMaterial}>
      <planeGeometry args={[2,2*planeShape[0]/planeShape[1]]} />
    </mesh>
  )
}

export default SimpleCompute
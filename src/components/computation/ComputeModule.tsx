'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { OneArrayCompute, TwoArrayCompute } from './ComputeShaders'
import * as THREE from 'three'
import { fragShader, vertShader } from './shaders'
import { useThree } from '@react-three/fiber';
import { useGlobalStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { ThreeEvent } from '@react-three/fiber';

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
    stateVars:StateVars;
    valueScales:{firstArray:{maxVal:number,minVal:number},secondArray:{maxVal:number,minVal:number}}
  },
  setters:{
    setShowInfo:React.Dispatch<React.SetStateAction<boolean>>;
    setLoc:React.Dispatch<React.SetStateAction<number[]>>;
    setUV:React.Dispatch<React.SetStateAction<number[]>>;
  }
  
}


const ComputeModule = ({arrays,values, setters}:ComputeModule) => {
  const {setShowInfo, setLoc, setUV} = setters;
    const {colormap, flipY} = useGlobalStore(useShallow(state=>({colormap:state.colormap, flipY:state.flipY})))
    const {stateVars,valueScales} = values
    const {firstArray, secondArray} = arrays;
    const {axis, operation, execute} = stateVars;
    const shape = firstArray.shape
    const [planeShape,setPlaneShape] = useState<number[]>(shape.filter((_val,idx)=> idx !== axis))
    const {gl} = useThree()
    const infoRef = useRef<boolean>(false)

    const GPUCompute = secondArray ? new TwoArrayCompute({firstArray,secondArray},gl,valueScales) : new OneArrayCompute(firstArray,gl,valueScales.firstArray)
    const [texture,setTexture] = useState<THREE.Texture | null>(null)

    const shaderMaterial = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms:{
          data : {value: texture},
          cmap : { value : colormap},
        },
        vertexShader: vertShader,
        fragmentShader: fragShader,
        side: THREE.DoubleSide,
    })

    useEffect(()=>{
      if (firstArray){
        let newText: THREE.Texture | null;
        if (secondArray && GPUCompute instanceof TwoArrayCompute){
          newText = GPUCompute.Correlate(axis);
        }
        else{
          switch(operation){
            case "Max":
              newText = GPUCompute instanceof OneArrayCompute ? GPUCompute.Max(axis) : null;
              break
            case "Min":
              newText = GPUCompute instanceof OneArrayCompute ? GPUCompute.Min(axis) : null;
              break
            case "Mean":
              newText = GPUCompute instanceof OneArrayCompute ? GPUCompute.Mean(axis) : null;
              break
            case "StDev":
              newText = GPUCompute instanceof OneArrayCompute ? GPUCompute.StDev(axis) : null;
              break;
            default:
              newText = texture;
              break
          }
        }
        setTexture(newText)
        setPlaneShape(shape.filter((_val,idx)=> idx !== axis))
      }
    },[execute])


    function HandleMove(e: ThreeEvent<PointerEvent>){
      if (infoRef.current && e.uv){
        setLoc([e.clientX,e.clientY])
        setUV([e.uv.x,e.uv.y])
      }
    }
  const shapeRatio = useMemo(()=>flipY ? planeShape[0]/planeShape[1]*-2 : planeShape[0]/planeShape[1]*2,[flipY])
  return (
    <mesh material={shaderMaterial} 
      onPointerEnter={()=>{setShowInfo(true); infoRef.current = true }}
      onPointerLeave={()=>{setShowInfo(false); infoRef.current = false }}
      onPointerMove={HandleMove}
    >

      {texture && <planeGeometry args={[2,shapeRatio]} />}
    </mesh>
  )
}

export default ComputeModule
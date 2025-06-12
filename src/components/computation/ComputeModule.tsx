'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
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
    setVal:React.Dispatch<React.SetStateAction<number>>;
  }
  
}

function Rescale(value: number, scales: {minVal: number, maxVal: number}){
  const range = scales.maxVal-scales.minVal
  return value * range + scales.minVal
}

const ComputeModule = ({arrays,values, setters}:ComputeModule) => {
    const {setShowInfo, setLoc, setUV, setVal} = setters;
    const {colormap, flipY} = useGlobalStore(useShallow(state=>({colormap:state.colormap, flipY:state.flipY})))
    const {stateVars,valueScales} = values
    const {firstArray, secondArray} = arrays;
    const {axis, operation, execute} = stateVars;
    const shape = firstArray.shape
    const [planeShape,setPlaneShape] = useState<number[]>(shape.filter((_val,idx)=> idx !== axis))
    const {gl} = useThree()
    const infoRef = useRef<boolean>(false)
    const dataArray = useRef<Float32Array>(new Float32Array(0));

    const GPUCompute = useMemo(() => {
      return secondArray 
      ? new TwoArrayCompute({ firstArray, secondArray }, gl, valueScales) 
      : new OneArrayCompute(firstArray, gl, valueScales.firstArray);
      }, [firstArray, secondArray]);

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
        let newText: THREE.Texture | null = null;
        if (secondArray && GPUCompute instanceof TwoArrayCompute){
          [newText, dataArray.current] = GPUCompute.Correlate(axis);
        }
        else{
          switch(operation){
            case "Max":
              [newText, dataArray.current] = GPUCompute instanceof OneArrayCompute ? GPUCompute.Max(axis) : [null, dataArray.current];
              break
            case "Min":
              [newText, dataArray.current] = GPUCompute instanceof OneArrayCompute ? GPUCompute.Min(axis) : [null, dataArray.current];
              break
            case "Mean":
              [newText, dataArray.current] = GPUCompute instanceof OneArrayCompute ? GPUCompute.Mean(axis) : [null, dataArray.current];
              break
            case "StDev":
              [newText, dataArray.current] = GPUCompute instanceof OneArrayCompute ? GPUCompute.StDev(axis) : [null, dataArray.current];
              break;
            default:
              newText = texture;
              break
          }
        }
        setTexture(newText)
        setPlaneShape(shape.filter((_val,idx)=> idx !== axis))
      }
    },[execute, axis, secondArray, firstArray, operation])

    const shapeRatio = useMemo(()=>flipY ? planeShape[0]/planeShape[1]*-2 : planeShape[0]/planeShape[1]*2,[flipY,planeShape])
    console.log(shapeRatio)
    useEffect(()=>{
      if(GPUCompute){
        GPUCompute.dispose()
      }
    },[firstArray,secondArray])

    const eventRef = useRef<ThreeEvent<PointerEvent> | null>(null);

const handleMove = useCallback((e: ThreeEvent<PointerEvent>) => {
  if (infoRef.current && e.uv) {
    eventRef.current = e;
    setLoc([e.clientX, e.clientY]);
    const { x, y } = e.uv;
    setUV([x, y]);
    const yStep = Math.round(planeShape[0] * y -.5);
    const xStep = Math.round(planeShape[1] * x -.5 );
    const dataIdx = planeShape[1] * yStep + xStep;
    const dataVal = dataArray.current[dataIdx];
    if (secondArray || operation === "StDev"){
      setVal(dataVal);
    }
    else{
      setVal(Rescale(dataVal, valueScales.firstArray));
    }
    
  }
}, [firstArray,secondArray,axis]);
  
    const geometry = useMemo(()=>new THREE.PlaneGeometry(2,shapeRatio),[shapeRatio])

    useEffect(()=>{
      geometry.dispose()
    },[geometry])
  return (
    <mesh material={shaderMaterial} 
      onPointerEnter={()=>{setShowInfo(true); infoRef.current = true }}
      onPointerLeave={()=>{setShowInfo(false); infoRef.current = false }}
      onPointerMove={handleMove}
      geometry={geometry}
      rotation={[0,0,axis == 2 ? Math.PI/2 : 0]}
    >
    </mesh>
  )
}

export default ComputeModule
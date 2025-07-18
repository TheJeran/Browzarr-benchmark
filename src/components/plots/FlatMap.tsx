"use client";

import React, {useMemo, useState, useEffect, useRef, useCallback} from 'react'
import * as THREE from 'three'
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import { fragShader, vertShader } from '@/components/computation/shaders'
import flatFrag3D from '@/components/textures/shaders/flatFrag3D.glsl'
import { useShallow } from 'zustand/shallow'
import { ThreeEvent, useFrame } from '@react-three/fiber';

interface InfoSettersProps{
  setLoc: React.Dispatch<React.SetStateAction<number[]>>;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  val: React.RefObject<number>;
  coords: React.RefObject<number[]>;
}

function Rescale(value: number, scales: {minVal: number, maxVal: number}){
  const range = scales.maxVal-scales.minVal
  return value * range + scales.minVal
}


const FlatMap = ({texture, infoSetters} : {texture : THREE.DataTexture | THREE.Data3DTexture, infoSetters : InfoSettersProps}) => {
    const {setLoc, setShowInfo, val, coords} = infoSetters;

    const {shape, flipY, colormap, dataArray, valueScales, dimArrays, isFlat} = useGlobalStore(useShallow(state => ({
      shape: state.shape, 
      flipY: state.flipY, 
      colormap: state.colormap, 
      dataArray: state.dataArray,
      valueScales: state.valueScales,
      dimArrays: state.dimArrays,
      isFlat: state.isFlat
    })))
    const {cScale, cOffset, resetAnim, animate} = usePlotStore(useShallow(state => ({
      cOffset: state.cOffset,
      cScale: state.cScale,
      resetAnim: state.resetAnim,
      animate: state.animate
    })))
    const shapeRatio = useMemo(()=> shape.x/shape.z, [shape])
    const geometry = useMemo(()=>new THREE.PlaneGeometry(2,shapeRatio),[shapeRatio])
    const infoRef = useRef<boolean>(false)
    const lastUV = useRef<THREE.Vector2>(new THREE.Vector2(0,0))
    const [animateProg, setAnimateProg] = useState<number>(0);

    const shaderMaterial = useMemo(()=>new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            uniforms:{
              cScale: {value: cScale},
              cOffset: {value: cOffset},
              data : {value: texture},
              cmap : { value : colormap},
              animateProg: {value:animateProg}
            },
            vertexShader: vertShader,
            fragmentShader: isFlat ? fragShader : flatFrag3D,
            side: THREE.DoubleSide,
        }),[cScale, cOffset, texture, colormap, animateProg])

    useEffect(()=>{
        geometry.dispose()
    },[geometry])

    const eventRef = useRef<ThreeEvent<PointerEvent> | null>(null);

    const handleMove = useCallback((e: ThreeEvent<PointerEvent>) => {
      if (infoRef.current && e.uv) {
        eventRef.current = e;
        setLoc([e.clientX, e.clientY]);
        lastUV.current = e.uv;
        const { x, y } = e.uv;
        const xSize = isFlat ? dimArrays[1].length : dimArrays[2].length;
        const ySize = isFlat ? dimArrays[0].length : dimArrays[1].length;
        const xIdx = Math.round(x*xSize-.5)
        const yIdx = Math.round(y*ySize-.5)
        let dataIdx = xSize * yIdx + xIdx;
        dataIdx += isFlat ? 0 : Math.round(dimArrays[0].length * animateProg) * xSize*ySize
        
        const dataVal = dataArray ? dataArray[dataIdx] : 0;
        val.current = isFlat ? Rescale(dataVal, valueScales) : dataVal;
        coords.current = isFlat ? [dimArrays[0][yIdx], dimArrays[1][xIdx]] : [dimArrays[1][yIdx], dimArrays[2][xIdx]]
      }
    }, [dataArray, shape, dimArrays, animateProg]);

    useFrame(()=>{
            if (animate){
                const newProg = animateProg + 0.001
                setAnimateProg(newProg % 1.)
            }
        })
    
    useEffect(()=>{
        setAnimateProg(0)
    },[resetAnim])
  return (
    <>
    <mesh 
      material={shaderMaterial} 
      geometry={geometry} 
      scale={[1, flipY ? -1 : 1 , 1]}
      onPointerEnter={()=>{setShowInfo(true); infoRef.current = true }}
      onPointerLeave={()=>{setShowInfo(false); infoRef.current = false }}
      onPointerMove={handleMove}
    />
    </>
  )
}

export {FlatMap}

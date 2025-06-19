"use client";

import React, {useMemo, useEffect, useRef, useCallback} from 'react'
import * as THREE from 'three'
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import { fragShader, vertShader } from '@/components/computation/shaders'
import { useShallow } from 'zustand/shallow'
import { ThreeEvent } from '@react-three/fiber';

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


const FlatMap = ({texture, infoSetters} : {texture : THREE.DataTexture, infoSetters : InfoSettersProps}) => {
    const {setLoc, setShowInfo, val, coords} = infoSetters;

    const {shape, flipY, colormap, dataArray, valueScales, dimArrays} = useGlobalStore(useShallow(state => ({
      shape: state.shape, 
      flipY: state.flipY, 
      colormap: state.colormap, 
      dataArray: state.dataArray,
      valueScales: state.valueScales,
      dimArrays: state.dimArrays,
    })))
    const {cScale, cOffset} = usePlotStore(useShallow(state => ({
      cOffset: state.cOffset,
      cScale: state.cScale
    })))

    const shapeRatio = useMemo(()=> shape.x/shape.z, [shape])
    const geometry = useMemo(()=>new THREE.PlaneGeometry(2,shapeRatio),[shapeRatio])
    const infoRef = useRef<boolean>(false)

    const shaderMaterial = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            uniforms:{
              cScale: {value: cScale},
              cOffset: {value: cOffset},
              data : {value: texture},
              cmap : { value : colormap},
            },
            vertexShader: vertShader,
            fragmentShader: fragShader,
            side: THREE.DoubleSide,
        })
    useEffect(()=>{
        geometry.dispose()
    },[geometry])

    const eventRef = useRef<ThreeEvent<PointerEvent> | null>(null);

    const handleMove = useCallback((e: ThreeEvent<PointerEvent>) => {
      if (infoRef.current && e.uv) {
        eventRef.current = e;
        setLoc([e.clientX, e.clientY]);
        const { x, y } = e.uv;
        const xSize = dimArrays[1].length;
        const ySize = dimArrays[0].length;
        const xIdx = Math.round(x*xSize-.5)
        const yIdx = Math.round(y*ySize-.5)
        const dataIdx = xSize * yIdx + xIdx;
        const dataVal = dataArray ? dataArray[dataIdx] : 0;
        val.current = Rescale(dataVal, valueScales);
        coords.current = [dimArrays[0][yIdx], dimArrays[1][xIdx]]
      }
    }, [dataArray, shape, dimArrays]);

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

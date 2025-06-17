"use client";

import React, {useMemo, useEffect, useRef, useCallback, useState} from 'react'
import * as THREE from 'three'
import { useGlobalStore } from '@/utils/GlobalStates'
import { fragShader, vertShader } from '@/components/computation/shaders'
import { useShallow } from 'zustand/shallow'
import { ThreeEvent } from '@react-three/fiber';

function Rescale(value: number, scales: {minVal: number, maxVal: number}){
  const range = scales.maxVal-scales.minVal
  return value * range + scales.minVal
}

const FlatMap = ({texture} : {texture : THREE.DataTexture}) => {
    const {shape, flipY, colormap, dataArray} = useGlobalStore(useShallow(state => ({shape: state.shape, flipY: state.flipY, colormap: state.colormap, dataArray: state.dataArray})))
    const shapeRatio = useMemo(()=> shape.x/shape.z, [shape])
    const geometry = useMemo(()=>new THREE.PlaneGeometry(2,shapeRatio),[shapeRatio])
    const infoRef = useRef<boolean>(false)
    const [loc, setLoc] = useState<number[]>([0,0])
    const [uv, setUV] = useState<number[]>([0,0])
    const [val, setVal] = useState<number>(0);
    // const uv = useRef<number>([0,0])

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
        geometry.dispose()
    },[geometry])

    const eventRef = useRef<ThreeEvent<PointerEvent> | null>(null);

    const handleMove = useCallback((e: ThreeEvent<PointerEvent>) => {
      if (infoRef.current && e.uv) {
        eventRef.current = e;
        setLoc([e.clientX, e.clientY]);
        const { x, y } = e.uv;
        setUV([x, y]);
        const yStep = Math.round(shape.z * y -.5);
        const xStep = Math.round(shape.x * x -.5 );
        const dataIdx = shape.z * yStep + xStep;
        const dataVal = dataArray ? dataArray[dataIdx] : 0;
        setVal(Rescale(dataVal, valueScales.firstArray));
        
      }
    }, [dataArray, shape]);


  return (

    <mesh material={shaderMaterial} geometry={geometry} scale={[1, flipY ? -1 : 1 , 1]}/>
  )
}

export {FlatMap}

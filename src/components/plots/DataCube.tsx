import {  useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { vertexShader, fragmentShader, fragOpt } from '@/components/textures/shaders';
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';

interface DataCubeProps {
  volTexture: THREE.Data3DTexture | THREE.DataTexture | null,
}

export const DataCube = ({ volTexture }: DataCubeProps ) => {


    const {shape, colormap, flipY} = useGlobalStore(useShallow(state=>({shape:state.shape, colormap:state.colormap, flipY:state.flipY}))) //We have to useShallow when returning an object instead of a state. I don't fully know the logic yet

    const {valueRange, xRange, yRange, zRange, quality, animProg, cScale, cOffset, useFragOpt, transparency, nanTransparency, nanColor} = usePlotStore(useShallow(state => ({
      valueRange: state.valueRange,
      xRange: state.xRange,
      yRange: state.yRange,
      zRange: state.zRange,
      quality: state.quality,
      animProg: state.animProg,
      cScale: state.cScale,
      cOffset: state.cOffset,
      useFragOpt: state.useFragOpt,
      transparency: state.transparency,
      nanTransparency: state.nanTransparency,
      nanColor: state.nanColor
    })))

    const shaderMaterial = useMemo(()=>new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
          map: { value: volTexture },
          cmap:{value: colormap},
          cOffset:{value: cOffset},
          cScale: {value: cScale},
          threshold: {value: new THREE.Vector2(valueRange[0],valueRange[1])},
          scale: {value: shape},
          flatBounds:{value: new THREE.Vector4(xRange[0],xRange[1],zRange[0],zRange[1])},
          vertBounds:{value: new THREE.Vector2(yRange[0]/shape.x,yRange[1]/shape.x)},
          steps: { value: quality },
          animateProg: {value: animProg},
          transparency: {value: transparency},
          nanAlpha: {value: 1-nanTransparency},
          nanColor: {value: new THREE.Color(nanColor)}
      },
      vertexShader,
      fragmentShader: useFragOpt ?  fragOpt : fragmentShader,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      side: THREE.BackSide,
    }),[volTexture, colormap, cOffset, cScale, valueRange, xRange, yRange, zRange, quality, animProg, useFragOpt, transparency, nanTransparency, nanColor]);
        
  // Use geometry once, avoid recreating -- Using a sphere to avoid the weird angles you get with cube
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 4), []);

    useEffect(() => {
      return () => {
        geometry.dispose(); // Dispose when unmounted
      };
    }, []);

  
  return (
    <>
    <mesh geometry={geometry} scale={[1,flipY ? -1: 1,1]}>
      <primitive attach="material" object={shaderMaterial} />
    </mesh>
    </>
  )
}
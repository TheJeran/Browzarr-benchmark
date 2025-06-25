import React, {useEffect, useMemo, useState} from 'react'
import * as THREE from 'three'
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import { vertexShader, sphereFrag } from '../textures/shaders'
import { useFrame } from '@react-three/fiber'


export const Sphere = ({texture} : {texture: THREE.Data3DTexture | THREE.DataTexture | null}) => {
    const {colormap, flipY} = useGlobalStore(useShallow(state=> ({
        colormap: state.colormap,
        flipY: state.flipY
    })))
    const {animate, cOffset, cScale, resetAnim} = usePlotStore(useShallow(state=> ({
        animate: state.animate,
        cOffset: state.cOffset,
        cScale: state.cScale,
        resetAnim: state.resetAnim
    })))
    const [animateProg, setAnimateProg] = useState<number>(0);
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 9), []);
    const shaderMaterial = useMemo(()=>{
        const shader = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            uniforms: {
                map: { value: texture },
                cmap:{value: colormap},
                cOffset:{value: cOffset},
                cScale: {value: cScale},
                animateProg: {value: animateProg}
            },
            vertexShader,
            fragmentShader: sphereFrag,
            blending: THREE.NormalBlending,
        })
        return shader
    },[texture, animateProg, colormap, cOffset, cScale, animate])

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
    <mesh geometry={geometry} material={shaderMaterial} scale={[1, flipY ? -1 : 1, 1]}/>
    
    </>
  )
}

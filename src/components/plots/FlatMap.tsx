import React, {useMemo, useEffect} from 'react'
import * as THREE from 'three'
import { useGlobalStore } from '@/utils/GlobalStates'
import { fragShader, vertShader } from '@/components/computation/shaders'
import { useShallow } from 'zustand/shallow'


const FlatMap = ({texture} : {texture : THREE.DataTexture}) => {
    const {shape, flipY, colormap} = useGlobalStore(useShallow(state => ({shape: state.shape, flipY: state.flipY, colormap: state.colormap})))
    console.log(flipY)
    const shapeRatio = useMemo(()=> shape.x/shape.z, [shape])
    const geometry = useMemo(()=>new THREE.PlaneGeometry(2,shapeRatio),[shapeRatio])
    const material = new THREE.MeshBasicMaterial({color: 'red'})
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
  return (

    <mesh material={shaderMaterial} geometry={geometry} scale={[1, flipY ? -1 : 1 , 1]}/>
  )
}

export {FlatMap}

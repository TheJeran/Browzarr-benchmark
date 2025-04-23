import {  useMemo } from 'react'
import {  useRef } from 'react'
import * as THREE from 'three'
import vertexShader from '@/components/Textures/shaders/vertex.glsl';
import fragmentShader from '@/components/Textures/shaders/fragment.glsl';
import { useControls } from 'leva';



interface DataCubeProps {
  volTexture: THREE.Data3DTexture | THREE.DataTexture | null,
  shape : THREE.Vector3,
  colormap: THREE.DataTexture
}

export const DataCube = ({ volTexture, shape, colormap }: DataCubeProps ) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { threshold, steps, flip, xMax,xMin,yMax,yMin,zMax,zMin } = useControls({
        threshold: {
          value: 0, // Default value
          min: 0,   // Minimum value
          max: 1,  // Maximum value
          step: .01,  // Step size
          label:"Clip Values"
        },
        steps: {
            value: 200,
            min: 50,
            max:1000,
            step: 25,
            label: "Quality"
        },
        flip: {
            value: false,
            label: "Invert Values"
        },
        xMax: {
          value:1,
          min:-1,
          max:1,
          step:0.01
        },
        xMin: {
          value:-1,
          min:-1,
          max:1,
          step:0.01
        }
        ,
        yMax: {
          value:1,
          min:-1,
          max:1,
          step:0.01
        },
        yMin: {
          value:-1,
          min:-1,
          max:1,
          step:0.01
        },
        zMax: {
          value:1,
          min:-1,
          max:1,
          step:0.01
        },
        zMin: {
          value:-1,
          min:-1,
          max:1,
          step:0.01
        }
      });

  // We need to check if moving this outside of useMemo means it's creating a ton of materials. This was how it was done in THREE Journey when I was doing that, so I know it's not stricly speaking wrong
    const shaderMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
          map: { value: volTexture },
          cmap:{value: colormap},
          cameraPos: { value: new THREE.Vector3() },
          threshold: {value: threshold},
          scale: {value: shape},
          flatBounds:{value: new THREE.Vector4(xMin,xMax,yMin,yMax)},
          vertBounds:{value: new THREE.Vector2(zMin,zMax)},
          steps: { value: steps },
          flip: {value: flip }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
        
  // Use geometry once, avoid recreating -- Using a sphere to avoid the weird angles you get with cube
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(4, 8), []);

  return (
    <>
    <mesh ref={meshRef} geometry={geometry}>
      <primitive attach="material" object={shaderMaterial} />
    </mesh>
    </>
  )
}
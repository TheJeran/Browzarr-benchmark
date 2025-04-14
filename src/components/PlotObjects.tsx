import {  useEffect, useMemo } from 'react'
import { useRef } from 'react'
import * as THREE from 'three'
import vertexShader from '@/utils/shaders/vertex.glsl';
import fragmentShader from '@/utils/shaders/fragment.glsl';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { GetColorMapTexture } from '@/utils/colormap';
import { useState } from 'react';
import { invalidate } from "@react-three/fiber";

const colormaps = ['viridis', 'plasma', 'inferno', 'magma', 'Accent', 'Blues',
  'CMRmap', 'twilight', 'tab10', 'gist_earth', 'cividis',
  'Spectral', 'gist_stern', 'gnuplot', 'gnuplot2', 'ocean', 'turbo',
  'GnBu', 'afmhot', 'cubehelix', 'hot', 'spring','terrain', 'winter', 'Wistia',
]

interface DataCubeProps {
  volTexture: THREE.Data3DTexture | THREE.DataTexture | null,
  shape : THREE.Vector3
}


const DataCube = ({ volTexture, shape }: DataCubeProps ) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const [colormap,setColormap] = useState<THREE.DataTexture>(GetColorMapTexture())

    const { threshold, steps, flip, cmap } = useControls({
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
        cmap: {
          value: "Spectral",
          options:colormaps,
          label: 'ColorMap'
        }
      });

  // Create the shader material only once
    const shaderMaterial = useMemo(() => {
      const material = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms: {
            map: { value: volTexture },
            cmap:{value: colormap},
            cameraPos: { value: new THREE.Vector3() },
            threshold: {value: threshold},
            scale: {value: shape},
            flatBounds:{value: new THREE.Vector4(-1,1,-1,1)},
            vertBounds:{value: new THREE.Vector2(-1,1)},
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
        materialRef.current = material
        return material
      },[])
  // Use geometry once, avoid recreating -- Using a sphere to avoid the weird angles you get with cube
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(4, 8), []);


    // Update shader material's uniforms when props change
    useEffect(() => {
      if (materialRef.current) {
        materialRef.current.uniforms.map.value = volTexture;
        materialRef.current.uniforms.threshold.value = threshold;
        materialRef.current.uniforms.steps.value = steps;
        materialRef.current.uniforms.scale.value = shape;
        materialRef.current.uniforms.flip.value = flip;
        materialRef.current.uniforms.cmap.value = colormap;
        // materialRef.current.uniforms.flatBounds.value = lo_tbounds;
        // materialRef.current.uniforms.vertBounds.value = latbounds;
        // materialRef.current.uniforms.intensity.value = intensity;
        // Trigger material update
        materialRef.current.needsUpdate = true;
        invalidate(); //The needsUpdate sets the texture to re-render next time it is called. But if the camera is stationary it won't render. invalidate forces a re-render
      }
    }, [volTexture, threshold, steps, shape, flip, colormap ]); //lo_tbounds, latbounds, intensity

    // Update camera position in the shader when moved
    useFrame(({ camera }) => {
        if (materialRef.current) {
        materialRef.current.uniforms.cameraPos.value = camera.position;
        materialRef.current.needsUpdate = true;
        }
    });
    useEffect(()=>{
      setColormap(GetColorMapTexture(colormap,cmap));
      invalidate();
    },[cmap])

  return (
    <>
    
    <mesh ref={meshRef} rotation-y={Math.PI / 2} geometry={geometry}>
      <primitive attach="material" object={shaderMaterial} />
    </mesh>
    </>
  )
}

export {DataCube}
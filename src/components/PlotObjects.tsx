import {  useMemo } from 'react'
import { useRef } from 'react'
import * as THREE from 'three'
import vertexShader from '@/utils/shaders/vertex.glsl';
import fragmentShader from '@/utils/shaders/fragDebug.glsl';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';



const DataCube = ({ volTexture }: { volTexture: THREE.Data3DTexture | THREE.DataTexture | null }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);

    const { threshold, steps, flip } = useControls({
        threshold: {
          value: 0, // Default value
          min: 0,   // Minimum value
          max: 1,  // Maximum value
          step: .01,  // Step size
        },
        steps: {
            value: 100,
            min: 40,
            max:500,
            step: 20,
            label: "Quality"
        },
        flip: {
            value: false,
            label: "Invert Values"
        }
      });
    
  // Create the shader material only once
    const shaderMaterial = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms: {
            map: { value: volTexture },
            cameraPos: { value: new THREE.Vector3() },
            threshold: {value: threshold},
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


  // Use geometry once, avoid recreating
    const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  // Update shader material's uniforms when props change

    // Update camera position in the shader on each frame
    useFrame(({ camera }) => {
        if (materialRef.current) {
        materialRef.current.uniforms.cameraPos.value = camera.position;
        materialRef.current.needsUpdate = true;
        }
    });

  return (
    <mesh ref={meshRef} rotation-y={Math.PI / 2} geometry={geometry}>
      <primitive attach="material" object={shaderMaterial} />
    </mesh>
  )
}



export {DataCube}
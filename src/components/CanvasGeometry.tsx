import * as THREE from 'three'
THREE.Cache.enabled = true;
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment } from '@react-three/drei'
// import * as zarr from 'zarrita'
import { arr, variables } from './ZarrLoaderLRU'
import { useState } from 'react';
// import { useEffect, useState } from 'react';
import { Leva, useControls } from 'leva'
import './placeholder.css'
arr.then(event=>console.log(typeof(event)))

const lightTheme = {
  colors: {
    elevation1: '#f2f2f2e6',
    elevation2: '#ffffffd9',
    elevation3: '#f7f7f7cc',
    accent1: '#cccccccc',
    accent2: '#e6e6e6cc',
    accent3: '#ccccccbf',
    highlight1: '#b3b3b3e6',
    highlight2: '#000000d9', 
    highlight3: '#000000b3', 
  },
  sizes: {
    titleBarHeight: '28px',
  },
  space: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    // rowGap: '4px',
    // colGap: '4px'
  },
}
export function CanvasGeometry() {
  const [_useVariable, setUseVariable] = useState<string | null>(null)
  const { variable } = useControls({ variable: { value: null, options: variables } })
  console.log(variable)

  return (
    <>
    <div className='canvas'>
      <Canvas shadows camera={{ position: [-4.5, 3, 4.5], fov: 50 }}
      frameloop="demand"
      >
        <Center top position={[-1, 0, 1]}>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="indianred" />
          </mesh>
        </Center>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <Environment preset="city" />
      </Canvas>
    </div>
    {/* This drop down is temp just to show the consolidating of variables */}
    <select 
      className='varDropdown' 
      onChange={(event)=>setUseVariable(event.target.value)}
      
    >
      <option value="" disabled>Select an option</option>
      {variables.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
        ))}

    </select>
    <Leva theme={lightTheme} />
    </>
  )
}

export default CanvasGeometry
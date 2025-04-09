import * as THREE from 'three'
THREE.Cache.enabled = true;
import { Canvas } from '@react-three/fiber';
// import d_store from './ZarrLoaderLRU'
// d_store.then(store => console.log(store.contents()))
import local_node from './ZarrLoaderLRU';
// console.log(local_node)

export function CanvasGeometry() {
  return (
    <div className='canvas'>
      <Canvas shadows camera={{ position: [-4.5, 3, 4.5], fov: 50 }}
      frameloop="demand"
      >
      </Canvas>
    </div>
  )
}

export default CanvasGeometry
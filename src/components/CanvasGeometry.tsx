import * as THREE from 'three'
THREE.Cache.enabled = true;
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment } from '@react-three/drei'
// import * as zarr from 'zarrita'
import { variables, GetArray } from '@/components/ZarrLoaderLRU'
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';
import { Leva, useControls } from 'leva'
import { lightTheme } from '@/utils/levaTheme'
import { ArrayToTexture, DefaultCube } from './TextureMakers';
import { DataCube, PointCloud } from './PlotObjects';

console.log(DataCube)

const storeURL = "https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr"

export function CanvasGeometry() {
  const { variable } = useControls({ variable: { value: "Default", options: variables, label:"Select Variable" } })
  const [texture, setTexture] = useState<THREE.DataTexture | THREE.Data3DTexture | null>(null)
  const [_shape, setShape] = useState<THREE.Vector2 | THREE.Vector3>(new THREE.Vector3(2, 2, 2))

  useEffect(() => {
    if (variable != "Default") {
      //Need to add a check somewhere here to swap to 2D or 3D based on shape. Probably export two variables from GetArray
      GetArray(storeURL, variable).then((result) => {
        // result now contains: { data: TypedArray, shape: number[], dtype: string }
        const [texture, _shape] = ArrayToTexture({
          data: result.data,
          shape: result.shape
        })
        if (texture instanceof THREE.DataTexture || texture instanceof THREE.Data3DTexture) {
          setTexture(texture)
        } else {
          console.error("Invalid texture type returned from ArrayToTexture");
          setTexture(null);
        }
        const shapeRatio = result.shape[1] / result.shape[2] * 2;
        setShape(new THREE.Vector3(2, shapeRatio, 2))
      })
    }
      else{
        const texture = DefaultCube();
        setTexture(texture)
        setShape(new THREE.Vector3(2, 2, 2))
      }
  }, [variable])

  return (
    <>
    <div className='canvas'>
      <Canvas shadows camera={{ position: [4.5, 2, 4.5], fov: 50 }}
      frameloop="demand"
      >
        {/* <DataCube volTexture={texture} shape={shape}/> */}
        <PointCloud texture={texture} />
        <Center top position={[-1, 0, 1]}>
          {/* <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="indianred" />
          </mesh> */}
        </Center>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} enablePan={false}/>
      <Environment preset="city" />
      </Canvas>
    </div>
    {/* This drop down is temp just to show the consolidating of variables */}
    
    <Leva theme={lightTheme} />
    </>
  )
}

export default CanvasGeometry
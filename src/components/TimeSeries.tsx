import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment } from '@react-three/drei'
import { useMemo } from 'react';




export function TimeSeries({coords} : ){
    //This function will take in some coords, get the timeseries from zarr loader and create a new THREE scene with a static camera. Need to create a graph basically
    
    const timeseries = useMemo(()=>{
        return null
    },[coords])

    const lineObj = useMemo(()=>{
        //Need to convert whatever timeseries is into vectors. Depends on the camera and scene zoom. 
        //Currently this creates a new one each time coords changes. Will need to fix later
        const points = timeseries;
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));

        const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); 
        const obj = new THREE.Line(geometry,material);
        return obj;
    },[coords])


    return(
        <>
        <Canvas>
            <primitive object={lineObj}>
        </Canvas>
        </>
    )
}
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import { useMemo } from 'react';

interface TimeSeriesProps {
    coords?: [number, number, number]; // [x, y, z] coordinates
    data?: number[]; // Optional time series data
}

export function TimeSeries({ data = [] }: TimeSeriesProps) {
    //This function will take in some coords, get the timeseries from zarr loader and create a new THREE scene with a static camera. Need to create a graph basically
    // ? just fixed interface, `coords` should be still be passed in.
    const timeseries = useMemo(() => {
        if (!data.length) return null;
        
        // Convert data to normalized values between -1 and 1
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data);
        return data.map((val, index) => {
            const normalizedY = ((val - minVal) / (maxVal - minVal)) * 2 - 1;
            const normalizedX = (index / data.length) * 2 - 1;
            return [normalizedX, normalizedY, 0];
        }).flat();
    }, [data]);

    const lineObj = useMemo(() => {
        //Need to convert whatever timeseries is into vectors. Depends on the camera and scene zoom. 
        //Currently this creates a new one each time coords changes. Will need to fix later
        if (!timeseries) return null;

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(timeseries, 3));

        const material = new THREE.LineBasicMaterial({ 
            color: 0x00ff00,
            linewidth: 2
        });
        
        return new THREE.Line(geometry, material);
    }, [timeseries]);

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: '#f0f0f0' }}
            >
                {lineObj && <primitive object={lineObj} />}
                <OrbitControls enableRotate={false} enableZoom={true} />
                <gridHelper args={[2, 10]} rotation={[Math.PI / 2, 0, 0]} />
                <axesHelper args={[1]} />
            </Canvas>
        </div>
    );
}
"use client";
import React, {useEffect, useState} from 'react'
import { Line } from '@react-three/drei';
import { usePlotStore } from '@/utils/GlobalStates';
import * as THREE from 'three'
import { useShallow } from 'zustand/shallow';
import { useFrame } from '@react-three/fiber';

function Reproject([lon, lat] : [number, number]){
    return [lon/180, lat/180]
}

function Borders({features}:{features: any}){
    const {xRange, yRange} = usePlotStore(useShallow(state => ({
        xRange: state.xRange,
        yRange: state.yRange
    })))

    
    return (
    <>
    {features.map((feature: any, i)=> {
        const points: THREE.Vector3[] = [];
        if (feature.geometry.type === 'LineString'){
            const linePoints = feature.geometry.coordinates;
            linePoints.forEach(([lon, lat]: [number, number]) => {
              const [x, y] = Reproject([lon, lat]);
              points.push(new THREE.Vector3(x, y, 0)); // z=0 for flat map
            });

        }
        else if (feature.geometry.type === 'MultiPolygon'){
            const islands = feature.geometry.coordinates
            //Maybe come back to this
            return null;
        }
        else{
            const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
            polygons.forEach(polygon=> {
            polygon.forEach(ring => {
                ring.forEach(([lon, lat]) => {
                const [x, y] = Reproject([lon, lat]);
                points.push(new THREE.Vector3(x, y, 0)); // z=0 for flat map
                });
            });
            });
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        return (
           <Line key={i} points={points} color="black" lineWidth={1} />
        )
    })
    }
    </>
  )
}
const CountryBorders = () => {
    const [coastLines, setCoastLines] = useState<any>(null)
    const [borders, setBorders] = useState<any>(null)
    const [swapSides, setSwapSides] = useState<boolean>(false)

    const {zRange} = usePlotStore(useShallow(state => ({
        zRange: state.zRange,

    })))

    useFrame(({camera})=>{
        if (Math.abs(camera.rotation.z) > Math.PI/2){
            setSwapSides(true)
        }
        else{
            if (swapSides){setSwapSides(false)}
        }
    })

    useEffect(()=>{
        fetch('./ne_110m_coastline.json')
        .then(res => res.json())
        .then(data => setCoastLines(data.features));

        fetch('./ne_110m_admin_0_countries.json')
        .then(res => res.json())
        .then(data => setBorders(data.features));
    },[])

    return(
        <>
        <group position={[0, 0, swapSides ? zRange[0] : zRange[1]]}>
        {coastLines && <Borders features={coastLines} />}
        {borders && <Borders features={borders} />}
        </group>

        </>
    )
}

export {CountryBorders}

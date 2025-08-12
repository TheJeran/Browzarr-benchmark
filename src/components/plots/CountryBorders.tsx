"use client";
import React, {useEffect, useState, useMemo} from 'react'
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates';
import * as THREE from 'three'
import { useShallow } from 'zustand/shallow';
import { useFrame } from '@react-three/fiber';
import {vertexShader, bordersFrag} from '../textures/shaders'

function Reproject([lon, lat] : [number, number]){
    return [lon/180, lat/180, 0]
}

function Spherize([lon, lat] : [number, number]){
    const radLat = lat*Math.PI/180;
    const radLon = lon*Math.PI/180;
    const radius = 1.001;
    const x = Math.cos(radLat) * Math.cos(radLon);
    const y = Math.sin(radLat);
    const z = Math.cos(radLat) * Math.sin(radLon);
    return [x * radius, y * radius, z * radius]
}

function Borders({features}:{features: any}){
    const {xRange, yRange, plotType, borderColor} = usePlotStore(useShallow(state => ({
        xRange: state.xRange,
        yRange: state.yRange,
        plotType: state.plotType,
        borderColor: state.borderColor
    })))

    const {flipY, shape } = useGlobalStore(useShallow(state => ({
        flipY: state.flipY,
        shape: state.shape
    })))
    const [spherize, setSpherize] = useState<boolean>(false)


    useEffect(()=>{
        if (plotType === 'sphere'){
            setSpherize(true)
        }
        else{
            setSpherize(false)
        }

    },[plotType])

    const lineShaderMat = useMemo(()=>new THREE.ShaderMaterial(
        {
            glslVersion: THREE.GLSL3,
            vertexShader,
            fragmentShader: bordersFrag,
            uniforms:{
                xBounds: {value: new THREE.Vector2(xRange[0], xRange[1])},
                yBounds: {value: new THREE.Vector2(yRange[0]/shape.x, yRange[1]/shape.x)},
                borderColor: {value: new THREE.Color(borderColor)},
                trim: {value: !spherize},
            }
        }
    ),[xRange, yRange, borderColor, spherize])


    const lineGeometries = useMemo(() => {
    return features.flatMap((feature: any, i: number) => {
        const lines = [];

        if (feature.geometry.type === 'LineString') {
        const points: THREE.Vector3[] = [];
        feature.geometry.coordinates.forEach(([lon, lat]: [number, number]) => {
            const [x, y, z] = spherize
            ? Spherize([ -lon, lat])
            : Reproject([lon, lat]);
            points.push(new THREE.Vector3(x, y, z));
        });
        const positions = new Float32Array(points.length * 3);
        points.forEach((point, i) => {
            positions.set([point.x, point.y, point.z], i * 3);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        lines.push(
            geometry
        );
        }

        else if (feature.geometry.type === 'MultiPolygon') {
        const islands = feature.geometry.coordinates;
        islands.forEach((island: number[][][], idx: number) => {
            let thisIdx = idx;
            const ring = island[0]; // outer ring
            const islandPoints: THREE.Vector3[] = [];
            ring.forEach(([lon, lat]) => {
                thisIdx ++;
            const [x, y, z] = spherize
                ? Spherize([ -lon, lat])
                : Reproject([lon, lat]);
                islandPoints.push(new THREE.Vector3(x, y, z));
            });
            const positions = new Float32Array(islandPoints.length * 3);
            islandPoints.forEach((point, i) => {
                positions.set([point.x, point.y, point.z], i * 3);
            });
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            lines.push(
                geometry
            );
        });
        }
        else {
        const polygons =
            feature.geometry.type === 'Polygon'
            ? [feature.geometry.coordinates]
            : feature.geometry.coordinates;

        polygons.forEach((polygon: number[][][]) => {
            const points: THREE.Vector3[] = [];
            polygon.forEach((ring: number[][]) => {
            ring.forEach(([lon, lat]) => {
                const [x, y, z] = spherize
                ? Spherize([ -lon, lat])
                : Reproject([lon, lat]);
                points.push(new THREE.Vector3(x, y, z));
            });
            });
            const positions = new Float32Array(points.length * 3);
            points.forEach((point, i) => {
                positions.set([point.x, point.y, point.z], i * 3);
            });
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            lines.push(
                geometry
            );
        });
        }
        return lines;
    });
    }, [features, spherize, flipY]);

    const lines = useMemo(() => {
        return lineGeometries.map((geom: THREE.BufferGeometry, idx: number) => {
            const line = new THREE.Line(geom, lineShaderMat);
            return <primitive key={`border-${idx}`} object={line} />;
        });
    }, [lineGeometries, lineShaderMat]);

    return (
    <>
    {lines}
    </>
  )
}
const CountryBorders = () => {
    const [coastLines, setCoastLines] = useState<any>(null)
    const [borders, setBorders] = useState<any>(null)
    const [swapSides, setSwapSides] = useState<boolean>(false)

    const {zRange, plotType, showBorders} = usePlotStore(useShallow(state => ({
        zRange: state.zRange,
        plotType: state.plotType,
        showBorders: state.showBorders

    })))

    const [spherize, setSpherize] = useState<boolean>(false)

    useEffect(()=>{
        if (plotType === 'sphere'){
            setSpherize(true)
        }
        else{
            setSpherize(false)
        }

    },[plotType])

    useFrame(({camera})=>{
        if (spherize){return;}
        if (Math.abs(camera.rotation.z) > Math.PI/2 ){
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
        <group visible={showBorders} position={spherize ? [0,0,0] : [0, 0, swapSides ? zRange[0] : zRange[1]]}>
        {coastLines && <Borders features={coastLines} />}
        {borders && <Borders features={borders} />}
        </group>
    )
}

export {CountryBorders}

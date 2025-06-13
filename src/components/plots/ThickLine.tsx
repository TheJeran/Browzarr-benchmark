"use client";

import React, {useMemo} from 'react'
import * as THREE from 'three'
import { usePlotStore, useGlobalStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import vertexShader from '@/components/textures/shaders/LineVert copy.glsl'
import { PlotPoints } from './PlotPoints';
import { useThree } from '@react-three/fiber';

function linspace(start: number, stop: number, num: number): number[] {
    const step = (stop - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + step * i);
  }

interface pointSetters{
  setPointID:React.Dispatch<React.SetStateAction<number>>,
  setPointLoc:React.Dispatch<React.SetStateAction<number[]>>,
  setShowPointInfo:React.Dispatch<React.SetStateAction<boolean>>,
}

interface ThickLineProps {
	height: number;
	yScale: number,
  xScale: number,
	pointSetters: pointSetters
}

const ThickLine = ({height, xScale, yScale, pointSetters} : ThickLineProps) => {
    const {valueScales, timeSeries, colormap} = useGlobalStore(useShallow(state=>({valueScales:state.valueScales, timeSeries:state.timeSeries, colormap:state.colormap})))
    const {lineWidth, useLineColor, lineColor, showPoints, lineResolution} = usePlotStore(useShallow(state =>({
    lineWidth: state.lineWidth,
    linePointSize: state.linePointSize,
    showPoints: state.showPoints,
    useLineColor: state.useLineColor,
    lineColor: state.lineColor,
		lineResolution: state.lineResolution
  })))
	const {camera} = useThree()
	const colorItem = useMemo(()=>new THREE.Color(lineColor),[lineColor])
  const {maxVal, minVal} = valueScales
	const material = new THREE.ShaderMaterial({
                glslVersion: THREE.GLSL3,
                uniforms: {
                    cmap:{value: colormap},
                    width: { value: lineWidth},
                    aspect: {value : window.innerWidth / window.innerHeight},
                    thickness:{value:lineWidth},
                    miter: {value: 1},
										useLineColor: {value: useLineColor},
										lineColor: {value: colorItem},
										zoom: {value: camera.zoom}
                },
                vertexShader,
                fragmentShader:`
                out vec4 Color;
                uniform sampler2D cmap;
								uniform bool useLineColor;
        				uniform vec3 lineColor;
                varying float vNormed;

                void main() {
                    vec4 texColor = texture(cmap, vec2(vNormed, 0.1));
                    texColor.a = 1.;
                    Color = useLineColor ? vec4(lineColor, 1.0) : texColor;
                }
                `,
                depthWrite: false,
                });

	const normed = useMemo(()=>timeSeries.map((i) => (i - minVal) / (maxVal - minVal)),[timeSeries])
	const points = useMemo(()=>{
		const viewWidth = window.innerWidth;
		const viewHeight = window.innerHeight - height
		const size = timeSeries.length;
		const xCoords = linspace(-viewWidth*xScale/2,viewWidth*xScale/2,size)
		const points = normed.map((val,idx) => new THREE.Vector3(xCoords[idx], (val-.5)*viewHeight*yScale, 5)); 
		return points
	},[timeSeries, xScale, yScale, height])

	const linePoints = useMemo(()=>{
		const curve = new THREE.CatmullRomCurve3(points);
		return curve.getPoints(points.length*lineResolution-1)
	},[points, lineResolution])

  const geometry = useMemo(() => {			
        if (linePoints.length < 2) return new THREE.BufferGeometry(); // Need at least 2 points
        // Step 2: Duplicate vertices and compute attributes
        const numPoints = linePoints.length;
        const positions = [];
        const directions = [];
        const previous = [];
        const next = [];
        const normValues = []
        const indices = [];

        for (let i = 0; i < numPoints; i++) {
            const point = linePoints[i];
            const prevPoint = linePoints[Math.max(0, i - 1)];
            const nextPoint = linePoints[Math.min(numPoints - 1, i + 1)];
            // Duplicate vertices
            positions.push(...point, ...point); // [x, y, z, x, y, z]
            directions.push(1.0, -1.0);
            previous.push(...prevPoint, ...prevPoint);
            next.push(...nextPoint, ...nextPoint);
            normValues.push(...Array(lineResolution).fill(normed[i]),...Array(lineResolution).fill(normed[i]))
        }


        // Step 3: Create triangle indices
        for (let i = 0; i < numPoints - 1; i++) {
            const i0 = i * 2;     // First vertex of current point (+1)
            const i1 = i0 + 1;    // Second vertex of current point (-1)
            const i2 = i0 + 2;    // First vertex of next point (+1)
            const i3 = i0 + 3;    // Second vertex of next point (-1)
            indices.push(i0, i1, i2); // First triangle
            indices.push(i1, i3, i2); // Second triangle
        }

        // Step 4: Create geometry
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('direction', new THREE.Float32BufferAttribute(directions, 1));
        geometry.setAttribute('previous', new THREE.Float32BufferAttribute(previous, 3));
        geometry.setAttribute('next', new THREE.Float32BufferAttribute(next, 3));
        geometry.setAttribute('normed', new THREE.Float32BufferAttribute(normValues, 1));
        geometry.setIndex(new THREE.Uint16BufferAttribute(indices, 1));
        return geometry
    },[linePoints])

  return (
    <>
		<group>
			{geometry && <mesh geometry={geometry} material={material} />}
			{showPoints && <PlotPoints points={points} pointSetters={pointSetters} />}
		</group>
		</>
  )
}

export {ThickLine}

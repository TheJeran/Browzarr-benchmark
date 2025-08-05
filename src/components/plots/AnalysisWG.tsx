"use client";
import { ArrayMinMax } from '@/utils/HelperFuncs';

import React, { useEffect, useState, useRef } from 'react'
import { DataReduction } from '../computation/webGPU'
import { useGlobalStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';

const AnalysisWG = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const {dataArray, strides, dataShape} = useGlobalStore(useShallow(state=>({
        dataArray : state.dataArray,
        strides: state.strides,
        dataShape: state.dataShape
    })))
    const [compute, setCompute] = useState<boolean>(false)
    const [output, setOutput] = useState<number[]>([0,0,0])
    let reduceDim = 2
    const thisShape = dataShape.filter((e, idx ) => idx != reduceDim)
    // DataReduction(dataArray, {strides, shape:dataShape}, 0)
    useEffect(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Match drawing scale to CSS size
        
        DataReduction(dataArray as ArrayBufferView, {strides, shape:dataShape}, reduceDim).then(e=>{
            const [minVal, maxVal] = ArrayMinMax(e as Float32Array)
            const normed = e.map(e => (e-minVal)/(maxVal-minVal))
            const imgArrayFloat = normed?.map(e=> e*255)
            const imgArray = new Uint8Array(imgArrayFloat)
            const imgDataArray = new Uint8ClampedArray(imgArray.length * 4);
            for (let i = 0; i < imgArray.length; i++) {
                const idx = i * 4;
                imgDataArray[idx] = imgArray[i];     // R
                imgDataArray[idx + 1] = imgArray[i]; // G
                imgDataArray[idx + 2] = imgArray[i]; // B
                imgDataArray[idx + 3] = 255;  // A
            }
            const imgData = reduceDim != 2 ? new ImageData(imgDataArray, thisShape[1], thisShape[0]) : new ImageData(imgDataArray, thisShape[0], thisShape[1])
            console.log(imgData)
            ctx.putImageData(imgData, 0, 0);
        })
        

    },[compute])

  return (
    <div>
      <button 
        style={{
            position:'fixed',
            left:'40%',
            top:'40%',
            background:'grey',
            width:'100px',
            height:'60px',
            zIndex:5
        }}
        onClick={e=>setCompute(x=> !x)}
        >Check WebGPU</button>
        <canvas 
        style={{
            position: 'fixed',
            width: '2000px',
            height:'auto',
            top:'100px',
            left:'50px'
        }}

            width={reduceDim != 2 ? thisShape[1] : thisShape[0]} height={reduceDim != 2 ? thisShape[0] : thisShape[1]}
            ref={canvasRef} 
            ></canvas>
    </div>
  )
}

export default AnalysisWG


"use client";

import React, {useRef, useEffect, useMemo} from 'react'
import { useGlobalStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import './css/Colorbar.css'
import { linspace } from '@/utils/HelperFuncs';


const Colorbar = ({units, valueScales} : {units: string, valueScales: {maxVal: number, minVal:number}}) => {
    const {colormap} = useGlobalStore(useShallow(state => ({
        colormap: state.colormap,
        valueScales: state.valueScales,
    })))
const colors = useMemo(()=>{
    const colors = []
    const data = colormap.source.data.data
    for (let i = 0; i < data.length/4; i++){
        const newIdx = i*4
        const rgba = `rgba(${data[newIdx]}, ${data[newIdx+1]}, ${data[newIdx+2]}, ${data[newIdx+3]} )`
        colors.push(rgba)
    }
    return colors
},[colormap])

const [locs, vals] = useMemo(()=>{
    const locs = linspace(0, 100, 5)
    const vals = linspace(valueScales.minVal, valueScales.maxVal, 5)
    return [locs, vals]
},[valueScales])
const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
        if (ctx){
            colors.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(index*2, 0, 2, 30); // Each color is 1px wide and 50px tall
            });
        }     
    }
  }, [colors]);
  return (
    <>
    <div className='colorbar' >
        {Array.from({length: 5}).map((_val,idx)=>(
            <p
            key={idx}
            style={{
                left: `${locs[idx]}%`,
                top:'100%',
                position:'absolute',
                transform:'translateX(-50%)'
            }}
        >{vals[idx].toFixed(2)}
        </p>
        ))}
        <canvas  ref={canvasRef} width={512} height={30} />
    <p style={{
        position:'absolute',
        top:'-25px',
        left:'50%',
        transform:'translateX(-50%)'
    }}>
        {units}
    </p>
    </div>

    </>
    
  )
}

export default Colorbar
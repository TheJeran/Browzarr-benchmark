
"use client";

import { RxReset } from "react-icons/rx";
import React, {useRef, useEffect, useMemo} from 'react'
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import './css/Colorbar.css'
import { linspace } from '@/utils/HelperFuncs';

function RescaleLoc(val : number, offset : number, scale : number){
    const rescale = (val-50)*scale+50;
    return Math.max(Math.min(rescale+offset, 100),0);
}

const Colorbar = ({units, valueScales} : {units: string, valueScales: {maxVal: number, minVal:number}}) => {
    const {colormap} = useGlobalStore(useShallow(state => ({
        colormap: state.colormap,
    })))

    const {cScale, cOffset, setCScale, setCOffset} = usePlotStore(useShallow(state => ({ 
        cScale: state.cScale,
        cOffset: state.cOffset,
        setCScale: state.setCScale,
        setCOffset: state.setCOffset
    })))

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scaling = useRef<boolean>(false)
    const prevPos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
    const range = useMemo(()=>valueScales.maxVal - valueScales.minVal,[valueScales])

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

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
        if (!scaling.current) return;
        // Your scaling logic here
        if (prevPos.current.x === null || prevPos.current.y === null){
            prevPos.current.x = e.clientX;
            prevPos.current.y = e.clientY;
        }
        const deltaX = prevPos.current.x - e.clientX;
        const deltaY = prevPos.current.y - e.clientY;
        setCOffset(cOffset - deltaX  / 100)
        setCScale(cScale + deltaY/100)
        // setValueScales({minVal: newMin, maxVal: newMax})

    };

    // Mouse up handler
    const handleMouseUp = () => {
        scaling.current = false;
        prevPos.current = {x: null, y: null}
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    // Mouse down handler
    const handleMouseDown = () => {
        scaling.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // Clean up in case component unmounts mid-drag
    useEffect(() => {
        return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

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
                left: `${RescaleLoc(locs[idx], cOffset*100, cScale)}%`,
                top:'100%',
                position:'absolute',
                transform:'translateX(-50%)',
            }}
        >{vals[idx].toFixed(2)}
        </p>
        ))}
        <canvas  ref={canvasRef} width={512} height={30} onMouseDown={handleMouseDown}/>
    <p style={{
        position:'absolute',
        top:'-25px',
        left:'50%',
        transform:'translateX(-50%)'
    }}>
        {units}
    </p>
    {(cScale != 1 || cOffset != 0) && <RxReset size={25} style={{position:'absolute', top:'-25px', cursor:'pointer'}} onClick={()=>{setCScale(1); setCOffset(0)}}/>}
    </div>

    </>
    
  )
}

export default Colorbar
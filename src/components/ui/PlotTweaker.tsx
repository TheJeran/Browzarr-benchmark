"use client";

import React, { useEffect, useState } from 'react'
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Slider  from 'rc-slider';
import { useShallow } from 'zustand/shallow';
import 'rc-slider/assets/index.css';
import { ArrayMinMax } from '@/utils/HelperFuncs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DeNorm(val : number, min : number, max : number){
    const range = max-min;
    return Math.round((val*range+min)*100)/100;
}


const MinMaxSlider = ({range, setRange, valueScales, min=-1} : 
    {
        range : number[], 
        setRange : (value: number[]) => void, 
        valueScales : {minVal : number, maxVal  : number},
        min?: number
    }) => {
        let {minVal, maxVal} = valueScales;
        minVal = Number(minVal)
        maxVal = Number(maxVal)
    return(
        <div className='w-full flex justify-between flex-col'>
            <Slider
                range
                min={min}
                max={1}
                defaultValue={range}
                step={0.01}
                onChange={(values) => setRange(values as number[])}
            />
        {/* Min/Max labels */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 18 }}>
                {/* <span>Min: {DeNorm(range[0], minVal, maxVal)}</span>
                <span>Max: {DeNorm(range[1], minVal, maxVal)}</span> */}
                <span>Min: {range[0]}</span>
                <span>Max: {range[1]}</span>
            </div>
        </div>

    )
}

const VolumeTweaks = () => {
    const {valueRange, xRange, yRange, zRange, setValueRange, setXRange, setYRange, setZRange, setQuality} = usePlotStore(useShallow(state => ({
        valueRange: state.valueRange,
        xRange: state.xRange,
        yRange: state.yRange,
        zRange: state.zRange,
        setValueRange: state.setValueRange,
        setXRange: state.setXRange,
        setYRange: state.setYRange,
        setZRange: state.setZRange,
        setQuality: state.setQuality
    })))
    const [xScales, setXScales] = useState<{minVal: number, maxVal: number}>({minVal: 0, maxVal: 0})
    const [yScales, setYScales] = useState<{minVal: number, maxVal: number}>({minVal: 0, maxVal: 0})
    const [zScales, setZScales] = useState<{minVal: number, maxVal: number}>({minVal: 0, maxVal: 0})

    const {valueScales, dimArrays} = useGlobalStore(useShallow(state => ({valueScales : state.valueScales, dimArrays : state.dimArrays})))

    useEffect(()=>{
        if (dimArrays){
            const [xMin, xMax] = ArrayMinMax(dimArrays[2]);
            const [yMin, yMax] = ArrayMinMax(dimArrays[1]); 
            const [zMin, zMax] = ArrayMinMax(dimArrays[0]);
            setXScales({minVal: xMin, maxVal: xMax});
            setYScales({minVal: yMin, maxVal: yMax});
            setZScales({minVal: zMin, maxVal: zMax});
        }
        
    },[dimArrays])


    return(
        <div className="nav-dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Adjust Volume</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Plot Quality</DropdownMenuLabel>
                <DropdownMenuItem onSelect={e=> e.preventDefault()} >
                <div className='w-full flex justify-between'>
                    Worse
                    <input type="range"
                        min={50}
                        max={1000}
                        step={50}
                        defaultValue={200} 
                    onChange={e => setQuality(parseInt(e.target.value))}
                    />
                    Better
                </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Value Cropping</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={e=> e.preventDefault()}>
                        <MinMaxSlider range={valueRange} setRange={setValueRange} valueScales={valueScales} min={0}/>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup onSelect={e=> e.preventDefault()}>
                    <DropdownMenuLabel>Spatial Cropping</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={e=> e.preventDefault()}>
                            <MinMaxSlider range={xRange} setRange={setXRange} valueScales={xScales}/>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={e=> e.preventDefault()}>
                            <MinMaxSlider range={yRange} setRange={setYRange} valueScales={yScales}/>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={e=> e.preventDefault()}>
                            <MinMaxSlider range={zRange} setRange={setZRange} valueScales={zScales}/>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    )
}


const PointTweaks = () => {
    const {setPointSize, setScaleIntensity, setScalePoints} = usePlotStore(useShallow(
        (state => ({setPointSize: state.setPointSize, setScaleIntensity: state.setScaleIntensity, setScalePoints: state.setScalePoints}))))

    const {scalePoints, scaleIntensity, pointSize} = usePlotStore(useShallow(state => ({
      scalePoints: state.scalePoints,
      scaleIntensity: state.scaleIntensity,
      pointSize: state.pointSize
    })))

    return(
        <div className="nav-dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Adjust Points</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={e=> e.preventDefault()}>
                    <div className='w-full flex justify-between flex-col items-center'>
                    <b>Point Size</b>
                    <input type="range"
                        className='w-full'
                        min={1}
                        max={50}
                        step={1}
                        defaultValue={pointSize} 
                    onChange={e => setPointSize(parseInt(e.target.value))}
                    />
                </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={e=> e.preventDefault()}>
                    <Button variant="destructive" className="w-[100%] h-[20px] cursor-[pointer]" onClick={() => setScalePoints(!scalePoints)}>{scalePoints ? "Remove Scaling" : "Scale By Value" }</Button>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={e=> e.preventDefault()}>
                    <div className='w-full flex justify-between flex-col items-center'>
                    <b>Scale Intensity</b>
                    <input type="range"
                        className='w-full'
                        min={1}
                        max={100}
                        step={1}
                        defaultValue={scaleIntensity} 
                    onChange={e => setScaleIntensity(parseInt(e.target.value))}
                    />
                </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    )
}

const PlotTweaker = () => {
    const plotType = usePlotStore(state => state.plotType)
  return (
    <>
    {plotType === "volume" && <VolumeTweaks/>}
    {plotType === "point-cloud" && <PointTweaks/>}
    </>
  )
}

export default PlotTweaker

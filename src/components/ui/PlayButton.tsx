"use client";
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import React, {useEffect, useMemo, useState, useRef} from 'react'
import { useShallow } from 'zustand/shallow'
import './css/MainPanel.css'
import { PiPlayPauseFill } from "react-icons/pi";
import { FaPlay, FaPause } from "react-icons/fa6";
import { parseLoc } from '@/utils/HelperFuncs';

const PlayInterFace = () =>{
    
    const {animate, animProg, setAnimate, setResetAnim, setAnimProg} = usePlotStore(useShallow(state => ({
        animate: state.animate,
        animProg: state.animProg,
        setAnimate: state.setAnimate,
        setResetAnim: state.setResetAnim,
        setAnimProg: state.setAnimProg
    })))

    const {dimArrays, dimNames, dimUnits} = useGlobalStore(useShallow(state => ({
        dimArrays: state.dimArrays,
        dimNames: state.dimNames,
        dimUnits: state.dimUnits 
    })))

    const timeLength = useMemo(()=>dimArrays[0].length,[dimArrays])
    
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const previousVal = useRef<number>(0)
    const [animSpeed, setAnimSpeed] = useState<number>(5)
    const previousSpeed = useRef<number>(5)

    useEffect(() => {
        if (animate) {
            if (previousSpeed.current != animSpeed && intervalRef.current){
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        previousSpeed.current = animSpeed
        const dt = animSpeed*100/timeLength;
        previousVal.current = Math.round(animProg*timeLength)
        intervalRef.current = setInterval(() => {
            previousVal.current += 1;
            setAnimProg(((previousVal.current + 1) % timeLength)/timeLength);
        }, dt);
        } else {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        }
        
    }, [animate, animSpeed]);


    return (

        <div className='play-interface'>
            {parseLoc(dimArrays[0][Math.min(Math.round(animProg*timeLength),timeLength-1)], dimUnits[0])}
            <div>
                {parseLoc(dimArrays[0][0], dimUnits[0])}
                <input type="range" 
                    className='w-[300px]'
                    value={animProg*timeLength}
                    min={0}
                    max={timeLength}
                    step={1}
                    onChange={e=>setAnimProg(parseInt(e.target.value)/timeLength)}
                />
                {parseLoc(dimArrays[0][timeLength-1], dimUnits[0])}
            </div>
            <div className='flex items-center justify-between w-100'>
                <div className='cursor-pointer hover:scale-[115%]' onClick={e=>setAnimSpeed(x=>x*1.25)}> <b>Slower</b></div>
            {animate ? <FaPause className='cursor-pointer hover:scale-[115%]' onClick={e=>setAnimate(false)}/> : <FaPlay className='cursor-pointer hover:scale-[115%]' onClick={e=>setAnimate(true)}/>}
                <div className='cursor-pointer hover:scale-[115%]' onClick={e=>setAnimSpeed(x=>x*0.8)}><b>Faster</b></div>
            </div>
            
            
        </div>

    )
}

const PlayButton = () => {
    const {isFlat, plotOn} = useGlobalStore(useShallow(state => ({
        isFlat: state.isFlat,
        plotOn: state.plotOn
    })))
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const cond = useMemo(()=>!isFlat && plotOn, [isFlat,plotOn])
  return (
    <div>
      <PiPlayPauseFill className='panel-item' 
        onClick={e=>{if (cond){setShowOptions(x=>!x)}}}
    />
      {showOptions && <PlayInterFace />}
    </div>
  )
}

export default PlayButton

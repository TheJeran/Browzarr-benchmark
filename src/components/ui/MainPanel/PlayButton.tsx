"use client";
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import React, {useEffect, useMemo, useState, useRef} from 'react'
import { useShallow } from 'zustand/shallow'
import '../css/MainPanel.css'
import { PiPlayPauseFill } from "react-icons/pi";
import { FaPlay, FaPause } from "react-icons/fa6";
import { parseLoc } from '@/utils/HelperFuncs';


const frameRates = [1, 2, 4, 6, 8, 12, 16, 24, 36, 48, 54, 60, 80, 120]

const PlayInterFace = ({visible}:{visible : boolean}) =>{
    
    const {animate, animProg, setAnimate, setAnimProg} = usePlotStore(useShallow(state => ({
        animate: state.animate,
        animProg: state.animProg,
        setAnimate: state.setAnimate,
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
    const [fps, setFPS] = useState<number>(5)
    const previousFPS = useRef<number>(5)


    useEffect(() => {
        if (animate) {
            if (previousFPS.current != fps && intervalRef.current){
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        previousFPS.current = fps
        const dt = 1000/frameRates[fps];
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
        return ()=>{
             if (intervalRef.current){
                clearInterval(intervalRef.current);
             }
        }
        
    }, [animate, fps]);

    return (
        <div style={{display: visible ? '' : 'none'}}>
            <div className='play-interface'>
                {parseLoc(dimArrays[0][Math.min(Math.round(animProg*timeLength),timeLength-1)], dimUnits[0], true)}
                <div>
                    {parseLoc(dimArrays[0][0], dimUnits[0], true)}
                    <input type="range" 
                        className='w-[300px]'
                        value={animProg*timeLength}
                        min={0}
                        max={timeLength}
                        step={1}
                        onChange={e=>setAnimProg(parseInt(e.target.value)/timeLength)}
                    />
                    {parseLoc(dimArrays[0][timeLength-1], dimUnits[0], true)}
                </div>
                <div className='flex items-center justify-between w-100'>
                    <div 
                        style={{visibility: fps > 0 ? 'visible' : 'hidden'}}
                        className='cursor-pointer hover:scale-[115%]' 
                        onClick={e=>setFPS(x=>Math.max(0, x-1))}> <b>Slower</b></div>
                {animate ? <FaPause className='cursor-pointer hover:scale-[115%]' onClick={e=>setAnimate(false)}/> : <FaPlay className='cursor-pointer hover:scale-[115%]' onClick={e=>setAnimate(true)}/>}
                     <div className='cursor-pointer hover:scale-[115%]' 
                        style={{visibility: fps < frameRates.length-1 ? 'visible' : 'hidden'}}
                        onClick={e=>setFPS(x=>Math.min(frameRates.length-1, x+1))}><b>Faster</b></div>
                </div>
                <div style={{textAlign:'right'}}>
                    <b>{frameRates[fps]}</b> FPS
                </div>
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
    const enableCond = (!isFlat && plotOn)
  return (
    <div>
      <PiPlayPauseFill className='panel-item' 
        color={enableCond ? '' : 'var(--text-disabled)'}
        onClick={e=>{if (cond){setShowOptions(x=>!x)}}}
        style={{transform: enableCond ? '' : 'scale(1)',  cursor: enableCond ? 'pointer' : 'auto'}}
    />
      <PlayInterFace visible={showOptions}/>
    </div>
  )
}

export default PlayButton

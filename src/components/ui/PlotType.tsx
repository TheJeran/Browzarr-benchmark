"use client";

import React, { useEffect, useState } from 'react'
import './css/MainPanel.css'
import { usePlotStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { PiSphereThin } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { PiCubeLight } from "react-icons/pi";
import { MdOutlineSquare } from "react-icons/md";

import Image from 'next/image';

const plotTypes = ['volume', 'point-cloud', 'sphere', 'flat']
const plotIcons = {
  'volume': <PiCubeLight size={50} style={{color:'var(--foreground)'}}/>,
  'point-cloud': <CgMenuGridO size={50} style={{color:'var(--foreground)'}}/>,
  'sphere':<PiSphereThin size={50} style={{color:'var(--foreground)'}}/>,
  'flat':<MdOutlineSquare size={50} style={{color:'var(--foreground)'}}/>
}

const PlotType = ({currentOpen, setOpen} : {currentOpen: string, setOpen: React.Dispatch<React.SetStateAction<string>>}) => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const {plotType, setPlotType} = usePlotStore(useShallow(state => ({
      plotType: state.plotType,
      setPlotType: state.setPlotType
    })))

    useEffect(()=>{
      if (currentOpen != 'plot-type'){
        setShowOptions(false)
      }
    },[currentOpen])

  return (
    <div style={{position:'relative'}}>
      <div
        className='panel-item'
        style={{backgroundColor:''}}
        onClick={e => {
          setShowOptions(x => !x);
          setOpen('plot-type');
        }}
      >
        {plotIcons[plotType as keyof typeof plotIcons]}
      </div>
      <div
        className='panel-item-options'
        style={{
          transform: showOptions ? 'scale(100%) translateY(-50%)' : 'scale(0%)',
          maxHeight:'400px'
        }}
      >
        {plotTypes.map((val) => (
          <div className='plot-type'
            onClick={e => {
              setShowOptions(false);
              setPlotType(val);
            }}
            style={{cursor: 'pointer', height:'60px', width:'60px'}}
          >
             {plotIcons[val as keyof typeof plotIcons]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlotType

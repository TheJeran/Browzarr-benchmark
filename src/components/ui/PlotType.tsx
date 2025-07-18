"use client";

import React, { useState } from 'react'
import './css/MainPanel.css'
import { usePlotStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
const plotTypes = ['volume', 'point-cloud', 'sphere', 'flat']

const PlotType = () => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const {plotType, setPlotType} = usePlotStore(useShallow(state => ({
      plotType: state.plotType,
      setPlotType: state.setPlotType
    })))

  return (
    <div style={{position:'relative'}}>
        <div className='panel-item' onClick={e=>setShowOptions(x=>!x)} > Plot Type </div>
        <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) ' : 'scale(0%) '}}>
            {plotTypes.map((val)=>(
                <div className='panel-item' onClick={e=>{setShowOptions(false); setPlotType(val)}}>{val}</div>
            ))}
                
        </div>
    </div>
  )
}

export default PlotType

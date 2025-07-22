"use client";

import React, { useEffect, useState } from 'react'
import './css/MainPanel.css'
import { usePlotStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
const plotTypes = ['volume', 'point-cloud', 'sphere', 'flat']

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
        <div className='panel-item' onClick={e=>{setShowOptions(x=>!x); setOpen('plot-type')}} > <img src={`/plottypes/${plotType}.svg`} alt="" height={'60%'} width={'60%'}/> </div>
        <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) ' : 'scale(0%) ', overflow:'hidden', height:'600px', paddingTop:'40px'}}>
            {plotTypes.map((val)=>(
                <img key={val} alt={val} className='plot-type' src={`/plottypes/${val}.svg`} onClick={e=>{setShowOptions(false); setPlotType(val)}}/>
            ))}
        </div>
    </div>
  )
}

export default PlotType

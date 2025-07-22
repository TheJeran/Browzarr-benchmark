"use client";

import React, { useEffect, useState } from 'react'
import './css/MainPanel.css'
import { usePlotStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import Image from 'next/image';

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
      <div
        className='panel-item'
        onClick={e => {
          setShowOptions(x => !x);
          setOpen('plot-type');
        }}
      >
        <Image
          src={`/plottypes/${plotType}.svg`}
          alt=""
          height={48}
          width={48}
          style={{objectFit: 'contain'}}
        />
      </div>
      <div
        className='panel-item-options'
        style={{
          transform: showOptions ? 'scale(100%)' : 'scale(0%)',
        }}
      >
        {plotTypes.map((val) => (
          <Image
            key={val}
            className='plot-type'
            src={`./plottypes/${val}.svg`}
            alt={val}
            width={90}
            height={90}
            style={{cursor: 'pointer'}}
            onClick={e => {
              setShowOptions(false);
              setPlotType(val);
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default PlotType

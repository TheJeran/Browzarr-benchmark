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
        style={{backgroundColor:''}}
        onClick={e => {
          setShowOptions(x => !x);
          setOpen('plot-type');
        }}
      >
        <Image
          className='w-[80%]'
          src={`./plottypes/${plotType}.svg`}
          alt=""
          height={48}
          width={48}
          style={{objectFit: 'contain'}}
        />

      </div>
      <div
        className='panel-item-options'
        style={{
          transform: showOptions ? 'scale(100%) translateY(-50%)' : 'scale(0%)',
        }}
      >
        {plotTypes.map((val) => (
          <Image
            key={val}
            className='plot-type'
            src={`./plottypes/${val}.svg`}
            alt={val}
            width={50}
            height={50}
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

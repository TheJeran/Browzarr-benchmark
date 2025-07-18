"use client";
import React, {useState} from 'react'
import { useGlobalStore } from '@/utils/GlobalStates';

import './css/MainPanel.css'
import { useShallow } from 'zustand/shallow';


const AdjustPlot = () => {

    const [showOptions, setShowOptions] = useState<boolean>(false)
  return (
    <div style={{position:'relative'}}>
        <div className='panel-item' onClick={e=>setShowOptions(x=>!x)} > Options </div>
        <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) ' : 'scale(0%) ', width:'auto', padding:'30px 10px', justifyContent:'space-around'}}>

        </div>
    </div>
  )
}

export default AdjustPlot

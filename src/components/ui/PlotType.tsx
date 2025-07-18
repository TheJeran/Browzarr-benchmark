"use client";

import React, { useState } from 'react'
import './css/MainPanel.css'

const PlotType = () => {
    const [showOptions, setShowOptions] = useState<boolean>(false)

  return (
    <div style={{position:'relative'}}>
        <div className='panel-item' onClick={e=>setShowOptions(x=>!x)} />
        <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) ' : 'scale(0%) '}}>
            {Array.from({length: 4}).map((val)=>(
                <div className='panel-item' onClick={e=>setShowOptions(false)}/>
            ))}
                
        </div>
    </div>
  )
}

export default PlotType

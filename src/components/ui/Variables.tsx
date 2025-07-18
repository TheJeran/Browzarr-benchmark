"use client";
import React, {useState} from 'react'
import { useGlobalStore } from '@/utils/GlobalStates';

import './css/MainPanel.css'
import { useShallow } from 'zustand/shallow';
const Variables = () => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const {variables, setVariable} = useGlobalStore(useShallow(state => ({
        variables: state.variables,
        setVariable: state.setVariable
    })))

  return (
    <div style={{position:'relative'}}>
        <div className='panel-item' onClick={e=>setShowOptions(x=>!x)} > Variables </div>
        <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) ' : 'scale(0%) ', width:'auto', padding:'30px 10px', justifyContent:'space-around'}}>
            {variables.map((val)=>(
                <div className='variable-item' onClick={e=>{setVariable(val); setShowOptions(false)}}>{val}</div>
            ))}
        </div>
    </div>
  )
}

export default Variables

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
        <div className='panel-item' onClick={e=>setShowOptions(x=>!x)} />
        <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) ' : 'scale(0%) '}}>
            {variables.map((val)=>(
                <div onClick={e=>setVariable(val)}>{val}</div>
            ))}
                
        </div>
    </div>
  )
}

export default Variables

"use client";

import React, {useState} from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { VscGraphLine } from "react-icons/vsc"; //Use this if you hate the svg
import { usePlotStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow';
import './css/PlotLineButton.css'

const PlotLineButton = () => {
    const {selectTS, resetAnim, animate, setSelectTS, setResetAnim} = usePlotStore(useShallow(state => ({
        selectTS: state.selectTS,
        resetAnim: state.resetAnim,
        animate: state.animate,
        setSelectTS: state.setSelectTS,
        setResetAnim: state.setResetAnim
    })))

    const [showInfo, setShowInfo] = useState(false)

  return (

    <div className='selectTS' 
      style={{display: animate ? 'none' : ''}}
    
    onClick={()=> {setResetAnim(!resetAnim); setSelectTS(!selectTS)}}>
      <VscGraphLine size={32}
      style={{
        color:selectTS ? "gold" : "grey",
        filter: selectTS ? "drop-shadow(0px 0px 10px gold)" : "",
        cursor:'pointer'
      }}/>
      <IoMdInformationCircleOutline 
        size={15}
        style={{
          height:'30px',
          position:'absolute',
          right:'-10px',
          bottom:'0',
          zIndex:'3'
        }}
        onPointerEnter={e=>setShowInfo(true)}
        onPointerLeave={e=>setShowInfo(false)}
      />
      <div
        style={{
          position:'absolute',
          width:'100px',
          top:'100%',
          left:'100%',
          borderRadius: '10px',
          border: '1px solid var(--accent-2)',
          display: showInfo ? '' : 'none',
          backgroundImage: 'linear-gradient(-125deg, var(--background) 0%, var(--background-modal) 100%)',
          padding:'2px'
        }}
      >
        While active, Click the volume to view 1D transects through the given dimension
      </div>
    </div>
  )
}

export default PlotLineButton

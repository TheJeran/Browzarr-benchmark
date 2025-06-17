"use client";

import React, {useState} from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { VscGraphLine } from "react-icons/vsc"; //Use this if you hate the svg
import { usePlotStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow';
import './css/PlotLineButton.css'

const PlotLineButton = () => {
    const {selectTS, setSelectTS} = usePlotStore(useShallow(state => ({
        selectTS: state.selectTS,
        setSelectTS: state.setSelectTS
    })))

    const [showInfo, setShowInfo] = useState(false)

  return (

    <div className='selectTS' onClick={()=> setSelectTS(!selectTS)}>
      <VscGraphLine size={40}
      style={{
        color:selectTS ? "red" : "grey",
        filter: selectTS ? "drop-shadow(0px 0px 10px red)" : "",
        cursor:'pointer'
      }}/>
      <IoMdInformationCircleOutline 
        style={{
          height:'15px',
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
          borderRadius: '6px',
          display: showInfo ? '' : 'none',
          background: 'rgb(223, 234, 255)',
          padding:'2px'
        }}
      >
        While active, Click the volume to view 1D transects through the given dimension
      </div>
    </div>
  )
}

export default PlotLineButton

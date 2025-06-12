import React from 'react'
import lineIcon from '@/assets/line-graph.svg'
import { VscGraphLine } from "react-icons/vsc"; //Use this if you hate the svg
import { usePlotStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow';
import './css/PlotLineButton.css'

const PlotLineButton = () => {
    const {selectTS, setSelectTS} = usePlotStore(useShallow(state => ({
        selectTS: state.selectTS,
        setSelectTS: state.setSelectTS
    })))

  return (

    <div className='selectTS' onClick={()=> setSelectTS(!selectTS)}>
      <VscGraphLine size={40}
      style={{
        color:selectTS ? "red" : "grey",
        filter: selectTS ? "drop-shadow(0px 0px 10px red)" : ""
      }}/>
    </div>
  )
}

export default PlotLineButton

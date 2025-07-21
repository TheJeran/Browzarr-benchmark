import React from 'react'
import './css/MainPanel.css'
import {PlotType, Variables, Colormaps, AdjustPlot, PlotLineButton} from './index'

const MainPanel = () => {

  
  return (
    <div className='panel-container'>
      <PlotType />
      <Variables />
      <Colormaps />
      <AdjustPlot />
    </div>
  )
}

export default MainPanel

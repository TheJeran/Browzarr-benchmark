import React from 'react'
import './css/MainPanel.css'
import {PlotType, Variables} from './index'

const MainPanel = () => {
  return (
    <div className='panel-container'>
      <PlotType />
      <Variables />
    </div>
  )
}

export default MainPanel

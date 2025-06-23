import React from 'react'
import './css/ShowAnalysis.css'


const ShowPlot = ({onClick}: {onClick: () => void}) => {

  return (
    <div className='plot-tab'
  
    onClick={onClick}>
      <div className='tab-line' />
      <div className='tab-line' />
      <div className='tab-line' />
    </div>
  )
}

export default ShowPlot

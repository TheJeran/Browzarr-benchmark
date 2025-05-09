import React from 'react'
import './css/ShowAnalysis.css'


const ShowAnalysis = ({onClick,canvasWidth}: {onClick: () => void,canvasWidth:number}) => {
    const showLeft = canvasWidth < window.innerWidth/2;
  return (
    <div className='analysis-tab' 
    style={{
        left:showLeft ? "-20px" : "",
        right: showLeft ? "" : "-20px"
    }}
    
    onClick={onClick}>
      <div className='tab-line' />
      <div className='tab-line' />
      <div className='tab-line' />
    </div>
  )
}

export default ShowAnalysis

import React from 'react'
import './css/ShowAnalysis.css'


const ShowAnalysis = ({onClick}: {onClick: () => void}) => {

  return (
    <div className='analysis-tab'
  
    onClick={onClick}>
      <div className='tab-line' />
      <div className='tab-line' />
      <div className='tab-line' />
    </div>
  )
}

export default ShowAnalysis

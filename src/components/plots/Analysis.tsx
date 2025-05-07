import React from 'react'
import { Canvas } from '@react-three/fiber'

interface AnalysisParameters{
    setters:{

    },
    values:{

    }
}

const Analysis = ({setters,values}:AnalysisParameters) => {



  return (
        <Canvas
        className='analysis-canvas'
        >

        </Canvas>
  )
}

export default Analysis

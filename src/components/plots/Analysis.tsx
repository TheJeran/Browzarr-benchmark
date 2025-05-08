import React from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import ComputeModule from '@/components/computation/ComputeModule'
import { ZarrDataset } from '../zarr/ZarrLoaderLRU'
import { createPaneContainer } from '../ui'
import { useTweakpane, usePaneInput } from '@lazarusa/react-tweakpane'
import { OrbitControls } from '@react-three/drei'

import './Plots.css'

interface AnalysisParameters{

    values:{
      ZarrDS:ZarrDataset;
      cmap: THREE.DataTexture;
      shape: number[];
      canvasWidth:number
    }
}

export const Analysis = ({values}:AnalysisParameters) => {
  const {ZarrDS, cmap, shape, canvasWidth} = values

  const paneContainer = createPaneContainer("analysis-tp")

  const pane = useTweakpane({
    operation:"mean",
    firstVar:"Default"

  },paneContainer ?? undefined)

  const [operation] = usePaneInput(pane,"operation",
    {
      label:"Operation",
      options:[
        {
          text:"Mean",
          value:"mean"
        },
        {
          text:"Min",
          value:"min"
        }
      ]
    }

  )

  //{setters,values}:AnalysisParameters

  return (
    <div className='analysis-canvas'
      style={{
        width:canvasWidth,
        background:"#2c3d4f"
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], zoom:500}}
        orthographic
      >
        <mesh>
          <planeGeometry />
          <meshBasicMaterial color={"red"} />
        </mesh>
        {/* <ComputeModule /> */}

        <OrbitControls 
          enablePan={true}
          enableRotate={false}
        
        />
      </Canvas>
    </div>
  )
}

import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import ComputeModule from '@/components/computation/ComputeModule'
import { ZarrDataset } from '@/components/zarr/ZarrLoaderLRU'
import { createPaneContainer } from '@/components/ui'
import { useTweakpane, usePaneInput, useButtonBlade } from '@lazarusa/react-tweakpane'
import { OrbitControls } from '@react-three/drei'
import { variables } from '@/components/zarr/ZarrLoaderLRU'
import './Plots.css'

interface Array{
  data:number[],
  shape:number[],
  stride:number[]
}
interface AnalysisParameters{

    values:{
      ZarrDS:ZarrDataset;
      cmap: THREE.DataTexture;
      shape: number[];
      canvasWidth:number;
      dimNames: string[];
      valueScales:{maxVal:number,minVal:number}
    }
}

export const Analysis = ({values}:AnalysisParameters) => {
  const {ZarrDS, cmap, canvasWidth, dimNames, valueScales} = values

  const [array , setArray] = useState<Array | null>(null)
  const [execute, setExecute] = useState<boolean>(false)

  const optionsVars = useMemo(() => variables.map((element) => ({
    text: element,
    value: element
  })), []);

  const dimNamesAxis = useMemo(() => dimNames.map((element) => ({
    text: element,
    value: element
  })), []);
  

  const paneContainer = createPaneContainer("analysis")
  const pane = useTweakpane({
    operation: "Mean",
    firstVar: "Default",
    secondVar: "Default",
    execute: false,
    axis: 0,
    active: false
  },
  {
    title: "Analysis",
    container: paneContainer ?? undefined,
    expanded: false
  }
  )
  const [active] = usePaneInput(
    pane,
    'active',
    {
      label: 'Show Analysis',
      value: false
    }
  )
  const [firstVar] = usePaneInput(pane, 'firstVar', {
    label: 'Variable 1',
    options: [
      {
        text: 'Default',
        value: 'Default',
      },
    ...optionsVars
  ],
    value: 'Default'
  })

  const [secondVar] = usePaneInput(pane, 'secondVar', {
    label: 'Variable 2',
    options: [
      {
        text: 'Default',
        value: 'Default', 
      },
    ...optionsVars
  ],
    value: 'Default'
  })
  const [operation] = usePaneInput(pane, "operation",
    {
      label:"Operation",
      options:[
        {
          text:"Mean",
          value:"Mean"
        },
        {
          text:"Min",
          value:"Min"
        },
        {
          text:"Max",
          value:"Max"
        },
        {
          text:"StDev",
          value:"StDev"
        }
      ],
      value:"Mean"
    }
  )

  const [axis] = usePaneInput(
    pane,
    'axis',
    {
      label: 'Axis',
      options: [
        {
          text:"0",
          value:0
        },
        {
          text:"1",
          value:1
        },
        {
          text:"2",
          value:2
        }
      ],

    }
  )

  useButtonBlade(pane,{
    title:"Compute"
  },()=>setExecute(x=>!x))

  const stateVars = {
    operation,
    axis,
    execute,
    active
  }

  useEffect(()=>{
    if (firstVar !== "Default"){
      ZarrDS.GetArray(firstVar).then(result=>{setArray(result);
      })
    }
  },[firstVar])

  return (
    <div className='analysis-canvas'
      style={{
        width:canvasWidth,
      }}
    >      
      <Canvas camera={{ position: [0, 0, 50], zoom:5}} orthographic>
        {array && <ComputeModule array={array} cmap={cmap} stateVars={stateVars} valueScales={valueScales}/>}
        <axesHelper scale={10} />
        <OrbitControls
          enablePan={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  )
}

import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { ArrayMax, ArrayMin } from '@/utils/HelperFuncs'
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
    }
}

export const Analysis = ({values}:AnalysisParameters) => {
  const {ZarrDS, cmap, canvasWidth, dimNames} = values
  const scaleObjRef = useRef<Record<string, { min: number; max: number }>>({});

  const [maxVal, setMaxVal] = useState<number>(100);
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal2, setMaxVal2] = useState<number>(100);
  const [minVal2, setMinVal2] = useState<number>(0);
  const [array , setArray] = useState<Array | null>(null)
  const [array2 , setArray2] = useState<Array | null>(null)
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
    backgroundColor: "#292b32",
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
  const [bgcolor] = usePaneInput(pane, 'backgroundColor', {
    label: 'bgcolor',
    value: '#292b32'
  })
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
  }

  useEffect(()=>{
    if (firstVar !== "Default"){
      ZarrDS.GetArray(firstVar).then(result=>{
        setArray(result);
        if (firstVar in scaleObjRef.current){
          console.log("cached")
          setMinVal(scaleObjRef.current[firstVar].min)
          setMaxVal(scaleObjRef.current[firstVar].max)
        }
        else{
          const maxVal = ArrayMax(result.data);
          const minVal = ArrayMin(result.data);
          setMaxVal(maxVal);
          setMinVal(minVal);
          scaleObjRef.current[firstVar] = {min:minVal,max:maxVal}
        }
      })
    }
    if (secondVar !== "Default"){
      ZarrDS.GetArray(secondVar).then(result=>{
        setArray2(result);
        if (firstVar in scaleObjRef.current){
          setMinVal2(scaleObjRef.current[firstVar].min)
          setMaxVal2(scaleObjRef.current[firstVar].max)
        }
        else{
          const maxVal = ArrayMax(result.data);
          const minVal = ArrayMin(result.data);
          setMaxVal2(maxVal);
          setMinVal2(minVal);
          scaleObjRef.current[firstVar] = {min:minVal,max:maxVal}
        }
      })
    }

  },[firstVar,secondVar])

  const computeObj = {
    values:{
      cmap,
      stateVars,
      valueScales:{maxVal,minVal}
    }
  }

  return (
    <div className='analysis-canvas'
      style={{
        width:canvasWidth,
        background:bgcolor
      }}
    >      
      <Canvas camera={{ position: [0, 0, 50], zoom:50}} orthographic>
        {array && <ComputeModule arrays={{firstArray: array, secondArray: null}} values={computeObj.values}/>}
        <axesHelper scale={10} />
        <OrbitControls
          enablePan={true}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}

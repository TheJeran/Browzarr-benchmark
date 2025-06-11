//@ts-nocheck Analysis requires quite a lot of work to mesh with new UI. Will Monkey with that later
import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { ArrayMinMax, getVariablesOptions } from '@/utils/HelperFuncs'
import AnalysisInfo from './AnalysisInfo'
import ComputeModule from '@/components/computation/ComputeModule'
import { ZarrDataset } from '@/components/zarr/ZarrLoaderLRU'
import { createPaneContainer } from '@/components/ui'
import { useTweakpane, usePaneInput, useButtonBlade } from '@lazarusa/react-tweakpane'
import { OrbitControls } from '@react-three/drei'
import { useGlobalStore } from '@/utils/GlobalStates'
import './Plots.css'
import { useShallow } from 'zustand/shallow'
// import { Perf } from 'r3f-perf';

interface Array{
  data:number[],
  shape:number[],
  stride:number[]
}

// This wrapper handles loading state

// This renders only when data is ready and uses hooks safely
export function Analysis({ values }: { 
    values: { ZarrDS: ZarrDataset; canvasWidth: number };
}) {
    const {dimNames, dimArrays, dimUnits, setDimNames, setDimArrays, setDimUnits} = useGlobalStore(
      useShallow(state=>({
        dimNames: state.dimNames,
        dimArrays: state.dimArrays,
        dimUnits: state.dimUnits,
        setDimNames: state.setDimNames,
        setDimArrays: state.setDimArrays,
        setDimUnits: state.setDimUnits
      })))


    const variables = useGlobalStore(state => state.variables)
    const {ZarrDS, canvasWidth} = values
    const scaleObjRef = useRef<Record<string, { min: number; max: number }>>({});
    const setFlipY = useGlobalStore(state=>state.setFlipY)
    const [maxVal, setMaxVal] = useState<number>(100);
    const [minVal, setMinVal] = useState<number>(0);
    const [maxVal2, setMaxVal2] = useState<number>(100);
    const [minVal2, setMinVal2] = useState<number>(0);
    const [array , setArray] = useState<Array | null>(null)
    const [array2 , setArray2] = useState<Array | null>(null)
    const [execute, setExecute] = useState<boolean>(false)
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [loc, setLoc] = useState<number[]>([0,0])
    const [uv, setUV] = useState<number[]>([0,0])
    const [val, setVal] = useState<number>(0);
    const [xCoord, setXCoord] = useState<number>(0)
    const [yCoord, setYCoord] = useState<number>(0)

    const dimNamesAxis = useMemo(() => dimNames.map((element,idx) => ({
        text: element,
        value: idx
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
      options: [...optionsVariables],
      value: 'Default'
    })

    const [secondVar] = usePaneInput(pane, 'secondVar', {
      label: 'Variable 2',
      options: [
        {
          text: 'Default',
          value: 'Default', 
        },
      ...optionsVariables
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
          setMinVal(scaleObjRef.current[firstVar].min)
          setMaxVal(scaleObjRef.current[firstVar].max)
        }
        else{
          const [minVal,maxVal] = ArrayMinMax(result.data)
          setMaxVal(maxVal);
          setMinVal(minVal);
          scaleObjRef.current[firstVar] = {min:minVal,max:maxVal}
        }
      })
      ZarrDS.GetAttributes(firstVar).then(()=>{
        const [dimArrs, dimMetas, dimNames] = ZarrDS.GetDimArrays()
        setDimArrays(dimArrs)
        setDimNames(dimNames)
        const tempDimUnits = []
        for (const meta of dimMetas){
          tempDimUnits.push(meta.units)
        }
        setDimUnits(tempDimUnits)
        if (dimArrs[1][1] < dimArrs[1][0])
          {setFlipY(true)}
        else
          {setFlipY(false)}
      })
    }
    if (secondVar !== "Default"){
      ZarrDS.GetArray(secondVar).then(result=>{
        setArray2(result);
        if (secondVar in scaleObjRef.current){
          setMinVal2(scaleObjRef.current[secondVar].min)
          setMaxVal2(scaleObjRef.current[secondVar].max)
        }
        else{
          const [minVal,maxVal] = ArrayMinMax(result.data)
          setMaxVal2(maxVal);
          setMinVal2(minVal);
          scaleObjRef.current[secondVar] = {min:minVal,max:maxVal}
        }
      })
    }
    if (secondVar === "Default"){
      setArray2(null)
    }

  },[firstVar,secondVar])
  const plotArrays = useMemo(()=>dimArrays.filter((_val,idx)=> idx != axis),[axis, dimArrays])

  //Get Info for Display
  useEffect(()=>{
    if (dimArrays){
    const timeout = setTimeout(() => {
    const xSize = plotArrays[1].length;
    const ySize = plotArrays[0].length;
    const xIdx = Math.round(uv[0]*xSize-.5)
    const yIdx = Math.round(uv[1]*ySize-.5)
    setXCoord(plotArrays[1][xIdx])
    setYCoord(plotArrays[0][yIdx])},50)
    return ()=> clearTimeout(timeout)
    }
  },[uv, plotArrays])

  const valueScales = {
    firstArray:{
      maxVal,
      minVal
    },
    secondArray:{
      maxVal: maxVal2,
      minVal: minVal2
    }
  }
  const computeObj = {
      stateVars,
      valueScales
  }
  return (
    <div className='analysis-canvas'
      style={{
        width:canvasWidth,
        background:bgcolor
      }}
      >      
        <AnalysisInfo loc={loc} show={showInfo} info={[yCoord, xCoord, val]} plotDim={axis} />
        <Canvas camera={{ position: [0, 0, 50], zoom:400 }} orthographic>
          {/* <Perf position='bottom-left'/> */}
          {array && <ComputeModule arrays={{firstArray: array, secondArray: array2}} values={computeObj} setters={{setShowInfo, setLoc, setUV, setVal}}/>}
          <OrbitControls
            enablePan={true}
            enableRotate={false}
          />
        </Canvas>
      </div>
    )
}

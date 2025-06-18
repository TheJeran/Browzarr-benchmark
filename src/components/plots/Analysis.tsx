
"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { ArrayMinMax, getVariablesOptions } from '@/utils/HelperFuncs'
import AnalysisInfo from './AnalysisInfo'
import ComputeModule from '@/components/computation/ComputeModule'
import { ZarrDataset } from '@/components/zarr/ZarrLoaderLRU'
import { AnalysisOptions } from '@/components/ui'
import { OrbitControls } from '@react-three/drei'
import { useAnalysisStore, useGlobalStore } from '@/utils/GlobalStates'
import './Plots.css'
import { useShallow } from 'zustand/shallow'
// import { Perf } from 'r3f-perf';

interface Array{
  data:number[],
  shape:number[],
  stride:number[]
}

export function Analysis({ values }: { 
    values: { ZarrDS: ZarrDataset; canvasWidth: number };
}) {
    const {dimNames, dimArrays, dimUnits, variables, setDimNames, setDimArrays, setDimUnits} = useGlobalStore(
      useShallow(state=>({
        dimNames: state.dimNames,
        dimArrays: state.dimArrays,
        dimUnits: state.dimUnits,
        variables: state.variables,
        setDimNames: state.setDimNames,
        setDimArrays: state.setDimArrays,
        setDimUnits: state.setDimUnits
      })))

    const {axis, operation, variable1, variable2, execute} = useAnalysisStore(useShallow(state => ({
                axis: state.axis,
                operation: state.operation,
                variable1: state.variable1,
                variable2: state.variable2,
                execute: state.execute,
              })))

    const {ZarrDS, canvasWidth} = values
    const scaleObjRef = useRef<Record<string, { min: number; max: number }>>({});
    const setFlipY = useGlobalStore(state=>state.setFlipY)
    const [maxVal, setMaxVal] = useState<number>(100);
    const [minVal, setMinVal] = useState<number>(0);
    const [maxVal2, setMaxVal2] = useState<number>(100);
    const [minVal2, setMinVal2] = useState<number>(0);
    const [array , setArray] = useState<Array | null>(null)
    const [array2 , setArray2] = useState<Array | null>(null)
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [loc, setLoc] = useState<number[]>([0,0])
    const uv = useRef<number[]>([0,0])
    const [val, setVal] = useState<number>(0);
    const coords = useRef<number[]>([0,0])


    const dimNamesAxis = useMemo(() => dimNames.map((element,idx) => ({
        text: element,
        value: idx
    })), []);
  
    const stateVars = useMemo(
    () => ({
      operation,
      axis,
      execute,
    }),[operation,axis,execute])

  useEffect(()=>{
    if (variable1 !== "Default"){
      ZarrDS.GetArray(variable1).then(result=>{
        setArray(result);
        
        if (variable1 in scaleObjRef.current){
          setMinVal(scaleObjRef.current[variable1].min)
          setMaxVal(scaleObjRef.current[variable1].max)
        }
        else{
          const [minVal,maxVal] = ArrayMinMax(result.data)
          setMaxVal(maxVal);
          setMinVal(minVal);
          scaleObjRef.current[variable1] = {min:minVal,max:maxVal}
        }
      })
      ZarrDS.GetAttributes(variable1).then(()=>{
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
    if (variable2 !== "Default"){
      ZarrDS.GetArray(variable2).then(result=>{
        setArray2(result);
        if (variable2 in scaleObjRef.current){
          setMinVal2(scaleObjRef.current[variable2].min)
          setMaxVal2(scaleObjRef.current[variable2].max)
        }
        else{
          const [minVal,maxVal] = ArrayMinMax(result.data)
          setMaxVal2(maxVal);
          setMinVal2(minVal);
          scaleObjRef.current[variable2] = {min:minVal,max:maxVal}
        }
      })
    }
    if (variable2 === "Default"){
      setArray2(null)
    }

  },[variable1,variable2, axis])

  const plotArrays = useMemo(()=>{
    if (dimArrays.length === 3){
      return dimArrays.filter((_val,idx)=> idx != axis)
    }
    else{
      return dimArrays
    }
  },[axis, dimArrays])
  //Get Info for Display
  useEffect(()=>{
    if (dimArrays){
    const xSize = plotArrays[1].length;
    const ySize = plotArrays[0].length;
    const xIdx = Math.round(uv.current[0]*xSize-.5)
    const yIdx = Math.round(uv.current[1]*ySize-.5)
    coords.current = [plotArrays[0][yIdx], plotArrays[1][xIdx] ]
    }
  },[uv, loc, plotArrays])

  const valueScales = useMemo(()=>({
    firstArray:{
      maxVal,
      minVal
    },
    secondArray:{
      maxVal: maxVal2,
      minVal: minVal2
    }
  }),[maxVal,minVal,maxVal2,minVal2],)

  const computeObj = useMemo(()=>({
      stateVars,
      valueScales
  }),[stateVars,valueScales])
  const Options = useMemo(()=> AnalysisOptions,[])
  return (
    <div className='analysis-canvas'
      style={{
        width:canvasWidth,
      }}
      >      
        <Options />
        <AnalysisInfo loc={loc} show={showInfo} info={[...coords.current, val]} />
        <Canvas camera={{ position: [0, 0, 50], zoom:400 }} orthographic>
          {/* <Perf position='bottom-left'/> */}
          {array && <ComputeModule arrays={{firstArray: array, secondArray: array2}} values={computeObj} setters={{setShowInfo, setLoc, uv, setVal}}/>}
          <OrbitControls
            enablePan={true}
            enableRotate={false}
          />
        </Canvas>
      </div>
    )
}

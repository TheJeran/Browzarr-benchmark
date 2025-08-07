"use client";
import { ArrayMinMax } from '@/utils/HelperFuncs';
import * as THREE from 'three'
import React, { useEffect, useState, useRef } from 'react'
import { DataReduction } from '../computation/webGPU'
import { useGlobalStore, useAnalysisStore, usePlotStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';

const AnalysisWG = ({setTexture} : {setTexture : React.Dispatch<React.SetStateAction<THREE.Data3DTexture | THREE.DataTexture | null>>}) => {
    
    const {dataArray, strides, dataShape, valueScales, setIsFlat, setDataArray, setValueScales} = useGlobalStore(useShallow(state=>({
        dataArray : state.dataArray,
        strides: state.strides,
        dataShape: state.dataShape,
        valueScales: state.valueScales,
        setIsFlat: state.setIsFlat,
        setDataArray: state.setDataArray,
        setValueScales: state.setValueScales
    })))

    const setPlotType = usePlotStore(state => state.setPlotType)
    const {axis, execute, operation, useTwo, variable2, 
        valueScalesOrig, kernelSize, kernelDepth, kernelOperation, setValueScalesOrig, setAnalysisArray} = useAnalysisStore(useShallow(state => ({
        axis: state.axis,
        execute: state.execute,
        operation: state.operation,
        useTwo: state.useTwo,
        variable2: state.variable2,
        valueScalesOrig: state.valueScalesOrig,
        kernelSize: state.kernelSize,
        kernelDepth: state.kernelDepth,
        kernelOperation: state.kernelOperation,
        setValueScalesOrig: state.setValueScalesOrig,
        setAnalysisArray: state.setAnalysisArray,
    })))

    const variable2Array = useRef<ArrayBufferView>(new Float32Array(1))

    useEffect(()=>{
        if (!useTwo){
            if (operation != 'Convolution'){
                const thisShape = dataShape.filter((e, idx) => idx != axis)
                DataReduction(dataArray, {shape:dataShape, strides}, axis, operation).then(newArray=>{
                    if (!newArray){return;}
                    let minVal, maxVal;
                    if (operation == 'StDev'){
                        [minVal,maxVal] = ArrayMinMax(newArray )
                        if (!valueScalesOrig){
                            setValueScalesOrig(valueScales)
                        }
                        setValueScales({minVal,maxVal})
                    }else{
                        if (!valueScalesOrig){
                            minVal = valueScales.minVal;
                            maxVal = valueScales.maxVal
                        }
                        else{
                            minVal = valueScalesOrig.minVal;
                            maxVal = valueScalesOrig.maxVal
                            setValueScales(valueScalesOrig)
                            setValueScalesOrig(null)
                        }
                    }
                    let normed = newArray.map(e=> (e-minVal)/(maxVal-minVal))
                    const textureData = new Uint8Array(normed.map((i)=>isNaN(i) ? 255 : i*254)); 
                    const newText = new THREE.DataTexture(textureData, thisShape[1], thisShape[0], THREE.RedFormat, THREE.UnsignedByteType)
                    newText.needsUpdate = true;
                    setAnalysisArray(newArray)
                    setTexture(newText)
                    setIsFlat(true)
                    setPlotType('flat')
                })
                
            }
            
        }
    },[execute])

  return null
    
}

export default AnalysisWG

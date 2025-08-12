"use client";
import { ArrayMinMax } from '@/utils/HelperFuncs';
import * as THREE from 'three'
import React, { useEffect, useState, useRef } from 'react'
import { DataReduction, Convolve, Correlate2D, Correlate3D } from '../computation/webGPU'
import { useGlobalStore, useAnalysisStore, usePlotStore, useZarrStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { ZarrDataset } from '../zarr/ZarrLoaderLRU';


const AnalysisWG = ({setTexture, ZarrDS} : {setTexture : React.Dispatch<React.SetStateAction<THREE.Data3DTexture | THREE.DataTexture | null>>, ZarrDS: ZarrDataset}) => {
    
    const {dataArray, strides, dataShape, valueScales, setIsFlat, setDownloading, setShowLoading, setValueScales} = useGlobalStore(useShallow(state=>({
        dataArray : state.dataArray,
        strides: state.strides,
        dataShape: state.dataShape,
        valueScales: state.valueScales,
        setIsFlat: state.setIsFlat,
        setDownloading: state.setDownloading,
        setShowLoading: state.setShowLoading,
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

    const zarrSlice = useZarrStore(state => state.slice)
    const variable2Array = useRef<ArrayBufferView>(new Float32Array(1))
    useEffect(()=>{ 
        if (dataArray.length <= 1){
            return;
        }
        setShowLoading(true)
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
                    const normed = newArray.map(e=> (e-minVal)/(maxVal-minVal))
                    const textureData = new Uint8Array(normed.map((i)=>isNaN(i) ? 255 : i*254)); 
                    const newText = new THREE.DataTexture(textureData, thisShape[1], thisShape[0], THREE.RedFormat, THREE.UnsignedByteType)
                    newText.needsUpdate = true;
                    setAnalysisArray(newArray)
                    setTexture(newText)
                    setIsFlat(true)
                    setPlotType('flat')
                }).then(e=>
                    setShowLoading(false)
                ) 
            }
            else{
                Convolve(dataArray, {shape:dataShape, strides}, kernelOperation, {kernelDepth, kernelSize}).then(newArray=>{
                    if (!newArray){return;}
                    let minVal, maxVal;
                    if (kernelOperation == 'StDev'){
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
                    const normed = newArray.map(e=> (e-minVal)/(maxVal-minVal))
                    const textureData = new Uint8Array(normed.map((i)=>isNaN(i) ? 255 : i*254)); 
                    const newText = new THREE.Data3DTexture(textureData, dataShape[2], dataShape[1], dataShape[0])
                    newText.format = THREE.RedFormat;
                    newText.minFilter = THREE.NearestFilter;
                    newText.magFilter = THREE.NearestFilter;
                    newText.needsUpdate = true;
                    setAnalysisArray(newArray)
                    setTexture(newText)
                    setIsFlat(false)
                    setPlotType('volume')
                })
                .then(e=>
                    setShowLoading(false)
                ) 
            }
            
        }
        else{
            async function MultiVariable(){
                setDownloading(true)
                variable2Array.current = await ZarrDS.GetArray(variable2, zarrSlice)
                setDownloading(false)
                if (operation == 'Correlation2D'){ //This will need to change when new operatiosn added
                    const thisShape = dataShape.filter((e, idx) => idx != axis)
                    //@ts-expect-error It won't be undefined here as correlate2D only outputs undefined if webGPU disabled. However, impossible to call if webGPU disabled
                    const newArray: Float32Array = await Correlate2D(dataArray, variable2Array.current.data, {shape:dataShape, strides}, axis)
                    if (!valueScalesOrig){
                            setValueScalesOrig(valueScales)
                    }
                    const [minVal, maxVal] = [-1, 1]
                    setValueScales({minVal,maxVal}) //Set to 0-1 for correlation
                    const normed = newArray.map(e=> (e-minVal)/(maxVal-minVal))
                    const textureData = new Uint8Array(normed.map((i)=>isNaN(i) ? 255 : i*254)); 
                    const newText = new THREE.DataTexture(textureData, thisShape[1], thisShape[0], THREE.RedFormat, THREE.UnsignedByteType)
                    newText.needsUpdate = true;
                    setAnalysisArray(newArray)
                    setTexture(newText)
                    setIsFlat(true)
                    setPlotType('flat')
                }
                else{ //This will need to change when new operatiosn added
                    //@ts-expect-error It won't be undefined here as correlate2D only outputs undefined if webGPU disabled. However, impossible to call if webGPU disabled
                    const newArray: Float32Array = await Correlate3D(dataArray, variable2Array.current.data, {shape:dataShape, strides}, {kernelDepth, kernelSize})
                    if (!valueScalesOrig){
                            setValueScalesOrig(valueScales)
                    }
                    const [minVal, maxVal] = [-1, 1]
                    setValueScales({minVal,maxVal})
                    const normed = newArray.map(e=> (e-minVal)/(maxVal-minVal))
                    const textureData = new Uint8Array(normed.map((i)=>isNaN(i) ? 255 : i*254)); 
                    const newText = new THREE.Data3DTexture(textureData, dataShape[2], dataShape[1], dataShape[0])
                    newText.format = THREE.RedFormat;
                    newText.minFilter = THREE.NearestFilter;
                    newText.magFilter = THREE.NearestFilter;
                    newText.needsUpdate = true;
                    setAnalysisArray(newArray)
                    setTexture(newText)
                    setIsFlat(false)
                    setPlotType('volume')
                }
            }
            MultiVariable().then(e=>setShowLoading(false));
        }
    },[execute])

  return null
    
}

export default AnalysisWG

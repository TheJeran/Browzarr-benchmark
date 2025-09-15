"use client";
import { ArrayMinMax, GetCurrentArray } from '@/utils/HelperFuncs';
import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { DataReduction, Convolve, BufferCopy, Multivariate3D, CUMSUM3D, Convolve2D } from '../computation/webGPU'
import { useGlobalStore, useAnalysisStore, usePlotStore, useZarrStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { ZarrDataset } from '../zarr/ZarrLoaderLRU';
import CPUConvolve from '../computation/CPUConvolve';

const AnalysisWG = ({setTexture, ZarrDS} : {setTexture : React.Dispatch<React.SetStateAction<THREE.Data3DTexture | THREE.DataTexture | null>>, ZarrDS: ZarrDataset}) => {
    
    const { strides, dataShape, valueScales, isFlat, setShowLoading, setValueScales} = useGlobalStore(useShallow(state=>({
        strides: state.strides,
        dataShape: state.dataShape,
        valueScales: state.valueScales,
        isFlat: state.isFlat,

        setIsFlat: state.setIsFlat,
        setDownloading: state.setDownloading,
        setShowLoading: state.setShowLoading,
        setValueScales: state.setValueScales,
    })))

    const setPlotType = usePlotStore(state => state.setPlotType)
    const {useCPU, execute, getBufferSpeed,
                valueScalesOrig, kernelSize, kernelDepth, kernelOperation, analysisStore, analysisMode, analysisArray,
                setCpuTime, setGpuTime,
        setValueScalesOrig, setAnalysisArray, setBufferSpeed} = useAnalysisStore(useShallow(state => ({
        axis: state.axis,
        execute: state.execute,
        getBufferSpeed: state.getBufferSpeed,
        useCPU: state.useCPU,
        valueScalesOrig: state.valueScalesOrig,
        kernelSize: state.kernelSize,
        kernelDepth: state.kernelDepth,
        kernelOperation: state.kernelOperation,
        reverseDirection: state.reverseDirection,
        analysisStore: state.analysisStore,
        analysisMode: state.analysisMode,
        analysisArray: state.analysisArray,
        setCpuTime: state.setCpuTime,
        setGpuTime: state.setGpuTime,
        setValueScalesOrig: state.setValueScalesOrig,
        setAnalysisArray: state.setAnalysisArray,
        setBufferSpeed: state.setBufferSpeed
    })))

    const zarrSlice = useZarrStore(state => state.slice)
    const variable2Array = useRef<ArrayBufferView>(new Float32Array(1))

    // 3D Computations
    useEffect(()=>{ 
        const dataArray = GetCurrentArray(analysisStore) as Float16Array
        if (dataArray.length <= 1 || isFlat){
            return;
        }
        setShowLoading(true)

        async function Benchmark(useCPU: boolean){
            if (getBufferSpeed){
                for (let i=0; i< 20; i++){
                    await BufferCopy(dataArray, dataShape)
                }
            } else if (useCPU){
                for (let i=0; i< 20; i++){
                   await CPUConvolve(dataArray, {shape:dataShape, strides}, {kernelDepth, kernelSize})
                }
            } else{
                console.log("not here")
                for (let i=0; i< 20; i++){
                    await Convolve(dataArray, {shape:dataShape, strides}, 'StDevConvolution', {kernelDepth, kernelSize})
                }
            }
            return null
        }
        const startTime = Date.now()
        Benchmark(useCPU).then(()=> {
            const endTime = Date.now()
            const elapsedTime = ((endTime-startTime)/20)/1000 // 1000 is milliseconds => seconds
            console.log(elapsedTime)
            if (getBufferSpeed){
                setBufferSpeed(elapsedTime)
            } else if (useCPU){
                setCpuTime(elapsedTime)
            } else{
                console.log("not here2")
                setGpuTime(elapsedTime)
            }
            setShowLoading(false)
        })
    },[execute])


  return null
    
}

export default AnalysisWG

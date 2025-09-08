"use client";
import { ArrayMinMax, GetCurrentArray } from '@/utils/HelperFuncs';
import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { DataReduction, Convolve, Multivariate2D, Multivariate3D, CUMSUM3D, Convolve2D } from '../computation/webGPU'
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
    const {useCPU, execute, operation, useTwo, variable2, 
                valueScalesOrig, kernelSize, kernelDepth, kernelOperation, analysisStore, analysisMode, analysisArray,
                setCpuTime, setGpuTime,
        setValueScalesOrig, setAnalysisArray, setAnalysisMode} = useAnalysisStore(useShallow(state => ({
        axis: state.axis,
        execute: state.execute,
        operation: state.operation,
        useTwo: state.useTwo,
        variable2: state.variable2,
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
        setAnalysisMode: state.setAnalysisMode
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

            if (useCPU){
                for (let i=0; i< 20; i++){
                    CPUConvolve(dataArray, {shape:dataShape, strides}, {kernelDepth, kernelSize})
                }
            } else{
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
            if (useCPU){
                setCpuTime(elapsedTime)
            } else{
                setGpuTime(elapsedTime)
            }
            setShowLoading(false)
        })
    },[execute])

    //2D computations
    useEffect(()=>{
        const dataArray = GetCurrentArray(analysisStore) as Float16Array
        if (dataArray.length <= 1 || !isFlat){
            return;
        }
        setShowLoading(true)
        if (!useTwo){
            if (operation != 'Convolution'){
                //Future Proof
            }
            else{
                const thisShape = dataShape.length > 2 ? dataShape.slice(1) : dataShape // This may seem counter-productive since we can't get here if "isFlat". However, if 3D data was flattened the original shapes are still 3D
                const thisStrides = strides.length > 2 ? strides.slice(1) : strides
                Convolve2D(analysisMode ? analysisArray : dataArray, {shape:thisShape, strides:thisStrides}, kernelOperation, kernelSize).then(newArray=>{
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
                    const newText = new THREE.DataTexture(textureData, thisShape[1], thisShape[0], THREE.RedFormat, THREE.UnsignedByteType)
                    newText.needsUpdate = true;
                    setAnalysisArray(newArray);
                    setTexture(newText);
                    setAnalysisMode(true);
                    setShowLoading(false);
                })
            }
        }
    },[execute])

  return null
    
}

export default AnalysisWG

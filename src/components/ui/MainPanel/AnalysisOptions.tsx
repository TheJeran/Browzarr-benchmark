'use client';
import React, { useEffect, useState } from 'react'
import { useAnalysisStore, useGlobalStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import '../css/MainPanel.css'
import { PiFileMagnifyingGlass } from "react-icons/pi";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from '../button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const operations = ['Mean', 'Min', 'Max', 'StDev', 'Convolution']
const kernelOperations = ['Mean', 'Min', 'Max', 'StDev' ]

const webGPUError = <div className='m-0 p-5 font-sans flex-column justify-center items-center'>
        <span className='text-5xl mb-4 block self-center'>⚠️</span>
        <h1 className="text-2xl font-bold mb-4">WebGPU Not Available</h1>
        <p className="text-base leading-relaxed mb-1 opacity-95">
            WebGPU is not supported or enabled in your current browser. This feature is required for GPU-accelerated computing.
        </p>
        
        <div className="bg-white bg-opacity-15 rounded-xl border border-white border-opacity-20">
            <h3 className='m-0 mb-4 text-lg font-semibold'>Try These Solutions:</h3>
            <ul className="suggestion-list">
                <li>Switch to a Chrome-based browser (Chrome, Edge, Brave)</li>
                <li>Use Safari on macOS (version 14.1 or later)</li>
                <li>Enable WebGPU in your browser's experimental features</li>
                <li>Update your browser to the latest version</li>
            </ul>
        </div>
    </div>

const AnalysisOptions = () => {
    const plotOn = useGlobalStore(state => state.plotOn)
    const {execute, operation, useTwo, kernelSize, kernelDepth, kernelOperation, axis, 
            setExecute, setAxis, setOperation, setUseTwo, setVariable2, setKernelSize, 
            setKernelDepth, setKernelOperation, setAnalysisMode} = useAnalysisStore(useShallow(state => ({
        execute: state.execute,
        operation: state.operation,
        useTwo: state.useTwo,
        kernelSize: state.kernelSize,
        kernelDepth: state.kernelDepth,
        kernelOperation: state.kernelOperation,
        axis: state.axis,

        setExecute: state.setExecute,
        setAxis: state.setAxis,
        setOperation: state.setOperation,
        setUseTwo: state.setUseTwo,
        setVariable2: state.setVariable2,
        setKernelSize: state.setKernelSize,
        setKernelDepth: state.setKernelDepth,
        setKernelOperation: state.setKernelOperation,
        setAnalysisMode: state.setAnalysisMode
    })))
    const {variables, dimNames} = useGlobalStore(useShallow(state => ({
        variables: state.variables,
        dimNames: state.dimNames
    })))

    const [showError, setShowError] = useState<boolean>(false);
    
    useEffect(()=>{
        const checkWebGPU = async () => {
      if (!navigator.gpu) {
        setShowError(true);
        return;
      }

      try {
        const adapter = await navigator.gpu.requestAdapter();
        setShowError(false);
      } catch {
        setShowError(true);
      }
    };

    checkWebGPU();

    },[plotOn])

  return (
    <Popover >
        <PopoverTrigger disabled={!plotOn} style={{position:'absolute', bottom:'100%'}}>
            <PiFileMagnifyingGlass 
                color={plotOn ? '' : 'var(--text-disabled)'}
                style={{
                cursor: plotOn ? 'pointer' : 'auto',
                transform: plotOn ? '' : 'scale(1)'
                }}
                
                className='panel-item'/>
        </PopoverTrigger>
        <PopoverContent
            side='left'
            className='analysis-info'
        >
            { showError ? webGPUError : <>
            <Button onClick={e=>setUseTwo(!useTwo)}>{useTwo ? 'Use One \n Variable' : 'Use Two Variables'}</Button>

            <table style={{textAlign:'right'}} >
                <tbody>
                <tr>
                    <th>
                        {useTwo && 'Second Variable'}
                    </th>
                    <td>
                        {useTwo && <Select onValueChange={e=>setVariable2(e)}>
                            <SelectTrigger style={{width:'175px', marginLeft:'10px'}}>
                                <SelectValue placeholder='Select...' />
                            </SelectTrigger>
                            <SelectContent >
                                {variables.map((e, idx)=>(
                                    <SelectItem key={idx} value={e}>{e}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>}
                    </td>
                </tr>
                <tr>
                    <th>Operation</th>
                    <td>
                        <Select onValueChange={e=>setOperation(e)}>
                            <SelectTrigger style={{width:'175px', marginLeft:'10px'}}>
                                <SelectValue placeholder={operation == 'Default' ? 'Select...' : operation }/>
                            </SelectTrigger>
                            <SelectContent>
                                {operations.map((e, idx)=>(
                                    <SelectItem key={idx} value={e}>{e}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </td>
                </tr>
                {operation != 'Convolution' && <tr>
                    <th> Axis </th>
                    <td>
                        <Select onValueChange={e=>setAxis(parseInt(e))}>
                            <SelectTrigger style={{width:'175px', marginLeft:'10px'}}>
                                <SelectValue placeholder={dimNames[axis]} />
                            </SelectTrigger>
                            <SelectContent>
                                {dimNames.map((e, idx)=>(
                                    <SelectItem key={idx} value={String(idx)}>{e}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </td>
                </tr>}
                {operation == "Convolution" &&<>
                <tr>
                    <th>Kernel Op.</th>
                    <td>
                        <Select onValueChange={e=>setKernelOperation(e)}>
                            <SelectTrigger style={{width:'175px', marginLeft:'10px'}}>
                                <SelectValue placeholder={kernelOperation == 'Default' ? 'Select...' : kernelOperation} />
                            </SelectTrigger>
                            <SelectContent>
                                {kernelOperations.map((e, idx)=>(
                                    <SelectItem key={idx} value={e}>{e}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </td>
                </tr>
                <tr>
                    <th>Kernel Size</th>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td style={{textAlign: 'center', width:'50px'}}>Size</td> 
                                <td style={{textAlign: 'center', width:'50px'}}>Depth</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>
                                    <Select onValueChange={e=>setKernelSize(parseInt(e))}>
                                        <SelectTrigger style={{width:'69px', marginLeft:'10px'}}>
                                            <SelectValue placeholder={kernelSize} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 3, 5, 7].map((e, idx)=>(
                                                <SelectItem key={idx} value={String(e)}>{e}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td style={{textAlign: 'center'}}>
                                    <Select onValueChange={e=>setKernelDepth(parseInt(e))}>
                                        <SelectTrigger style={{width:'69px', marginLeft:'10px'}}>
                                            <SelectValue placeholder={kernelDepth} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 3, 5, 7].map((e, idx)=>(
                                                <SelectItem key={idx} value={String(e)}>{e}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                    
                </tr>
                </>}
                </tbody>
            </table>
            <Button 
                disabled={operation == 'Default' || (operation == 'Convolution' && kernelOperation == 'Default')}
                onClick={e=>{setExecute(!execute); setAnalysisMode(true)}}>Execute</Button>
            </>}
        </PopoverContent>
    </Popover>
    
      
  )
}

export default AnalysisOptions

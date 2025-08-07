'use client';
import React, { useState } from 'react'
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

const AnalysisOptions = () => {
    const {execute, operation, useTwo, kernelSize, kernelDepth, axis, setExecute, setAxis, setOperation, setUseTwo, setVariable2, setKernelSize, setKernelDepth, setAnalysisMode} = useAnalysisStore(useShallow(state => ({
        execute: state.execute,
        operation: state.operation,
        useTwo: state.useTwo,
        kernelSize: state.kernelSize,
        kernelDepth: state.kernelDepth,
        axis: state.axis,

        setExecute: state.setExecute,
        setAxis: state.setAxis,
        setOperation: state.setOperation,
        setUseTwo: state.setUseTwo,
        setVariable2: state.setVariable2,
        setKernelSize: state.setKernelSize,
        setKernelDepth: state.setKernelDepth,
        setAnalysisMode: state.setAnalysisMode
    })))
    const {variables, dimNames} = useGlobalStore(useShallow(state => ({
        variables: state.variables,
        dimNames: state.dimNames
    })))

  return (
    <Popover >
        <PopoverTrigger style={{position:'absolute', bottom:'100%'}}>
            <PiFileMagnifyingGlass className='panel-item'/>
        </PopoverTrigger>
        <PopoverContent
            side='left'
            className='analysis-info'
        >
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
                        <Select onValueChange={e=>setOperation(e)}>
                            <SelectTrigger style={{width:'175px', marginLeft:'10px'}}>
                                <SelectValue placeholder='Select...' />
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
                                    <Select onValueChange={e=>console.log(e)}>
                                        <SelectTrigger style={{width:'69px', marginLeft:'10px'}}>
                                            <SelectValue placeholder={kernelSize} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[3, 5, 7].map((e, idx)=>(
                                                <SelectItem key={idx} value={String(e)}>{e}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td style={{textAlign: 'center'}}>
                                    <Select onValueChange={e=>console.log(e)}>
                                        <SelectTrigger style={{width:'69px', marginLeft:'10px'}}>
                                            <SelectValue placeholder={kernelDepth} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[3, 5, 7].map((e, idx)=>(
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
            <Button onClick={e=>{setExecute(!execute); setAnalysisMode(true)}}>Execute</Button>

        </PopoverContent>
    </Popover>
    
      
  )
}

export default AnalysisOptions

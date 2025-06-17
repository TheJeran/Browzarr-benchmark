"use client";
import './css/Analysis.css'
import React, {useEffect, useState} from 'react'
import { useAnalysisStore, useGlobalStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const oneVarOps = [
    "Mean",
    "Min",
    "Max",
    "StDev"
]

const twoVarOps = [
    "Correlation"
]

const axes = [0,1,2]

const AnalysisOptions = React.memo(function AnalysisOptions() {
    const {setAxis, setVariable1, setVariable2, setOperation, variable1, variable2, operation, axis} = useAnalysisStore(useShallow(state => ({
        setAxis: state.setAxis,
        setVariable1: state.setVariable1,
        setVariable2: state.setVariable2,
        setOperation: state.setOperation,
        setExecute: state.setExecute,
        execute: state.execute,
        variable1: state.variable1,
        variable2: state.variable2,
        operation: state.operation,
        axis: state.axis
    })))


    const {variables, zMeta} = useGlobalStore(useShallow(state => ({variables: state.variables, zMeta: state.zMeta})))

    const [useTwo, setUseTwo] = useState<boolean>(false)
    const [operations, setOperations] = useState<string[]>(oneVarOps)
    const [validVals, setValidVals] = useState<string[]>([]) // This will hold variables that are 3D or greater 

    useEffect(()=>{
        const validMets = zMeta.filter((val : any)=> val.shape.length >= 3)
        const valids = validMets.map((val : any) => val.name)
        setValidVals(valids)
    },[])

    useEffect(()=>{
        if (useTwo){
            setOperations(twoVarOps); 
            setOperation("Correlation")
        }
        else {
            setVariable2("Default") //This reset variable2 when going back to one variable
            setOperations(oneVarOps);
            setOperation("Mean")
        }
        
    },[useTwo])

    function VariableSelect({variable, setVariable} : {variable: string, setVariable : (value: string) => void}) {
        return(
            <>
            <Select onValueChange={e=>setVariable(e)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={variable === "Default" ? "Select a variable" : variable} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Variables</SelectLabel>
                    {validVals.map((val,idx)=>(
                        <SelectItem value={val} key={idx} >{val}</SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
        )
    }

    return(
        <>
        <div className="analysis-options"
            style={{
                top:variable1 === "Default" ? "49%" : "1%"
            }}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Button className=" cursor-pointer" variant="outline">Analyze</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 items-center" align="center">
                    <DropdownMenuLabel>Variable</DropdownMenuLabel>
                    <DropdownMenuGroup onClick={e => e.preventDefault()}>
                        <DropdownMenuItem>
                            <VariableSelect variable={variable1} setVariable={setVariable1} />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {useTwo && <VariableSelect variable={variable2} setVariable={setVariable2} />}
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <Button variant="outline" onClick={(e)=>{e.preventDefault(); setUseTwo(!useTwo)}}>{useTwo ? "Use One Variable" : "Use Two Variables"}</Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                    <DropdownMenuGroup onClick={e => e.preventDefault()}>
                        <DropdownMenuItem >
                        <Select onValueChange={e=>setOperation(e)}>
                            <SelectTrigger className="w-[180px]">
                                <label htmlFor="">Operation</label>
                                <SelectValue placeholder={operation} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Operation</SelectLabel>
                                {operations.map((val,idx)=>(
                                    <SelectItem value={val} key={idx} >{val}</SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <Select onValueChange={e=>setAxis(parseInt(e))}>
                            <SelectTrigger className="w-[180px]">
                                <label htmlFor="">Axis</label>
                                <SelectValue placeholder={String(axis)} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Axis</SelectLabel>
                                {axes.map((val,idx)=>(
                                    <SelectItem value={String(val)} key={idx} >{val}</SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </>
    )
})

export default AnalysisOptions


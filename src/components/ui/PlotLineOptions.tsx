import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import './css/PlotLineOptions.css'

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
import { usePlotStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'

const PlotLineOptions = () => {

    const {showPoints, linePointSize, lineWidth, setShowPoints, setLinePointSize, setLineWidth} = usePlotStore(useShallow(state => ({
        showPoints: state.showPoints,
        linePointSize: state.linePointSize,
        lineWidth: state.lineWidth,
        setShowPoints: state.setShowPoints,
        setLinePointSize: state.setLinePointSize,
        setLineWidth: state.setLineWidth
    })))

  return (
    <div className='plotline-options'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
            <Button className=" cursor-pointer" variant="outline">Line Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 items-center" align="center">
            <DropdownMenuGroup onClick={e => e.preventDefault()}>
                <DropdownMenuItem >
                    <Button variant="outline" onClick={(e)=>{e.preventDefault(); setShowPoints(!showPoints)}}>{showPoints ? "Hide Points" : "Show Points"}</Button>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        <DropdownMenuSeparator/>
            <DropdownMenuGroup onClick={e => e.preventDefault()}>
                {showPoints && <DropdownMenuItem >
                <div className='w-full flex-col items-center'>
                    <p>Point Size</p>
                    <input type="range"
                        min={1}
                        max={20}
                        step={.5}
                        defaultValue={linePointSize} 
                    onChange={e => setLinePointSize(parseFloat(e.target.value))}
                    />
                </div>
                </DropdownMenuItem>}
                <DropdownMenuItem onClick={e => e.preventDefault()}>
                <div className='w-full flex-col items-center'>
                    <p>Line Width</p>
                    <input type="range"
                        min={1}
                        max={10}
                        step={.2}
                        defaultValue={lineWidth} 
                    onChange={e => setLineWidth(parseFloat(e.target.value))}
                    />
                </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={e => e.preventDefault()}>
                <div className='w-full flex-col items-center'>
                    <p>Point Color</p>
                    <input type="color" id="head" name="head" value="#e66465" onChange={e=>console.log(e)}/>
                </div>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default PlotLineOptions

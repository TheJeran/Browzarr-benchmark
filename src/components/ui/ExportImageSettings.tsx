import React from 'react'
import { IoImage } from "react-icons/io5";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "./input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useImageExportStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from './button';

const ExportImageSettings = () => {
    const {
        includeBackground,
        includeColorbar,
        doubleSize,
        cbarLoc,
        cbarNum,
        useCustomRes,
        customRes,
        includeAxis,
        ExportImg, 
        setIncludeBackground, 
        setIncludeColorbar, 
        setDoubleSize,
        setCbarLoc,
        setCbarNum,
        setUseCustomRes,
        setCustomRes,
        setIncludeAxis,
        setHideAxis,
        setHideAxisControls

    } = useImageExportStore(useShallow(state => ({
          includeBackground: state.includeBackground,
          includeColorbar: state.includeColorbar,
          doubleSize: state.doubleSize,
          cbarLoc: state.cbarLoc,
          cbarNum: state.cbarNum,
          useCustomRes: state.useCustomRes,
          customRes: state.customRes,
          includeAxis: state.includeAxis,

          ExportImg: state.ExportImg,
          setIncludeBackground: state.setIncludeBackground,
          setIncludeColorbar: state.setIncludeColorbar,
          setDoubleSize: state.setDoubleSize,
          setCbarLoc: state.setCbarLoc,
          setCbarNum: state.setCbarNum,
          setUseCustomRes: state.setUseCustomRes,
          setCustomRes: state.setCustomRes,
          setIncludeAxis: state.setIncludeAxis,
          setHideAxis: state.setHideAxis,
          setHideAxisControls: state.setHideAxisControls
      })))

    interface CapitalizeFn {
        (str: string): string;
    }

    const capitalize: CapitalizeFn = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Popover>
        <PopoverTrigger asChild>
            <div>
            <Tooltip delayDuration={500} >
                <TooltipTrigger asChild>
                <Button 
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                >
                    <IoImage className="size-8"/>
                </Button>
                </TooltipTrigger>
                <TooltipContent side="right" align="start">
                Export view as Image
                </TooltipContent>
            </Tooltip>
            </div>
        </PopoverTrigger>
        <PopoverContent
            side="right"
            className="w-[200px] select-none"
        >
            <div className="grid grid-cols-[auto_60px] items-center gap-2">
            <label htmlFor="includeBG">Include Background</label>
            <Input id='includeBG' type="checkbox" checked={includeBackground} onChange={e => setIncludeBackground(e.target.checked)}/>
            <label htmlFor="includeBG">Include Axis</label>
            <Input id='includeBG' type="checkbox" checked={includeAxis} onChange={e => setIncludeAxis(e.target.checked)}/>
            <label htmlFor="includeCbar">Include Colorbar</label>
            <Input id='includeCbar' type="checkbox" checked={includeColorbar} onChange={e => setIncludeColorbar(e.target.checked)}/>
            {includeColorbar &&
            <>
            <div  className='col-span-2 flex justify-between'>
                <label htmlFor="colorbar-loc ">Colorbar <br/> Location</label>
                <div id='colorbar-loc'>
                    <Select value={cbarLoc} onValueChange={e=>setCbarLoc(e)}>
                        <SelectTrigger >
                            <SelectValue placeholder={cbarLoc}/>
                        </SelectTrigger>
                        <SelectContent>
                            {['left', 'right', 'top', 'bottom'].map((val)=>(
                                <SelectItem key={val} value={val}>{capitalize(val)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>  
            <label htmlFor="cbarNum" >Number of Ticks</label>
            <Input id='cbarNum' type="number" min={0} max={20} step={1} value={cbarNum} onChange={e => setCbarNum(parseInt(e.target.value))}/>
            </>          
            }
            <label htmlFor="useCustomRes" >Set Resolution</label>
            <Input id='useCustomRes' type="checkbox" checked={useCustomRes} onChange={e => setUseCustomRes(e.target.checked)}/>
            {useCustomRes &&
                <div className='grid grid-cols-[50%_50%] col-span-2 '>
                <div className='flex flex-col items-center'>
                    <h1>Width</h1>
                    <Input id='cbarNum' type="number"  value={customRes[0]} onChange={e => setCustomRes([parseInt(e.target.value), customRes[1]])}/>
                </div>
                <div className='flex flex-col items-center'>
                    <h1>Height</h1>
                    <Input id='cbarNum' type="number"  value={customRes[1]} onChange={e => setCustomRes([customRes[0], parseInt(e.target.value)])}/>
                </div>
            </div>}
            {!useCustomRes &&
            <>
            <label htmlFor="includeCbar" >Double Resolution</label>
            <Input id='includeCbar' type="checkbox" checked={doubleSize} onChange={e => setDoubleSize(e.target.checked)}/>
            </>}
            <Button
                className="col-span-2"
                variant='pink'
                onClick={e=>{ExportImg(); setHideAxisControls(true); setHideAxis(!includeAxis)}}
            >Export</Button>
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default ExportImageSettings

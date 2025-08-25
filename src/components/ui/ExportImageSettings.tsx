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
        ExportImg, 
        setIncludeBackground, 
        setIncludeColorbar, 
        setDoubleSize,
        setCbarLoc
    } = useImageExportStore(useShallow(state => ({
          includeBackground: state.includeBackground,
          includeColorbar: state.includeColorbar,
          doubleSize: state.doubleSize,
          cbarLoc: state.cbarLoc,

          ExportImg: state.ExportImg,
          setIncludeBackground: state.setIncludeBackground,
          setIncludeColorbar: state.setIncludeColorbar,
          setDoubleSize: state.setDoubleSize,
          setCbarLoc: state.setCbarLoc
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
            <div className="grid grid-cols-[auto_70px] items-center gap-2">
            <label htmlFor="includeBG">Include Background</label>
            <Input id='includeBG' type="checkbox" checked={includeBackground} onChange={e => setIncludeBackground(e.target.checked)}/>
            <label htmlFor="includeCbar">Include Colorbar</label>
            <Input id='includeCbar' type="checkbox" checked={includeColorbar} onChange={e => setIncludeColorbar(e.target.checked)}/>
            {includeColorbar &&
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
            }
            <label htmlFor="includeCbar" >Double Resolution</label>
            <Input id='includeCbar' type="checkbox" checked={doubleSize} onChange={e => setDoubleSize(e.target.checked)}/>
            <Button
                className="col-span-2"
                variant='pink'
                onClick={e=>ExportImg()}
            >Export</Button>
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default ExportImageSettings

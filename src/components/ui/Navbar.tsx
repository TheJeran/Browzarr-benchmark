"use client";
import React, { useMemo } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { IoIosCheckmark } from "react-icons/io";
import { ZARR_STORES } from "../zarr/ZarrLoaderLRU";
import Image from "next/image";
import { AboutButton, PlotTweaker, PlotLineButton, LocalZarr } from "@/components/ui";
import ThemeSwitch  from "@/components/ui/ThemeSwitch";
import logo from "@/app/logo.png"
import './css/Navbar.css'
import { useShallow } from "zustand/shallow";
import { useGlobalStore, usePlotStore } from "@/utils/GlobalStates";
import { colormaps } from '@/components/textures';
import { useEffect, useState } from "react";
import { GetColorMapTexture } from "@/components/textures";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "./input";
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ColorMaps = ({cmap, setCmap} : {cmap : string, setCmap : React.Dispatch<React.SetStateAction<string>>}) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>    
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
        >
          {cmap === "Default" ?  "Select Colormap..." : cmap }
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No Colormap found.</CommandEmpty>
            <CommandGroup>
              {colormaps.map((value) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(currentValue) => {
                    setCmap(currentValue)
                    setOpen(false);
                  }}
                >
                  <IoIosCheckmark
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === cmap ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )

}

const Navbar = React.memo(function Navbar(){
  const {setInitStore, setVariable, setColormap, setTimeSeries, setDimCoords, isFlat, plotOn, variables, variable} = useGlobalStore(
    useShallow(state=>({
      setInitStore : state.setInitStore, 
      setVariable : state.setVariable,
      setColormap : state.setColormap,
      setTimeSeries: state.setTimeSeries,
      setDimCoords: state.setDimCoords,
      isFlat: state.isFlat,
      plotOn: state.plotOn,
      variables: state.variables,
      variable: state.variable
    })))


  const {setPlotType, plotType, resetCamera, setAnimate, setResetCamera} = usePlotStore(useShallow(state=> ({
    setPlotType: state.setPlotType,
    plotType: state.plotType,
    resetCamera: state.resetCamera,
    setAnimate: state.setAnimate,
    setResetCamera: state.setResetCamera
  })))

  const [showStoreInput, setShowStoreInput] = useState<boolean>(false)
  const [showLocalInput, setShowLocalInput] = useState<boolean>(false)
  const [cmap, setCmap] = useState<string>("Default")
  const [flipCmap, setFlipCmap] = useState<boolean>(false)
  const colormap = useGlobalStore(useShallow(state=>state.colormap))

  useEffect(()=>{
    setColormap(GetColorMapTexture(colormap, cmap === "Default" ? "Spectral" : cmap, 1, "#000000", 0, flipCmap));
  },[cmap, flipCmap])
  
  const Tweak = useMemo(()=><PlotTweaker/> ,[])
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="https://github.com/EarthyScience/Browzarr/" target="_blank" rel="noopener noreferrer">
          <Image src={logo} alt="browzarr" />
        </a>
        
        {plotOn && <Button onClick={()=>setResetCamera(!resetCamera)}>Reset Camera</Button>}
      
      {/* {!isFlat && plotOn && <PlotTweaker/>} */}
      {plotOn && !isFlat && <PlotLineButton />}
      
      </div>
      <ThemeSwitch />
      <AboutButton />
    </nav>
  );
});

export default Navbar;
"use client";

import Image from "next/image";
import { AboutButton } from "@/components/ui";
import ThemeSwitch  from "@/components/ui/ThemeSwitch";
import logo from "@/app/logo.png"
import './css/Navbar.css'
import { useShallow } from "zustand/shallow";
import { useGlobalStore, usePlotStore } from "@/utils/GlobalStates";
import { colormaps } from '@/components/textures';
import { useEffect, useState } from "react";
import { GetColorMapTexture } from "@/components/textures";
import { Button } from "@/components/ui/button"
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Navbar = () => {
  const {setInitStore, setVariable, setColormap} = useGlobalStore(
    useShallow(state=>({
      setInitStore : state.setInitStore, 
      setVariable : state.setVariable,
      setColormap : state.setColormap
    
    })))
  const variables = useGlobalStore(useShallow(state=>state.variables))
  const setPlotType = usePlotStore(state=> state.setPlotType)
  const [cmap, setCmap] = useState<string>("viridis")

  // useEffect(()=>{
  //     setColormap(GetColorMapTexture(colormap, settings.cmap, 1, "#000000", 0, settings.flipCmap));
  //   },[settings.cmap,  colormap, settings.flipCmap, setColormap])
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="https://github.com/EarthyScience/Browzarr/" target="_blank" rel="noopener noreferrer">
          <Image src={logo} alt="browzarr" />
        </a>
        <div className="nav-dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Datasets</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={e=>console.log("setting to ESDC")}>
                  ESDC
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={e=>console.log("setting to Seasfire")}>
                  Seasfire
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={e=>console.log("setting to Personal and showing text field")}>
                  Personal
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuLabel>Plot Options</DropdownMenuLabel>
              <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Plot Type</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onSelect={()=> setPlotType("volume") }>Volume</DropdownMenuItem>
                      <DropdownMenuItem onSelect={()=> setPlotType("point-cloud") }>Point Cloud</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

              <DropdownMenuSub>
                  <Select onValueChange={e=>setCmap(e)}>
                    <SelectTrigger className="w-[100%]">
                      <SelectValue placeholder="Select a Colormap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>ColorMaps</SelectLabel>
                        {colormaps.map((val,idx)=>(
                          <SelectItem value={val} key={idx} >{val}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>


        <Select onValueChange={e=>setVariable(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a variable" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Variables</SelectLabel>
              {variables.map((val,idx)=>(
                <SelectItem value={val} key={idx} >{val}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ThemeSwitch />
      <AboutButton />
    </nav>
  );
};

export default Navbar;
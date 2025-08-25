"use client";
import React from "react";
import Image from "next/image";
import { PlotLineButton } from "@/components/ui";
import ThemeSwitch  from "@/components/ui/ThemeSwitch";
import logo from "@/app/logo.png"
import './css/Navbar.css'
import { useShallow } from "zustand/shallow";
import { useGlobalStore, useImageExportStore, usePlotStore } from "@/utils/GlobalStates";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MdFlipCameraIos } from "react-icons/md";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import AboutInfo from "@/components/ui/AboutInfo";
import { IoImage } from "react-icons/io5";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "./input";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


// Custom rotating five-dots icon
const FiveDotsIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Grey, Red, Green, Gold, Pink arranged on a pentagon */}
      <circle cx="50" cy="20" r="12" fill="#9CA3AF" />
      <circle cx="78.53" cy="40.73" r="12" fill="#EF4444" />
      <circle cx="67.63" cy="74.27" r="12" fill="#10B981" />
      <circle cx="32.37" cy="74.27" r="12" fill="#F59E0B" />
      <circle cx="21.47" cy="40.73" r="12" fill="#EC4899" />
    </svg>
  );
};

const Navbar = React.memo(function Navbar(){
  const { isFlat, plotOn} = useGlobalStore(
    useShallow(state=>({
      isFlat: state.isFlat,
      plotOn: state.plotOn,
    })))

  const {
    includeBackground,
    includeColorbar,
    doubleSize,
    ExportImg, 
    setIncludeBackground, 
    setIncludeColorbar, 
    setDoubleSize} = useImageExportStore(useShallow(state => ({
      includeBackground: state.includeBackground,
      includeColorbar: state.includeColorbar,
      doubleSize: state.doubleSize,
      ExportImg: state.ExportImg,
      setIncludeBackground: state.setIncludeBackground,
      setIncludeColorbar: state.setIncludeColorbar,
      setDoubleSize: state.setDoubleSize
  })))


  const {resetCamera,setResetCamera} = usePlotStore(useShallow(state=> ({
    resetCamera: state.resetCamera,
    setResetCamera: state.setResetCamera
  })))

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const navRef = useRef<HTMLElement | null>(null)

  
  return (
    <nav className="navbar" ref={navRef}>
      <Tooltip delayDuration={500} >
        <TooltipTrigger asChild>
           <Button
            variant="ghost"
            size="icon"
            className="navbar-trigger size-10"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <FiveDotsIcon className="navbar-trigger-icon rotating size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="start">
          {isOpen ? 'Close navigation' : 'Open navigation'}
        </TooltipContent>
      </Tooltip>

      <div className={cn("navbar-content", isOpen ? "open" : "closed")}>        
        <div className="navbar-left">
          <Drawer>
            <DrawerTrigger asChild>
              <div>
                <Tooltip delayDuration={500} >
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      tabIndex={0}
                      title="About Browzarr">
                        <Image src={logo} alt="browzarr" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="start">
                    <span>About BrowZarr</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </DrawerTrigger>
            <DrawerContent className="max-w-md mx-auto">
              <DrawerHeader>
                <DrawerTitle>About</DrawerTitle>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <AboutInfo />
              </div>
            </DrawerContent>
          </Drawer>
          
          {plotOn && (
            <Tooltip delayDuration={500} >
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 cursor-pointer"
                  tabIndex={0}
                  onClick={() => setResetCamera(!resetCamera)}
                >
                  <MdFlipCameraIos className="size-8" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" align="start">
                <span>Reset camera view</span>
              </TooltipContent>
            </Tooltip>

          )}
          {plotOn && !isFlat && <PlotLineButton />}
          {plotOn && 
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
              className="w-[200px]"
            >
              <div className="grid grid-cols-[auto_50px] items-center gap-2">
                <label htmlFor="includeBG">Include Background</label>
                <Input id='includeBG' type="checkbox" checked={includeBackground} onChange={e => setIncludeBackground(e.target.checked)}/>
                <label htmlFor="includeCbar">Include Colorbar</label>
                <Input id='includeCbar' type="checkbox" checked={includeColorbar} onChange={e => setIncludeColorbar(e.target.checked)}/>
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
          
          }
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
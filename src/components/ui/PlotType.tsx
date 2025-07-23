"use client";

import React, { useEffect, useState } from 'react'
import './css/MainPanel.css'
import { usePlotStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { PiSphereThin } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { PiCubeLight } from "react-icons/pi";
import { MdOutlineSquare } from "react-icons/md";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import Image from 'next/image';

const plotTypes = ['volume', 'point-cloud', 'sphere', 'flat']
const plotIcons = {
  'volume': <PiCubeLight size={48} />,
  'point-cloud': <CgMenuGridO size={48} />,
  'sphere':<PiSphereThin size={48} />,
  'flat':<MdOutlineSquare size={48} />
}

const PlotType = ({currentOpen, setOpen}: {currentOpen: string, setOpen: React.Dispatch<React.SetStateAction<string>>}) => {
  const { plotType, setPlotType } = usePlotStore(useShallow(state => ({
    plotType: state.plotType,
    setPlotType: state.setPlotType
  })))

  // Responsive popover side
  const [popoverSide, setPopoverSide] = useState<"left" | "top">("left");
  useEffect(() => {
    const handleResize = () => {
      setPopoverSide(window.innerWidth < 768 ? "top" : "left");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => setOpen('plot-type')}
          tabIndex={0}
          aria-label="Select plot type"
        >
          {plotIcons[plotType as keyof typeof plotIcons]}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={popoverSide}
        className="flex flex-col items-center min-w-[48px] max-w-[72px] w-[56px] p-2"
      >
        {plotTypes.map(val => (
          <Button
            key={val}
            variant={plotType === val ? "default" : "ghost"}
            className="mb-2 w-12 h-12 flex items-center justify-center"
            onClick={() => {
              setPlotType(val);
              setOpen('default');
            }}
            aria-label={`Select ${val}`}
          >
            {plotIcons[val as keyof typeof plotIcons]}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default PlotType

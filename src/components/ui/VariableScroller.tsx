import * as React from "react"
import { useEffect, useState } from "react"
import { useGlobalStore } from '@/utils/GlobalStates'
import { GetZarrMetadata } from '../zarr/GetMetadata'
import { ZarrDataset } from '../zarr/ZarrLoaderLRU'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formatArray = (value: string | number[]): string => {
  if (typeof value === 'string') return value
  return Array.isArray(value) ? value.join(', ') : String(value)
}

const PopoverCard = ({ meta, isOpen, onOpenChange }: { meta: any, isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
  const setVariable = useGlobalStore(state => state.setVariable)

  const exceedsThreshold = meta.totalSize > 1e8 // Example threshold: 100 MB

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline">{meta.name}</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-md min-w-[300px]">
        <div className="space-y-1 text-sm">
          <div>
            <b>Long Name:</b> {meta.long_name}
          </div>
          <div>
            <b>Shape:</b> [{formatArray(meta.shape)}]
          </div>
          <div>
            <b>dtype:</b> {meta.dtype}
          </div>
          <div>
            <b>Total Size:</b>{" "}
            <span
              className={exceedsThreshold ? "text-red-500" : ""}
              title={exceedsThreshold ? "Too large to plot efficiently" : ""}
            >
              {meta.totalSizeFormatted}
            </span>
          </div>
          <div>
            <b>Chunk Shape:</b> [{formatArray(meta.chunks)}]
          </div>
          <div>
            <b>Chunk Count:</b> {meta.chunkCount}
          </div>
          <div>
            <b>Chunk Size:</b> {meta.chunkSizeFormatted}
          </div>
        </div>
        <div className="pt-2">
          <Button onClick={() => setVariable(meta.name)}>Plot</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const VariableScroller = ({ vars, zarrDS }: { vars: Promise<string[]>, zarrDS: ZarrDataset }) => {
  const [variables, setVariables] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [variable, setVariable] = useState<string>("")
  const [meta, setMeta] = useState<any>(null)
  const [zMeta, setZMeta] = useState<any[]>([])
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newIndex = selectedIndex + (event.deltaY > 0 ? 1 : -1);
    if (newIndex >= 0 && newIndex < variables.length) {
      setSelectedIndex(newIndex);
    }
  };

// TODO: handleTouch for mobile and better transitions, currently is too fast and not really smooth!

  useEffect(() => {
    vars.then((variableList) => {
      setVariables(variableList)
      // Set the middle variable as default selection
      if (variableList.length > 0) {
        const middleIndex = Math.floor(variableList.length / 2)
        setSelectedIndex(middleIndex)
      }
    })
  }, [vars])

  // Update variable when selectedIndex changes
  useEffect(() => {
    if (variables.length > 0 && selectedIndex >= 0 && selectedIndex < variables.length) {
      setVariable(variables[selectedIndex]);

      // Scroll the selected item into view
      document.getElementById(`var-${selectedIndex}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedIndex, variables]);


  useEffect(() => {
    if (zarrDS) {
      //@ts-expect-error groupStore is not exposed
      GetZarrMetadata(zarrDS.groupStore).then(setZMeta)
    }
  }, [zarrDS])

  useEffect(() => {
    if (zMeta && variable) {
      const found = zMeta.find((e: any) => e.name === variable)
      setMeta(found)

      // Only auto-open Popover on desktop
      if (found && !isMobile) {
        setIsPopoverOpen(true)
      } else {
        setIsPopoverOpen(false)
      }
    }
  }, [variable, zMeta, isMobile])


  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        {meta && (
          <div className={`absolute ${isMobile ? "top-8 left-1/2 -translate-x-1/2 z-10" : "left-0"}`}>
            <PopoverCard 
              meta={meta} 
              isOpen={isPopoverOpen} 
              onOpenChange={setIsPopoverOpen} 
            />
          </div>
        )}
        <div 
          className="relative h-[80vh] min-w-[324px] max-w-xl w-full rounded-md border-none overflow-hidden"
          onWheel={handleScroll}
        >
          {/* Scrollable variable list */}
        <ScrollArea className="h-full w-full">
          <div className="p-2 space-y-2">
            {variables.map((name, index) => {
              const distance = Math.abs(selectedIndex - index);
              return (
                <React.Fragment key={name}>
                  <div
                    id={`var-${index}`}
                    className="flex justify-between items-center cursor-pointer transition-opacity"
                    style={{
                      opacity: 1 - distance * 0.2,
                      fontWeight: selectedIndex === index ? "bold" : "normal",
                    }}
                    onClick={() => {
                      setSelectedIndex(index)
                    }}
                  >
                    <span className="text-sm">{name}</span>
                    <Badge variant={selectedIndex === index ? "default" : "outline"}>
                      Select
                    </Badge>
                  </div>
                  <Separator style={{ opacity: 1 - distance * 0.2 }} />
                </React.Fragment>
              );
              }
              )
            }
            </div>
        </ScrollArea>
      </div>
    </div>
  </div>
  )
}

export default VariableScroller
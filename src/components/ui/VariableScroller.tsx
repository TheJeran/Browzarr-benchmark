import * as React from "react"
import { useEffect, useState, useRef } from "react"
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

interface VariableMeta {
  name: string;
  long_name: string;
  shape: number[];
  dtype: string;
  totalSize: number;
  totalSizeFormatted: string;
  chunks: number[];
  chunkCount: number;
  chunkSizeFormatted: string;
}

const formatArray = (value: string | number[]): string => {
  if (typeof value === 'string') return value
  return Array.isArray(value) ? value.join(', ') : String(value)
}

const PopoverCard = ({ meta, isOpen, onOpenChange }: { meta: VariableMeta, isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
  const setVariable = useGlobalStore(state => state.setVariable)

  const exceedsThreshold = meta.totalSize > 1e8 // Example threshold: 100 MB

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline">{meta.name}</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-md min-w-[300px]">
        <div className="space-y-1 text-sm">
          <div><b>Long Name:</b> {meta.long_name}</div>
          <div><b>Shape:</b> [{formatArray(meta.shape)}]</div>
          <div><b>dtype:</b> {meta.dtype}</div>
          <div>
            <b>Total Size:</b>{" "}
            <span
              className={exceedsThreshold ? "text-red-500" : ""}
              title={exceedsThreshold ? "Too large to plot efficiently" : ""}
            >
              {meta.totalSizeFormatted}
            </span>
          </div>
          <div><b>Chunk Shape:</b> [{formatArray(meta.chunks)}]</div>
          <div><b>Chunk Count:</b> {meta.chunkCount}</div>
          <div><b>Chunk Size:</b> {meta.chunkSizeFormatted}</div>
        </div>
        <div className="pt-2">
          <Button onClick={() => setVariable(meta.name)}>Plot</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const VariableScroller = ({ variableLoader, zarrDS }: { variableLoader: () => Promise<string[]>, zarrDS: ZarrDataset }) => {
  const [variables, setVariables] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [variable, setVariable] = useState<string>("");
  const [meta, setMeta] = useState<VariableMeta | null>(null);
  const [zMeta, setZMeta] = useState<VariableMeta[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = event.touches[0].clientY;
  };
  const scrollCooldown = useRef(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (scrollCooldown.current) return;
    scrollCooldown.current = true;
    setTimeout(() => (scrollCooldown.current = false), 60); // time to slow down

    const newIndex = selectedIndex + (event.deltaY > 0 ? 1 : -1);
    if (newIndex >= 0 && newIndex < variables.length) {
      setSelectedIndex(newIndex);
    }
  };
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current !== null) {
      const deltaY = touchStartY.current - event.touches[0].clientY;
      if (Math.abs(deltaY) > 20) {
        const direction = deltaY > 0 ? 1 : -1;
        const newIndex = selectedIndex + direction;
        if (newIndex >= 0 && newIndex < variables.length) {
          setSelectedIndex(newIndex);
          touchStartY.current = null; // Reset to prevent repeated scroll
        }
      }
    }
  };

  useEffect(() => {
    variableLoader().then((variableList) => {
      setVariables(variableList);
      if (variableList.length > 0) {
        setSelectedIndex(Math.floor(variableList.length / 2));
      }
    });
  }, [variableLoader]);

  useEffect(() => {
    if (variables.length > 0 && selectedIndex >= 0 && selectedIndex < variables.length) {
      setVariable(variables[selectedIndex]);
      refs.current[selectedIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedIndex, variables]);

  useEffect(() => {
    if (zarrDS) {
      //@ts-expect-error groupStore is not exposed
      GetZarrMetadata(zarrDS.groupStore).then(setZMeta);
    }
  }, [zarrDS]);

  useEffect(() => {
    if (zMeta && variable) {
      const found = zMeta.find((e: VariableMeta) => e.name === variable);
      setMeta(found || null);
      setIsPopoverOpen(found !== undefined && !isMobile);
    }
  }, [variable, zMeta, isMobile]);


  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        {meta && (
          <div className={`absolute ${isMobile ? "top-8 left-1/2 -translate-x-1/2 z-10" : "left-4"}`}>
            <PopoverCard meta={meta} isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen} />
          </div>
        )}
        <div
          className="relative h-[80vh] min-w-[324px] max-w-xl w-full rounded-md border-none overflow-hidden"
          onWheel={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <ScrollArea className="h-full w-full">
            <div className="p-4 space-y-2">
              {variables.map((name, index) => {
                const distance = Math.abs(selectedIndex - index);
                return (
                  <React.Fragment key={name}>
                    <div
                      ref={el => { refs.current[index] = el; }}
                      className="flex justify-between items-center cursor-pointer transition-opacity"
                      style={{
                        opacity: 1 - distance * 0.2,
                        fontWeight: selectedIndex === index ? "bold" : "normal",
                      }}
                      onClick={() => setSelectedIndex(index)}
                    >
                      <span className="text-sm">{name}</span>
                      <Badge variant={selectedIndex === index ? "default" : "outline"}>Select</Badge>
                    </div>
                    <Separator style={{ opacity: 1 - distance * 0.2 }} />
                  </React.Fragment>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default VariableScroller;
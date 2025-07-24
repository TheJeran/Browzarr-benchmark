"use client";

import React, {useEffect, useState} from 'react'
import { GetColorMapTexture } from '../textures';
import { useGlobalStore } from '@/utils/GlobalStates';
import { colormaps } from '@/components/textures';
import { useShallow } from 'zustand/shallow';
import { MdOutlineSwapVert } from "react-icons/md";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import Image from 'next/image';

const Colormaps = ({ currentOpen, setOpen }: { currentOpen: string; setOpen: React.Dispatch<React.SetStateAction<string>> }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [cmap, setCmap] = useState<string>("Spectral");
  const [flipCmap, setFlipCmap] = useState<boolean>(false);
  const [hoveredCmap, setHoveredCmap] = useState<string | null>(null);
  const { colormap, setColormap } = useGlobalStore(
    useShallow((state) => ({
      setColormap: state.setColormap,
      colormap: state.colormap,
    }))
  );

  useEffect(() => {
    setColormap(
      GetColorMapTexture(colormap, (hoveredCmap || cmap) === "Default" ? "Spectral" : (hoveredCmap || cmap), 1, "#000000", 0, flipCmap)
    );
  }, [cmap, flipCmap, hoveredCmap]);

  useEffect(() => {
    if (currentOpen !== "colormaps") {
      setShowOptions(false);
    }
  }, [currentOpen]);

  return (
    <div className="relative">
      <Popover>
      <PopoverTrigger>
      <div
        onClick={() => {
          setShowOptions((x) => !x);
          setOpen("colormaps");
        }}
      >
        <div
          className="panel-item"
          style={{
            backgroundImage: `url(./colormap_icons/${cmap}.webp)` ,
            backgroundSize: "100%",
            transform: flipCmap ? "scaleX(-1)" : "",
          }}
        />
      </div>
      </PopoverTrigger>
      <PopoverContent
        side={"left"}
        className="colormaps"
      >
            {colormaps.map((val) => (
              <Image
                key={val}
                className={`cmap ${flipCmap ? "flipped" : ""}`}
                src={`./colormap_icons/${val}.webp`}
                alt={val}
                height={100}
                width={256}
                onMouseEnter={() => setHoveredCmap(val)}
                onMouseLeave={() => setHoveredCmap(null)}
                onClick={() => {
                  setCmap(val);
                  setHoveredCmap(null);
                  setShowOptions(false);
                }}
              />
            ))}
        <MdOutlineSwapVert
            className="flipper"
            style={{
              position: "absolute",
              top:"-2rem",
              right: "80%",
              bottom: "90%",
              height: "50px",
              width: "50px",
              cursor: "pointer",
              transform: `${flipCmap ? "rotate(270deg)" : "rotate(90deg)"}`,
              transition: ".25s",
            }}
            onClick={() => setFlipCmap((x) => !x)}
        />
      </PopoverContent>
      
      </Popover>
    </div>
  );
};

export default Colormaps

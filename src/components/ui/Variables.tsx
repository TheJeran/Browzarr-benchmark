"use client";

import React, { useState, useEffect } from "react";
import { TbVariable } from "react-icons/tb";
import { useGlobalStore } from "@/utils/GlobalStates";
import { useShallow } from "zustand/shallow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import MetaDataInfo from "./MetaDataInfo";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

const Variables = () => {
  const [popoverSide, setPopoverSide] = useState<"left" | "top">("left");

  const [showMeta, setShowMeta] = useState(false);
  const { variables, zMeta, setVariable } = useGlobalStore(
    useShallow((state) => ({
      variables: state.variables,
      zMeta: state.zMeta,
      setVariable: state.setVariable,
    }))
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    if (variables && zMeta) {
      const tempVar = variables[selectedIndex];
      const relevant = zMeta.find((e: any) => e.name === tempVar);
      setMeta(relevant);
    }
  }, [selectedIndex, variables]);


  return (
        <Popover>
        <PopoverTrigger>
          <TbVariable className="panel-item"/>
        </PopoverTrigger>
        <PopoverContent
          side={popoverSide}
          className="colormaps"
          style={{gap:'0px', placeItems:'left'}}
        >
            {variables.map((val, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="variable-item cursor-pointer px-2 py-1 text-sm hover:bg-muted rounded"
                  onClick={() => {
                    setSelectedIndex(idx);
                    setShowMeta(true);
                  }}
                >
                  {val}
                </div>
                {/* The below expression is to not have a seperator under last item */}
                {idx != variables.length-1 && <Separator className="my-1" />} 
              </React.Fragment>
            ))}
          {showMeta && meta && (
            <div className="meta-options w-[300px]">
              <MetaDataInfo
                meta={meta}
                setShowMeta={ setShowMeta }
              />
            </div>
          )}
        </PopoverContent>
      </Popover>

  );
};

export default Variables;

"use client";

import React, { useState, useEffect } from "react";
import { TbVariable } from "react-icons/tb";
import { useGlobalStore } from "@/utils/GlobalStates";
import { useShallow } from "zustand/shallow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import MetaDataInfo from "./MetaDataInfo";

const Variables = ({
  currentOpen,
  setOpen,
}: {
  currentOpen: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showOptions, setShowOptions] = useState(false);
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

  useEffect(() => {
    if (currentOpen !== "variables") {
      setShowOptions(false);
      setShowMeta(false);
    }
  }, [currentOpen]);

  return (
    <div className="relative">
      <div
        onClick={() => {
          setShowOptions((x) => !x);
          setShowMeta(false);
          setOpen("variables");
        }}
      >
        <TbVariable className="panel-item"/>
      </div>

      {showOptions && (
        <div
          className="absolute p-2 bg-popover border border-border rounded-md shadow-md z-10 w-fit"
          style={{
            left: "-225px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            gap: "20px",
            overflow: "visible",
          }}
        >

          <ScrollArea className="max-h-[50vh] w-[200px] pr-2">
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
                <Separator className="my-1" />
              </React.Fragment>
            ))}
          </ScrollArea>

          {showMeta && meta && (
            <div className="meta-options w-[300px]">
              <MetaDataInfo
                meta={meta}
                setters={{ setShowMeta, setShowOptions }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Variables;

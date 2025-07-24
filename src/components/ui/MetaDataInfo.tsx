import React, { useState, useMemo, useEffect } from "react"
import { useGlobalStore, useZarrStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import Slider from 'rc-slider'
import { Card } from "@/components/ui/card"
// import { Button } from "./button"
import { Button } from "@/components/ui/button"
const formatArray = (value: string | number[]): string => {
  if (typeof value === 'string') return value
  return Array.isArray(value) ? value.join(', ') : String(value)
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}



const MetaDataInfo = ({ meta, setShowMeta }: { meta: any, setShowMeta: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const setVariable = useGlobalStore(useShallow(state => state.setVariable))
  const { slice, setSlice } = useZarrStore(useShallow(state => ({
    slice: state.slice,
    setSlice: state.setSlice,
  })))


  const totalSize = useMemo(() => meta.totalSize ? meta.totalSize : 0, [meta])
  const length = useMemo(() => meta.shape ? meta.shape[0] : 0, [meta])
  const is3D = useMemo(() => meta.shape ? meta.shape.length > 2 : false, [meta])
  const currentSize = useMemo(() => {
    if (!is3D) return 0
    const firstStep = slice[0] ? slice[0] : 0
    const secondStep = slice[1] ? slice[1] : length
    const timeSteps = secondStep - firstStep
    const xChunks = meta.shape[2] / meta.chunks[2]
    const yChunks = meta.shape[1] / meta.chunks[1]
    const timeChunkSize = xChunks * yChunks * meta.chunkSize
    const chunkTimeStride = meta.chunks ? meta.chunks[0] : 1
    return Math.ceil(timeSteps / chunkTimeStride) * timeChunkSize
  }, [meta, slice])

  return (
    <Card className="meta-container max-w-sm md:max-w-md p-4 mb-4 border border-muted">
      <div className="meta-info">
         <b>Long Name</b> <br/>
                {`${meta.long_name}`}<br/>
                    <br/>
                    <b>Shape</b><br/> 
                    {`[${formatArray(meta.shape)}]`}<br/>
                    <br/>
        {is3D && (
          <>
          
            {totalSize > 1e8 && (
              <>
                <div className="flex justify-center">
                  <b>Select Data Range</b>
                </div>
                <div className="w-full flex flex-col justify-between">
                  <Slider
                    range
                    min={0}
                    max={length}
                    value={[slice[0] ? slice[0] : 0, slice[1] ? slice[1] : length]}
                    step={1}
                    onChange={(values) => setSlice(values as [number, number | null])}
                  />
                  <div className="flex justify-between text-xs mt-4">
                    <span>Min: <br /> <input className='w-[50px]' type="number" value={slice[0]} onChange={e=>setSlice([parseInt(e.target.value), slice[1]])}/></span>
                    <span>Max: <br /> <input className='w-[50px] text-right' type="number" value={slice[1] ? slice[1] : 1} onChange={e=>setSlice([slice[0] , parseInt(e.target.value)])}/></span>
                  </div>
                </div>
              </>
            )}
            <b>Total Size: </b>{formatBytes(currentSize)}<br />
            {currentSize < 1e8 && (
              <span className="bg-green-500 rounded px-2 py-1">Selected data will fit in memory</span>
            )}
            {currentSize > 1e8 && currentSize < 2e8 && (
              <span className="bg-yellow-500 rounded px-2 py-1">Data may not fit in memory</span>
            )}
            {currentSize > 2e8 && (
              <span className="bg-red-400 rounded px-2 py-1">Data will not fit in memory</span>
            )}
          </>
        )}
      </div>
      <Button
        variant={"destructive"}
        className="cursor-pointer hover:scale-[1.05]"
        onClick={() => {
          setVariable(meta.name)
          setShowMeta(false)
        }}
      >
        Plot
      </Button>
    </Card>
  )
}

export default MetaDataInfo
import React, { useState, useMemo, useEffect } from "react"
import { useGlobalStore, useZarrStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import Slider from 'rc-slider'
import { Card } from "@/components/ui/card"
import { Button } from "./button"

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

interface ViewSetters {
  setShowMeta: React.Dispatch<React.SetStateAction<boolean>>
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
}

const MetaDataInfo = ({ meta, setters }: { meta: any, setters: ViewSetters }) => {
  const { setShowMeta, setShowOptions } = setters
  const setVariable = useGlobalStore(useShallow(state => state.setVariable))
  const { slice, setSlice } = useZarrStore(useShallow(state => ({
    slice: state.slice,
    setSlice: state.setSlice,
  })))
  const [warn, setWarn] = useState<boolean>(false)

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

  useEffect(() => {
    setWarn(currentSize > 1e8)
  }, [currentSize])

  return (
    <Card className="meta-container max-w-sm md:max-w-md p-4 mb-4 border border-muted">
      <div className="meta-info">
        {Object.entries(meta).map(([key, value]) => (
          <div key={key} className="mb-2 break-words">
            <b>{key.replace(/_/g, " ")}:</b>{" "}
            {Array.isArray(value)
              ? `[${formatArray(value)}]`
              : typeof value === "object" && value !== null
                ? JSON.stringify(value)
                : String(value)}
          </div>
        ))}
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
                    <span>Min: <br /> {slice[0] ? slice[0] : 0}</span>
                    <span>Max: <br /> {slice[1] ? slice[1] : length}</span>
                  </div>
                </div>
              </>
            )}
            <b>Total Size: </b>{formatBytes(currentSize)}<br />
            {currentSize < 1e8 && (
              <span className="bg-green-200 rounded px-2 py-1">Selected data will fit in memory</span>
            )}
            {currentSize > 1e8 && currentSize < 2e8 && (
              <span className="bg-yellow-200 rounded px-2 py-1">Data may not fit in memory</span>
            )}
            {currentSize > 2e8 && (
              <span className="bg-red-200 rounded px-2 py-1">Data will not fit in memory</span>
            )}
          </>
        )}
      </div>
      <Button
        variant={"link"}
        onClick={() => {
          setVariable(meta.name)
          setShowMeta(false)
          setShowOptions(false)
        }}
      >
        Plot
      </Button>
    </Card>
  )
}

export default MetaDataInfo
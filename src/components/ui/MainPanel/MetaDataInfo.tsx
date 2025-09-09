import React, { useState, useMemo, useEffect } from "react"
import { useAnalysisStore, useCacheStore, useGlobalStore, usePlotStore, useZarrStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import { SliderThumbs } from "@/components/ui/SliderThumbs"
import { Button } from "@/components/ui/button"
import { Input } from "../input"
import { BsFillQuestionCircleFill } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


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

function ChunkIDs(chunkDepth: number, slice:[number, number | null], range:number){
  const lowerChunk = Math.floor(slice[0]/chunkDepth)
  const upperChunk = slice[1] ? Math.ceil(slice[1]/chunkDepth) : Math.ceil(range/chunkDepth)
  const ids = []
  for (let i = lowerChunk; i < upperChunk; i++){
    ids.push(i)
  }
  return ids
}

const MetaDataInfo = ({ meta, setShowMeta, setOpenVariables }: { meta: any, setShowMeta: React.Dispatch<React.SetStateAction<boolean>>, setOpenVariables: React.Dispatch<React.SetStateAction<boolean>>  }) => {
  const {is4D, idx4D, variable, initStore, setIs4D, setIdx4D, setVariable} = useGlobalStore(useShallow(state => ({
    is4D: state.is4D,
    idx4D: state.idx4D,
    variable: state.variable,
    initStore: state.initStore,
    setIs4D: state.setIs4D,
    setIdx4D: state.setIdx4D,
    setVariable: state.setVariable,
  })))
  const {maxSize, setMaxSize} = useCacheStore.getState()
  const [cacheSize, setCacheSize] = useState(maxSize)

  const { slice, reFetch, compress, setSlice, setReFetch, setCompress } = useZarrStore(useShallow(state => ({
    reFetch: state.reFetch,
    slice: state.slice,
    compress: state.compress,
    setSlice: state.setSlice,
    setReFetch: state.setReFetch,
    setCompress: state.setCompress
  })))
  const cache = useCacheStore(state => state.cache)
  const {maxTextureSize} = usePlotStore(useShallow(state => ({maxTextureSize: state.maxTextureSize})))

  const [tooBig, setTooBig] = useState(false)
  const [cached, setCached] = useState(false)
  const [cachedChunks, setCachedChunks] = useState<string | null>(null)

  const totalSize = useMemo(() => meta.totalSize ? meta.totalSize : 0, [meta])
  const length = useMemo(() => meta.shape ? meta.shape.length == 4 ? meta.shape[1] : meta.shape[0] : 0, [meta])
  const is3D = useMemo(() => meta.shape ? meta.shape.length == 3 : false, [meta])
  const hasTimeChunks = is4D ? meta.shape[1]/meta.chunks[1] > 1 : meta.shape[0]/meta.chunks[0] > 1
  const chunkIDs = useMemo(()=>{
    if (hasTimeChunks){
      const ids = ChunkIDs(meta.chunks[0], slice, is4D ? meta.shape[1] : meta.shape[0])
      return ids;
    } else { return ;}
  },[slice, meta])

  const currentSize = useMemo(() => {
    if (is3D){
      const firstStep = slice[0] ? slice[0] : 0
      const secondStep = slice[1] ? slice[1] : length
      const timeSteps = secondStep - firstStep
      const xChunks = meta.shape[2] / meta.chunks[2]
      const yChunks = meta.shape[1] / meta.chunks[1]
      const timeChunkSize = xChunks * yChunks * meta.chunkSize
      const chunkTimeStride = meta.chunks ? meta.chunks[0] : 1
      return Math.ceil(timeSteps / chunkTimeStride) * timeChunkSize
    }else if(is4D){
      const firstStep = slice[0] ? slice[0] : 0
      const secondStep = slice[1] ? slice[1] : length
      const timeSteps = secondStep - firstStep
      const xChunks = meta.shape[3] / meta.chunks[3]
      const yChunks = meta.shape[2] / meta.chunks[2]
      const timeChunkSize = xChunks * yChunks * meta.chunkSize
      const chunkTimeStride = meta.chunks ? meta.chunks[1] : 1
      return Math.ceil(timeSteps / chunkTimeStride) * timeChunkSize
    }else{return 0;}
  }, [meta, slice])

  const cachedSize = useMemo(()=>{
    const thisDtype = meta.dtype as string
    if (thisDtype.includes("32")){
      return currentSize / 2;
    } else if (thisDtype.includes("64")){
      return currentSize / 4;
    } else if (thisDtype.includes("8")){
      return currentSize * 2;
    } else {
      return currentSize;
    }
  },[currentSize, meta])

  const smallCache = cachedSize > cacheSize

  useEffect(()=>{
    const this4D = meta.shape.length == 4;
    setIs4D(this4D);
  },[meta])

  useEffect(()=>{
    setSlice([0, null])
  },[initStore])

  useEffect(()=>{
    setCompress(false)
    setIdx4D(null);
    setCachedChunks(null);
    if (cache.has(`${initStore}_${meta.name}`)){
      
      setCached(true);
      return;
    }else if (chunkIDs){
      let accum = 0; 
      for (const id of chunkIDs){
        if (cache.has(`${initStore}_${meta.name}_chunk_${id}`)){
          accum ++;
        }
      }
      if ( accum > 0){
        setCachedChunks(`${accum}/${chunkIDs.length}`)
        setCached(true); 
        return;
      } else {
        setCached(false)
      }
    } else {
      setCached(false)
    }
    const width = meta.shape[meta.shape.length-1]
    const height = meta.shape[meta.shape.length-2]

    if (width > maxTextureSize || height > maxTextureSize){
      setTooBig(true)
    }else{
      setTooBig(false)
    }
  },[meta, maxTextureSize, chunkIDs])

  return (
      // Don't put any more work in the landing page version. Since it won't be visible in the future
      // The logic here was to just get divs to be used later in a Card or Dialog component!
    <> 
      <div className="meta-info">
        <b>Long Name</b> <br/>
        {`${meta.long_name}`}<br/>
        <br/>
        <b>Shape</b><br/> 
        {`[${formatArray(meta.shape)}]`}<br/>
        <br/>
        {tooBig && 
        <div className="bg-[#FFBEB388] rounded-md p-1">
          <span className="text-xs font-medium text-red-800 dark:text-red-200">
            One or more of the dimensions in your dataset exceed this browsers maximum texture size: <b>{maxTextureSize}</b>
          </span>
        </div>
        }
        {!tooBig && 
        <>
        {is4D &&
        <>
          <div>
            <p>
            This is Four-Dimensional Dataset. You must select an index along the first dimension. <br/>
            Please select an index from <b>0</b> to <b>{meta.shape[0]-1}</b>
            </p>
            <Input type="number" min={0} max={meta.shape[0]-1} value={String(idx4D)} onChange={e=>setIdx4D(parseInt(e.target.value))}/>
          </div>
        </>
        }
        {((is3D || idx4D != null) && !(cached && !cachedChunks)) &&
          <>
            {totalSize > 1e8 && hasTimeChunks && (
              <>
                <div className="flex justify-center">
                  <b>Select Data Range</b>
                </div>
                <div className="w-full flex flex-col justify-between">
                  <SliderThumbs
                    min={0}
                    max={length}
                    value={[slice[0] ? slice[0] : 0, slice[1] ? slice[1] : length]}
                    step={1}
                    onValueChange={(values: number[]) => setSlice([values[0], values[1]] as [number, number | null])}
                  />
                  <div className="flex justify-between text-xs mt-4">
                    <span>Min: <br /> <input className='w-[50px]' type="number" value={slice[0]} onChange={e=>setSlice([parseInt(e.target.value), slice[1]])}/></span>
                    <span>Max: <br /> <input className='w-[50px] text-right' type="number" value={slice[1] ? slice[1] : length} onChange={e=>setSlice([slice[0] , parseInt(e.target.value)])}/></span>
                  </div>
                </div>
              </>
            )}
            <div className="grid gap-2">
              <div>
                <b>Raw Size: </b>{formatBytes(currentSize)}
              </div>
              <div>
                <b>Stored size: {compress ? "<" : null} </b>{formatBytes(cachedSize)}
              </div>
            </div>
            {currentSize > maxSize && (
              <>
              <div className={`flex items-center gap-2 p-2 ${smallCache ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800" : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"} rounded-md border`}>
                    <div className={`w-2 h-2 ${smallCache ? "bg-red-500" : "bg-emerald-500"} rounded-full`}></div>
                    <span className={`text-xs font-medium ${smallCache ? "text-red-800 dark:text-red-200" : "text-emerald-800 dark:text-emerald-200"}`}>
                      {smallCache ? "Selection won't fit in Cache" : "Data Will Fit"}
                    </span>                  
                    </div>
                    <div className="">
                      Decrease selection or Increase cache size <br/>
                      <div className="flex justify-center">
                        <p>Expand Cache: <b>{cacheSize/(1024*1024)}MB</b>
                          <Tooltip>
                            <TooltipTrigger>
                            <BsFillQuestionCircleFill/>
                            </TooltipTrigger>
                            <TooltipContent>
                              Increasing this too far can cause crashes. Mobile users beware 
                            </TooltipContent>
                          </Tooltip>
                        </p>
                      </div>
                      
                      <SliderThumbs 
                        id="newCache-size"
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={e=>setCacheSize(maxSize+e[0]*(1024*1024))}
                    />
              </div>
              </>
            )
            }
            <div className="grid grid-cols-[auto_40%] items-center gap-2 mt-2">
              <div>
              <label htmlFor="compress-data">Compress Data </label>
              <Tooltip>
                <TooltipTrigger>
                  <BsFillQuestionCircleFill/>
                </TooltipTrigger>
                <TooltipContent className="max-w-[min(100%,16rem)] break-words whitespace-normal">
                  Compress data to preserve memory at the expense of slightly longer load times
                </TooltipContent>
              </Tooltip>
              </div>
              
              <Input className="w-[50px]" type="checkbox" id="compress-data" checked={compress} onChange={e=>setCompress(e.target.checked)}/>
            </div>
          </>}
      </>}
      </div>
      {cached &&
      <div>
        {cachedChunks ? 
          <b>{cachedChunks} chunks already cached. </b> :
          <b>This data is already cached. </b>
        } 
      </div>
      }
      <Button
        variant="pink"
        size="sm"
        
        className="cursor-pointer hover:scale-[1.05]"
        disabled={((is4D && idx4D == null) || tooBig || smallCache)}
        onClick={() => {
          if (variable == meta.name){
            setReFetch(!reFetch)
          }
          else{
            setMaxSize(cacheSize)
            setVariable(meta.name)
            setReFetch(!reFetch)
          }
          setShowMeta(false)
          setOpenVariables(false)
        }}
      >
      Plot
      </Button>
  </>
  )
}

export default MetaDataInfo
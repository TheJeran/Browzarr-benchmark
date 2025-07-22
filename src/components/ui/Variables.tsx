"use client";
import React, {useState, useMemo, useEffect} from 'react'
import { useGlobalStore, useZarrStore } from '@/utils/GlobalStates';
import Slider from 'rc-slider';
import { formatBytes } from '../zarr/GetMetadata';
import './css/MainPanel.css'
import { useShallow } from 'zustand/shallow';

const formatArray = (value: string | number[]): string => {
    if (typeof value === 'string') return value
    return Array.isArray(value) ? value.join(', ') : String(value)
  }

interface ViewSetters{
    setShowMeta: React.Dispatch<React.SetStateAction<boolean>>;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const MetaDataInfo = ({meta, setters} : {meta : any, setters: ViewSetters}) =>{ 
    const {setShowMeta, setShowOptions} = setters;
    const [show, setShow] = useState<boolean>(false)
    const setVariable = useGlobalStore(useShallow(state=> state.setVariable))
    const {slice, compress, setSlice, setCompress} = useZarrStore(useShallow(state => ({slice: state.slice, compress: state.compress, setSlice: state.setSlice, setCompress: state.setCompress})))
    const [warn, setWarn] = useState<boolean>(false)
    
    const totalSize = useMemo(()=> meta.totalSize? meta.totalSize : 0, [meta])
    const length = useMemo(()=>meta.shape ? meta.shape[0] : 0,[meta])
    const is3D =  useMemo(()=>meta.shape ? meta.shape.length > 2 : false,[meta])
    const currentSize = useMemo(()=>{
      if (!is3D){
          return 0;
        }
      const firstStep = slice[0] ? slice[0] : 0
      const secondStep = slice[1] ? slice[1] : length
      const timeSteps = secondStep - firstStep
      const xChunks = meta.shape[2]/meta.chunks[2]
      const yChunks = meta.shape[1]/meta.chunks[1]
      const timeChunkSize = xChunks*yChunks*meta.chunkSize
      const chunkTimeStride = meta.chunks? meta.chunks[0] : 1;
      return Math.ceil(timeSteps/chunkTimeStride) * timeChunkSize
    },[meta, slice])

    useEffect(()=>{
      if (currentSize > 1e8){
        setWarn(true)
      }
      else{
        setWarn(false)
      }

    },[currentSize])

    

    return(
        <div className='meta-container max-w-sm md:max-w-md'
          style={{ background: 'var(--background)',border: '1px solid var(--border)', padding: '10px', marginBottom: '10px' }}>
            <div className='meta-info'>
                <b>Long Name</b> <br/>
                {`${meta.long_name}`}<br/>
                    <br/>
                    <b>Shape</b><br/> 
                    {`[${formatArray(meta.shape)}]`}<br/>
                    <br/>
                    {is3D &&
                    <>
                    {totalSize > 1e8 && <>
                    <div className='flex justify-center'>
                    <b>Select Data Range</b>
                    </div>
                    
                    <div className='w-full flex justify-between flex-col'>
                      <Slider
                          range
                          min={0}
                          max={length}
                          value={[slice[0] ? slice[0] : 0,slice[1] ? slice[1] : length]}
                          step={1}
                          onChange={(values) => setSlice(values as [number, number | null])}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 18 }}>
                          <span >Min: <br/> {slice[0] ? slice[0] : 0}</span>
                          <span>Max: <br/> {slice[1] ? slice[1] : length}</span>
                      </div>
                    </div>
                    </>}
                    <b>Total Size: </b>{`${formatBytes(currentSize)}`}<br/> 
                    {currentSize < 1e8 && <span style={{
                      background: 'lightgreen',
                      borderRadius: '3px',
                      padding:'5px'
                    }}>Selected data will fit in memory</span>}
                    {currentSize > 1e8 && currentSize < 2e8 && <span style={{
                      background: 'sandybrown',
                      borderRadius: '3px',
                      padding:'5px'
                    }}>Data may not fit in memory</span>}
                    {currentSize > 2e8 && <span style={{
                      background: 'red',
                      borderRadius: '3px',
                      padding:'5px'
                    }}>Data will not fit in memory</span>}
                    </>}
                    {/* Need to conditionally color the above line if totalsize is greater than specific threshold. Also add an info when hovering the red text to explain the issue*/}
 
            </div>
            <button onClick={()=>{setVariable(meta.name); setShowMeta(false); setShowOptions(false)}}><b>Plot</b></button>
        </div>
    )
}


const Variables = ({currentOpen, setOpen} : {currentOpen: string, setOpen: React.Dispatch<React.SetStateAction<string>>}) => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [showMeta, setShowMeta] = useState<boolean>(false)
    const {variables, zMeta, setVariable} = useGlobalStore(useShallow(state => ({
        variables: state.variables,
        zMeta: state.zMeta,
        setVariable: state.setVariable
    })))

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [meta, setMeta] = useState<any>(null)

    useEffect(()=>{ //Update variable onScroll
        if (variables && zMeta){
          const tempVar = variables[selectedIndex]
          const relevant = zMeta.find((e : any) => e.name === tempVar)
          setMeta(relevant)
        }
      },[selectedIndex, variables])

      useEffect(()=>{
              if (currentOpen != 'variables'){
                  setShowOptions(false)
              }
        },[currentOpen])

  return (
    <div style={{position:'relative'}}>
        <div className='panel-item'style={{backgroundColor:'var(--foreground)'}}  onClick={e=>{setShowOptions(x=>!x); setShowMeta(false); setOpen("variables")}} > Variables </div>
        <div style={{position:'relative'}}>
            <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) translateY(-50%)' : 'scale(0%) ', maxHeight:'500px', width:'fit-content', padding:'30px 10px', justifyContent:'space-around', overflow:'visible'}}>
                <div className='variable-scroller' >
                    {variables.map((val, idx)=>(
                        <div key={idx} className='variable-item ' style={{width:'auto'}} onClick={e=>{setSelectedIndex(idx); setShowMeta(true)}}>{val}</div>
                    ))}
                </div>
                <div className='meta-options' style={{visibility: showMeta ? 'visible' : 'hidden'}}>
                    {meta && <MetaDataInfo meta={meta} setters={{setShowMeta, setShowOptions}}/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Variables

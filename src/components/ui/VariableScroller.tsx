import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useGlobalStore, useZarrStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow';
import './css/VariableScroller.css'
import Slider  from 'rc-slider';
import { formatBytes } from '../zarr/GetMetadata';
import { Input } from './input';

const formatArray = (value: string | number[]): string => {
    if (typeof value === 'string') return value
    return Array.isArray(value) ? value.join(', ') : String(value)
  }

const compressFactor = {
  'int8': 1,
  'uint8': 1,
  'int16': 2,
  'uint16': 2,
  'int32': 4,
  'uint32': 4,
  'int64': 8,
  'uint64': 8,
  'float32': 4,
  'float64': 8,
}

const Compressor = () =>{
  const {compress, inferValues, setCompress, setInferValues} = useZarrStore(useShallow(state => ({
    compress: state.compress,
    inferValues: state.inferValues,
    setCompress: state.setCompress,
    setInferValues: state.setInferValues
  })))
  const {valueScales, setValueScales} = useGlobalStore(useShallow(state => ({valueScales: state.valueScales, setValueScales: state.setValueScales})))


  return (<>
  <div className='flex  justify-around mt-2'>
    <div>
      <label htmlFor="compress-btn" className='pr-2'>Compress</label>
      <Input id='compress-btn' className='w-[64px]' type='checkbox' onChange={e=>setCompress(e.target.checked)}/>
    </div>
    <div className='flex items-center' style={{visibility: compress ? 'visible' : 'hidden'}}>
      <div className='flex items-center'>
        <label htmlFor="compress-btn" className='pr-2 '>Let Browzarr <br/> Infer Values</label>
        <Input id='compress-btn' className='w-[64px]' type='checkbox' onChange={e=>setInferValues(e.target.checked)}/>
      </div>
      <div style={{visibility: !inferValues ? 'visible' : 'hidden'}}>
        <div className='flex justify-end'>
          <label htmlFor="max-val" className='pr-2'>Max Value</label>
          <Input className='w-[64px]' id='max-val' type='number' defaultValue={100}
            onChange={e=>{
              const tempValues = valueScales;
              tempValues.maxVal = parseFloat(e.target.value)
              setValueScales(tempValues)
            }}
          />
        </div>
        <div className='flex justify-end'>
          <label htmlFor="min-val" className='pr-2' >Min Value</label>
          <Input className='w-[64px]' id='min-val' type='number' defaultValue={0}
            onChange={e=>{
              const tempValues = valueScales;
              tempValues.minVal = parseFloat(e.target.value)
              setValueScales(tempValues)
            }}
          />
        </div>
      </div>
    </div>
  </div>

  </>
  )
}  

const MetaDataInfo = ({meta} : {meta : any}) =>{ 
    const [show, setShow] = useState<boolean>(false)
    const setVariable = useGlobalStore(useShallow(state=> state.setVariable))
    const {slice, compress, setSlice} = useZarrStore(useShallow(state => ({slice: state.slice, compress: state.compress, setSlice: state.setSlice})))
    const [warn, setWarn] = useState<boolean>(false)
    const totalSize = useMemo(()=> meta.totalSize ? compress ? meta.totalSize/compressFactor[meta.dtype as keyof typeof compressFactor] : meta.totalSize : 0, [meta, compress])
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
      const current = Math.ceil(timeSteps/chunkTimeStride) * timeChunkSize
      return compress ? current/compressFactor[meta.dtype as keyof typeof compressFactor] : current
    },[meta, slice, compress])

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
          style={{ background: 'var(--background)',border: '1px solid var(--border)', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
            <div className='meta-info'>
                <b>Long Name:</b> {`${meta.long_name}`}<br/>
                    <br/>
                    <b>Shape:</b> {`[${formatArray(meta.shape)}]`}<br/>
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
                    <Compressor />
                    {/* Need to conditionally color the above line if totalsize is greater than specific threshold. Also add an info when hovering the red text to explain the issue*/}
 
            </div>
            <button onClick={()=>setVariable(meta.name)}><b>Plot</b></button>
        </div>
    )
}


const VariableScroller = () => {
  const {variables, zMeta, setVariable} = useGlobalStore(useShallow(state=>({variables: state.variables, zMeta: state.zMeta, setVariable: state.setVariable})))
  const [selectedIndex, setSelectedIndex] = useState(Math.floor(variables.length / 2));
  const [meta, setMeta] = useState<any>(null) //This is the individual metadata for the element
  const [scrollHeight, setScrollHeight] = useState<number>(82);
  const previousTouch = useRef<number | null>(null)
  const touchDelta = useRef<number>(0)

  const handleScroll = (event: any) => {
    const newIndex =
      selectedIndex + (event.deltaY > 0 ? 1 : -1);
    if (newIndex >= 0 && newIndex < variables.length) {
      setSelectedIndex(newIndex);
    }
  };

  const handleTouchScroll = (event: any) => {
    const touch = event.touches[0]
    const newY = touch.clientY
    const prev = previousTouch.current ? previousTouch.current : newY
    const thisDelta = prev - newY
    previousTouch.current = newY
    touchDelta.current += thisDelta
    if (Math.abs(touchDelta.current) >= scrollHeight){
      const newIndex =
      selectedIndex + (touchDelta.current > 0 ? 1 : -1);
      if (newIndex >= 0 && newIndex < variables.length) {
        setSelectedIndex(newIndex);
        touchDelta.current = 0;
      }
    }
  }

  useEffect(() => { //Supposedly this disables the refresh pull
  const disablePullToRefresh = (e : any) => {
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  document.addEventListener("touchmove", disablePullToRefresh, { passive: false });

  return () => {
    document.removeEventListener("touchmove", disablePullToRefresh);
  };
  }, []);

  useEffect(()=>{ //Update variable onScroll
    if (variables && zMeta){
      const tempVar = variables[selectedIndex]
      const relevant = zMeta.find((e : any) => e.name === tempVar)
      setMeta(relevant)
    }
  },[selectedIndex, variables])

  function handleResize(){
    const width = window.innerWidth
    if (width <= 480){
      setScrollHeight(42)
    }
    else if (width <= 570){
      setScrollHeight(54)
    }
    else {
      setScrollHeight(82)
    }
  }
  useEffect(()=>{  //Sets scrollsize. Doesn't work with resize though
    const width = window.innerWidth
    if (width <= 480){
      setScrollHeight(42)
    }
    else if (width <= 570){
      setScrollHeight(54)
    }
    else {
      setScrollHeight(82)
    }
    return window.addEventListener('resize', handleResize)
  },[])

  return (
    <div className="scroll-container" onWheel={handleScroll} onTouchMove={handleTouchScroll} onTouchEnd={()=>{previousTouch.current = null; touchDelta.current = 0}}>
        <div className='scroll-element' 
            style={{
                transform: `translateY(calc(40% + ${-selectedIndex * scrollHeight}px))` 
            }}
        >
            {variables.map((variable, index) => {
                const distance = Math.abs(selectedIndex - index);
                return (
                <div
                    key={index}
                    className="scroll-item"
                    style={{
                    opacity: 1 - distance * 0.3,
                    fontWeight: selectedIndex === index ? "bold" : "normal",
                    }}
                    onClick={(()=>setSelectedIndex(index))}
                    onDoubleClick={(()=>setVariable(variable))}
                >
                    {variable}
                </div>
                );
            })}
       </div>
       {meta && <MetaDataInfo meta={meta} />}
    </div>
  );
};


export default VariableScroller

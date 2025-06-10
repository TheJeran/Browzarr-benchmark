import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useGlobalStore } from '@/utils/GlobalStates'
import { GetStore, ZarrDataset } from '../zarr/ZarrLoaderLRU';
import { GetZarrMetadata } from '../zarr/GetMetadata';
import './css/VariableScroller.css'

const formatArray = (value: string | number[]): string => {
    if (typeof value === 'string') return value
    return Array.isArray(value) ? value.join(', ') : String(value)
  }

const MetaDataInfo = ({meta} : {meta : any}) =>{ 
    const [show, setShow] = useState<boolean>(false)

    const setVariable = useGlobalStore(state=> state.setVariable)
    return(
        <div className='meta-container'>
            <div className='meta-info'>
                <b>Long Name:</b> {`${meta.long_name}`}<br/>
                <div 
                    style={{
                        maxHeight: show ? '500px' : '0px',
                        overflow: 'hidden',
                        transition: '0.3s'
                    }}
                >

                    <b>Shape:</b> {`[${formatArray(meta.shape)}]`}<br/>
                    <b>dType: </b> {`${meta.dtype}`}<br/>
                    <b>Total Size: </b>{`${meta.totalSizeFormatted}`}<br/> 
                    {/* Need to conditionally color the above line if totalsize is greater than specific threshold. Also add an info when hovering the red text to explain the issue*/}
                    <b>Chunk Shape:</b> {`[${formatArray(meta.chunks)}]`}<br/>
                    <b>Chunk Count:</b> {`${meta.chunkCount}`}<br/>
                    <b>Chunk Size:</b> {`${meta.chunkSizeFormatted}`}
                </div>
                <div className='meta-hidden'
                    style={{display:'flex', justifyContent:'center'}}
                    onClick={()=>setShow(x=>!x)}
                >{show ? 'Λ' : 'V' }</div>
            </div>
            <button onClick={()=>setVariable(meta.name)}><b>Plot</b></button>
        </div>
    )
}


const VariableScroller = ({vars, zarrDS} : {vars : Promise<string[]>, zarrDS : ZarrDataset}) => {
  const [variables, setVariables] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(Math.floor(variables.length / 2));
  const [variable, setVariable] = useState<string>("Default")
  const [meta, setMeta] = useState<any>(null) //This is the individual metadata for the element
  const [zMeta, setZMeta] = useState<any>(null) //This is all the metadata. 

  const handleScroll = (event: any) => {
    const newIndex =
      selectedIndex + (event.deltaY > 0 ? 1 : -1);
    if (newIndex >= 0 && newIndex < variables.length) {
      setSelectedIndex(newIndex);
    }
  };

  useEffect(()=>{ //Update variable onScroll
    if (variables){
        setVariable(variables[selectedIndex])
    }
  },[selectedIndex, variables])

  useEffect(()=>{
    vars.then(e=>setVariables(e))
  },[vars])

  useEffect(()=>{
    if(zarrDS){
        //@ts-expect-error
        GetZarrMetadata(zarrDS.groupStore).then(e=>{setZMeta(e)}) //groupStore is private but I really don't care
    }
  },[zarrDS])

  useEffect(()=>{
    if(zMeta){
        const relevant = zMeta.find((e : any) => e.name === variable)
        setMeta(relevant)
    }
  },[variable])

  return (
    <div className="scroll-container" onScroll={handleScroll} onWheel={handleScroll}>
        {meta && <MetaDataInfo meta={meta} />}
        <div className='scroll-element' 
            style={{
                transform: `translateY(calc(50% + ${-selectedIndex * 82}px))` //Need to figure out why it's 82 pixels
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
                >
                    {variable}
                </div>
                );
            })}
       </div>
    </div>
  );
};


export default VariableScroller

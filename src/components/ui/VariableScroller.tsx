import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useGlobalStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow';
import './css/VariableScroller.css'

const formatArray = (value: string | number[]): string => {
    if (typeof value === 'string') return value
    return Array.isArray(value) ? value.join(', ') : String(value)
  }

const MetaDataInfo = ({meta} : {meta : any}) =>{ 
    const [show, setShow] = useState<boolean>(false)

    const setVariable = useGlobalStore(useShallow(state=> state.setVariable))
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


const VariableScroller = ({zMeta} : {zMeta : object[]}) => {
  const variables = useGlobalStore(useShallow(state=>state.variables))
  const [selectedIndex, setSelectedIndex] = useState(Math.floor(variables.length / 2));
  const [variable, setVariable] = useState<string>("Default")
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

  useEffect(()=>{ //Update variable onScroll
    if (variables){
        setVariable(variables[selectedIndex])
    }
  },[selectedIndex, variables])

  useEffect(()=>{ //Grab relevant metadata
    if(zMeta){
        const relevant = zMeta.find((e : any) => e.name === variable)
        setMeta(relevant)
    }
  },[variable])

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
  },[])

  return (
    <div className="scroll-container" onWheel={handleScroll} onTouchMove={handleTouchScroll} onTouchEnd={()=>{previousTouch.current = null; touchDelta.current = 0}}>
        {meta && <MetaDataInfo meta={meta} />}
        <div className='scroll-element' 
            style={{
                transform: `translateY(calc(50% + ${-selectedIndex * scrollHeight}px))` 
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

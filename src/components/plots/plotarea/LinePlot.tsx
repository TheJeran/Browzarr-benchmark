import { Canvas } from '@react-three/fiber'
import { parseLoc } from '@/utils/HelperFuncs'
import { FixedTicks, ThickLine } from '@/components/plots'
import {  useEffect, useRef, useState } from 'react'
import { ResizeBar, YScaler, XScaler, ShowLinePlot } from '@/components/ui'
import './LinePlot.css'
import { useGlobalStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import PlotLineOptions from '@/components/ui/PlotLineOptions'

interface pointInfo{
  pointID:Record<string,number>,
  pointLoc:number[],
  showPointInfo:boolean
  plotUnits:string
}
const MIN_HEIGHT = 10;

function PointInfo({pointID,pointLoc,showPointInfo, plotUnits}:pointInfo){

  const {plotDim, dimArrays, dimNames, dimUnits, timeSeries} = useGlobalStore(
    useShallow(state=>({
      plotDim:state.plotDim,
      dimArrays:state.dimArrays,
      dimNames:state.dimNames,
      dimUnits:state.dimUnits,
      timeSeries:state.timeSeries,
    }))
  );
  let pointY = 0;
  let pointX = 0;
  if (Object.entries(pointID).length > 0 && Object.entries(timeSeries).length > 0){
    const [tsID, idx] = Object.entries(pointID)[0];
    pointY = timeSeries[tsID][idx];
    pointX = dimArrays[plotDim][idx];
  }
  const [divX,divY] = pointLoc;
  const [show,setShow] = useState(false);

  useEffect(()=>{
    if (!showPointInfo) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 100); // 0.1s delay
  
      return () => clearTimeout(timeout); // Cleanup timeout on re-renders
    }
    setShow(true)  
  },[showPointInfo])

  return(
    <>
     { show && <div className='point-info'
        style={{
          left:`${divX}px`,
          top:`${divY}px`
        }}
      >
        {`${pointY.toFixed(2)}${plotUnits}`}<br/>
        {`${dimNames[plotDim]}: ${parseLoc(pointX,dimUnits[plotDim])}       
        `}
      </div>}
    </>
  )
}

function PointCoords(){
  const coords = useGlobalStore(state=>state.dimCoords)
  const [moving,setMoving] = useState<boolean>(false)
  const initialMouse = useRef<number[]>([0,Math.round(window.innerHeight*0.255)])
  const initialDiv = useRef<number[]>([0,Math.round(window.innerHeight*0.255)])
  const [xy, setXY] = useState<number[]>([0,Math.round(window.innerHeight*0.255)])

  function handleDown(e: any){
    initialMouse.current = [e.clientX,e.clientY]
    initialDiv.current = [...xy]
    setMoving(true)
  }

  function handleMove(e: any){
    if (moving){
      const deltaX = initialMouse.current[0]-e.clientX
      const deltaY = initialMouse.current[1]-e.clientY
      const x = Math.max(initialDiv.current[0]-deltaX,10)
      const y = Math.max(initialDiv.current[1]+deltaY,0) //Again hardcoded footer height
      setXY([Math.min(x,window.innerWidth-100),Math.min(y,window.innerHeight-100)])
    }
  }

  function handleUp(){
    setMoving(false)
  }

  useEffect(() => {
    if (moving) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [moving]);
  return(
    <>
    <div className='coord-container'
      style={{
          left:`${xy[0]}px`,
          bottom:`${xy[1]}px`
        }}
    >
    { //Only show coords when coords exist
      Object.keys(coords).length > 0 && 
      Object.keys(coords).map((val,idx)=>(
        <div className='plot-coords'
        
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={()=>setMoving(false)}  
        key={val}   
      >
        <b>{`${coords[val]['first'].name}: `}</b>
        {`${parseLoc(coords[val]['first'].loc,coords[val]['first'].units)}`}
        <br/>
        <b>{`${coords[val]['second'].name}: `}</b>
        {`${parseLoc(coords[val]['second'].loc,coords[val]['second'].units)}`}
      </div>
      ))
      }
      </div>
    </>
  )
}

export function PlotArea() {
  const [pointID, setPointID] = useState<Record<string, number>>({});
  const [pointLoc, setPointLoc] = useState<number[]>([0,0])
  const [showPointInfo,setShowPointInfo] = useState<boolean>(false)
  const [height, setHeight] = useState<number>(Math.round(window.innerHeight-(window.innerHeight*0.25)))
  const metadata = useGlobalStore(state=>state.metadata)
  const plotUnits = metadata ? (metadata as any).units : "Default"

  const [yScale,setYScale] = useState<number>(1)
  const [xScale,setXScale] = useState<number>(1)

  const pointSetters ={
    setPointID,
    setPointLoc,
    setShowPointInfo
  }

  // Handle orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      // Update height based on new viewport dimensions
      const newHeight = Math.round(window.innerHeight-(window.innerHeight*0.25));
      setHeight(newHeight);
      document.documentElement.style.setProperty('--plot-height', `${newHeight}px`);
    };

    // Listen for orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    // Also listen for resize as a fallback
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--plot-height', `${height}px`);
  }, [height]);
  const state = window.innerHeight-height >= MIN_HEIGHT;
  return (
    <>
    {!state && <ShowLinePlot onClick={()=>{setHeight(window.innerHeight-(MIN_HEIGHT+50))}}/>}
      {state && (
        <div className='plot-canvas'>
          <PlotLineOptions/>
          {showPointInfo && <PointInfo pointID={pointID} pointLoc={pointLoc} showPointInfo={showPointInfo} plotUnits={plotUnits}/>}
          <ResizeBar height={height} setHeight={setHeight}/> 
          <YScaler scale={yScale} setScale={setYScale} />
          <XScaler scale={xScale} setScale={setXScale} />
          <Canvas
            orthographic
            camera={{ position: [0, 0, 100] }}
            frameloop="demand"
          >
            <ThickLine height={height} yScale={yScale} pointSetters={pointSetters} xScale={xScale}/>
            <FixedTicks height={height} yScale={yScale} xScale={xScale}/>
          </Canvas>
          <PointCoords/>
        </div>
      )}
    </>
  )
}
import { Canvas } from '@react-three/fiber'
import { parseLoc } from '@/utils/HelperFuncs'
import { PlotLine, FixedTicks } from '@/components/PlotObjects'
import { useContext, useEffect, useState } from 'react'
import { plotContext } from '@/components/Contexts'
import { ResizeBar } from '@/components/UI'
import './PlotArea.css'

interface pointInfo{
  pointID:number,
  pointLoc:number[],
  showPointInfo:boolean
}

function PointInfo({pointID,pointLoc,showPointInfo}:pointInfo){
  const {plotDim,dimArrays, timeSeries,dimNames,dimUnits,plotUnits} = useContext(plotContext);
  const pointY = timeSeries[pointID];
  const pointX = dimArrays[plotDim][pointID];
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

export function PlotArea() {
  const {coords} = useContext(plotContext)
  const [pointID, setPointID] = useState<number>(0);
  const [pointLoc, setPointLoc] = useState<number[]>([0,0])
  const [showPointInfo,setShowPointInfo] = useState<boolean>(false)
  const [height, setHeight] = useState<number>(Math.round(window.innerHeight-(window.innerHeight*0.15)-48))

  const pointSetters ={
    setPointID,
    setPointLoc,
    setShowPointInfo
  }

  return (
    <div 
      className='plot-canvas'
      style={{
        position: 'absolute',
        bottom: '48px', // Account for footer
        left: 0,
        width: '100%',
        top: `${height}px`, // 15% of viewport height
        background: '#00000099'
      }}
    >
      <PointInfo pointID={pointID} pointLoc={pointLoc} showPointInfo={showPointInfo} />
      <ResizeBar height={height} setHeight={setHeight}/> 
      <Canvas
      orthographic
        camera={{ position: [0, 0, 40] }}
        frameloop="demand"
      >
        <PlotLine height={height} pointSetters={pointSetters}/>
        <FixedTicks height={height}/>
      </Canvas>
      { //Only show coords when coords exist
        coords && coords.first.name !== 'Default' && 
        <div className='plot-coords'>
          <b>{`${coords['first'].name}: `}</b>
          {`${parseLoc(coords['first'].loc,coords['first'].units)}`}
          <br/> <br/>
          <b>{`${coords['second'].name}: `}</b>
          {`${parseLoc(coords['second'].loc,coords['second'].units)}`}
        </div>
      } 
    </div>
  )
}
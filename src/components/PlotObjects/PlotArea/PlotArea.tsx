import { Canvas } from '@react-three/fiber'
import { parseLoc } from '@/utils/HelperFuncs'
import { PlotLine, FixedTicks } from '@/components/PlotObjects'
import { ResizeBar } from '@/components/UI'
import { useContext,useState } from 'react'
import { plotContext } from '@/components/Contexts/Contexts'
import './PlotArea.css'

export function PlotArea() {

  const [height, setHeight] = useState<number>(Math.round(window.innerHeight-(window.innerHeight*0.15)-48))

  //@ts-ignore
  const {coords} = useContext(plotContext)

  
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
      <ResizeBar height={height} setHeight={setHeight}/>
      <Canvas
      orthographic
        camera={{ position: [0, 0, 40] }}
        frameloop="demand"
      >
        <PlotLine height={height}/>
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
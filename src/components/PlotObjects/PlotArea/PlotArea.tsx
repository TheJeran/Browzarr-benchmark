import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { parseLoc } from '@/utils/HelperFuncs'
import './PlotArea.css'

interface coords{
  first:{
    name:string,
    loc:number,
    units:string
  },  
  second:{
    name:string,
    loc:number,
    units:string
  },      
  plot:{
    units: string
  }
}


export function PlotArea({children,coords,height}: {children: React.ReactNode,coords:coords,height:number}) {
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
      <Canvas
      orthographic
        camera={{ position: [0, 0, 15] }}
        frameloop="demand"
      >
        {children}
        <OrbitControls 
          enableRotate={false} 
          enablePan={true}
          enableZoom={true}
          zoomSpeed={0.85}
        />
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
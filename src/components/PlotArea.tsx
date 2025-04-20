import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { FixedTicks } from './FixedTicks'
import { PlotLine } from './PlotLine'

interface PlotAreaProps {
  data: [number, number, number][]
  lineColor?: string
  lineWidth?: number
}

export function PlotArea({ data, lineColor = 'orangered', lineWidth = 2 }: PlotAreaProps) {
  return (
    <div 
      className='plot-canvas'
      style={{
        position: 'absolute',
        bottom: '48px', // Account for footer
        left: 0,
        width: '100%',
        height: '15vh', // 15% of viewport height
        background: '#00000099'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15] }}
        frameloop="demand"
      >
        <PlotLine
          data={data}
          color={lineColor}
          showPoints={true}
          pointSize={1}
          pointColor="white"
          lineWidth={lineWidth}
        />
        <FixedTicks color="white" />
        <OrbitControls 
          enableRotate={false} 
          enablePan={true}
          enableZoom={true}
          zoomSpeed={0.85}
        />
      </Canvas>
    </div>
  )
}
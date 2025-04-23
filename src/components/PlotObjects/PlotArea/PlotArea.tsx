import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


export function PlotArea({children}: {children: React.ReactNode}) {
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
    </div>
  )
}
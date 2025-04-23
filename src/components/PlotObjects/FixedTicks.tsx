import { Text } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useState, useMemo, useEffect } from 'react'

interface ViewportBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface FixedTicksProps {
  color?: string;
  tickSize?: number;
  fontSize?: number;
  showGrid?: boolean;
  gridOpacity?: number;
}


export function FixedTicks({ 
  color = 'white',
  tickSize = 4,
  fontSize = 12,
  showGrid = true,
  gridOpacity = 0.5
}: FixedTicksProps) {

  const { camera, viewport, size } = useThree()
  const [bounds, setBounds] = useState<ViewportBounds>({ left: 0, right: 0, top: 0, bottom: 0 })
  const initialBounds = useMemo<ViewportBounds>(()=>{
    const worldWidth = viewport.width 
    const worldHeight = viewport.height 
    
    const newBounds = {
      left: -worldWidth / 2 + camera.position.x,
      right: worldWidth / 2 + camera.position.x,
      top: worldHeight / 2 + camera.position.y,
      bottom: -worldHeight / 2 + camera.position.y
    }
    return newBounds;
  },[])

  const [zoom, setZoom] = useState(camera.zoom)
  
  const sizes = useMemo(() => {
    // Convert from pixels to scene units
    const pixelsPerUnit = size.height / (viewport.height * camera.zoom)
    return {
      tickSize: tickSize / pixelsPerUnit,
      fontSize: fontSize / pixelsPerUnit,
      labelOffset: tickSize / pixelsPerUnit
    }
  }, [size.height, viewport.height, camera.zoom, tickSize, fontSize])

  // Update bounds when camera moves
  // TODO: update bounds when camera zooms
  useFrame(() => {
    if (camera.zoom !== zoom) {
      setZoom(camera.zoom) // this is not working properly
    }
    const worldWidth = viewport.width / camera.zoom
    const worldHeight = viewport.height / camera.zoom
    
    const newBounds = {
      left: -worldWidth / 2 + camera.position.x,
      right: worldWidth / 2 + camera.position.x,
      top: worldHeight / 2 + camera.position.y,
      bottom: -worldHeight / 2 + camera.position.y
    }
    setBounds(newBounds)
  })

  return (
    <group >
      {/* Grid Lines */}
      {showGrid && (
        <>
          {/* Vertical grid lines */}
          {Array.from({ length: 10 }, (_, i) => {
            if (i === 0 || i === 9) return null; // Skip edges
            const x = initialBounds.left + (initialBounds.right - initialBounds.left) * (i / 9)
            return (
              <line key={`vgrid-${i}`}>
                <bufferGeometry>
                  <float32BufferAttribute
                    attach="attributes-position"
                    args={[new Float32Array([
                      x, bounds.top, 0,
                      x, bounds.bottom, 0
                    ]), 3]}
                  />
                </bufferGeometry>
                <lineDashedMaterial 
                  color={color} 
                  opacity={gridOpacity} 
                  transparent 
                  dashSize={0.5}
                  gapSize={0.5}
                />
              </line>
            )
          })}

          {/* Horizontal grid lines */}
          {Array.from({ length: 8 }, (_, i) => {
            if (i === 0 || i === 7) return null; // Skip edges
            const y = initialBounds.bottom + (initialBounds.top - initialBounds.bottom) * (i / 7)
            return (
              <line key={`hgrid-${i}`}>
                <bufferGeometry>
                  <float32BufferAttribute
                    attach="attributes-position"
                    args={[new Float32Array([
                      bounds.left, y, 0,
                      bounds.right, y, 0
                    ]), 3]}
                  />
                </bufferGeometry>
                <lineDashedMaterial 
                  color={color} 
                  opacity={gridOpacity} 
                  transparent 
                  dashSize={0.}
                  gapSize={0.5}
                  linewidth={1}
                />
              </line>
            )
          })}
        </>
      )}
      {/* Top Edge Ticks */}
      {Array.from({ length: 10 }, (_, i) => {
        const x = initialBounds.left + (initialBounds.right - initialBounds.left) * (i / 9)
        return (
          <group key={`top-tick-${i}`} position={[x, bounds.top, 0]}>
            <line>
              <bufferGeometry>
                <float32BufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([0, 0, 0, 0, -sizes.tickSize, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} />
            </line>

            {/* Only show labels for non-edge ticks */}
            {i !== 0 && i !== 9 && (
              <Text
                position={[0, sizes.tickSize/4 - sizes.labelOffset, 0]}
                fontSize={sizes.fontSize/zoom**2}
                color={color}
                anchorX="center"
                anchorY="top"
              >
                {x.toFixed(1)}
                {/* do x.toString() when is not a number */}
              </Text>
            )}
          </group>
        )
      })}

      {/* Right Edge Ticks */}
      {Array.from({ length: 8 }, (_, i) => {
        const y = initialBounds.bottom + (initialBounds.top - initialBounds.bottom) * (i / 7)
        return (
          <group key={`right-tick-${i}`} position={[bounds.right, y, 0]}>
            <line>
              <bufferGeometry>
                <float32BufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([0, 0, 0, -sizes.tickSize, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} />
            </line>
            {/* Only show labels for non-edge ticks */}
            {i !== 0 && i !== 7 && (
              <Text
                position={[-sizes.tickSize - sizes.labelOffset, 0, 0]}
                fontSize={sizes.fontSize/zoom**2}
                color={color}
                anchorX="right"
                anchorY="middle"
              >
                {y.toFixed(1)}
              </Text>
            )}
          </group>
        )
      })}
    </group>
  )
}
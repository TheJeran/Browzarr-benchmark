import { Text } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useState, useMemo, useEffect } from 'react'
import { parseTimeUnit } from '@/utils/HelperFuncs'


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
  xDimArray: number[];
  yRange: number[];
  coords:{
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
  };
  height:number
}

export function FixedTicks({ 
  color = 'white',
  tickSize = 4,
  fontSize = 18,
  showGrid = true,
  gridOpacity = 0.5,
  xDimArray = [0,0,0,0,0],
  yRange = [0,1],
  coords = {
    first:{
      name:"Default",
      loc:0.5,
      units:"Default"
    },
    second:{
      name:"Default",
      loc:0.5,
      units:"Default"
    },
    plot:{
      units:"Default"
    }
  },
  height
}: FixedTicksProps) {
  const { camera, size } = useThree()
  const [bounds, setBounds] = useState<ViewportBounds>({ left: 0, right: 0, top: 0, bottom: 0 })

  const initialHeight = useMemo(()=>height,[])
  const [heightRatio,setHeightRatio] = useState<number>(1)

  const xTickCount = 10;
  const yTickCount = 8;

  const xDimSize = xDimArray.length;
  const yDimSize = (yRange[1]-yRange[0])

  //Converts BigInt to DateTime
  const textArray = useMemo(()=>{
    if (xDimArray){
      const isBig = xDimArray.every(item => typeof item === "bigint");
      if (isBig){
        const unit = parseTimeUnit(coords.plot.units);
        console.log(unit)
        const timeStrings = []
        for (let i = 0 ; i < xDimArray.length; i++){
          const timeStamp = Number(xDimArray[i])*unit
          timeStrings.push(new Date(timeStamp).toDateString())
        }
        return timeStrings
      }
      return xDimArray.map(val => String(val))
    }
  },[xDimArray,coords])

  const initialBounds = useMemo<ViewportBounds>(()=>{
  const worldWidth = window.innerWidth
  const worldHeight = (window.innerHeight-height-48)
    
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
    const pixelsPerUnit = size.height / ((window.innerHeight-height-50) * camera.zoom )
    return {
      tickSize: tickSize / pixelsPerUnit,
      fontSize: fontSize / pixelsPerUnit,
      labelOffset: tickSize / pixelsPerUnit
    }
  }, [camera.zoom,tickSize, fontSize])

  // Update bounds when camera moves
  // TODO: update bounds when camera zooms



  useFrame(() => {
    if (camera.zoom !== zoom) {
      setZoom(camera.zoom) // this is not working properly
    }
    const worldWidth = window.innerWidth / camera.zoom
    const worldHeight = (window.innerHeight-height-50) / camera.zoom
    const newBounds = {
      left: -worldWidth / 2 + camera.position.x,
      right: worldWidth / 2 + camera.position.x,
      top: worldHeight / 2 + camera.position.y,
      bottom: -worldHeight / 2 + camera.position.y
    }
    if (JSON.stringify(bounds) != JSON.stringify(newBounds)){ 
      setBounds(newBounds) //This was firing every frame. Changed to only fire if it's different
    }
  })

  useEffect(()=>{
    if(height){
      setHeightRatio(initialHeight/height)
    }
  },[height])
  return (
    <group >
      {/* Grid Lines */}
      {showGrid && (
        <>
          {/* Vertical grid lines */}
          {Array.from({ length: xTickCount }, (_, i) => {
            if (i === 0 || i === xTickCount-1) return null; // Skip edges
            const x = initialBounds.left + (initialBounds.right - initialBounds.left) * (i / (xTickCount-1))
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
          {Array.from({ length: yTickCount }, (_, i) => {
            if (i === 0 || i === yTickCount-1) return null; // Skip edges
            const y = initialBounds.bottom * heightRatio + (initialBounds.top - initialBounds.bottom) * (i / (yTickCount-1)) * heightRatio
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
      {Array.from({ length: xTickCount }, (_, i) => {
        const x = initialBounds.left + (initialBounds.right - initialBounds.left) * (i / (xTickCount-1))
        const normX = x/(initialBounds.right - initialBounds.left)+.5;

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
            {i !== 0 && i !== xTickCount-1 && (
              <Text
                position={[0, sizes.tickSize/4 - sizes.labelOffset, 0]}
                fontSize={sizes.fontSize/zoom**2}
                color={color}
                anchorX="center"
                anchorY="top"
              >
                {textArray?.[Math.round(normX*xDimSize)] ?? ''}
              </Text>
            )}
          </group>
        )
      })}

      {/* Right Edge Ticks */}
      {Array.from({ length: yTickCount }, (_, i) => {
        const y = initialBounds.bottom * heightRatio + (initialBounds.top - initialBounds.bottom) * (i / (yTickCount-1)) * heightRatio
        const normY = y/(initialBounds.top - initialBounds.bottom)+.5
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
            {i !== 0 && i !== yTickCount-1 && (
              <Text
                position={[-sizes.tickSize - sizes.labelOffset, 0, 0]}
                fontSize={sizes.fontSize/zoom**2}
                color={color}
                anchorX="right"
                anchorY="middle"
              >
                {(yRange[0]+(normY*yDimSize)).toFixed(1)}
              </Text>
            )}
          </group>
        )
      })}
      {/* The coordinates don't need to be here. I will move them up as they are tied inside the Canvas here. And they don't need to be here.  */}
    </group>
  )
}
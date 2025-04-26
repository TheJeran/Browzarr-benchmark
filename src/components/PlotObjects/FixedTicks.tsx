import { Text, OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useState, useMemo, useEffect, useRef } from 'react'
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
  const { camera } = useThree()
  const [bounds, setBounds] = useState<ViewportBounds>({ left: 0, right: 0, top: 0, bottom: 0 })

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
  const worldHeight = (window.innerHeight-height-50)
    
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
    const pixelsPerUnit = 1 / camera.zoom 
    return {
      tickSize: tickSize * pixelsPerUnit,
      fontSize: fontSize / pixelsPerUnit,
      labelOffset: tickSize * pixelsPerUnit
    }
  }, [camera.zoom, tickSize, fontSize])

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


  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // @ts-ignore
  const cameraRef = useRef<OrbitControls | null>(null)

  //This reset the camera position when the window is rescaled
  useEffect(() => {
    // Clear existing timeout if height changes
    if (timeoutRef.current){
      clearTimeout(timeoutRef.current);
    }
    if (cameraRef.current){
          // Set a timeout for 0.5 seconds
      timeoutRef.current = setTimeout(() => {
      if (cameraRef.current) {
        cameraRef.current.reset();
      }
      }, 100);
    }
    // Cleanup timeout when component unmounts or height changes
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [height]);

  const stickyLines = 1; //This is the amount of pixels you need to zoome before the ticks readjust
  const vertY = (bounds.top+bounds.bottom)/2
  const horX = (bounds.left+bounds.right)/2 //Moved calcs here to reduce calcs
  return (
    <group >
      {/* Grid Lines */}
      {showGrid && (
        <>
          {/* Vertical grid lines */}
          {Array.from({ length: xTickCount }, (_, i) => {
            if (i === 0 || i === xTickCount-1) return null; // Skip edges
            const x = Math.round(bounds.left / stickyLines) * stickyLines + 
            (Math.round(bounds.right / stickyLines) *stickyLines -  Math.round(bounds.left / stickyLines) * stickyLines) * (i / (xTickCount-1))
            const normX = x/(initialBounds.right - initialBounds.left)+.5;
            const y = vertY
            return (
              <>
                <group position={[x,y,0]}>
                    <line key={`vgrid-${i}`} >
                      <bufferGeometry >
                        <float32BufferAttribute
                          attach="attributes-position"
                          args={[new Float32Array([
                            0, bounds.top-y, 0,
                            0, bounds.bottom-y, 0
                          ]), 3]}
                        />
                      </bufferGeometry >
                      <lineDashedMaterial 
                        color={color} 
                        opacity={gridOpacity} 
                        transparent 
                        dashSize={0.5}
                        gapSize={0.5}
                        
                      />
                    </line>
                </group>
                
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
              </>
            )
          })}

          {/* Horizontal grid lines */}
          {Array.from({ length: yTickCount }, (_, i) => {
            if (i === 0 || i === yTickCount-1) return null; // Skip edges
            const y = (bounds.bottom  + (bounds.top - bounds.bottom) * (i / (yTickCount-1)))
            const normY = (y/(bounds.top - bounds.bottom)/zoom)+.5
            const x = horX
            return (
              <>
                <group position={[x,y,0]}>
                  <line key={`hgrid-${i}`} >
                    <bufferGeometry>
                      <float32BufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array([
                          bounds.left-x, 0, 0,
                          bounds.right-x, 0, 0
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
                </group>
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
                      {/* {normY.toFixed(1)} */}
                    </Text>
                  )}
                </group>
              </>
            )
          })}
        </>
      )}
      <OrbitControls 
        ref={cameraRef}
        enableRotate={false} 
        enablePan={true}
        enableZoom={true}
        zoomSpeed={0.85}
        maxDistance={500}
        maxZoom={20}
        minZoom={0.5}
      />
    </group>
  )
}
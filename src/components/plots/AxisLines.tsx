"use cleint";

import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import React, {useState, useMemo} from 'react'
import { useShallow } from 'zustand/shallow'
import { Text } from '@react-three/drei'
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineMaterial } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import { parseLoc } from '@/utils/HelperFuncs';

const HorizontalAxis = ({flipX, flipY}: {flipX: boolean, flipY: boolean}) =>{
  const {dimArrays, dimNames, dimUnits} = useGlobalStore(useShallow(state => ({
    dimArrays: state.dimArrays,
    dimNames: state.dimNames,
    dimUnits: state.dimUnits
  })))

  const {xRange, yRange, zRange, plotType, timeScale, animProg} = usePlotStore(useShallow(state => ({
    xRange: state.xRange,
    yRange: state.yRange,
    zRange: state.zRange,
    plotType: state.plotType,
    timeScale: state.timeScale,
    animProg: state.animProg
  })))
  const dimLengths = [dimArrays[0].length, dimArrays[1].length, dimArrays[2].length]

  const {shape, dataShape} = useGlobalStore(useShallow(state => ({
    shape: state.shape,
    dataShape: state.dataShape
  })))

  const isPC = useMemo(()=>plotType == 'point-cloud',[plotType])

  const depthRatio = useMemo(()=>dataShape[0]/dataShape[1]*timeScale/2,[dataShape, timeScale]);

  const shapeRatio = useMemo(()=>shape.y/shape.x, [shape])

  //@ts-expect-error The THREE people messed up their types in this component. It does take a string
  const lineMat = useMemo(()=>new LineMaterial({color: 'orange', linewidth: 5}),[])
  const dimResolution = 7;

  const xLine = useMemo(()=> {
    const geom = new LineSegmentsGeometry().setPositions([xRange[0], 0, 0, xRange[1], 0, 0]);
    return new LineSegments2(geom, lineMat)},[xRange])

  const yLine = useMemo(() =>{
    const geom = new LineSegmentsGeometry().setPositions([0, yRange[0]*shapeRatio, 0, 0, yRange[1]*shapeRatio, 0]);
    return new LineSegments2(geom, lineMat)},[yRange, shapeRatio])

  const zLine = useMemo(()=> {
    const geom = new LineSegmentsGeometry().setPositions([0, 0, isPC ? zRange[0]*depthRatio : zRange[0], 0, 0, isPC ? zRange[1]*depthRatio : zRange[1]]);
    return new LineSegments2(geom, lineMat)},[zRange, depthRatio, isPC])

  const tickLine = useMemo(()=> {
    const geom = new LineSegmentsGeometry().setPositions([0, 0, 0, 0, 0, .05]);
    return new LineSegments2(geom, lineMat)},[])

  
  const dimScale = dimResolution/(dimResolution-1)
  const valDelta = 1/(dimResolution-1)

  return (
    <group visible={plotType != 'sphere'}>
    {/* Horizontal Group */}
    <group position={[0, shapeRatio*yRange[0], 0]}>
      {/* X Group */}
      <group position={[0, 0, flipX ? isPC ? zRange[0]*depthRatio : zRange[0] : isPC ? zRange[1] * depthRatio : zRange[1]]}> 
        <primitive key={'xLine'} object={xLine} />
        {Array(dimResolution).fill(null).map((_val,idx)=>(
          (((xRange[0] + 1)/2) <= (idx*dimScale)/dimResolution &&
           ((xRange[1] + 1)/2) >= (idx*dimScale)/dimResolution)
           &&          
          <group key={`xGroup_${idx}`} position={[-1 + idx*dimScale/(dimResolution/2), 0, 0]}>
            <primitive key={idx} object={tickLine.clone()}  rotation={[0, flipX ? Math.PI : 0, 0]} />
            <Text 
              key={`textX_${idx}`}
              anchorX={idx == 0 ? (flipX ? 'right' : 'left') : idx == dimResolution-1 ? (flipX ? 'left' : 'right') : 'center'}
              anchorY={'top'} 
              fontSize={0.05} 
              color={'black'}
              material-depthTest={false}
              rotation={[-Math.PI/2, 0, flipX ? Math.PI : 0]}
              position={[0, 0, flipX ? -0.05 :.05]}
            >{parseLoc(dimArrays[2][Math.floor((dimLengths[2]-1)*idx*valDelta)],dimUnits[2])}</Text>
          </group>
        ))}
        <Text 
          key={'xTitle'}
          anchorX={'center'}
          anchorY={'top'} 
          fontSize={0.1} 
          color={'black'}
          material-depthTest={false}
          rotation={[-Math.PI/2, 0, flipX ? Math.PI : 0]}
          position={[(xRange[0]+xRange[1])/2, 0, flipX ? -0.2 :.2]}
        >{dimNames[2]}</Text>
      </group>
      {/* Z Group */}
      <group position={[flipY ? xRange[1]: xRange[0], 0, 0]}>
        <primitive key={'zLine'} object={zLine} />
        {Array(dimResolution).fill(null).map((_val,idx)=>(
          (((zRange[0] + 1)/2) <= (idx*dimScale)/dimResolution  &&
          ((zRange[1] + 1)/2) >= (idx*dimScale)/dimResolution )
          && 
          <group key={`zGroup_${idx}`} position={[0, 0, isPC ? -depthRatio + idx*dimScale/(dimResolution/2)*depthRatio : -1 + idx*dimScale/(dimResolution/2)]}>
            <primitive key={idx} object={tickLine.clone()}  rotation={[0, flipY ? Math.PI/2 : -Math.PI/2 , 0]} />
            <Text 
              key={`textY_${idx}`}
              anchorX={idx == 0 ? (flipY ? 'right' : 'left') : idx == dimResolution-1 ? (flipY ? 'left' : 'right') : 'center'}
              anchorY={'top'} 
              fontSize={0.04} 
              color={'black'}
              material-depthTest={false}
              rotation={[-Math.PI/2, 0, flipY ? Math.PI/2 : -Math.PI/2]}
              position={[flipY ? 0.05 :-0.05, 0, 0]}
            >{parseLoc(dimArrays[0][(Math.floor((dimLengths[0]-1)*idx*valDelta)+Math.floor(dimLengths[0]*animProg))%dimLengths[0]],dimUnits[0])}</Text>
          </group>
        ))}
        <Text 
          key={'xTitle'}
          anchorX={'center'}
          anchorY={'top'} 
          fontSize={0.1} 
          color={'black'}
          material-depthTest={false}
          rotation={[-Math.PI/2, 0, flipY ? Math.PI/2 : -Math.PI/2]}
          position={[flipY ? 0.2 : -0.2, 0, (zRange[0]+zRange[1])/2]}
        >{dimNames[0]}</Text>
      </group>
    </group>
        
    {/* Vertical Group */}
    <group position={[flipY ? xRange[0] : xRange[1], 0, flipX ? isPC ? zRange[0]*depthRatio : zRange[0] : isPC ? zRange[1]*depthRatio : zRange[1]]}> 
      <primitive key={'yLine'} object={yLine} />
      {Array(dimResolution).fill(null).map((_val,idx)=>(
           (((yRange[0] + 1)/2) <= (idx*dimScale)/dimResolution &&
           ((yRange[1] + 1)/2) >= (idx*dimScale)/dimResolution)
           &&       
          <group key={`yGroup_${idx}`} position={[0, -shape.y/2 + idx*dimScale/(dimResolution/2)*shapeRatio, 0]}>
            <primitive key={idx} object={tickLine.clone()}  rotation={[0, flipY ? -Math.PI/2 :Math.PI/2 , 0]} />
            <Text 
              key={`text_${idx}`}
              anchorX={flipY ? flipX ? 'left' : 'right' : flipX ? 'right' : 'left'}
              anchorY={'middle'} 
              fontSize={0.05} 
              color={'black'}
              material-depthTest={false}
              rotation={[0, flipX ? Math.PI : 0, 0]}
              position={[flipY ? -0.07 : 0.07, 0, 0]}
            >{parseLoc(dimArrays[1][Math.floor((dimLengths[1]-1)*idx*valDelta)],dimUnits[1])}</Text>
          </group>
        ))}
        <Text 
          key={'xTitle'}
          anchorX={flipY ? flipX ? 'left' : 'right' : flipX ? 'right' : 'left'}
          anchorY={'middle'} 
          fontSize={0.1} 
          color={'black'}
          material-depthTest={false}
          rotation={[0, flipX ? Math.PI : 0, 0]}
          position={[flipY ? -0.25 : 0.25, (yRange[0]+yRange[1])/2*shapeRatio, 0]}
        >{dimNames[1]}</Text>
    </group>
  </group>
  )
}


export const AxisLines = () => {
  const [flipX, setFlipX] = useState<boolean>(false)
  const [flipY, setFlipY] = useState<boolean>(false)

  useFrame(({camera})=>{
      const shouldFlipX = Math.abs(camera.rotation.z) > Math.PI / 2;
      if (flipX !== shouldFlipX) {
        setFlipX(shouldFlipX);
      }

      const shouldFlipY =
        (camera.rotation.z > 0 && camera.rotation.x < 0) ||
        (camera.rotation.z <= 0 && camera.rotation.x > 0);
      if (flipY !== shouldFlipY){
        setFlipY(shouldFlipY);
      } 
  })

  return (
    <>
    <HorizontalAxis flipX={flipX} flipY={flipY} />
    </>
  )
}



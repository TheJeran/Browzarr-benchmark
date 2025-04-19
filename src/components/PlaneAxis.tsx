import { Hud, OrthographicCamera, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo } from 'react'
import { createXAxisTicks, createYAxisTicks } from './createTicks'
interface PlaneAxisProps {
  data?: [number, number, number][];
  lineColor?: string;
  lineWidth?: number;
}

export function PlaneAxis({ data, lineColor = '#ff0000', lineWidth = 1 }: PlaneAxisProps) {
    const frustumSize = 24
    const aspect = window.innerWidth / window.innerHeight
    const footerOffset = (48 / window.innerHeight) * frustumSize // Convert 48px to frustum units
    const hudHeight = (frustumSize / 4) - footerOffset // Adjust 
    // TODO: Define a better Yoffset for the Hud

  const lineMesh = useMemo(() => {
    if (!data?.length) return null;
    
    const points = data.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
    const material = new THREE.LineBasicMaterial({ color: lineColor, linewidth: lineWidth });
    
    return new THREE.Line(geometry, material);
  }, [data, lineColor, lineWidth]);

  return (
    <>
      <Hud renderPriority={1}>
        <OrthographicCamera
            makeDefault
            left={(frustumSize * aspect) / -2}
            right={(frustumSize * aspect) / 2}
            top={frustumSize / 2}
            bottom={frustumSize / -2}
            near={0.1}
            far={10}
            position={[0, 8.2, 5]} // that 8.2 is a magic number now, find a better approach.
            // zoom={1}
        />
        {/* Background plane - adjusted height and position */}
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[frustumSize * aspect, hudHeight]} />
          <meshBasicMaterial color="#151616" transparent={true} opacity={0.25}/>
        </mesh>
        
        {/* Plot line if data exists */}
        {lineMesh && <primitive object={lineMesh}
            // position-x={(frustumSize * aspect) / -2 + hudHeight/10}
            />}
        {createXAxisTicks({ 
            frustumSize, 
            aspect, 
            hudHeight,
            initialX: (frustumSize * aspect) / -2 + hudHeight/10,
            stepX: 0.5  // or whatever step size you want
            })}

        {createYAxisTicks({ frustumSize, aspect, hudHeight })}

        {/* X Axis label */}
        <Text
          position={[frustumSize * aspect * 0.46, hudHeight * 0.4, 0]}
          fontSize={0.5}
          color="orange"
          anchorX="center"
          anchorY="middle"
        >
          Y
        </Text>

        {/* Y Axis label */}
        <Text
          position={[-frustumSize * aspect * 0.45, hudHeight * 0.425, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          X
        </Text>
      </Hud>
    </>
  )
}
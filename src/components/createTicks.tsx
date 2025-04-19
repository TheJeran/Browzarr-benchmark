import { Text } from '@react-three/drei'

export interface AxisProps {
    frustumSize: number;
    aspect: number;
    hudHeight: number;
    tickCount?: number;
    tickSize?: number;
    color?: string;
    fontSize?: number;
    initialX?: number;
    stepX?: number;
  }
  
  export interface TickData {
    position: [number, number, number];
    value: number;
  }
export function createXAxisTicks({ 
  frustumSize, 
  aspect, 
  hudHeight, 
  tickCount = 8,
  tickSize = 0.1,
  color = 'white',
  fontSize = 0.4,
}: AxisProps) {
  const ticks: TickData[] = []
  
  for (let i = 0; i <= tickCount; i++) {
    const x = ((i / tickCount) * frustumSize * aspect) - ((frustumSize * aspect) / 2)
    ticks.push({
      position: [x, hudHeight * 0.45, 0],
      value: x
    })
  }

  return (
    <>
      {ticks.map(({ position: [x, y, z], value }, i) => (
        (i === 0 || i === ticks.length - 1) ? null : (
        <group key={`x-tick-${i}`}>
          <line>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                args={[new Float32Array([
                  x, y, z,
                  x, y + tickSize * hudHeight, z
                ]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} />
          </line>
          <line key={`vgrid-${i}`}>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                args={[new Float32Array([
                  x, -hudHeight+2.35, z,
                  x, hudHeight-2.9, z
                ]), 3]}
              />
            </bufferGeometry>
            <lineDashedMaterial 
              color={color} 
              opacity={0.2}
              transparent
            />
          </line>
          <Text
            position={[x, y - (tickSize * 1.0 * hudHeight), z]}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="bottom"
          >
            {value.toFixed(1)}
          </Text>
        </group>)
      ))}
    </>
  )
}

export function createYAxisTicks({
  frustumSize,
  aspect,
  hudHeight,
  tickCount = 4,
  tickSize = 0.05,
  color = 'orange',
  fontSize = 0.4
}: AxisProps) {
  const ticks: TickData[] = []
  const xPos = (frustumSize * aspect) / 2

  for (let i = 0; i <= tickCount; i++) {
    const y = (i / tickCount) * hudHeight * 0.9 - 2
    ticks.push({
      position: [xPos, y, 0],
      value: y
    })
  }

  return (
    <>
      {ticks.map(({ position: [x, y, z], value }, i) => (
        (i === 0 || i === ticks.length - 1) ? null : (
        <group key={`y-tick-${i}`}>
          <line>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                args={[new Float32Array([
                  x - tickSize * hudHeight, y, z,
                  x + tickSize * hudHeight, y, z
                ]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} />
          </line>
          <line key={`hgrid-${i}`}>
          <bufferGeometry>
            <float32BufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                -frustumSize * aspect / 2, y, z,
                frustumSize * aspect / 2, y, z
              ]), 3]}
            />
          </bufferGeometry>
          <lineDashedMaterial 
            color={color} 
            opacity={0.2}
            transparent
          />
        </line>
          <Text
            position={[x - (tickSize * 2.75 * hudHeight), y, z]}
            fontSize={fontSize}
            color={color}
            // anchorX="left"
            anchorY="middle"
          >
            {value.toFixed(1)}
          </Text>
        </group>
        )
      ))}
    </>
  )
}
import { useState, useRef } from 'react'
import { useCursor, RoundedBox, Text, Edges } from '@react-three/drei'
import { Group } from 'three'

interface MetadataInfo {
  name: string;
  shape: string | number[];
  chunks: string | number[];
  dtype: string;
  totalSize: number;
  totalSizeFormatted: string;
  chunkCount: number;
  chunkSize: number;
  chunkSizeFormatted: string;
}

interface MetadataTextProps {
  position?: [number, number, number];
  metadata: MetadataInfo;
  fontSize?: number;
  maxWidth?: number;
  textColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  viewHoverColor?: string;
  onViewClick?: (name: string) => void;
}

export default function MetadataText({
  position = [0, 0, 0],
  metadata,
  fontSize = 0.15,
  maxWidth = 2.85,
  textColor = 'white',
  backgroundColor = '#222831',
  hoverColor = '#1e1e1e',
  viewHoverColor = 'gold',
  onViewClick = () => {},
}: MetadataTextProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const [viewHovered, setViewHovered] = useState(false)
  useCursor(viewHovered)

  const handleViewClick = (e: any) => {
    e.stopPropagation()
    if (onViewClick) onViewClick(metadata.name)
  }

  const formatArray = (value: string | number[]): string => {
    if (typeof value === 'string') return value
    return Array.isArray(value) ? value.join(', ') : String(value)
  }

  const content = `
name: ${metadata.name}
shape: [${formatArray(metadata.shape)}]
chunks: [${formatArray(metadata.chunks)}]
dtype: ${metadata.dtype}
total size: ${metadata.totalSizeFormatted}
chunk count: ${metadata.chunkCount}
chunk size: ${metadata.chunkSizeFormatted}
`.trim()

  const padding = 0.1
  // Estimate dimensions based on fontSize and maxWidth
  const width = maxWidth
  const lineCount = content.split('\n').length
  const height = fontSize * lineCount * 1.4
  // console.log(height)
  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox
        args={[width, height + 2*padding, 0.01]}
        radius={0.025}
        smoothness={2}
        position={[width / 2, -height / 2, -0.03]}
      >
        <meshStandardMaterial
          color={hovered ? hoverColor : backgroundColor}
          metalness={0.7}
          roughness={0.3}
        />
        {hovered && (
          <Edges scale={1.0} threshold={20} color={viewHoverColor} />
        )}
      </RoundedBox>
      {/* Foreground text */}
      <Text
        position={[padding, 0, 0]}
        fontSize={fontSize}
        maxWidth={maxWidth}
        lineHeight={1.4}
        color={textColor}
        anchorX="left"
        anchorY="top"
      >
        {content}
      </Text>
      {/* Top-right "View" button */}
      <group position={[width - 0.27, -0.1, -0.0]}>
        <RoundedBox
          args={[0.45, 0.2, 0.02]}
          radius={0.025}
          smoothness={1}
          onClick={handleViewClick}
          onPointerOver={(e) => {
            e.stopPropagation()
            setViewHovered(true)
          }}
          onPointerOut={() => setViewHovered(false)}
        >
          <meshStandardMaterial color={viewHovered ? 'white' : 'gold'} metalness={0.3} roughness={0.3} />
        </RoundedBox>
        <Text
          position={[0.075, 0.025, 0.011]}
          fontSize={0.1}
          color="#222831"
          anchorX="center"
          anchorY="middle"
        >
          View
        </Text>
      </group>
    </group>
  )
}
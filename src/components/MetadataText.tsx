import { Text } from '@react-three/drei'

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
  color?: string;
  maxWidth?: number;
}

export default function MetadataText({
  position = [0, 0, 0],
  metadata,
  fontSize = 0.15,
  color = 'grey60',
  maxWidth = 2
}: MetadataTextProps) {
  const formatArray = (value: string | number[]): string => {
    if (typeof value === 'string') return value;
    return Array.isArray(value) ? value.join(', ') : String(value);
  };

  const content = `
name: ${metadata.name}
Shape: [ ${formatArray(metadata.shape)} ]
Dtype: ${metadata.dtype}
Total Size: ${metadata.totalSizeFormatted}
Chunk Count: ${metadata.chunkCount}
Chunk Size: ${metadata.chunkSizeFormatted}
  `

  return (
    <Text
      position={position}
      fontSize={fontSize}
      maxWidth={maxWidth}
      lineHeight={1.4}
      color={color}
      anchorX="left"
      anchorY="top"
    >
      {content.trim()}
    </Text>
  );
}

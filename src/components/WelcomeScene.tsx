import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import MetadataText from './MetadataText'

export default function TextOnlyApp() {
  const metadataList = [
    {
      position: [-1.5, 1, 0] as [number, number, number],
      metadata: {
        name: 'vpd',
        shape: '966, 720, 1440',
        chunks: '4, 720, 1440',
        dtype: 'float32',
        totalSize: 4006195200,
        totalSizeFormatted: '3.73 GB',
        chunkCount: 242,
        chunkSize: 16588800,
        chunkSizeFormatted: '15.82 MB'
      }
    },
    {
      position: [0.75, 1, 0] as [number, number, number],
      metadata: {
        name: 'ws10',
        shape: '966, 720, 1440',
        chunks: '4, 720, 1440',
        dtype: 'float32',
        totalSize: 4006195200,
        totalSizeFormatted: '3.73 GB',
        chunkCount: 242,
        chunkSize: 16588800,
        chunkSizeFormatted: '15.82 MB'
      },
    },
    {
      position: [3, 1, 0] as [number, number, number],
      metadata: {
        name: 'ws10',
        shape: '966, 720, 1440',
        chunks: '4, 720, 1440',
        dtype: 'float32',
        totalSize: 4006195200,
        totalSizeFormatted: '3.73 GB',
        chunkCount: 242,
        chunkSize: 16588800,
        chunkSizeFormatted: '15.82 MB'
      },
    },
  
  ];

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      {metadataList.map((item, i) => (
        <MetadataText key={i} position={item.position} metadata={item.metadata} onViewClick={(name) => {
          console.log(`View clicked for ${name}`)
        }}/>
      ))}
      <Environment preset="sunset" />
    </Canvas>
  )
}
import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { Environment } from '@react-three/drei'
import MetadataText from './MetadataText'

const testItem = {
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
    }

function Word({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  const color = new THREE.Color()
  const fontProps = { fontSize: 2.0, letterSpacing: -0.05, lineHeight: 1 }
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  useFrame(() => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshBasicMaterial
      if (material?.color) {
        material.color.lerp(color.set(hovered ? 'orange' : 'white'), 0.1)
      }
    }
  })

  return (
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => console.log('clicked')}
        {...fontProps}
      >
        {children}
      </Text>

      {hovered && (
        <group scale={[4, 4, 4]} position={[-4, 2.55, 1]}>
          <MetadataText
            metadata={testItem.metadata}
            onViewClick={(name) => {
              console.log(`View clicked for ${name}`)
            }}
          />
        </group>
      )}
    </Billboard>
  )
}


function Cloud({ variables, radius = 20 }: { variables: string[]; radius?: number }) {
  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = []
    const spherical = new THREE.Spherical()
    const count = variables.length
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count

    for (let i = 1; i < count + 1; i++) {
      const word = variables[i - 1] || `Word${i}`
      for (let j = 0; j < 1; j++) { // one instance per variable
        const position = new THREE.Vector3().setFromSpherical(
          spherical.set(radius, phiSpan * i, thetaSpan * j)
        )
        temp.push([position, word])
      }
    }

    return temp
  }, [variables, radius])

  return (
    <>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos}>
          {word}
        </Word>
      ))}
    </>
  )
}

export default function WelcomeText({ variablesPromise }: { variablesPromise: Promise<string[]> }) {
  const [variables, setVariables] = useState<string[]>([])

  useEffect(() => {
    variablesPromise.then(setVariables).catch((err) => console.error('Failed to load variables', err))
  }, [variablesPromise])

  return (
    <div className="canvas">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 85], fov: 90 }}>
        <fog attach="fog" args={['#202025', 0, 200]} />
        <Suspense fallback={null}>
          <group rotation={[0, 0, 0]}>
            <Cloud variables={variables} radius={60} />
          </group>
        </Suspense>
        <TrackballControls />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}

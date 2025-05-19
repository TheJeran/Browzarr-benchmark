import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import { Environment, OrbitControls } from '@react-three/drei'

import MetadataText from '@/components/MetadataText'
import { ZarrMetadata } from "@/components/zarr/Interfaces";

function Word({
  position,
  text,
  isActive,
  isDimmed,
  isHovered,
  setHoveredWord,
  onVariableSelect,
  onClick,
}: {
  position: [number, number, number],
  text: string | ZarrMetadata,
  isActive: boolean,
  isDimmed: boolean,
  isHovered: boolean,
  setHoveredWord: (w: string | ZarrMetadata | null) => void,
  onVariableSelect?: (name: string) => void,
  onClick: (e: any) => void
}) {
  const color = new THREE.Color()
  const fontProps = { fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1 }
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshBasicMaterial
      if (material?.color) {
        const baseColor = isHovered ? 'orange' : 'white'
        material.color.lerp(color.set(baseColor), 0.5)
        material.opacity = isDimmed ? 0.25 : 1
        material.transparent = true
      }
    }
  })

  const handleViewClick = (name: string) => {
    if (onVariableSelect) onVariableSelect(name);
  };

  return (
    <Billboard position={position}>
      {!isActive && (
        <Text
          ref={ref}
          onPointerOver={() => setHoveredWord(text)}
          onPointerOut={() => setHoveredWord(null)}
          onClick={onClick}
          {...fontProps}
        >
          {typeof text === 'string' ? text : text.name}
        </Text>
      )}

      {isActive && typeof text !== 'string' && (
        <group
          scale={[6, 6, 6]}
          position={[-8, 3, 3]}
          rotation={[-0.0, -0.0, 0.0]}
          onPointerDown={(e) => {
            e.stopPropagation() // prevent global click handler from dismissing
          }}
        >
          <MetadataText
            metadata={text}
            onViewClick={handleViewClick}
          />
        </group>
      )}
    </Billboard>
  )
}



function Cloud({ 
  variables, 
  radius = 20,
  onVariableSelect
}: { 
  variables: string[] | ZarrMetadata[]; 
  radius?: number;
  onVariableSelect?: (name: string) => void;
}) {
  const [hoveredWord, setHoveredWord] = useState<string | ZarrMetadata | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | ZarrMetadata | null>(null);


  const words = useMemo(() => {
    const temp: [THREE.Vector3, string | ZarrMetadata][] = []
    const spherical = new THREE.Spherical()
    const count = variables.length
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count

    for (let i = 1; i <= count; i++) {
      const word = variables[i - 1] || `Word${i}`
      const position = new THREE.Vector3().setFromSpherical(
        spherical.set(radius, phiSpan * i, thetaSpan * 0)
      )
      temp.push([position, word])
    }

    return temp
  }, [variables, radius])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Dismiss metadata unless we clicked inside a component that stopped propagation
      setSelectedWord(null)
    }
    window.addEventListener('pointerdown', handleClick)
    return () => window.removeEventListener('pointerdown', handleClick)
  }, [])

  const handleVariableSelect = (name: string) => {
    if (onVariableSelect) onVariableSelect(name);
  };
  return (
    <>
      {words.map(([pos, word], index) => (
        <Word
          key={index}
          position={[pos.x, pos.y, pos.z]}
          text={word}
          isActive={selectedWord === word}
          isDimmed={selectedWord !== null && selectedWord !== word}
          isHovered={hoveredWord === word}
          setHoveredWord={setHoveredWord}
          onVariableSelect={handleVariableSelect}
          onClick={(e) => {
            e.stopPropagation()
            setSelectedWord(word)
          }}
        />
      ))}
    </>
  )
}

export default function WelcomeText({ 
  variablesPromise, 
  onVariableSelect
}: { 
  variablesPromise: Promise<string[]> | Promise<ZarrMetadata[]>;
  onVariableSelect?: (variable: string) => void; // New prop type
}) {
  const [variables, setVariables] = useState<string[] | ZarrMetadata[]>([]);

  useEffect(() => {
    variablesPromise.then(setVariables).catch((err) => console.error('Failed to load variables', err));
  }, [variablesPromise]);

  // Handler for variable selection
  const handleVariableSelect = (name: string) => {
    if (onVariableSelect) onVariableSelect(name); console.log(name);
  };

  return (
    <div className="canvas">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 100], fov: 90 }}>
        <OrbitControls
          enablePan={false}
          enableRotate={true}
          enableZoom={true}
          minAzimuthAngle={0}  
          maxAzimuthAngle={0}
          minDistance={85}
          maxDistance={100}
        />
        <fog attach="fog" args={['grey', 0, 100]} />
        <ambientLight intensity={2} />
        <Suspense fallback={null}>
          <Cloud 
            variables={variables} 
            radius={60} 
            onVariableSelect={handleVariableSelect} // Pass the handler down
          />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

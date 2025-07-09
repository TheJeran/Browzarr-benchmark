import React, {useRef, useMemo, useEffect, useState} from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { usePlotStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'

interface pointSetters{
  setPointID:React.Dispatch<React.SetStateAction<number>>,
  setPointLoc:React.Dispatch<React.SetStateAction<number[]>>,
  setShowPointInfo:React.Dispatch<React.SetStateAction<boolean>>,
}

function PlotPoints({ points, pointSetters, scalers }: { points: THREE.Vector3[]; pointSetters:pointSetters; scalers:{xScale:number,yScale:number} }) {
  const ref = useRef<THREE.InstancedMesh | null>(null)
  const count = points.length
  const [_reRender,setreRender] = useState<boolean>(false)
  const {setPointID, setPointLoc,setShowPointInfo} = pointSetters;
  const [zoom,setZoom] = useState<number>(1)
  const {pointColor, pointSize} = usePlotStore(useShallow(state => ({pointColor: state.pointColor, pointSize: state.linePointSize})))
  const {xScale, yScale} = scalers;

  const geometry = useMemo(() => new THREE.SphereGeometry(pointSize), [pointSize])
  const material = useMemo(()=> new THREE.ShaderMaterial({
    glslVersion:THREE.GLSL3,
    uniforms:{
      pointColor: {value: new THREE.Color(pointColor)},
      xScale: {value: xScale},
      yScale: {value: yScale},
      
    },
    
    }),[pointColor, xScale, yScale])

  useEffect(() => {
    if (ref.current){
      const dummy = new THREE.Object3D()
      for (let i = 0 ; i< count; i++){
        const position = points[i].toArray()
        dummy.position.set(...position)
        dummy.scale.set(1/zoom,1/zoom,1/zoom)
        dummy.updateMatrix()
        ref.current.setMatrixAt(i, dummy.matrix)
      }
      ref.current.instanceMatrix.needsUpdate = true
    }
  }, [points,zoom,geometry, material])

  useFrame(({camera})=>{
    if (camera.zoom !== zoom){
      setZoom(camera.zoom)
    }
  })

  function scalePoint(e: any) {
    if (ref.current) {
      const dummy = new THREE.Object3D();
      const matrix = new THREE.Matrix4();
      ref.current.getMatrixAt(e.instanceId, matrix);
      const position = new THREE.Vector3();
      position.setFromMatrixPosition(matrix);
      dummy.scale.set(3/zoom, 3/zoom, 3/zoom);
      dummy.position.copy(position);
      dummy.updateMatrix();
      ref.current.setMatrixAt(e.instanceId, dummy.matrix);
      ref.current.instanceMatrix.needsUpdate = true;
      setreRender((x) => !x);
      setPointID(e.instanceId)
      setPointLoc([e.clientX,e.clientY])
      setShowPointInfo(true)
    }
  }

  function restorePoint(){
    if (ref.current){
      const dummy = new THREE.Object3D();
      const matrix = new THREE.Matrix4()
      const position = new THREE.Vector3()
      for (let i=0; i<count;i++){
        ref.current.getMatrixAt(i,matrix)
        position.setFromMatrixPosition(matrix)
        dummy.scale.set(1/zoom,1/zoom,1/zoom)
        dummy.position.copy(position)
        dummy.updateMatrix()
        ref.current.setMatrixAt(i,dummy.matrix)
      }
      ref.current.instanceMatrix.needsUpdate = true
      setreRender(x=>!x)
      setShowPointInfo(false)
    }
  }

  return (
    <>
    <mesh onPointerEnter={scalePoint} onPointerLeave={restorePoint}>
    <instancedMesh ref={ref} args={[geometry, material, count]} />
    </mesh>
    </>
  )
}

export {PlotPoints}

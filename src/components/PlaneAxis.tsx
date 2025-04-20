import * as THREE from 'three'
import { useMemo } from 'react'
interface PlaneAxisProps {
  data?: [number, number, number][];
  lineColor?: string;
  lineWidth?: number;
}

export function PlaneAxis({ data, lineColor = '#ff0000', lineWidth = 2 }: PlaneAxisProps) {

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
      {/* Plot line if data exists */}
      {lineMesh && <primitive object={lineMesh} />}
    </>
  )
}
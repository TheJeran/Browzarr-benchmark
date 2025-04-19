import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface PlotLineProps {
  data: [number, number, number][];
  color?: string;
  lineWidth?: number;
}
export const PlotLine = ({ data, color = 'white', lineWidth = 1 }: PlotLineProps) => {
  const meshRef = useRef<THREE.Line | null>(null);

  const geometry = useMemo(() => {
    const points = data.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
  }, [data]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color, linewidth: lineWidth });
  }, [color, lineWidth]);

  return <primitive object={new THREE.Line(geometry, material)} ref={meshRef} />;
};
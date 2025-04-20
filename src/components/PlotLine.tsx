import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface PlotLineProps {
  data: [number, number, number][];
  color?: string;
  lineWidth?: number;
  showPoints?: boolean;
  pointSize?: number;
  pointColor?: string;
  interpolation?: 'linear' | 'curved';
}

export const PlotLine = ({ 
  data, 
  color = 'white', 
  lineWidth = 1,
  showPoints = false,
  pointSize = 0.1,
  pointColor,
  interpolation = 'linear'
}: PlotLineProps) => {
  const meshRef = useRef<THREE.Line | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  const geometry = useMemo(() => {
    if (!data || data.length === 0) return null;
    const points = data.map(([x, y, z]) => new THREE.Vector3(x, y, z));
   // Choose interpolation method
   if (interpolation === 'curved') {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
  } else {
    // Linear interpolation - just connect the points directly
    return new THREE.BufferGeometry().setFromPoints(points);
  }
}, [data, interpolation]);

  const pointsGeometry = useMemo(() => {
    if (!data || data.length === 0) return null;
    const points = data.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [data]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color, linewidth: lineWidth });
  }, [color, lineWidth]);

  const pointsMaterial = useMemo(() => {
    return new THREE.PointsMaterial({ 
      color: pointColor || color,
      size: pointSize,
      sizeAttenuation: true
    });
  }, [color, pointColor, pointSize]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <group>
      {geometry && <primitive object={new THREE.Line(geometry, material)} ref={meshRef} />}
      {showPoints && pointsGeometry && (
        <primitive object={new THREE.Points(pointsGeometry, pointsMaterial)} ref={pointsRef} />
      )}
    </group>
  );
};
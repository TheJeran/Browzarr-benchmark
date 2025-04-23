import * as THREE from 'three'
import { useState } from 'react';


interface TimeSeriesLocs{
  uv:THREE.Vector2;
  normal:THREE.Vector3
}

export const UVCube = ({shape,setTimeSeriesLocs} : {shape:THREE.Vector3, setTimeSeriesLocs:React.Dispatch<React.SetStateAction<TimeSeriesLocs>>} )=>{
  const [clickPoint, setClickPoint] = useState<THREE.Vector3 | null>(null);
  function TimeSeriesLocs(event: THREE.Intersection){
    const point = event.point;
    const uv = event.uv!;
    const normal = event.normal!;
    
    setClickPoint(point);
    setTimeSeriesLocs({
      uv,
      normal
    });

    // Optional: Remove the point after some time
    // setTimeout(() => setClickPoint(null), 2000);
  }

  return (
    <>
      <mesh scale={shape} onClick={(e) => {
        e.stopPropagation();
        if (e.intersections.length > 0) {
          TimeSeriesLocs(e.intersections[0]);
        }
      }}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {clickPoint && (
        <mesh position={clickPoint} scale={0.01}>
          <boxGeometry />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      )}
    </>
  )
}

import * as THREE from 'three'
import { useMemo } from 'react'

interface PlotLineProps {
  data: number[];
  color?: string;
  lineWidth?: number;
  showPoints?: boolean;
  pointSize?: number;
  pointColor?: string;
  interpolation?: 'linear' | 'curved';
  range:[[number,number],[number,number]]
  scaling:scaling
}

interface scaling{
    maxVal:number,
    minVal:number,
    colormap:THREE.DataTexture
}
export const PlotLine = ({ 
  data, 
  color = 'white', 
  lineWidth = 1,
  showPoints = false,
  pointSize = 0.1,
  pointColor,
  interpolation = 'linear',
  range = [[-100,100],[-10,10]], //xmin,xmax,ymin,ymax
  scaling
}: PlotLineProps) => {

  //LinSpace to take up entire extent
  function linspace(start: number, stop: number, num: number): number[] {
    const step = (stop - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + step * i);
  }

  const {maxVal,minVal,colormap} = scaling;

  function duplicateArray(arr:number[], times:number) {
    return arr.flatMap(item => Array(times).fill(item));
  }

  const geometry = useMemo(() => {
    if (!data || data.length === 0) return null;
    const xCoords = linspace(range[0][0],range[0][1],data.length)
    const normed = data.map((i) => (i - minVal) / (maxVal - minVal));
    const points = normed.map((val,idx) => new THREE.Vector3(xCoords[idx], (val-.5)*10, 0)); //I have the vertical scale hardcoded here because of used range. Will change later with range logic
   // Choose interpolation method
   if (interpolation === 'curved') {
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
    geometry.setAttribute('normed', new THREE.Float32BufferAttribute(duplicateArray(normed,50), 1)); //Hardcoded to above resolution. Should probably make a variable
    return geometry;
  } else {
    // Linear interpolation - just connect the points directly
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.setAttribute('normed', new THREE.Float32BufferAttribute(normed, 1));
    return geometry
  }
}, [data, interpolation]);

  const pointsGeometry = useMemo(() => {
    if (!data || data.length === 0) return null;
    const xCoords = linspace(range[0][0],range[0][1],data.length)

    const points = data.map((val,idx) => new THREE.Vector3(xCoords[idx], val, 0));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [data]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
                    glslVersion: THREE.GLSL3,
                    uniforms: {
                        cmap:{value: colormap},
                    },
                    vertexShader:`
                    varying float vNormed;
                    attribute float normed;

                    void main() {
                        vNormed = normed;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                    `,
                    fragmentShader:`
                    out vec4 Color;
                    uniform sampler2D cmap;
                    varying float vNormed;

                    void main() {
                        vec4 texColor = texture(cmap, vec2(vNormed, 0.5));
                        texColor.a = 2.;
                        // Color = vec4(1.,0.0,0.,1.);
                        Color = texColor;
                    }
                    `,
                    linewidth:lineWidth,
                    depthWrite: false,
        });
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
      {geometry && <primitive object={new THREE.Line(geometry, material)}  />}
      {showPoints && pointsGeometry && (
        <primitive object={new THREE.Points(pointsGeometry, pointsMaterial)} />
      )}
    </group>
  );
};
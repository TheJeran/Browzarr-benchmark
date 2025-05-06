import {  useMemo } from 'react'
import {  useRef, useState } from 'react'
import * as THREE from 'three'
import vertexShader from '@/components/textures/shaders/vertex.glsl';
import fragmentShader from '@/components/textures/shaders/fragment.glsl';
// import { useControls } from 'leva';
import pointVert from '@/components/textures/shaders/pointVertex.glsl';
import pointFrag from '@/components/textures/shaders/pointFrag.glsl';

const colormaps = ['viridis', 'plasma', 'inferno', 'magma', 'Accent', 'Blues',
  'CMRmap', 'twilight', 'tab10', 'gist_earth', 'cividis',
  'Spectral', 'gist_stern', 'gnuplot', 'gnuplot2', 'ocean', 'turbo',
  'GnBu', 'afmhot', 'cubehelix', 'hot', 'spring','terrain', 'winter', 'Wistia',
]

interface DataCubeProps {
  volTexture: THREE.Data3DTexture | THREE.DataTexture | null,
  shape : THREE.Vector3,
  colormap: THREE.DataTexture
}

interface PCProps {
  texture: THREE.Data3DTexture | THREE.DataTexture | null,
  colormap: THREE.DataTexture
}

export const DataCube = ({ volTexture, shape, colormap }: DataCubeProps ) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { threshold, steps, flip, xMax,xMin,yMax,yMin,zMax,zMin } = useControls({
        threshold: {
          value: 0, // Default value
          min: 0,   // Minimum value
          max: 1,  // Maximum value
          step: .01,  // Step size
          label:"Clip Values"
        },
        steps: {
            value: 200,
            min: 50,
            max:1000,
            step: 25,
            label: "Quality"
        },
        flip: {
            value: false,
            label: "Invert Values"
        },
        cmap: {
          value: "Spectral",
          options:colormaps,
          label: 'ColorMap'
        },
        xMax: {
          value:1,
          min:-1,
          max:1,
          step:0.01
        },
        xMin: {
          value:-1,
          min:-1,
          max:1,
          step:0.01
        }
        ,
        yMax: {
          value:1,
          min:-1,
          max:1,
          step:0.01
        },
        yMin: {
          value:-1,
          min:-1,
          max:1,
          step:0.01
        },
        zMax: {
          value:1,
          min:-1,
          max:1,
          step:0.01
        },
        zMin: {
          value:-1,
          min:-1,
          max:1,
          step:0.01
        }
      });

  // We need to check if moving this outside of useMemo means it's creating a ton of materials. This was how it was done in THREE Journey when I was doing that, so I know it's not stricly speaking wrong
    const shaderMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
          map: { value: volTexture },
          cmap:{value: colormap},
          cameraPos: { value: new THREE.Vector3() },
          threshold: {value: threshold},
          scale: {value: shape},
          flatBounds:{value: new THREE.Vector4(xMin,xMax,yMin,yMax)},
          vertBounds:{value: new THREE.Vector2(zMin,zMax)},
          steps: { value: steps },
          flip: {value: flip }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
        
  // Use geometry once, avoid recreating -- Using a sphere to avoid the weird angles you get with cube
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(4, 8), []);

  return (
    <>
    <mesh ref={meshRef} geometry={geometry}>
      <primitive attach="material" object={shaderMaterial} />
    </mesh>
    </>
  )
}

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

export const PointCloud = ({textures} : {textures:PCProps} )=>{
  const {texture, colormap } = textures;
  const {pointScale,scalePoints} = useControls({
    pointScale:{
      value:1,
      min:1,
      max:40,
      step:1
    },
    scalePoints:{
      value:false,
      label:"Scale Points By Value"
    }
    }
  )
  //Extract data and shape from Data3DTexture
  const { data, width, height, depth } = useMemo(() => {
    if (!(texture instanceof THREE.Data3DTexture)) {
      console.warn('Provided texture is not a Data3DTexture');
      return { data: [], width: 0, height: 0, depth: 0 };
    }
    return {
      data: texture.image.data,
      width: texture.image.width,
      height: texture.image.height,
      depth: texture.image.depth,
    };
  }, [texture]);

  const { positions, values } = useMemo(() => {
    const positions = [];
    const values = [];
    const aspectRatio = width/height
    let depthRatio = depth/height;
    depthRatio = depthRatio > 10 ? 10: depthRatio;
    //Generate grid points based on texture shape
    for (let z = 0; z < depth; z++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = x + y * width + z * width * height;
          const value = (data as number[])[index] || 0;
          // Skip zero or invalid values if needed
          if (value > 0) {
            // Normalize coordinates acceptable range
            const px = ((x / (width - 1)) - 0.5) * aspectRatio;
            const py = (y / (height - 1)) - 0.5;
            const pz = ((z / (depth - 1)) - 0.5) * depthRatio;

            positions.push(px*2, py*2, pz*2); //This two is to match the scale of the volume which defaults to 2x2
            values.push(value);
          }
        }
      }
    }
    return { positions, values };
  }, [data, width, height, depth]);


  // Create buffer geometry
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('value', new THREE.Float32BufferAttribute(values, 1));
    return geom;
  }, [positions, values]);


  const shaderMaterial = new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    uniforms: {
      pointSize: {value: pointScale},
      cmap: {value: colormap},
      scalePoints:{value: scalePoints}
    },
    vertexShader:pointVert,
    fragmentShader:pointFrag,
    depthWrite: true,
    transparent: true,
    blending:THREE.NormalBlending,
    side:THREE.DoubleSide,
  });

  return (
    <points geometry={geometry} material={shaderMaterial} />
  );
}

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

  const meshRef = useRef<THREE.Line | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
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
      {geometry && <primitive object={new THREE.Line(geometry, material)} ref={meshRef} />}
      {showPoints && pointsGeometry && (
        <primitive object={new THREE.Points(pointsGeometry, pointsMaterial)} ref={pointsRef} />
      )}
    </group>
  );
};
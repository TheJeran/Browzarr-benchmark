import {  useEffect, useMemo } from 'react'
import { useState, useRef } from 'react'
import * as THREE from 'three'
import vertexShader from '@/utils/shaders/vertex.glsl';
import fragmentShader from '@/utils/shaders/fragment.glsl';
import { useControls } from 'leva';
import { GetColorMapTexture } from '@/utils/colormap';
import pointVert from '@/utils/shaders/pointVertex.glsl';
import pointFrag from '@/utils/shaders/pointFrag.glsl';



const colormaps = ['viridis', 'plasma', 'inferno', 'magma', 'Accent', 'Blues',
  'CMRmap', 'twilight', 'tab10', 'gist_earth', 'cividis',
  'Spectral', 'gist_stern', 'gnuplot', 'gnuplot2', 'ocean', 'turbo',
  'GnBu', 'afmhot', 'cubehelix', 'hot', 'spring','terrain', 'winter', 'Wistia',
]

interface DataCubeProps {
  volTexture: THREE.Data3DTexture | THREE.DataTexture | null,
  shape : THREE.Vector3
}

interface PCProps {
  texture: THREE.Data3DTexture | THREE.DataTexture | null
}

export const DataCube = ({ volTexture, shape }: DataCubeProps ) => {
    const meshRef = useRef<THREE.Mesh>(null);
    // const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    // const { invalidate } = useThree();
    const [colormap,setColormap] = useState<THREE.DataTexture>(GetColorMapTexture())
    const { threshold, steps, flip, cmap, xMax,xMin,yMax,yMin,zMax,zMin } = useControls({
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

    useEffect(()=>{
      setColormap(GetColorMapTexture(colormap,cmap));
    },[cmap])

  return (
    <>
    <mesh ref={meshRef} rotation-y={Math.PI / 2} geometry={geometry}>
      <primitive attach="material" object={shaderMaterial} />
    </mesh>
    </>
  )
}

export const PointCloud = ({texture} : PCProps )=>{
  const [colormap,setColormap] = useState<THREE.DataTexture>(GetColorMapTexture())
  const {cmap,pointScale,scalePoints} = useControls(
    {
      cmap: {
        value: "Spectral",
        options:colormaps,
        label: 'ColorMap'
    },
    pointScale:{
      value:1,
      min:1,
      max:20,
      step:1
    },
    scalePoints:{
      value:false,
      label:"Scale Points By Value"

    }
    }
  )
  // Extract data and shape from Data3DTexture
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
    // Generate grid points based on texture shape
    for (let z = 0; z < depth; z++) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = x + y * width + z * width * height;
          const value = (data as number[])[index] || 0;

          // Skip zero or invalid values if needed
          if (value > 0) {
            // Normalize coordinates to [-0.5, 0.5] range
            const px = ((x / (width - 1)) - 0.5) * aspectRatio;
            const py = (y / (height - 1)) - 0.5;
            const pz = ((z / (depth - 1)) - 0.5) * depthRatio;

            positions.push(px, py, pz);
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
        blending: THREE.NoBlending,
        depthWrite: true,
        });

  useEffect(()=>{
    setColormap(GetColorMapTexture(colormap,cmap));
  },[cmap])
  return (
    <points geometry={geometry} material={shaderMaterial}/>
  );
}

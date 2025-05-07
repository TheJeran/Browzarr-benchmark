
import * as THREE from 'three'
import { useMemo } from 'react'
// import { useControls } from 'leva'
import { pointFrag, pointVert } from '@/components/textures/shaders'
import { usePaneInput, usePaneFolder, useSliderBlade, useTweakpane } from '@lazarusa/react-tweakpane'

interface PCProps {
  texture: THREE.Data3DTexture | THREE.DataTexture | null,
  colormap: THREE.DataTexture
}

export const PointCloud = ({textures} : {textures:PCProps} )=>{
    const {texture, colormap } = textures;
    const pane = useTweakpane(
      {
        scalePoints: false,
      },
      {
        title: 'Point cloud',
        // container: container,
        expanded: true,
      }
    );

    const [pointScale] = useSliderBlade(pane, {
      label: 'Point Size',
      value: 1,
      min: 1,
      max: 100,
      step: 1,
    })
    const [scalePoints] = usePaneInput(
      pane,
      'scalePoints',
      {
        label: 'Scale Points By Value',
        value: false
      }
    )
    const [scaleIntensity] = useSliderBlade(pane, {
      label: 'Scale Intensity',
      value: 2,
      min: 1,
      max: 10,
      step: 0.2,
    })
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
        scalePoints:{value: scalePoints},
        scaleIntensity: {value: scaleIntensity}
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
import React, {useEffect, useMemo, useState} from 'react'
import * as THREE from 'three'
import { useGlobalStore, usePlotStore } from '@/utils/GlobalStates'
import { ZarrDataset } from '@/components/zarr/ZarrLoaderLRU';
import { useShallow } from 'zustand/shallow'
import { vertexShader, sphereFrag, flatSphereFrag } from '../textures/shaders'
import { useFrame } from '@react-three/fiber'
import { parseUVCoords } from '@/utils/HelperFuncs';


function XYZtoUV(xyz : THREE.Vector3, width: number, height : number){
    const lon = Math.atan2(xyz.z,xyz.x)
    const lat = Math.asin(xyz.y);
    let u = (lon + Math.PI) / (2 * Math.PI);
    u = 1 - u;
    let v = (lat + Math.PI / 2) / Math.PI;
    u = Math.round(u*width-.5)/width
    v = Math.round(v*height-.5)/height
    return new THREE.Vector2(u,v)
}

function XYZtoRemap(xyz : THREE.Vector3, latBounds: number[], lonBounds : number[]){
    const lon = Math.atan2(xyz.z,xyz.x)
    const lat = Math.asin(xyz.y);
    const u = (lon - deg2rad(lonBounds[0]))/(deg2rad(lonBounds[1])-deg2rad(lonBounds[0]))
    const v = (lon - deg2rad(lonBounds[0]))/(deg2rad(lonBounds[1])-deg2rad(lonBounds[0]))
    return new THREE.Vector2(u,v)
}

function deg2rad(deg: number){
  return deg*Math.PI/180;
}

export const Sphere = ({texture, ZarrDS} : {texture: THREE.Data3DTexture | THREE.DataTexture | null, ZarrDS: ZarrDataset}) => {
    const {colormap, flipY, isFlat} = useGlobalStore(useShallow(state=> ({
        colormap: state.colormap,
        flipY: state.flipY,
        isFlat: state.isFlat
    })))
    const {setPlotDim,updateDimCoords, updateTimeSeries} = useGlobalStore(useShallow(state=>({
      setPlotDim:state.setPlotDim, 
      updateDimCoords:state.updateDimCoords,
      updateTimeSeries: state.updateTimeSeries
    })))

    const {dimArrays,dimNames,dimUnits} = useGlobalStore(useShallow(state=>({
        shape:state.shape,
        dimArrays:state.dimArrays,
        dimNames:state.dimNames,
        dimUnits:state.dimUnits
    })))

    const {animate, animProg, cOffset, cScale, selectTS, lonExtent, latExtent, lonResolution, latResolution} = usePlotStore(useShallow(state=> ({
        animate: state.animate,
        animProg: state.animProg,
        cOffset: state.cOffset,
        cScale: state.cScale,
        selectTS: state.selectTS,
        lonExtent: state.lonExtent,
        latExtent: state.latExtent,
        lonResolution: state.lonResolution,
        latResolution: state.latResolution
    })))

    const [bounds, setBounds] = useState<THREE.Vector4[]>(new Array(10).fill(new THREE.Vector4(-1 , -1, -1, -1)))
    const {height, width} = useMemo(()=>texture?.source.data, [texture])

    function addBounds(uv : THREE.Vector2){ //This adds the bounds in UV space of a selected square on the sphere. 
      const widthID = Math.round(uv.x*width)+.5;
      const heightID = flipY ? Math.round((1-uv.y)*height)-.5 : Math.round(uv.y*height)+.5 ;
      const delX = 1/width;
      const delY = 1/height;
      const xBounds = [widthID/width-delX/2,widthID/width+delX/2]
      const yBounds = [heightID/height-delY/2,heightID/height+delY/2]
      const bounds = new THREE.Vector4(...xBounds, ...yBounds)
      setBounds(prev=> [bounds, ...prev].slice(0,10))
    }

    const [lonBounds, latBounds] = useMemo(()=>{ //The bounds for the shader. It takes the middle point of the furthest coordinate and adds the distance to edge of pixel
      const newLatStep = latResolution/2;
      const newLonStep = lonResolution/2;
      const newLonBounds = [Math.max(lonExtent[0]-newLonStep, -180), Math.min(lonExtent[1]+newLonStep, 180)]
      const newLatBounds = [Math.max(latExtent[0]-newLatStep, -90), Math.min(latExtent[1]+newLatStep, 90)]
      return [newLonBounds, newLatBounds]
    },[latExtent, lonExtent, lonResolution, latResolution])


    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 9), []);
    
    const shaderMaterial = useMemo(()=>{
        const shader = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            uniforms: {
                map: { value: texture },
                selectTS: {value: selectTS},
                selectBounds: {value: bounds},
                cmap:{value: colormap},
                cOffset:{value: cOffset},
                cScale: {value: cScale},
                animateProg: {value: animProg},
                latBounds: {value: new THREE.Vector2(deg2rad(latBounds[0]), deg2rad(latBounds[1]))},
                lonBounds: {value: new THREE.Vector2(deg2rad(lonBounds[0]), deg2rad(lonBounds[1]))}
            },
            vertexShader,
            fragmentShader: isFlat ? flatSphereFrag : sphereFrag,
            blending: THREE.NormalBlending,
        })
        return shader
    },[texture, animProg, colormap, cOffset, cScale, animate, bounds, selectTS, lonBounds, latBounds])


    function HandleTimeSeries(event: THREE.Intersection){
        const point = event.point.normalize();
        const uv = XYZtoUV(point, texture?.source.data.width, texture?.source.data.height);
        const normal = new THREE.Vector3(0,0,1)
    
        if(ZarrDS){
          const tempTS = ZarrDS.GetTimeSeries({uv,normal})
          const plotDim = (normal.toArray()).map((val, idx) => {
            if (Math.abs(val) > 0) {
              return idx;
            }
            return null;}).filter(idx => idx !== null);
          setPlotDim(2-plotDim[0]) //I think this 2 is only if there are 3-dims. Need to rework the logic
    
          const coordUV = parseUVCoords({normal:normal,uv:uv})
          let dimCoords = coordUV.map((val,idx)=>val ? dimArrays[idx][Math.round(val*dimArrays[idx].length)] : null)
          const thisDimNames = dimNames.filter((_,idx)=> dimCoords[idx] !== null)
          const thisDimUnits = dimUnits.filter((_,idx)=> dimCoords[idx] !== null)
          dimCoords = dimCoords.filter(val => val !== null)
          const tsID = `${dimCoords[0]}_${dimCoords[1]}`
          updateTimeSeries({ [tsID] : tempTS})
          const dimObj = {
            first:{
              name:thisDimNames[0],
              loc:dimCoords[0] ?? 0,
              units:thisDimUnits[0]
            },
            second:{
              name:thisDimNames[1],
              loc:dimCoords[1] ?? 0,
              units:thisDimUnits[1]
            },
            plot:{
              units:dimUnits[2-plotDim[0]]
            }
          }
          updateDimCoords({[tsID] : dimObj})
        }
        addBounds(uv);
      }

  return (
    <>
    <mesh geometry={geometry} material={shaderMaterial} onClick={e=>selectTS && HandleTimeSeries(e)}/>
    
    </>
  )
}

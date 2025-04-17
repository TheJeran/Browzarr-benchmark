import * as THREE from 'three'
THREE.Cache.enabled = true;
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment, Html } from '@react-three/drei'
// import * as zarr from 'zarrita'
import { variables, GetArray } from '@/components/ZarrLoaderLRU'
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';
import { Leva, useControls } from 'leva'
import { lightTheme } from '@/utils/levaTheme'
import { ArrayToTexture, DefaultCube } from './TextureMakers';
import { DataCube, PointCloud, UVCube } from './PlotObjects';
import { TimeSeries } from './TimeSeries';
import { GetColorMapTexture } from '@/utils/colormap';

const colormaps = ['viridis', 'plasma', 'inferno', 'magma', 'Accent', 'Blues',
  'CMRmap', 'twilight', 'tab10', 'gist_earth', 'cividis',
  'Spectral', 'gist_stern', 'gnuplot', 'gnuplot2', 'ocean', 'turbo',
  'GnBu', 'afmhot', 'cubehelix', 'hot', 'spring','terrain', 'winter', 'Wistia',
]

const storeURL = "https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr"

interface TimeSeriesLocs{
  uv:THREE.Vector2;
  normal:THREE.Vector3
}


export function CanvasGeometry() {
  const { variable, plotter, cmap } = useControls({ 
    variable: { 
      value: "Default", 
      options: variables, 
      label:"Select Variable" 
    },
    plotter: {
      value:"volume",
      options:["volume","point-cloud"],
      label:"Select Plot Style"
    },
    cmap: {
      value: "Spectral",
      options:colormaps,
      label: 'ColorMap'
  }, 
  })

  const [texture, setTexture] = useState<THREE.DataTexture | THREE.Data3DTexture | null>(null)
  const [shape, setShape] = useState<THREE.Vector3 | THREE.Vector3>(new THREE.Vector3(2, 2, 2))
  const [timeSeriesLocs,setTimeSeriesLocs] = useState<TimeSeriesLocs>({uv:new THREE.Vector2(.5,.5), normal:new THREE.Vector3(0,0,1)})
  const [valueScales,setValueScales] = useState({maxVal:1,minVal:-1})
  const [showTimeSeries,setShowTimeSeries] = useState<boolean>(false)
  const [colormap,setColormap] = useState<THREE.DataTexture>(GetColorMapTexture())

  useEffect(()=>{
    setColormap(GetColorMapTexture(colormap,cmap));
  },[cmap, colormap])


  useEffect(() => {
    if (variable != "Default") {
      //Need to add a check somewhere here to swap to 2D or 3D based on shape. Probably export two variables from GetArray
      GetArray(storeURL, variable).then((result) => {
        // result now contains: { data: TypedArray, shape: number[], dtype: string }
        const [texture, _, scaling] = ArrayToTexture({
          data: result.data,
          shape: result.shape
        })
        if (texture instanceof THREE.DataTexture || texture instanceof THREE.Data3DTexture) {
          setTexture(texture)
        } else {
          console.error("Invalid texture type returned from ArrayToTexture");
          setTexture(null);
        }
        // norrow down type before using it!
        if (
          typeof scaling === 'object' &&
          'maxVal' in scaling &&
          'minVal' in scaling
        ) {
          setValueScales(scaling as { maxVal: number; minVal: number });
        }
        const shapeRatio = result.shape[1] / result.shape[2] * 2;
        setShape(new THREE.Vector3(2, shapeRatio, 2));
      })
    }
      else{
        const texture = DefaultCube();
        // again need to check type before using it
        if (texture instanceof THREE.Data3DTexture || texture instanceof THREE.DataTexture) {
          setTexture(texture);
        }
        setShape(new THREE.Vector3(2, 2, 2))
      }
  }, [variable])

  return (
    <>
    
    <div className='canvas'>
      <Canvas shadows
      frameloop="demand"
      >
        
          <Center top position={[-1, 0, 1]}/>
          {plotter == "volume" && <>
            <DataCube volTexture={texture} shape={shape} colormap={colormap}/>
            <mesh onClick={() => setShowTimeSeries(true)}>
              <UVCube shape={shape} setTimeSeriesLocs={setTimeSeriesLocs}/>
            </mesh>
            
          </>}
          {plotter == "point-cloud" && <PointCloud textures={{texture,colormap}} />}
          
          <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} enablePan={false}/>
          <Environment preset="city" />
          {showTimeSeries && <>
          
            <TimeSeries timeSeriesLocs={timeSeriesLocs} DSInfo={{variable:variable, storePath:storeURL}} scaling={{...valueScales,colormap}}/>
            <Html
            fullscreen
            style={{
              pointerEvents: 'none', // Prevents capturing mouse events
            }}
            >
              <button style={{
                  position: 'absolute',
                  bottom: '100px',
                  right: '100px',
                  padding: '8px 16px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  pointerEvents: 'auto'

                }}
                onClick={()=>setShowTimeSeries(false)}
              >
                Hide Time Series
              </button>
            </Html>
          
          </>}
      </Canvas>
    </div>
    <Leva theme={lightTheme} />
    </>
  )
}

export default CanvasGeometry
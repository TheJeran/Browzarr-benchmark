import * as THREE from 'three'
THREE.Cache.enabled = true;
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment } from '@react-three/drei'
import { variables, ZarrDataset } from '@/components/ZarrLoaderLRU'
import { useEffect, useState, useMemo } from 'react';
import { useControls } from 'leva'
import { DataCube, PointCloud, UVCube, PlotLine, PlotArea, FixedTicks } from './PlotObjects';
import { GetColorMapTexture, ArrayToTexture, DefaultCube, colormaps } from './Textures';


const storeURL = "https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr"

interface TimeSeriesLocs{
  uv:THREE.Vector2;
  normal:THREE.Vector3
}


export function CanvasGeometry() {
  const { variable, plotter, cmap, flipCmap } = useControls({ 
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
  flipCmap:{
    value:false,
    label:"Invert Colors"

  }
  })

  const [texture, setTexture] = useState<THREE.DataTexture | THREE.Data3DTexture | null>(null) //Main Texture
  const [shape, setShape] = useState<THREE.Vector3 | THREE.Vector3>(new THREE.Vector3(2, 2, 2))
  const [timeSeriesLocs,setTimeSeriesLocs] = useState<TimeSeriesLocs>({uv:new THREE.Vector2(.5,.5), normal:new THREE.Vector3(0,0,1)})
  const [valueScales,setValueScales] = useState({maxVal:1,minVal:-1})
  const [colormap,setColormap] = useState<THREE.DataTexture>(GetColorMapTexture())
  const [timeSeries, setTimeSeries] = useState<number[]>([0]);
  const [showLoading, setShowLoading] = useState<boolean>(false);


  const ZarrDS = useMemo(()=>new ZarrDataset(storeURL),[])

  useEffect(()=>{
    setColormap(GetColorMapTexture(colormap,cmap,1,"#000000",0,flipCmap));
  },[cmap, colormap,flipCmap])

  //DATA LOADING
  useEffect(() => {
    if (variable != "Default") {
      setShowLoading(true);
      //Need to add a check somewhere here to swap to 2D or 3D based on shape. Probably export two variables from GetArray
      ZarrDS.GetArray(variable).then((result) => {
        // result now contains: { data: TypedArray, shape: number[], dtype: string }
        const [texture, shape, scaling] = ArrayToTexture({
          data: result.data,
          shape: result.shape
        })
        console.log(`logging the shape since we will want to use it in the future for 2D vs 3D actions ${shape}`)
        if (texture instanceof THREE.DataTexture || texture instanceof THREE.Data3DTexture) {
          setTexture(texture)
        } else {
          console.error("Invalid texture type returned from ArrayToTexture");
          setTexture(null);
        }
        if (
          typeof scaling === 'object' &&
          'maxVal' in scaling &&
          'minVal' in scaling
        ) {
          setValueScales(scaling as { maxVal: number; minVal: number });
        }
        const shapeRatio = result.shape[1] / result.shape[2] * 2;
        setShape(new THREE.Vector3(2, shapeRatio, 2));
        setShowLoading(false)
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

  //TIMESERIES
  useEffect(()=>{
    if(ZarrDS){
      ZarrDS.GetTimeSeries(timeSeriesLocs).then((e)=> setTimeSeries(e))
    }
  },[timeSeriesLocs])

  return (
    <>
    <div className='messages'>
      {showLoading && <div className='loading'>
        Loading...
      </div>}
    </div>
    <div className='canvas'>
      <Canvas shadows camera={{ position: [-4.5, 3, 4.5], fov: 50 }}
      frameloop="demand"
      >
        <Center top position={[-1, 0, 1]}/>

        {/* Volume Plots */}
        {plotter == "volume" && <>
          <DataCube volTexture={texture} shape={shape} colormap={colormap}/>
          <UVCube shape={shape} setTimeSeriesLocs={setTimeSeriesLocs}/>
        </>}
        {/* Point Clouds Plots */}
        {plotter == "point-cloud" && <PointCloud textures={{texture,colormap}} />}
        
        {/* Time Series Plots */}
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} enablePan={false}/>
        <Environment preset="city" />
        
      </Canvas>
    </div>      
    <PlotArea >
        <PlotLine 
          data={timeSeries} 
          lineWidth={5}
          color='orangered'
          range={[[-100,100],[-10,10]]}
          scaling={{...valueScales,colormap}}
        />
        <FixedTicks color='white' />
    </PlotArea>
    {/* <Leva theme={lightTheme} /> */}
    </>
  )
}

export default CanvasGeometry
import { OrbitControls } from '@react-three/drei';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { PointCloud, UVCube, DataCube, FlatMap, Sphere } from '@/components/plots';
import { Canvas, invalidate } from '@react-three/fiber';
import { ArrayToTexture } from '@/components/textures';
import { ZarrDataset } from '../zarr/ZarrLoaderLRU';
import { useGlobalStore, usePlotStore, useZarrStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { Navbar, Colorbar } from '../ui';
import AnalysisInfo from './AnalysisInfo';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';


const Orbiter = ({isFlat} : {isFlat  : boolean}) =>{
  const {resetCamera} = usePlotStore(useShallow(state => ({
      resetCamera: state.resetCamera
    })))
  const orbitRef = useRef<OrbitControlsImpl | null>(null)
  // Reset Camera Position and Target
  useEffect(()=>{
    if (orbitRef.current){
      const controls = orbitRef.current
      let frameId: number;
      const duration = 1000; 
      const startTime = performance.now();
      const startPos = controls.object.position.clone();
      const endPos = controls.position0.clone()

      const startTarget = controls.target.clone();
      const endTarget = controls.target0.clone()

      const startZoom = controls.object.zoom
      
      const animate = (time: number) => {
        invalidate();
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1); // clamp between 0 and 1
        controls.object.position.lerpVectors(startPos, endPos, t);
        controls.target.lerpVectors(startTarget,endTarget,t)

        if (isFlat) {
          controls.object.zoom = THREE.MathUtils.lerp(startZoom, 1000, t);
          controls.object.updateProjectionMatrix();
          controls.update()
        } 

        if (t < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };

      frameId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(frameId);
    }
  },[resetCamera])

  return (
    <>
      {isFlat && <OrbitControls ref={orbitRef} enableRotate={false} enablePan={true} maxDistance={50} minZoom={50} maxZoom={3000}/>}
      {!isFlat && <OrbitControls ref={orbitRef} minPolarAngle={0} maxPolarAngle={Math.PI / 2} enablePan={true} maxDistance={50}/>}
    </>
  );
}

interface PlotParameters{
    values:{
        ZarrDS: ZarrDataset;
        canvasWidth:number
    }
    setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


const Plot = ({values,setShowLoading}:PlotParameters) => {
    const {
      setShape, 
      setFlipY, 
      setValueScales, 
      setMetadata, 
      setDimArrays, 
      setDimNames, 
      setDimUnits,
      setPlotOn} = useGlobalStore(
        useShallow(state => ({  //UseShallow for object returns
          setShape:state.setShape,
          setFlipY:state.setFlipY,
          setValueScales:state.setValueScales,
          setMetadata: state.setMetadata,
          setDimArrays:state.setDimArrays, 
          setDimNames:state.setDimNames,
          setDimUnits:state.setDimUnits,
          setPlotOn: state.setPlotOn}
        )))
    const {colormap, variable, isFlat, metadata, valueScales, setIsFlat, setDataArray} = useGlobalStore(useShallow(state=>({
      colormap: state.colormap, 
      variable: state.variable, 
      isFlat: state.isFlat, 
      metadata: state.metadata, 
      valueScales: state.valueScales,
      setIsFlat: state.setIsFlat, 
      setDataArray: state.setDataArray
    })))
    const {ZarrDS,canvasWidth} = values;
    const {plotType, resetCamera} = usePlotStore(useShallow(state => ({
      plotType: state.plotType,
      resetCamera: state.resetCamera
    })))
    const slice = useZarrStore(state=> state.slice)

    const coords = useRef<number[]>([0,0])
    const val = useRef<number>(0)

    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [loc, setLoc] = useState<number[]>([0,0])

    const [texture, setTexture] = useState<THREE.DataTexture | THREE.Data3DTexture | null>(null)
    const [show, setShow] = useState<boolean>(true) //Prevents rendering of 3D objects until data is fully loaded in
    
    const [windowWidth, setWindowWidth] = useState<number>(0); //Use for rescaling
    

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Listen for theme changes
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    // setCurrentBg('var(--background)')
                }
            })
        })
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })

        return () => observer.disconnect()
    }, [])

  //DATA LOADING
  useEffect(() => {
    if (variable != "Default") {
      setShowLoading(true);
      setShow(false)
      ZarrDS.GetArray(variable, slice).then((result) => {
        console.log(result)
        const [texture, scaling] = ArrayToTexture({
          data: result.data,
          shape: result.shape,
          valueScales: result.valueScales
        })
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
        if (result.shape.length == 2){
          setIsFlat(true)
          setDataArray(result.data)

        }
        else{
          setIsFlat(false)
        }
        const shapeRatio = result.shape[1] / result.shape[2] * 2;
        setShape(new THREE.Vector3(2, shapeRatio, 2));
        setShowLoading(false)
        setShow(true)
        setPlotOn(true)
      })
      //Get Metadata
      ZarrDS.GetAttributes(variable).then((result)=>{
        setMetadata(result);
        const [dimArrs, dimMetas, dimNames] = ZarrDS.GetDimArrays()
        setDimArrays(dimArrs)
        setDimNames(dimNames)
        if (dimArrs.length > 2){
          if (dimArrs[1][1] < dimArrs[1][0])
            {setFlipY(true)}
          else
            {setFlipY(false)}
        }
        else{
          if (dimArrs[0][1] < dimArrs[0][0])
            {setFlipY(true)}
          else
            {setFlipY(false)}
        }
        const tempDimUnits = []
        for (const meta of dimMetas){
          tempDimUnits.push(meta.units)
        }
        setDimUnits(tempDimUnits)
      })

    }
      else{
        setMetadata(null)
      }
  }, [variable])

  const infoSetters = useMemo(()=>({
    setLoc,
    setShowInfo,
    coords,
    val
  }),[])

  const Nav = useMemo(()=>Navbar,[])
  return (
    <div className='main-canvas'
      style={{
        width: windowWidth - canvasWidth         
      }}
    >
      {show && <Colorbar units={metadata?.units} valueScales={valueScales}/>}
      <Nav />
      {isFlat && <AnalysisInfo loc={loc} show={showInfo} info={[...coords.current,val.current]}/> }
      {!isFlat && <>
      <Canvas camera={{ position: isFlat ? [0,0,5] : [-4.5, 3, 4.5], fov: 50 }}
        frameloop="demand"
      >
        {plotType == "volume" && show && <>
          <DataCube volTexture={texture}/>
          <UVCube ZarrDS={ZarrDS} />
        </>}
        {plotType == "point-cloud" && show &&<>
          <PointCloud textures={{texture,colormap}} ZarrDS={ZarrDS}/>

        </> }
        {plotType == "sphere" && show && <Sphere texture={texture} ZarrDS={ZarrDS} /> }
        <Orbiter isFlat={false} />
      </Canvas>
      </>}

        {isFlat && <>
        <Canvas camera={{ position: [0,0,5], zoom: 1000 }}
        orthographic frameloop="demand"
        >
          <FlatMap texture={texture as THREE.DataTexture} infoSetters={infoSetters} />
          <Orbiter isFlat={true}/>
        </Canvas>
        </>}

    </div>
  )
}

export {Plot}

'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { GetZarrMetadata, GetVariableNames } from '@/components/zarr/GetMetadata';
import { ZarrDataset, GetStore } from '@/components/zarr/ZarrLoaderLRU';
import { useRef, useState } from 'react';
import { useEffect, useMemo } from 'react';
import { PlotArea, Plot } from '@/components/plots';
import { MainPanel } from '@/components/ui';
import { Metadata, Loading, Navbar, Error } from '@/components/ui';
import { useGlobalStore, usePlotStore, useZarrStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { GetTitleDescription } from '@/components/zarr/GetMetadata';
import ScrollableLinksTable from './ui/VariablesTable';

export function LandingHome() {

  const {initStore,timeSeries, variable, metadata, plotOn, setZMeta, setVariables, setPlotOn} = useGlobalStore(useShallow(state=>({
    initStore: state.initStore, 
    timeSeries: state.timeSeries,
    variable: state.variable,
    metadata: state.metadata,
    plotOn: state.plotOn,
    setZMeta: state.setZMeta,
    setVariables: state.setVariables,
    setPlotOn: state.setPlotOn,
  })))
  const {setMaxTextureSize} = usePlotStore(useShallow(state => ({
    setMaxTextureSize: state.setMaxTextureSize
  })))

  const {currentStore, setCurrentStore} = useZarrStore(useShallow(state=> ({
    currentStore: state.currentStore,
    setCurrentStore: state.setCurrentStore
  })))


  useEffect(()=>{ //Update store if URL changes
    const newStore = GetStore(initStore)
    setCurrentStore(newStore)
  },[initStore])

  const ZarrDS = useMemo(() => new ZarrDataset(currentStore), [currentStore]) //Update Dataset if store changes
  const [titleDescription, setTitleDescription] = useState<{ title?: string; description?: string }>({});
  
  useEffect(() => {
    let isMounted = true;
    GetTitleDescription(currentStore).then((result) => {
      if (isMounted) setTitleDescription(result);
    });
    const fullmetadata = GetZarrMetadata(currentStore);
    const variables = GetVariableNames(fullmetadata);
    fullmetadata.then(e=>setZMeta(e))
    variables.then(e=> {setVariables(e)})
    return () => { isMounted = false; };
  }, [currentStore]);
  
  useEffect(()=>{ // Set maxtexture size to warn users if custom data is too big
    const renderer = new THREE.WebGLRenderer();
    const gl = renderer.getContext();
    setMaxTextureSize(gl.getParameter(gl.MAX_TEXTURE_SIZE))
    return () => {
    renderer.dispose();
  };
  },[])

  useEffect(()=>{ // Maybe we change remove this. Do we want to go back to home screen?
    if (variable === "Default"){
      setPlotOn(false)
    }
  },[variable])
  
  return (
    <>
    <MainPanel/> 

    <Error />
    {!plotOn && <Navbar />}
    <Loading />
    {variable === "Default" && <ScrollableLinksTable />}
    {variable != "Default" && <Plot ZarrDS={ZarrDS} />}
    {metadata && <Metadata data={metadata} /> }
    {Object.keys(timeSeries).length >= 1 && <PlotArea />}
    </>
  );
}

export default LandingHome;
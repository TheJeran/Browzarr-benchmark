'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { GetZarrMetadata, GetVariableNames } from '@/components/zarr/GetMetadata';
import { ZarrDataset, GetStore } from '@/components/zarr/ZarrLoaderLRU';
import { useRef, useState } from 'react';
import VariableScroller from './ui/VariableScroller';
import { useEffect, useMemo } from 'react';
import { Analysis, PlotArea, Plot } from '@/components/plots';
import { GetColorMapTexture } from '@/components/textures';
import { MiddleSlider } from '@/components/ui';
import { Metadata, ShowAnalysis, Loading, Navbar } from '@/components/ui';
import { useGlobalStore } from '@/utils/GlobalStates';
import { useShallow, shallow } from 'zustand/shallow';
import { PaneStore } from '@/components/zarr/PaneStore';
import useCSSVariable from '@/components/ui/useCSSVariable';
import { GetTitleDescription } from '@/components/zarr/GetMetadata';

// import { PaneManager } from '@/components/PaneManager';

export function LandingHome() {

  const {initStore, setZMeta} = useGlobalStore(useShallow(state=>({initStore: state.initStore, setZMeta: state.setZMeta})))
  const ZarrDS = useMemo(() => new ZarrDataset(initStore), [initStore])
  const [titleDescription, setTitleDescription] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    let isMounted = true;
    GetTitleDescription(GetStore(initStore)).then((result) => {
      if (isMounted) setTitleDescription(result);
    });
    const store = GetStore(initStore);
    const fullmetadata = GetZarrMetadata(store);
    const variables = GetVariableNames(fullmetadata);
    fullmetadata.then(e=>setZMeta(e))
    variables.then(e=> {setVariables(e)})
    return () => { isMounted = false; };
  }, [initStore]);

  const { title, description } = titleDescription;
  const {  setColormap, setVariables, setPlotOn, colormap, timeSeries, variable, metadata, plotOn  } = useGlobalStore(
    useShallow(state => ({
      setColormap: state.setColormap,
      setVariables: state.setVariables,
      setPlotOn: state.setPlotOn,
      colormap: state.colormap,
      timeSeries: state.timeSeries,
      variable: state.variable,
      metadata: state.metadata,
      plotOn: state.plotOn
    }))
  );
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const textColor = useCSSVariable('--foreground');
  const fogColor = useCSSVariable('--background');

  //Timeseries Plotting Information
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  useEffect(() => {
    setCanvasWidth(Math.round(window.innerWidth * 0.0))
  }, [])

  //These values are passed to the Plot Component
  const plotObj = useMemo(() => ({
    ZarrDS,
    canvasWidth
  }), [ ZarrDS, canvasWidth]);

//This is the data being passed down the plot tree
  const analysisObj = useMemo(() => ({
    values: {
      ZarrDS,
      canvasWidth,
    }
  }), [ZarrDS, canvasWidth]);

  useEffect(()=>{
    if (variable === "Default"){
      setCanvasWidth(0);
      setPlotOn(false)
    }
  },[variable])
  
  return (
    <>
    {!plotOn && <Navbar />}
    {canvasWidth < 10 && variable != "Default" && <ShowAnalysis onClick={()=>setCanvasWidth(window.innerWidth*.5)} canvasWidth={canvasWidth} />}
    {canvasWidth > 10 && <MiddleSlider canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth}/>}
    <Loading showLoading={showLoading} />
    {canvasWidth > 10 && variable != "Default" && <Analysis values={analysisObj.values} />}
    {variable === "Default" && <VariableScroller />}
    {variable != "Default" && <Plot values={plotObj} setShowLoading={setShowLoading} />}
    {metadata && <Metadata data={metadata} /> }
    {timeSeries.length > 2 && <PlotArea />}
    </>
  );
}

export default LandingHome;
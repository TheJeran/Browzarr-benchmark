'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { DataStores } from '@/components/zarr/DataStores'
import { ZarrDataset, GetStore } from '@/components/zarr/ZarrLoaderLRU';
import { useState } from 'react';

import { useEffect, useMemo } from 'react';
import { Analysis, PlotArea, Plot } from '@/components/plots';
import { GetColorMapTexture } from '@/components/textures';
import { MiddleSlider } from '@/components/ui';
import { Metadata, ShowAnalysis, Loading } from '@/components/ui';
import { useGlobalStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { PaneStore } from '@/components/zarr/PaneStore';
import WelcomeText from '@/components/ui/WelcomeText';
import useCSSVariable from '@/components/ui/useCSSVariable';
import { GetTitleDescription } from '@/components/zarr/GetMetadata';

// import { PaneManager } from '@/components/PaneManager';

export function LandingHome() {
  const { bgcolor, fullmetadata, variables} = DataStores();
  const [settings, setSettings] = useState({plotType: 'volume', cmap: 'Spectral', flipCmap: false });
  const initStore = useGlobalStore(useShallow(state=>state.initStore))
  
  const ZarrDS = useMemo(() => new ZarrDataset(initStore), [initStore])
  const [titleDescription, setTitleDescription] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    let isMounted = true;
    GetTitleDescription(GetStore(initStore)).then((result) => {
      if (isMounted) setTitleDescription(result);
    });
    return () => { isMounted = false; };
  }, [initStore]);

  const { title, description } = titleDescription;

  const setColormap = useGlobalStore(state=>state.setColormap)
  const metadata = useGlobalStore(state=>state.metadata)
  const {colormap, timeSeries, variable} = useGlobalStore(useShallow(state=>({colormap:state.colormap, timeSeries:state.timeSeries, variable:state.variable})))
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const textColor = useCSSVariable('--foreground');
  const fogColor = useCSSVariable('--background');


  //Timeseries Plotting Information
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  useEffect(() => {
    setCanvasWidth(Math.round(window.innerWidth * 0.0))
  }, [])

  useEffect(()=>{
    setColormap(GetColorMapTexture(colormap, settings.cmap, 1, "#000000", 0, settings.flipCmap));
  },[settings.cmap,  colormap, settings.flipCmap, setColormap])

  //These values are passed to the Plot Component
  const plotObj = {
      plotType: settings.plotType,
      ZarrDS,
      variable,
      bgcolor,
      canvasWidth
  }

//This is the data being passed down the plot tree
  const analysisObj = {
    setters:{
    },
    values:{
      ZarrDS,
      canvasWidth,
    }
  }
  
  return (
    <>
      {/* <PaneManager /> */}
      <PaneStore variablesPromise={variables} onSettingsChange={setSettings} />
      {canvasWidth < 10 && variable != "Default" && <ShowAnalysis onClick={()=>setCanvasWidth(window.innerWidth*.5)} canvasWidth={canvasWidth} />}
    {canvasWidth > 10 && <MiddleSlider canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth}/>}
    <Loading showLoading={showLoading} />
    {canvasWidth > 10 && <Analysis values={analysisObj.values} variables={variables} />}
    {variable === "Default" ? (
        <WelcomeText
          title={title ?? ''}
          description={description ?? ''}
          variablesPromise={fullmetadata}
          fogColor={fogColor}
          textColor={textColor}
        />
      ) : (
        <Plot values={plotObj} setShowLoading={setShowLoading} />
      )}
    {metadata && <Metadata data={metadata} /> }
    {timeSeries.length > 2 && <PlotArea />}
    </>
  );
}

export default LandingHome;
'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { DataStores } from './DataStores'
import { ZarrDataset } from './zarr/ZarrLoaderLRU';
import { useState } from 'react';

import { useEffect, useMemo } from 'react';
import { Analysis, PlotArea, Plot } from '@/components/plots';
import { GetColorMapTexture } from '@/components/textures';
import { MiddleSlider } from '@/components/ui';
import { Metadata, ShowAnalysis, Loading } from '@/components/ui';
import { useGlobalStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import { PaneStore } from '@/components/PaneStore';

export function CanvasGeometry() {
  const { bgcolor, fullmetadata, variables} = DataStores();
  const [settings, setSettings] = useState({ variable: 'Default', plotType: 'volume', cmap: 'Spectral', flipCmap: false });
  const initStore = useGlobalStore(useShallow(state=>state.initStore))
  const ZarrDS = useMemo(() => new ZarrDataset(initStore), [initStore])

  const setColormap = useGlobalStore(state=>state.setColormap)
  const metadata = useGlobalStore(state=>state.metadata)
  const {colormap, timeSeries} = useGlobalStore(useShallow(state=>({colormap:state.colormap, timeSeries:state.timeSeries})))
  const [showLoading, setShowLoading] = useState<boolean>(false);

  //Timeseries Plotting Information
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  useEffect(() => {
    setCanvasWidth(Math.round(window.innerWidth * 0.0))
  }, [])

  useEffect(()=>{
    setColormap(GetColorMapTexture(colormap, settings.cmap, 1, "#000000", 0, settings.flipCmap));
  },[settings.cmap,  colormap, settings.flipCmap])

  //These values are passed to the Plot Component
  const plotObj = {
      plotType: settings.plotType,
      ZarrDS,
      variable: settings.variable,
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
      <PaneStore variablesPromise={variables} onSettingsChange={setSettings} />

      {canvasWidth < 10 && <ShowAnalysis onClick={()=>setCanvasWidth(window.innerWidth*.5)} canvasWidth={canvasWidth} />}
    {canvasWidth > 10 && <MiddleSlider canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth}/>}
    <Loading showLoading={showLoading} />
    {/* {canvasWidth > 10 && <Analysis values={analysisObj.values} variables={variables} />} */}
    <Plot values={plotObj} setShowLoading={setShowLoading} />
    {metadata && <Metadata data={metadata} /> }
    {timeSeries.length > 2 && <PlotArea />}
    </>
  );
}

export default CanvasGeometry
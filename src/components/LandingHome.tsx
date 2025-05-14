'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { DataStores } from './DataStores'
import { ZarrDataset } from './zarr/ZarrLoaderLRU';
import { useState } from 'react';

import { useEffect, useMemo } from 'react';
import { Analysis, PlotArea, Plot } from '@/components/plots';
import { GetColorMapTexture, colormaps } from '@/components/textures';
import { createPaneContainer, MiddleSlider } from '@/components/ui';
import { Metadata, ShowAnalysis, Loading } from '@/components/ui';
// import ComputeModule from '@/components/computation/ComputeModule'
import { usePaneInput, usePaneFolder, useTweakpane, useButtonBlade, useTextBlade } from '@lazarusa/react-tweakpane'
import { useGlobalStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';

const initStore = GetStore(ZARR_STORES.SEASFIRE)


const zarrMetadata = await GetZarrMetadata(ZARR_STORES.SEASFIRE)
// console.log(zarrMetadata)
const variables = GetVariableNames(zarrMetadata)

export function CanvasGeometry() {

  const [flipCmap, setFlipCmap] = useState<boolean>(false)
  
  const optionsVars = useMemo(() => variables.map((element) => ({
    text: element,
    value: element
  })), []);
  const colormaps_array = useMemo(() => colormaps.map(colormap => ({
    text: colormap,
    value: colormap
  })), []);

  const optionsStores = useMemo(() => Object.entries(ZARR_STORES).map(([key, value]) => ({
    text: key,
    value: value
  })), []);

  const paneContainer = createPaneContainer("data-settings-pane");

  const pane = useTweakpane(
    {
      backgroundcolor: "#292b32",
      storeURL: ZARR_STORES.SEASFIRE,
      vName: "Default",
      plottype: "volume",
      cmap: "Spectral",
      flipCmap: false,
    },
    {
      title: 'Data settings',
      container: paneContainer ?? undefined,
      expanded: false,
    }
  );

  const [bgcolor] = usePaneInput(pane, 'backgroundcolor', {
    label: 'bgcolor',
    value: '#292b32'
  })

  usePaneInput(pane, 'storeURL', {
    label: 'Store URL',
    options: optionsStores,
    value: ZARR_STORES.SEASFIRE
  })
// TODO: update variables when custom store is selected
  const [customStore] = useTextBlade(pane, {
    label: 'Custom Store',
    value: 'Setup your own store',
    parse: (value) => value,
    format: (value) => value,
  })

  const [variable] = usePaneInput(pane, 'vName', {
    label: 'Plot Variable',
    options: [
      {
        text: 'Default',
        value: 'Default',
      },
    ...optionsVars
  ],
    value: 'Default'
  })

  const [plotType] = usePaneInput(pane, 'plottype', {
    label: 'Plot type',
    options: [
      {
        text: 'volume',
        value: 'volume',
      },
      {
        text: 'point-cloud',
        value: 'point-cloud',
      },
    ],
    value: 'point-cloud'
  })

  const [cmap] = usePaneInput(pane, 'cmap', {
    label: 'colormap',
    options: colormaps_array,
    value: 'Spectral'
  })

  useButtonBlade(pane,{
    title:"Flip Colors"
  },()=>setFlipCmap(x=>!x))
  
  const setColormap = useGlobalStore(state=>state.setColormap)
  const metadata = useGlobalStore(state=>state.metadata)
  const {colormap, timeSeries} = useGlobalStore(useShallow(state=>({colormap:state.colormap, timeSeries:state.timeSeries})))
  const [showLoading, setShowLoading] = useState<boolean>(false);

  //Timeseries Plotting Information
 
  const ZarrDS = useMemo(()=>new ZarrDataset(initStore),[])


  const [canvasWidth, setCanvasWidth] = useState<number>(0)

  useEffect(() => {
    setCanvasWidth(Math.round(window.innerWidth * 0.0))
  }, [])

  useEffect(()=>{
    setColormap(GetColorMapTexture(colormap,cmap,1,"#000000",0,flipCmap));
  },[cmap, flipCmap])

  //These values are passed to the Plot Component
  const plotObj = {
      plotType,
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
      <PaneStore variablesPromise={variables} onSettingsChange={setSettings} />

      {canvasWidth < 10 && <ShowAnalysis onClick={()=>setCanvasWidth(window.innerWidth*.5)} canvasWidth={canvasWidth} />}
    {canvasWidth > 10 && <MiddleSlider canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth}/>}
    <Loading showLoading={showLoading} />
    {canvasWidth > 10 && <Analysis values={analysisObj.values} variables={variables} />}
    <Plot values={plotObj} setShowLoading={setShowLoading} />
    {metadata && <Metadata data={metadata} /> }
    {timeSeries.length > 2 && <PlotArea />}
    </>
  );
}

export default CanvasGeometry
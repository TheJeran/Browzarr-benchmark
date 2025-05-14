'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { DataStores } from './DataStores'
import { ZarrDataset } from './zarr/ZarrLoaderLRU';
import { GetZarrMetadata,  GetVariableNames } from './zarr/GetMetadata';
import { useState } from 'react';
import { usePaneInput, usePaneFolder, useTweakpane, useButtonBlade, useTextBlade } from '@lazarusa/react-tweakpane'

import { useEffect, useMemo, useLayoutEffect } from 'react';
import { Analysis, PlotArea, Plot } from '@/components/plots';
import { GetColorMapTexture, colormaps } from '@/components/textures';
import { createPaneContainer, MiddleSlider } from '@/components/ui';
import { plotContext, DimCoords } from '@/components/contexts';
import { Metadata, ShowAnalysis, Loading } from '@/components/ui';

import { PaneStore } from '@/components/PaneStore';
interface Array{
  data:number[],
  shape:number[],
  stride:number[]
}

export function CanvasGeometry() {
  const { bgcolor, initStore, fullmetadata, variables} = DataStores();
  const [settings, setSettings] = useState({ variable: 'Default', plotType: 'volume', cmap: 'Spectral', flipCmap: false });

    const ZarrDS = useMemo(()=>new ZarrDataset(initStore),[initStore])
    const [shape, setShape] = useState<THREE.Vector3 | THREE.Vector3>(new THREE.Vector3(2, 2, 2))
    const [valueScales, setValueScales] = useState({maxVal:1, minVal:-1})
    const [colormap, setColormap] = useState<THREE.DataTexture>(GetColorMapTexture())
    const [timeSeries, setTimeSeries] = useState<number[]>([0]);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [metadata, setMetadata] = useState<object[] | null>(null)
    const [dataArray, setDataArray] = useState<Array | null>(null)
    
    //Timeseries Plotting Information
    const [dimArrays, setDimArrays] = useState<number[][]>([[0], [0], [0]])
    const [dimNames, setDimNames] = useState<string[]>(["default"])
    const [dimUnits, setDimUnits] = useState<string[]>(["Default"]);
    const [dimCoords, setDimCoords] = useState<DimCoords>();
    const [plotDim, setPlotDim] = useState<number>(0)
  
    //Analysis variables
    const [reduceAxis, setReduceAxis] = useState<number>(0);
    const [reduceOperation, setReduceOperation] = useState<string>("Mean")
    const [executeReduction, setExecuteReduction] = useState<boolean>(false)
  
    const [canvasWidth, setCanvasWidth] = useState<number>(0)
  
    useEffect(() => {
      setCanvasWidth(Math.round(window.innerWidth * 0.0))
    }, [])
  
    useEffect(()=>{
      setColormap(GetColorMapTexture(colormap, settings.cmap, 1, "#000000", 0, settings.flipCmap));
    },[settings.cmap,  colormap, settings.flipCmap])
  
    //These values are passed to the Plot Component
  const plotObj = {
    values:{
      plotType: settings.plotType,
      colormap,
      ZarrDS,
      variable: settings.variable,
      shape,
      bgcolor,
      canvasWidth
    },
    setters:{
      setShowLoading,
      setDataArray,
      setValueScales,
      setShape,
      setMetadata,
      setDimArrays,
      setDimNames,
      setDimUnits,
    }
  }

  const timeSeriesObj ={
    setters:{
      setTimeSeries,
      setPlotDim,
      setDimCoords
    },
    values:{
      ZarrDS,
      shape,
      dimArrays,
      dimNames,
      dimUnits
    }
  }

  const defaultDimCoords: DimCoords = {
    first: { name: "", loc: 0, units: "" },
    second: { name: "", loc: 0, units: "" },
    plot: { units: "" }
  };

//This is the data being passed down the plot tree
  const lineObj = {
    coords: dimCoords ?? defaultDimCoords,
    plotDim,
    dimNames,
    dimUnits,
    dimArrays,
    plotUnits:metadata ? (metadata as any).units : "Default",
    yRange:[valueScales.minVal,valueScales.maxVal],
    timeSeries,
    scaling:{...valueScales, colormap}
  } 

  const analysisSetters = {
    setAxis:setReduceAxis,
    setOperation:setReduceOperation,
    setExecute:setExecuteReduction
  }

  const analysisVars = {
    axis:reduceAxis,
    operation:reduceOperation,
    execute:executeReduction
  }

  const analysisObj = {
    setters:{

    },
    values:{
      ZarrDS,
      cmap: colormap,
      shape: shape.toArray(),
      canvasWidth,
      dimNames,
      valueScales
    }
  }

  return (
    <div>
      <PaneStore variablesPromise={variables} onSettingsChange={setSettings} />
      {canvasWidth < 10 && <ShowAnalysis onClick={()=>setCanvasWidth(window.innerWidth*.5)} canvasWidth={canvasWidth} />}
      {canvasWidth > 10 && <MiddleSlider canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth}/>}
      <Loading showLoading={showLoading} />
      {/* {canvasWidth > 10 && <Analysis values={analysisObj.values} variables={variables} />} */}
      <Plot values={plotObj.values} setters={plotObj.setters} timeSeriesObj={timeSeriesObj} />
      {metadata && <Metadata data={metadata} /> }
      <plotContext.Provider value={lineObj} > {timeSeries.length > 2 && <PlotArea />}
      </plotContext.Provider>
    </div>
  );
}

export default CanvasGeometry
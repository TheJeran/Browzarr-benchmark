'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { DataStores } from './DataStores'
import { GetStore } from './zarr/ZarrLoaderLRU';
import { GetZarrMetadata,  GetVariableNames } from './zarr/GetMetadata';
import { useState } from 'react';
import { usePaneInput, usePaneFolder, useTweakpane, useButtonBlade, useTextBlade } from '@lazarusa/react-tweakpane'
import { PaneStore } from '@/components/PaneStore';
interface Array{
  data:number[],
  shape:number[],
  stride:number[]
}

export function CanvasGeometry() {
  const { bgcolor, initStore, metadata, variables} = DataStores();
  const [settings, setSettings] = useState({ variable: 'Default', plotType: 'point-cloud', cmap: 'Spectral', flipCmap: false });
      
  return (
    <div>
      <PaneStore variablesPromise={variables} onSettingsChange={setSettings} />
      {settings.variable}
      {settings.plotType}
    </div>
  );
}

export default CanvasGeometry
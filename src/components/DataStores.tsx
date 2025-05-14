'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { GetStore, ZARR_STORES } from '@/components/zarr/ZarrLoaderLRU'
import { useEffect, useState, useMemo, use } from 'react';
import { createPaneContainer } from '@/components/ui';
import { usePaneInput, useTweakpane } from '@lazarusa/react-tweakpane'
import { GetZarrMetadata,  GetVariableNames } from './zarr/GetMetadata';
import { useGlobalStore } from '@/utils/GlobalStates';

export function DataStores() {
    const optionsStores = useMemo(() => Object.entries(ZARR_STORES).map(([key, value]) => ({
        text: key,
        value: value
      })), []);
    
const paneContainer = createPaneContainer("data-stores-pane");
const pane = useTweakpane(
    {
      backgroundcolor: "#292b32",
      storeURL: ZARR_STORES.SEASFIRE,
      varName: "Default"
    },
    {
      title: 'Data Stores',
      container: paneContainer ?? undefined,
      expanded: false,
    }
  );

  const [bgcolor] = usePaneInput(pane, 'backgroundcolor', {
    label: 'bgcolor',
    value: '#292b32'
  })

  const [currentStoreURL] = usePaneInput(pane, 'storeURL', {
    label: 'Store URL',
    options: optionsStores,
    value: ZARR_STORES.SEASFIRE
  })
  const initStore = GetStore(currentStoreURL);
  const fullmetadata = GetZarrMetadata(initStore);
  const variables = GetVariableNames(fullmetadata);
  const setZarrStore = useGlobalStore(state=>state.setInitStore)
  
  useEffect(()=>{
    if(currentStoreURL){
      setZarrStore(currentStoreURL)
    }
  },[currentStoreURL])

  return (
    { 
    bgcolor,
    fullmetadata,
    variables
    }
  );
}
'use client';
import * as THREE from 'three'
THREE.Cache.enabled = true;
import { GetStore, ZARR_STORES } from '@/components/zarr/ZarrLoaderLRU'
import { useEffect, useState, useMemo, use } from 'react';
import { createPaneContainer } from '@/components/ui';
import { usePaneInput, useTweakpane } from '@lazarusa/react-tweakpane'
import { GetZarrMetadata,  GetVariableNames } from '@/components/zarr/GetMetadata';
import { useGlobalStore } from '@/utils/GlobalStates';

export function DataStores() {
  const storeURL = useGlobalStore(state => state.initStore)

  const setTimeSeries = useGlobalStore(state=>state.setTimeSeries)

  const initStore = GetStore(storeURL);
  const fullmetadata = GetZarrMetadata(initStore);
  const variables = GetVariableNames(fullmetadata);
  const setZarrStore = useGlobalStore(state=>state.setInitStore)
  
  useEffect(()=>{
    if(storeURL){
      setZarrStore(storeURL)
      setTimeSeries([0])
    }
  },[storeURL])

  return (
    { 
    fullmetadata,
    variables
    }
  );
}
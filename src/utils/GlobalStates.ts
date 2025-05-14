import { create } from "zustand";
import * as THREE from 'three';
import { ZarrDataset } from "@/components/zarr/ZarrLoaderLRU";
import { GetColorMapTexture } from "@/components/textures";

interface Coord {
    name: string; 
    loc: number;  
    units: string;
  }
  export interface DimCoords {
    first: Coord;
    second: Coord;
    plot: Pick<Coord, "units">; // Only units
  }

type StoreState = {
  shape: THREE.Vector3;
  valueScales: { maxVal: number; minVal: number };
  colormap: THREE.DataTexture;
  timeSeries: number[];
  showLoading: boolean;
  metadata: object[] | null;
  dataArray: Array<any> | null;
  dimArrays: number[][];
  dimNames: string[];
  dimUnits: string[];
  dimCoords?: DimCoords;
  plotDim: number;
  flipY:boolean;

  setShape: (shape: THREE.Vector3) => void;
  setValueScales: (valueScales: { maxVal: number; minVal: number }) => void;
  setColormap: (colormap: THREE.DataTexture) => void;
  setTimeSeries: (timeSeries: number[]) => void;
  setShowLoading: (showLoading: boolean) => void;
  setMetadata: (metadata: object[] | null) => void;
  setDataArray: (dataArray: Array<any> | null) => void;
  setDimArrays: (dimArrays: number[][]) => void;
  setDimNames: (dimNames: string[]) => void;
  setDimUnits: (dimUnits: string[]) => void;
  setDimCoords: (dimCoords?: DimCoords) => void;
  setPlotDim: (plotDim: number) => void;
  setFlipY: (flipY:boolean) => void;
};

export const useGlobalStore = create<StoreState>((set) => ({
  shape: new THREE.Vector3(2, 2, 2),
  valueScales: { maxVal: 1, minVal: -1 },
  colormap: GetColorMapTexture(),
  timeSeries: [0],
  showLoading: false,
  metadata: null,
  dataArray: null,
  dimArrays: [[0], [0], [0]],
  dimNames: ["Default"],
  dimUnits: ["Default"],
  dimCoords: undefined,
  plotDim: 0,
  flipY: false,


  setShape: (shape) => set({ shape }),
  setValueScales: (valueScales) => set({ valueScales }),
  setColormap: (colormap) => set({ colormap }),
  setTimeSeries: (timeSeries) => set({ timeSeries }),
  setShowLoading: (showLoading) => set({ showLoading }),
  setMetadata: (metadata) => set({ metadata }),
  setDataArray: (dataArray) => set({ dataArray }),
  setDimArrays: (dimArrays) => set({ dimArrays }),
  setDimNames: (dimNames) => set({ dimNames }),
  setDimUnits: (dimUnits) => set({ dimUnits }),
  setDimCoords: (dimCoords) => set({ dimCoords }),
  setPlotDim: (plotDim) => set({ plotDim }),
  setFlipY: (flipY) => set({ flipY })
}));
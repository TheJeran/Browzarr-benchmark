import { create } from "zustand";
import * as THREE from 'three';
import { GetColorMapTexture } from "@/components/textures";
import QuickLRU from 'quick-lru';

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
  metadata: Record<string, any> | null;
  zMeta: object[];
  dataArray: Array<any> | null;
  dimArrays: number[][];
  dimNames: string[];
  dimUnits: string[];
  dimCoords?: DimCoords;
  plotDim: number;
  flipY:boolean;
  initStore:string;
  variable: string;
  variables: string[];
  plotOn: boolean;
  isFlat: boolean;
  progress: number,

  setShape: (shape: THREE.Vector3) => void;
  setValueScales: (valueScales: { maxVal: number; minVal: number }) => void;
  setColormap: (colormap: THREE.DataTexture) => void;
  setTimeSeries: (timeSeries: number[]) => void;
  setShowLoading: (showLoading: boolean) => void;
  setMetadata: (metadata: object | null) => void;
  setZMeta: (zMeta: object[]) => void;
  setDataArray: (dataArray: Array<any> | null) => void;
  setDimArrays: (dimArrays: number[][]) => void;
  setDimNames: (dimNames: string[]) => void;
  setDimUnits: (dimUnits: string[]) => void;
  setDimCoords: (dimCoords?: DimCoords) => void;
  setPlotDim: (plotDim: number) => void;
  setFlipY: (flipY:boolean) => void;
  setInitStore: (initStore:string ) => void;
  setVariable: (variable: string) => void;
  setVariables: (variables: string[]) => void;
  setPlotOn: (plotOn: boolean) => void;
  setIsFlat: (isFlat: boolean) => void;
  setProgress: (progress: number) => void;

};

export const useGlobalStore = create<StoreState>((set) => ({
  shape: new THREE.Vector3(2, 2, 2),
  valueScales: { maxVal: 1, minVal: -1 },
  colormap: GetColorMapTexture(),
  timeSeries: [0],
  showLoading: false,
  metadata: null,
  zMeta: [{}],
  dataArray: null,
  dimArrays: [[0], [0], [0]],
  dimNames: ["Default"],
  dimUnits: ["Default"],
  dimCoords: undefined,
  plotDim: 0,
  flipY: false,
  initStore: "https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr",
  variable: 'Default',
  variables: [],
  plotOn: false,
  isFlat:false,
  progress: 0,

  setShape: (shape) => set({ shape }),
  setValueScales: (valueScales) => set({ valueScales }),
  setColormap: (colormap) => set({ colormap }),
  setTimeSeries: (timeSeries) => set({ timeSeries }),
  setShowLoading: (showLoading) => set({ showLoading }),
  setMetadata: (metadata) => set({ metadata }),
  setZMeta: (zMeta) => set({ zMeta}),
  setDataArray: (dataArray) => set({ dataArray }),
  setDimArrays: (dimArrays) => set({ dimArrays }),
  setDimNames: (dimNames) => set({ dimNames }),
  setDimUnits: (dimUnits) => set({ dimUnits }),
  setDimCoords: (dimCoords) => set({ dimCoords }),
  setPlotDim: (plotDim) => set({ plotDim }),
  setFlipY: (flipY) => set({ flipY }),
  setInitStore: (initStore) => set({ initStore }),
  setVariable: (variable) => set({ variable }),
  setVariables: (variables) => set({variables}),
  setPlotOn: (plotOn) => set({ plotOn }),
  setIsFlat: (isFlat) => set({ isFlat}),
  setProgress: (progress) => set({ progress })
}));

type PlotState ={
  plotType: string;
  pointSize: number;
  scalePoints: boolean;
  scaleIntensity: number;
  valueRange: number[];
  xRange: number[];
  yRange: number[];
  zRange: number[];
  quality: number;
  selectTS: boolean;
  showPoints: boolean;
  linePointSize: number;
  lineWidth: number;
  lineColor: string;
  pointColor: string;
  useLineColor: boolean;
  lineResolution: number;
  animate: boolean;
  resetAnim: boolean;
  cOffset: number;
  cScale: number;

  setQuality: (quality: number) => void;
  setValueRange: (valueRange: number[]) => void;
  setXRange: (xRange: number[]) => void;
  setYRange: (yRange: number[]) => void;
  setZRange: (zRange: number[]) => void;
  setPointSize: (pointSize: number) => void;
  setScalePoints: (scalePoints: boolean) => void;
  setScaleIntensity: (scaleIntensity: number) => void;
  setPlotType: (plotType: string) => void;
  setSelectTS: (selectTS: boolean) => void;
  setShowPoints: (showPoints: boolean) => void;
  setLinePointSize: (linePointSize: number) => void;
  setLineWidth: (lineWidth: number) => void;
  setLineColor: (lineColor: string) => void;
  setPointColor: (pointColor: string) => void;
  setUseLineColor: (lineColor: boolean) => void;
  setLineResolution: (lineResolution: number) => void;
  setAnimate: (animate: boolean) => void;
  setResetAnim: (resetAnim: boolean) => void;
  setCOffset: (cOffset: number) => void;
  setCScale: (cScale: number) => void;
}

export const usePlotStore = create<PlotState>((set) => ({
  //Create the initial state for the plot store
  plotType: "volume", 
  pointSize: 10,
  scalePoints: false,
  scaleIntensity: 1,
  quality: 200,
  valueRange: [0, 1],
  xRange: [-1, 1],
  yRange: [-1, 1],
  zRange: [-1, 1],
  selectTS: false,
  showPoints: false,
  linePointSize: 5,
  lineWidth: 1.25,
  lineColor: "#111111",
  pointColor: "#EA8686",
  useLineColor: false,
  lineResolution: 3,
  animate: false,
  resetAnim: false,
  cOffset: 0,
  cScale: 1,

  setQuality: (quality) => set({ quality }),
  setValueRange: (valueRange) => set({ valueRange }),
  setXRange: (xRange) => set({ xRange }),
  setYRange: (yRange) => set({ yRange }),
  setZRange: (zRange) => set({ zRange }),
  setPointSize: (pointSize) => set({ pointSize }),
  setScalePoints: (scalePoints) => set({ scalePoints }),
  setScaleIntensity: (scaleIntensity) => set({ scaleIntensity }),
  setPlotType: (plotType) => set({ plotType }),
  setSelectTS: (selectTS) => set({ selectTS }),
  setShowPoints: (showPoints) => set({ showPoints }),
  setLinePointSize: (linePointSize) => set({ linePointSize }),
  setLineWidth: (lineWidth) => set({ lineWidth }),
  setLineColor: (lineColor) => set({ lineColor }),
  setPointColor: (pointColor) => set({ pointColor }),
  setUseLineColor: (useLineColor) => set({ useLineColor }),
  setLineResolution: (lineResolution) => set({ lineResolution }),
  setAnimate: (animate) => set({ animate }),
  setResetAnim: (resetAnim) => set({ resetAnim }),
  setCOffset: (cOffset) => set({ cOffset }),
  setCScale: (cScale) => set({ cScale })

}))


type AnalysisState = {
  axis: number;
  operation: string;
  execute: boolean;
  variable1: string;
  variable2: string;

  setAxis: (axis: number) => void;
  setOperation: (operation: string) => void;
  setExecute: (execute: boolean) => void;
  setVariable1: (variable1: string) => void;
  setVariable2: (variable2: string) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  axis: 0,
  operation: "Mean", 
  execute: false,
  variable1: "Default",
  variable2: "Default",


  setAxis: (axis) => set({ axis }),
  setOperation: (operation) => set({ operation }),
  setExecute: (execute) => set({ execute }),
  setVariable1: (variable1) => set({ variable1 }),
  setVariable2: (variable2) => set({ variable2 }),  
}));

type DataState = {
  dataCache: QuickLRU<string, any>;
  metadata: Record<string, any> | null;
  zMeta: object[];
  dataArray: Array<any> | null;
  dimArrays: number[][];
  dimNames: string[];
  dimUnits: string[];
  variable: string;
  variables: string[];
  zarrStore: string;
  compress: boolean;

  setMetadata: (metadata: object | null) => void;
  setZMeta: (zMeta: object[]) => void;
  setDataArray: (dataArray: Array<any> | null) => void;
  setDimArrays: (dimArrays: number[][]) => void;
  setDimNames: (dimNames: string[]) => void;
  setDimUnits: (dimUnits: string[]) => void;
  setVariable: (variable: string) => void;
  setVariables: (variables: string[]) => void;
  setZarrStore: (zarrStore: string) => void;
  setDataCache: (dataCache: QuickLRU<string, any>) => void;
  setCompress: (compress: boolean) => void;

}

//May delete this later. At the moment got it working in the class. 
export const useDataStore = create<DataState>((set) => ({
  dataCache: new QuickLRU({ maxSize: 2000 }), 
  metadata: null,
  zMeta: [{}],
  dataArray: null,
  dimArrays: [[0], [0], [0]],
  dimNames: ["Default"],
  dimUnits: ["Default"],
  variable: 'Default',
  variables: [],
  zarrStore: "https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr",
  compress: true, 

  setMetadata: (metadata) => set({ metadata }),
  setZMeta: (zMeta) => set({ zMeta }),
  setDataArray: (dataArray) => set({ dataArray }),
  setDimArrays: (dimArrays) => set({ dimArrays }),
  setDimNames: (dimNames) => set({ dimNames }),
  setDimUnits: (dimUnits) => set({ dimUnits }),
  setVariable: (variable) => set({ variable }),
  setVariables: (variables) => set({ variables }),
  setZarrStore: (zarrStore) => set({ zarrStore }),
  setDataCache: (dataCache) => set({ dataCache }),
  setCompress: (compress) => set({ compress })
}));
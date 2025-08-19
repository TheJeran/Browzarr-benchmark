import { create } from "zustand";
import * as THREE from 'three';
import { GetColorMapTexture } from "@/components/textures";
import { GetStore } from "@/components/zarr/ZarrLoaderLRU";

const ESDC = 'https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr'

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
  dataShape: number[];
  shape: THREE.Vector3;
  valueScales: { maxVal: number; minVal: number };
  colormap: THREE.DataTexture;
  timeSeries: Record<string, any>;
  strides: number[];
  showLoading: boolean;
  metadata: Record<string, any> | null;
  zMeta: object[];
  dataArray: Uint8Array | Float32Array;
  dimArrays: number[][];
  dimNames: string[];
  dimUnits: string[];
  dimCoords: Record<string, DimCoords>;
  plotDim: number;
  flipY:boolean;
  initStore:string;
  variable: string;
  variables: string[];
  plotOn: boolean;
  isFlat: boolean;
  progress: number,
  downloading: boolean;
  is4D: boolean;
  idx4D: number | null;

  setDataShape: (dataShape: number[]) => void;
  setShape: (shape: THREE.Vector3) => void;
  setValueScales: (valueScales: { maxVal: number; minVal: number }) => void;
  setColormap: (colormap: THREE.DataTexture) => void;
  setTimeSeries: (timeSeries: Record<string, number[]>) => void;
  updateTimeSeries: (newEntries: Record<string, number[]>) => void;
  setStrides: (strides: number[]) => void;
  setShowLoading: (showLoading: boolean) => void;
  setMetadata: (metadata: object | null) => void;
  setZMeta: (zMeta: object[]) => void;
  setDataArray: (dataArray: Uint8Array | Float32Array) => void;
  setDimArrays: (dimArrays: number[][]) => void;
  setDimNames: (dimNames: string[]) => void;
  setDimUnits: (dimUnits: string[]) => void;
  setDimCoords: (dimCoords?: Record<string, DimCoords>) => void;
  updateDimCoords: (newDims: Record<string, DimCoords>) => void;
  setPlotDim: (plotDim: number) => void;
  setFlipY: (flipY:boolean) => void;
  setInitStore: (initStore:string ) => void;
  setVariable: (variable: string) => void;
  setVariables: (variables: string[]) => void;
  setPlotOn: (plotOn: boolean) => void;
  setIsFlat: (isFlat: boolean) => void;
  setProgress: (progress: number) => void;
  setDownloading: (downloading: boolean) => void;
  setIs4D: (is4D: boolean) => void;
  setIdx4D: (idx4D: number | null) => void;
};

export const useGlobalStore = create<StoreState>((set, get) => ({
  dataShape: [1, 1, 1],
  shape: new THREE.Vector3(2, 2, 2),
  valueScales: { maxVal: 1, minVal: -1 },
  colormap: GetColorMapTexture(),
  timeSeries: {},
  strides: [10368,144,1],
  showLoading: false,
  metadata: null,
  zMeta: [{}],
  dataArray: new Uint8Array(1),
  dimArrays: [[0], [0], [0]],
  dimNames: ["Default"],
  dimUnits: ["Default"],
  dimCoords: {},
  plotDim: 0,
  flipY: false,
  initStore: "https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr",
  variable: 'Default',
  variables: [],
  plotOn: false,
  isFlat:false,
  progress: 0,
  downloading: false,
  is4D: false,
  idx4D: null,



  setDataShape: (dataShape) => set({ dataShape}),
  setShape: (shape) => set({ shape }),
  setValueScales: (valueScales) => set({ valueScales }),
  setColormap: (colormap) => set({ colormap }),
  setTimeSeries: (timeSeries) => set({ timeSeries }),
  updateTimeSeries: (newEntries) => {
    const merged = { ...newEntries, ...get().timeSeries  };

    // Slice to retain only the last 10 entries
    const limitedEntries = Object.entries(merged).slice(0, 10);

    const limitedTimeSeries = Object.fromEntries(limitedEntries);

    set({ timeSeries: limitedTimeSeries });
  },
  setStrides: (strides) => set({ strides }),
  setShowLoading: (showLoading) => set({ showLoading }),
  setMetadata: (metadata) => set({ metadata }),
  setZMeta: (zMeta) => set({ zMeta}),
  setDataArray: (dataArray) => set({ dataArray }),
  setDimArrays: (dimArrays) => set({ dimArrays }),
  setDimNames: (dimNames) => set({ dimNames }),
  setDimUnits: (dimUnits) => set({ dimUnits }),
  setDimCoords: (dimCoords) => set({ dimCoords }),
  updateDimCoords: (newDims) => {
    const merged = { ...newDims,...get().dimCoords  };

    // Convert to array of [key, value] pairs and slice to last 10
    const limitedEntries = Object.entries(merged)
      .slice(0, 10); // keep most recent 10 keys

    const limitedDimCoords = Object.fromEntries(limitedEntries);

    set({ dimCoords: limitedDimCoords });
  },
  setPlotDim: (plotDim) => set({ plotDim }),
  setFlipY: (flipY) => set({ flipY }),
  setInitStore: (initStore) => set({ initStore }),
  setVariable: (variable) => set({ variable }),
  setVariables: (variables) => set({variables}),
  setPlotOn: (plotOn) => set({ plotOn }),
  setIsFlat: (isFlat) => set({ isFlat}),
  setProgress: (progress) => set({ progress }),
  setDownloading: (downloading) => set({ downloading }),
  setIs4D: (is4D) => set({ is4D }),
  setIdx4D: (idx4D) => set({ idx4D }),
}));

type PlotState ={
  plotType: string;
  pointSize: number;
  scalePoints: boolean;
  scaleIntensity: number;
  timeScale: number;
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
  animProg: number;
  cOffset: number;
  cScale: number;
  useFragOpt: boolean;
  resetCamera: boolean;
  useCustomColor: boolean;
  useCustomPointColor: boolean;
  transparency: number;
  nanTransparency: number;
  nanColor: string;
  showBorders:boolean;
  borderColor: string;

  setQuality: (quality: number) => void;
  setTimeScale: (timeScale : number) =>void;
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
  setAnimProg: (animProg: number) => void; 
  setCOffset: (cOffset: number) => void;
  setCScale: (cScale: number) => void;
  setUseFragOpt: (useFragOpt: boolean) => void;
  setResetCamera: (resetCamera: boolean) => void;
  setUseCustomColor: (useCustomColor: boolean) => void;
  setUseCustomPointColor: (useCustomPointColor: boolean) => void;
  setTransparency: (transparency: number) => void;
  setNanTransparency: (nanTraparency: number) => void;
  setNanColor: (nanColor: string) => void;
  setShowBorders: (showBorders: boolean) => void;
  setBorderColor: (borderColor: string) => void;
}

export const usePlotStore = create<PlotState>((set) => ({
  //Create the initial state for the plot store
  plotType: "sphere", 
  pointSize: 5,
  scalePoints: false,
  scaleIntensity: 1,
  quality: 200,
  timeScale: 1,
  valueRange: [0, 1],
  xRange: [-1, 1],
  yRange: [-1, 1],
  zRange: [-1, 1],
  selectTS: false,
  showPoints: false,
  linePointSize: 2,
  lineWidth: 1.25,
  lineColor: "#111111",
  pointColor: "#EA8686",
  useLineColor: false,
  lineResolution: 3,
  animate: false,
  resetAnim: false,
  animProg: 0,
  cOffset: 0,
  cScale: 1,
  useFragOpt: false,
  resetCamera: false,
  useCustomColor: false,
  useCustomPointColor: false,
  transparency: 0,
  nanTransparency: 1,
  nanColor: "#000000",
  showBorders: false,
  borderColor: "#000000",

  setQuality: (quality) => set({ quality }),
  setTimeScale: (timeScale) => set({ timeScale }),
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
  setAnimProg: (animProg) => set({ animProg }),
  setCOffset: (cOffset) => set({ cOffset }),
  setCScale: (cScale) => set({ cScale }),
  setUseFragOpt: (useFragOpt) => set({ useFragOpt }),
  setResetCamera: (resetCamera) => set({ resetCamera }),
  setUseCustomColor: (useCustomColor) => set({ useCustomColor }),
  setUseCustomPointColor: (useCustomPointColor) => set({ useCustomPointColor}),
  setTransparency: (transparency) => set({ transparency}),
  setNanTransparency: (nanTransparency) => set({ nanTransparency }),
  setNanColor: (nanColor) => set({ nanColor }),
  setShowBorders: (showBorders) => set({ showBorders }),
  setBorderColor: (borderColor) => set({ borderColor }),
}))


type AnalysisState = {
  analysisMode: boolean;
  axis: number;
  operation: string;
  execute: boolean;
  useTwo: boolean;
  variable2: string;
  valueScalesOrig: {minVal: number, maxVal:number} | null
  kernelSize: number;
  kernelDepth: number;
  kernelOperation: string;
  analysisArray: Uint8Array | Float32Array;

  setAnalysisMode: (analysisMode: boolean) => void;
  setAxis: (axis: number) => void;
  setOperation: (operation: string) => void;
  setExecute: (execute: boolean) => void;
  setUseTwo: (useTwo: boolean) => void;
  setVariable2: (variable2: string) => void;
  setValueScalesOrig: (valueScalesOrig: {minVal: number, maxVal:number} | null) => void;
  setKernelSize: (kernelSize: number) => void;
  setKernelDepth: (kernelDepth: number) => void;
  setKernelOperation: (kernelOperation: string) => void;
  setAnalysisArray: (analysisArray: Uint8Array | Float32Array) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analysisMode: false,
  axis: 0,
  operation: "Default", 
  execute: false,
  useTwo: false,
  variable2: "Default",
  valueScalesOrig: null,
  kernelSize: 3,
  kernelDepth: 3,
  kernelOperation: 'Default',
  analysisArray: new Uint8Array(1),

  setAnalysisMode: (analysisMode) => set({ analysisMode }),
  setAxis: (axis) => set({ axis }),
  setOperation: (operation) => set({ operation }),
  setExecute: (execute) => set({ execute }),
  setUseTwo: (useTwo) => set({ useTwo}),
  setVariable2: (variable2) => set({ variable2 }), 
  setValueScalesOrig: (valueScalesOrig) => set({ valueScalesOrig }),
  setKernelSize: (kernelSize) => set({ kernelSize}),
  setKernelDepth: (kernelDepth) => set({ kernelDepth }),
  setKernelOperation: (kernelOperation) => set({ kernelOperation}),
  setAnalysisArray: (analysisArray) => set({ analysisArray })
}));

type ZarrState = {
  slice: [number  , number | null],
  compress: boolean,
  currentStore: any;
  reFetch: boolean;

  setSlice: (slice: [number , number | null]) => void;
  setCompress: (compress: boolean) => void;
  setCurrentStore: (currentStore: any) => void;
  setReFetch: (reFetch: boolean) => void;
}

export const useZarrStore = create<ZarrState>((set) => ({
  slice: [0, null],
  compress: false,
  currentStore: GetStore(ESDC),
  reFetch: false,

  setSlice: (slice) => set({ slice }),
  setCompress: (compress) => set({ compress }),
  setCurrentStore: (currentStore) => set({ currentStore }),
  setReFetch: (reFetch) => set({ reFetch })
}))


type ErrorState = {
  zarrFetch: boolean;
  cors: boolean;
  oom: boolean;

  setZarrFetch: (zarrFetch: boolean) => void; 
  setCors: (cors: boolean) => void; 
  setOom: (oom: boolean) => void; 
}

export const useErrorStore = create<ErrorState>((set) =>({
  zarrFetch: false,
  cors: false,
  oom: false,

  setZarrFetch: (zarrFetch) => set({ zarrFetch }),
  setCors: (cors) => set({ cors }),
  setOom: (oom) => set({ oom })

}))
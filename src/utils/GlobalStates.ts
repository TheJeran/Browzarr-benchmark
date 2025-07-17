import { create } from "zustand";
import * as THREE from 'three';
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
  timeSeries: Record<string, any>;
  strides: number[];
  showLoading: boolean;
  metadata: Record<string, any> | null;
  zMeta: object[];
  dataArray: Array<any> | null;
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

  setShape: (shape: THREE.Vector3) => void;
  setValueScales: (valueScales: { maxVal: number; minVal: number }) => void;
  setColormap: (colormap: THREE.DataTexture) => void;
  setTimeSeries: (timeSeries: Record<string, number[]>) => void;
  updateTimeSeries: (newEntries: Record<string, number[]>) => void;
  setStrides: (strides: number[]) => void;
  setShowLoading: (showLoading: boolean) => void;
  setMetadata: (metadata: object | null) => void;
  setZMeta: (zMeta: object[]) => void;
  setDataArray: (dataArray: Array<any> | null) => void;
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

};

export const useGlobalStore = create<StoreState>((set, get) => ({
  shape: new THREE.Vector3(2, 2, 2),
  valueScales: { maxVal: 1, minVal: -1 },
  colormap: GetColorMapTexture(),
  timeSeries: {},
  strides: [10368,144,1],
  showLoading: false,
  metadata: null,
  zMeta: [{}],
  dataArray: null,
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
  setProgress: (progress) => set({ progress })
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
  cOffset: number;
  cScale: number;
  useFragOpt: boolean;
  resetCamera: boolean;
  useCustomColor: boolean;
  useCustomPointColor: boolean;

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
  setCOffset: (cOffset: number) => void;
  setCScale: (cScale: number) => void;
  setUseFragOpt: (useFragOpt: boolean) => void;
  setResetCamera: (resetCamera: boolean) => void;
  setUseCustomColor: (useCustomColor: boolean) => void;
  setUseCustomPointColor: (useCustomPointColor: boolean) => void;
}

export const usePlotStore = create<PlotState>((set) => ({
  //Create the initial state for the plot store
  plotType: "volume", 
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
  cOffset: 0,
  cScale: 1,
  useFragOpt: false,
  resetCamera: false,
  useCustomColor: false,
  useCustomPointColor: false,

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
  setCOffset: (cOffset) => set({ cOffset }),
  setCScale: (cScale) => set({ cScale }),
  setUseFragOpt: (useFragOpt) => set({ useFragOpt }),
  setResetCamera: (resetCamera) => set({ resetCamera }),
  setUseCustomColor: (useCustomColor) => set({ useCustomColor }),
  setUseCustomPointColor: (useCustomPointColor) => set({ useCustomPointColor})
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

type ZarrState = {
  slice: [number  , number | null];
  compress: boolean;
  inferValues: boolean;

  setSlice: (slice: [number , number | null]) => void;
  setCompress: (compress: boolean) => void;
  setInferValues: (inferValues: boolean) => void;

}

export const useZarrStore = create<ZarrState>((set) => ({
  slice: [0, null],
  compress: false,
  inferValues: false,

  setSlice: (slice) => set({ slice }),
  setCompress: (compress) => set({ compress }),
  setInferValues: (inferValues) => set({ inferValues })
}))
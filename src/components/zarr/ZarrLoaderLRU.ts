import * as zarr from "zarrita";
import * as THREE from 'three';
import QuickLRU from 'quick-lru';
import { parseUVCoords, ArrayMinMax } from "@/utils/HelperFuncs";
import { GetSize } from "./GetMetadata";
import { useGlobalStore, useZarrStore } from "@/utils/GlobalStates";

export const ZARR_STORES = {
    ESDC: 'https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr',
    SEASFIRE: 'https://s3.bgc-jena.mpg.de:9000/misc/seasfire_rechunked.zarr',
    ICON_ESM: 'https://eerie.cloud.dkrz.de/datasets/icon-esm-er.hist-1950.v20240618.atmos.native.2d_1h_mean/kerchunk',
    OLCI_CHL: 'https://s3.waw3-2.cloudferro.com/wekeo/egu2025/OLCI_L1_CHL_cube.zarr',
    LOCAL: 'http://localhost:5173/GlobalForcingTiny.zarr'
} as const;

export class ZarrError extends Error {
    constructor(message: string, public readonly cause?: unknown) {
        super(message);
        this.name = 'ZarrError';
    }
}
export async function GetStore(storePath: string): Promise<zarr.Group<zarr.FetchStore | zarr.Listable<zarr.FetchStore>>>{
    try {
        const d_store = zarr.tryWithConsolidated(
            new zarr.FetchStore(storePath)
        );
        const gs = await d_store.then(store => zarr.open(store, {kind: 'group'}));
        return gs;
    } catch (error) {
        throw new ZarrError(`Failed to initialize store at ${storePath}`, error);
    }
}

interface TimeSeriesInfo{
	uv:THREE.Vector2,
	normal:THREE.Vector3
}
  
export class ZarrDataset{
	private groupStore: Promise<zarr.Group<zarr.FetchStore | zarr.Listable<zarr.FetchStore>>>;
	private variable: string;
	private cache: QuickLRU<string,any>;
	private dimNames: string[];
	private chunkIDs: number[];

	constructor(store: string){
		this.groupStore = GetStore(store);
		this.variable = "Default";
		this.cache = new QuickLRU({maxSize: 2000});
		this.dimNames = ["","",""]
		this.chunkIDs = [];
	}

	async GetArray(variable: string, slice: [number, number | null]){

		const setProgress = useGlobalStore.getState().setProgress
		const setStrides = useGlobalStore.getState().setStrides
		const setValueScales = useGlobalStore.getState().setValueScales
		const compress = useZarrStore.getState().compress
		const inferValues = useZarrStore.getState().inferValues
		const valueScales = useGlobalStore.getState().valueScales

		//Check if cached
		this.variable = variable;
		if (this.cache.has(variable)){
			return this.cache.get(variable)
		}

		const group = await this.groupStore;
		const outVar = await zarr.open(group.resolve(variable), {kind:"array"})
		const [totalSize, chunkSize, chunkShape] = GetSize(outVar);
		// Type check using zarr.Array.is
		if (outVar.is("number") || outVar.is("bigint")) {
			let chunk;
			let typedArray;
			let shape;
			this.chunkIDs = []
			if (totalSize < 1e8){ //Check if total is less than 100MB
				chunk = await zarr.get(outVar)
				shape = chunk.shape
				setStrides(chunk.stride) //Need strides for the point cloud
				if (chunk.data instanceof BigInt64Array || chunk.data instanceof BigUint64Array) {
							throw new Error("BigInt arrays are not supported for conversion to Float32Array.");
				} else {
					if (compress){
						let minVal: number;
						let maxVal: number;
						if (inferValues){
							[minVal, maxVal] = ArrayMinMax(chunk.data)
							setValueScales({maxVal, minVal})
						}
						else{
							minVal = valueScales.minVal;
							maxVal = valueScales.maxVal;
						}
						const normed = chunk.data.map((i)=>(i-minVal)/(maxVal-minVal))
						typedArray = new Uint8Array(normed.map((i)=>isNaN(i) ? 255 : i*254))
						chunk.data = typedArray
						this.cache.set(variable,chunk)
					}
					else{
						this.cache.set(variable,chunk)
					}
					
				}
			}
			else { 
				setProgress(0)
				const startIdx = Math.floor(slice[0]/chunkShape[0])
				const endIdx = slice[1] ? Math.ceil(slice[1]/chunkShape[0]) : Math.ceil(outVar.shape[0]/chunkShape[0])
				const chunkCount = endIdx-startIdx
				const timeSize = outVar.shape[1]*outVar.shape[2]
				const arraySize = (endIdx-startIdx+1)*chunkShape[0]*timeSize
				shape = [(endIdx-startIdx)*chunkShape[0],outVar.shape[1],outVar.shape[2]]
				typedArray = compress ? new Uint8Array(arraySize) : new Float32Array(arraySize);
				let accum = 0;
				let iter = 1;
				for (let i= startIdx ; i < endIdx ; i++){
					const cacheName = `${variable}_chunk_${i}`
					this.chunkIDs.push(i) //identify which chunks to use when recombining cache for timeseries
					if (this.cache.has(cacheName)){
						//Add a check and throw error here if user set compress but the local files are not compressed
						chunk = this.cache.get(cacheName)
						setStrides(chunk.stride)
						typedArray.set(chunk.data,accum)
						setProgress(Math.round(iter/chunkCount*100))
						accum += chunk.data.length;
						iter ++;
					}
					else{
						chunk = await zarr.get(outVar, [zarr.slice(i*chunkShape[0], (i+1)*chunkShape[0]), null, null])
						if (chunk.data instanceof BigInt64Array || chunk.data instanceof BigUint64Array) {
							throw new Error("BigInt arrays are not supported for conversion to Float32Array.");
						} else {
							typedArray.set(chunk.data,accum)
							this.cache.set(cacheName,chunk)
							accum += chunk.data.length;
							setStrides(chunk.stride)
							setProgress(Math.round(iter/chunkCount*100))
							iter ++;
						}
					}
				}
			}

			return {
				data: typedArray,
				shape: shape,
				dtype: outVar.dtype
			}
		} else {
			throw new Error(`Unsupported data type: Only numeric arrays are supported. Got: ${outVar.dtype}`)
		}
	}

	async GetAttributes(variable:string){
		const cacheName = `${variable}_meta`
		if (this.cache.has(cacheName)){
			return this.cache.get(cacheName)
		}
		const group = await this.groupStore;
		const outVar = await zarr.open(group.resolve(variable), {kind:"array"});
		const meta = outVar.attrs;
		this.cache.set(cacheName, meta);
		const dims = [];
		for (const dim of meta._ARRAY_DIMENSIONS as string[]){ //Put the dimension arrays in the cache to access later
			if (!this.cache.has(dim)){
				const dimArray = await zarr.open(group.resolve(dim), {kind:"array"})
						.then((result) => zarr.get(result));
					const dimMeta = await zarr.open(group.resolve(dim), {kind:"array"})
						.then((result) => result.attrs)
					this.cache.set(dim, dimArray.data);
					this.cache.set(`${dim}_meta`, dimMeta)
				}
				dims.push(dim)
		}
		this.dimNames = dims;
		return meta;
	}

	GetDimArrays(){
		const dimArr = [];
		const dimMetas = []

		for (const dim of this.dimNames){
			dimArr.push(this.cache.get(dim));
			dimMetas.push(this.cache.get(`${dim}_meta`))
		}
		return [dimArr,dimMetas, this.dimNames];
	}

	GetTimeSeries(TimeSeriesInfo:TimeSeriesInfo){
		const {uv,normal} = TimeSeriesInfo
		if (!this.cache.has(this.variable) && this.chunkIDs.length == 0){
			return [0]
		}

		let data, shape : number[], stride; 
		if (this.chunkIDs.length > 0){
			console.log("here")
			const arrays = []
			for (const id of this.chunkIDs){
				arrays.push(this.cache.get(`${this.variable}_chunk_${id}`))
			}
			({shape, stride} = arrays[0])
			const totalLength = arrays.reduce((sum, arr) => sum + arr.data.length, 0);

			data = new Float32Array(totalLength);
			let accum = 0;
			for (const array of arrays){
				data.set(array.data, accum);
				accum += array.data.length
			}
		}
		else{
			({data, shape, stride} = this.cache.get(this.variable))
		}
		//This is a complicated logic check but it works bb
		const sliceSize = parseUVCoords({normal,uv})
		const slice = sliceSize.map((value, index) =>
			value === null || shape[index] === null ? null : Math.round(value * shape[index]-.5));
		const mapDim = slice.indexOf(null);
		const dimStride = stride[mapDim];
		const pz = slice[0] == null ? 0 : stride[0]*slice[0]
		const py = slice[1] == null ? 0 : stride[1]*slice[1]
		const px = slice[2] == null ? 0 : stride[2]*slice[2]
		const ts = [];

		for (let i = 0; i < shape[mapDim] ; i++){
			const idx = i*dimStride+pz+py+px
			ts.push(data[idx])
		}
		return ts;
	}

}
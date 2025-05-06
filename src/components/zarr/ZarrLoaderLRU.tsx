import * as zarr from "zarrita";
import * as THREE from 'three';
import QuickLRU from 'quick-lru';
import { parseUVCoords } from "@/utils/HelperFuncs";
function GetZarrVariables(obj: Record<string, { path?: string; kind?: string }>) {
	//Parses out variables in a Zarr group for variable list
    const result = [];
    
    for (const key of Object.keys(obj)) {
        const item = obj[key];
        if (item.path && 
            item.path.length > 1 && 
            item.kind === 'array') {
            result.push(item.path.substring(1));
        }
    }
    //? we will need to filter out for lon (longitude, X), lat (latitude, Y), time (depth, altitude).
    return result;
}

export async function GetVariables(storePath: string){
	const d_store = zarr.tryWithConsolidated(
		new zarr.FetchStore(storePath)
	);
	const group = await d_store.then(store => zarr.open(store, {kind: 'group'}))
	// Type assertion
	const collect_contents = ('contents' in group.store) 
        ? group.store.contents() 
        : {};
	return GetZarrVariables(collect_contents)
}

// Define interface using Data Types from zarrita
// type NumericDataType = zarr.NumberDataType | zarr.BigintDataType;
// ?TODO: support more types, see https://github.com/manzt/zarrita.js/blob/0e809ef7cd4d1703e2112227e119b8b6a2cc9804/packages/zarrita/src/metadata.ts#L50

interface TimeSeriesInfo{
	uv:THREE.Vector2,
	normal:THREE.Vector3
}
  
export class ZarrDataset{
	private storePath: string;
	private variable: string;
	private cache: QuickLRU<string,any>;
	private dimNames: string[];

	constructor(storePath: string){
		this.storePath = storePath;
		this.variable = "Default";
		this.cache = new QuickLRU({maxSize: 2000});
		this.dimNames = ["","",""]
	}

	async GetArray(variable: string){
		//Check if cached
		this.variable = variable;
		if (this.cache.has(variable)){
			return this.cache.get(variable)
		}

		const d_store = zarr.tryWithConsolidated(
			new zarr.FetchStore(this.storePath)
		);
		//We may move this up to constructor
		const group = await d_store.then(store => zarr.open(store, {kind: 'group'}))
		const outVar = await zarr.open(group.resolve(variable), {kind:"array"})

		// Type check using zarr.Array.is
		if (outVar.is("number") || outVar.is("bigint")) {
			const chunk = await zarr.get(outVar)
			let typedArray;
			if (chunk.data instanceof BigInt64Array || chunk.data instanceof BigUint64Array) {
				throw new Error("BigInt arrays are not supported for conversion to Float32Array.");
			} else {
				typedArray = new Float32Array(chunk.data);
			}
			this.cache.set(variable, chunk);
			// TypeScript will now infer the correct numeric type
			return {
				data: typedArray,
				shape: chunk.shape,
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
		const d_store = zarr.tryWithConsolidated(
			new zarr.FetchStore(this.storePath)
		);

		const group = await d_store.then(store => zarr.open(store, {kind: 'group'}));
		const outVar = await zarr.open(group.resolve(variable), {kind:"array"});
		const meta = outVar.attrs;
		this.cache.set(cacheName,meta);
		const dims = [];
		for (const dim of meta._ARRAY_DIMENSIONS as string[]){ //Put the dimension arrays in the cache to access later
			if (!this.cache.has(dim)){
				const dimArray = await zarr.open(group.resolve(dim), {kind:"array"}).then((result)=>zarr.get(result));
				const dimMeta = await zarr.open(group.resolve(dim), {kind:"array"}).then((result)=>result.attrs)
				this.cache.set(dim,dimArray.data);
				this.cache.set(`${dim}_meta`,dimMeta)
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
		return [dimArr,dimMetas];
	}


	async GetTimeSeries(TimeSeriesInfo:TimeSeriesInfo){
		const {uv,normal} = TimeSeriesInfo
		if (!this.cache.has(this.variable)){
			return [0]
		}
		const {data,shape,stride} = this.cache.get(this.variable)
		//This is a complicated logic check but it works bb
		const sliceSize = parseUVCoords({normal,uv})

		const slice = sliceSize.map((value, index) =>
			value === null || shape[index] === null ? null : Math.round(value * shape[index]));

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




//For now we export variables. But we will import these functions over to the plotting component eventually
// export const variables = await GetVariables("https://s3.bgc-jena.mpg.de:9000/misc/seasfire_v0.4.zarr")
export const variables = await GetVariables("https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr")

// export const variables = await GetVariables("https://eerie.cloud.dkrz.de/datasets/icon-esm-er.hist-1950.v20240618.atmos.native.2d_1h_mean/kerchunk")

// export const variables = await GetVariables("https://s3.waw3-2.cloudferro.com/wekeo/egu2025/OLCI_L1_CHL_cube.zarr")
// CORS issues need to be resolved due to the endpoint.

//export const arr = await myVar.get();

// console.log(d_store)

// const local_store = new zarr.FetchStore("http://localhost:5173/GlobalForcingTiny.zarr");
// ! note that for local dev you only use `http` without the `s`.
// ? log a file with proper metadata, set consolidated=true when saving your zarr file
// export const local_node = await zarr.open.v2(local_store);
// export const arr = await zarr.open(local_node.resolve("t2m"), { kind: "array" });
// console.log(local_node)
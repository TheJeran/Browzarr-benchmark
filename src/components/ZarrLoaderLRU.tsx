import * as zarr from "zarrita";
import * as THREE from 'three';

function GetZarrVariables(obj: Record<string, any>) {
	//Parses out variables in a Zarr group for variable list
    const result = [];
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const item = obj[key];
            if (item.path && 
                item.path.length > 1 && 
                item.kind === 'array') {
                result.push(item.path.substring(1));
            }
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
	return GetZarrVariables(group.store.contents())
}

export async function GetArray(storePath: string, variable: string ){
	const d_store = zarr.tryWithConsolidated(
		new zarr.FetchStore(storePath)
	);
	//Will need to add dependencies in here to check if it is a group or direct array

	const group = await d_store.then(store => zarr.open(store, {kind: 'group'}))
	
	const outVar = await zarr.open(group.resolve(variable), {kind:"array"})
	
	const arr = await zarr.get(outVar)

	return arr	
}

interface GetTimeSeries{
	TimeSeriesObject:{
	uv:THREE.Vector2,
	normal:THREE.Vector3,
	storePath:string,
	variable:string
	}
}

function parseUVCoords({normal,uv}:{normal:THREE.Vector3,uv:THREE.Vector2}){
	switch(true){
		case normal.z === 1:
			return [null,uv.y,uv.x]
		case normal.z === -1:
			return [null,uv.y,1-uv.x]
		case normal.x === 1:
			return [uv.x,uv.y,null]
		case normal.x === -1:
			return [1-uv.x,uv.y,null]
		case normal.y === 1:
			return [1-uv.x,null,uv.y]
		default:
			return [0,0,0]
	}
}

export async function GetTimeSeries({TimeSeriesObject}:GetTimeSeries){
	const {uv,normal,variable, storePath} = TimeSeriesObject
	const d_store = zarr.tryWithConsolidated(
		new zarr.FetchStore(storePath)
	);
	const group = await d_store.then(store => zarr.open(store, {kind: 'group'}))
	const outVar = await zarr.open(group.resolve(variable), {kind:"array"})
	const shape = outVar.shape;
	//This is a complicated logic check but it works bb
	const sliceSize = parseUVCoords({normal,uv})
	const slice = sliceSize.map((value, index) =>
		value === null || shape[index] === null ? null : value * shape[index]
	  );
	const arr = await zarr.get(outVar,slice)
	return arr
}




//For now we export variables. But we will import these functions over to the plotting component eventually
export const variables = await GetVariables("https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr")

//export const arr = await myVar.get();

// console.log(d_store)

// const local_store = new zarr.FetchStore("http://localhost:5173/GlobalForcingTiny.zarr");
// ! note that for local dev you only use `http` without the `s`.
// ? log a file with proper metadata, set consolidated=true when saving your zarr file
// export const local_node = await zarr.open.v2(local_store);
// export const arr = await zarr.open(local_node.resolve("t2m"), { kind: "array" });
// console.log(local_node)
import * as zarr from "zarrita";

let _store = "https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr"

let d_store = zarr.tryWithConsolidated(
	new zarr.FetchStore(_store)
);

let local_store = new zarr.FetchStore("http://localhost:5173/GlobalForcingTiny.zarr");
// ! note that for local dev you only use `http` without the `s`.
const local_node = await zarr.open(local_store);
console.log(d_store)

export default local_node
"use client";
import React, {useState, useEffect, ChangeEvent} from 'react'
import * as zarr from 'zarrita'
import { GetStore } from '../zarr/ZarrLoaderLRU';


async function resolveFileHandleForPath(root: FileSystemDirectoryHandle, path:string) {
  const dirs = path.split("/");
  const fname = dirs.pop();
  for (const dir of dirs) {
    root = await root.getDirectoryHandle(dir);
  }
  if (!fname) {
    throw new Error("Invalid path: filename is undefined");
  }
  return root.getFileHandle(fname);
}


class MyWebFileSystemStore {
    private files: FileList
    constructor(files: FileList) {
        this.files = files;
    }
    async get(key: string) {
        // The list of files does not prefix its paths with slashes.
        const file = Array.from(this.files).find(f => `/${(f as any).path}` === key);
        if (!file) return undefined;
        return file.arrayBuffer();
    }
}


const LocalZarr = () => {
    const [error, setError] = useState<boolean>(false);
    const [select, setSelect] = useState<boolean>(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>){
    const { files } = e.target;
    if (!files || files.length === 0) {
      console.log('No directory selected.');
      return;
    }

    const newStore = new MyWebFileSystemStore(files)
    let store = zarr.root(newStore);
    console.log(store)
    zarr.open(newStore).then(e=>console.log(e));
    
  }
  return (
    <div>
        <form  onSubmit={e=>{e.preventDefault();console.log(e)}}>
        <input type="file" id="filepicker"
        // @ts-expect-error `webkitdirectory` is non-standard attribute. TS doesn't know about it. It's used for cross-browser compatibility.
        directory=''
        webkitdirectory='true'
        onChange={handleChange}
        >
        </input>
        {/* <button onClick={e=>setSelect(x=>!x)}>Local Check </button> */}
        <button type='submit'>Check?</button>
      </form>


    </div>
  )
}

export default LocalZarr


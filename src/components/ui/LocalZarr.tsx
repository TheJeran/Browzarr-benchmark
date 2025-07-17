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

class WebFileSystemStore {
  root: FileSystemDirectoryHandle
  constructor(root: FileSystemDirectoryHandle) {
    this.root = root;
  }
  async get(key: string) {
    // TODO: better error handling. We want to catch when file is missing and just return undefined. Other errors should bubble.
    let fh = await resolveFileHandleForPath(
      this.root,
      key.slice(1),
    ).catch(() => null);
    if (!fh) return undefined;
    let file = await fh.getFile();
    let buffer = await file.arrayBuffer();
    return new Uint8Array(buffer);
  }
}

const LocalZarr = () => {

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }
    // Create a Map to hold the Zarr store data
    const store = new Map<string, Promise<ArrayBuffer>>();

    // The base directory name will be the first part of the relative path
    const baseDir = files[0].webkitRelativePath.split('/')[0];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // We need to remove the base directory from the path for zarrita
      const relativePath = file.webkitRelativePath.substring(baseDir.length + 1);
      if (relativePath) {
        store.set('/' + relativePath, file.arrayBuffer()); //Zarrita looks for a leading slash before variables. Need to add it back
      }
    }

    // Create a custom zarrita store from the Map
    const customStore: zarr.AsyncReadable<any> = {
      async get(key: string) {
        const buffer = await store.get(key);
        return buffer ? new Uint8Array(buffer) : undefined;
      }
    };

    try {
      // Open the Zarr store using the custom store
      const store = await zarr.tryWithConsolidated(customStore);
      const root = await zarr.open(store)
      const kind = root.kind; //Will need this if it's a group or array
      console.log(root)

    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error opening Zarr store: ${error.message}`);
      } else {
        console.log('An unknown error occurred when opening the Zarr store.');
      }
    }
  };
  
  return (
    <div>
        <input type="file" id="filepicker"
        // @ts-expect-error `webkitdirectory` is non-standard attribute. TS doesn't know about it. It's used for cross-browser compatibility.
        directory=''
        webkitdirectory='true'
        onChange={handleFileSelect}
        >
        </input>
    </div>
  )
}

export default LocalZarr


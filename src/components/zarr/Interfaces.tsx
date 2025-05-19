export interface ZarrMetadata {
    name: string;
    shape: number[];
    chunks: number[];
    dtype: string;
    totalSize: number;  // in bytes
    totalSizeFormatted: string;  // human readable
    chunkCount: number;
    chunkSize: number;  // in bytes
    chunkSizeFormatted: string;  // human readable
}

export interface ZarrItem {
    path: `/${string}`;
    kind: "group" | "array";
}
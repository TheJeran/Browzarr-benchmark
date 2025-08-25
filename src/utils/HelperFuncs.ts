'use client';
import * as THREE from 'three'
import { useGlobalStore, usePlotStore } from './GlobalStates';

export function parseTimeUnit(units: string | undefined): number {
    if (units === "Default"){
        return 1;
    }

    if (!units || typeof units !== 'string' || units.trim() === '') {
      return 1;
    }
    
    // Regular expression to match CF time units (e.g., "seconds since 1970-01-01")
    const match = units.match(/^(\w+)\s+since\s+(.+)$/i);
    if (!match) {
      throw new Error(`Invalid time unit format: expected "<unit> since <date>", got "${units}"`);
    }
  
    const [_, unit, _referenceDate] = match;
    const normalizedUnit = unit.toLowerCase();
    
    // Map of time units to milliseconds per unit
    const unitToMilliseconds: Record<string, number> = {
      millisecond: 1,
      milliseconds: 1,
      second: 1000,
      seconds: 1000,
      minute: 60 * 1000,
      minutes: 60 * 1000,
      hour: 60 * 60 * 1000,
      hours: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000,
    };
  
    // Handle singular/plural variations (e.g., "second" vs "seconds")
    const singularUnit = normalizedUnit.endsWith('s') ? normalizedUnit.slice(0, -1) : normalizedUnit;
    const effectiveUnit = unitToMilliseconds[normalizedUnit] !== undefined ? normalizedUnit : singularUnit;
  
    if (!(effectiveUnit in unitToMilliseconds)) {
      throw new Error(`Unsupported time unit: "${unit}". Supported units: ${Object.keys(unitToMilliseconds).join(', ')}`);
    }
    return unitToMilliseconds[effectiveUnit];
}

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
  
export function parseLoc(input:number, units: string | undefined, verbose: boolean = false) {
    if (!units){
        return input
    }
    if (typeof(input) == 'bigint'){
      if (!units){
        return Number(input)
      }
      try{
        const scale = parseTimeUnit(units)
        const timeStamp = Number(input) * scale;
        const date = new Date(timeStamp);
        if (verbose) {
          return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`; // e.g., "18 Aug 2025"
        } else {
          const day = date.getDate();
          const month = date.getMonth() + 1; // Months are 0-indexed
          const year = date.getFullYear();
          return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`; // e.g., "18-8-2025"
        }
      }
      catch{
        return input;
      }
        
    }
    if ( units.match(/(degree|degrees|deg|°)/i) ){
        return `${input.toFixed(2)}°`
    }
    else {
        return input.toFixed(2);
    }
}

export function parseUVCoords({normal,uv}:{normal:THREE.Vector3,uv:THREE.Vector2}){
  const flipY = useGlobalStore.getState().flipY
  switch(true){
    case normal.z === 1:
      return [null, flipY ? 1-uv.y : uv.y, uv.x]
    case normal.z === -1:
      return [null, flipY ? 1-uv.y : uv.y, 1-uv.x]
    case normal.x === 1:
      return [1-uv.x, flipY ? 1- uv.y : uv.y, null]
    case normal.x === -1:
      return [uv.x, flipY ? 1-uv.y : uv.y, null]
    case normal.y === 1:
      return [1-uv.y, null, uv.x]
    default:
      return [0,0,0]
  }
}

export function getUnitAxis(vec: THREE.Vector3) { //Takes the normal of a cube interaction to figure out which axis to move along within the data for the timeseries
  if (Math.abs(vec.x) === 1) return 2;
  if (Math.abs(vec.y) === 1) return 1;
  if (Math.abs(vec.z) === 1) return 0;
  return null;
}

export function ArrayMinMax(array:number[] | Uint8Array<ArrayBufferLike> | Int16Array<ArrayBufferLike> | Int32Array<ArrayBufferLike> | Uint32Array<ArrayBufferLike> | Float32Array<ArrayBufferLike> | Float64Array<ArrayBufferLike>){
  let minVal = Infinity;
  let maxVal = -Infinity;
  for (let i = 0; i < array.length; i++){
    minVal = array[i] < minVal ? array[i] : minVal
    maxVal = array[i] > maxVal ? array[i] : maxVal
  }
  return [minVal,maxVal]
}

export async function getVariablesOptions(variablesPromise: Promise<string[]> | undefined) {
    if (!variablesPromise) return [{ text: 'Default', value: 'Default' }];
    
    try {
        const variables = await variablesPromise;
        if (!Array.isArray(variables)) return [{ text: 'Default', value: 'Default' }];
        
        return [
            { text: 'Default', value: 'Default' },
            ...variables.map((element: string) => ({
                text: element,
                value: element
            }))
        ];
    } catch (error) {
        console.error('Error getting variables:', error);
        return [{ text: 'Default', value: 'Default' }];
    }
}

export function linspace(start: number, stop: number, num: number): number[] {
    const step = (stop - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + step * i);
  }

export function ParseExtent(dimUnits: string[], dimArrays: number[][]){

  const setLonExtent = usePlotStore.getState().setLonExtent;
  const setLatExtent = usePlotStore.getState().setLatExtent;
  const setLonResolution = usePlotStore.getState().setLonResolution;
  const setLatResolution = usePlotStore.getState().setLatResolution;

  const tempUnits = dimUnits.length > 2 ? dimUnits.slice(1) : dimUnits;
  let tryParse = false;
  for (const unit of tempUnits){
    if (unit.match(/(degree|degrees|deg|°)/i)){
      tryParse = true;
      break;
    }
  }
  if (tryParse){
    const tempArrs = dimArrays.length > 2 ? dimArrays.slice(1) : dimArrays
    const minLat = tempArrs[0][0]
    const maxLat = tempArrs[0][tempArrs[0].length-1]
    let minLon = tempArrs[1][0]
    let maxLon = tempArrs[1][tempArrs[1].length-1]
    minLon = minLon > 180 ? minLon - 360 : minLon
    maxLon = maxLon > 180 ? maxLon - 360 : maxLon
    setLonExtent([minLon, maxLon])
    setLatExtent([minLat, maxLat])

    const latRes = Math.abs(tempArrs[0][1] - tempArrs[0][0])
    const lonRes = Math.abs(tempArrs[1][1] - tempArrs[1][0])
    setLonResolution(lonRes)
    setLatResolution(latRes)
  }
  else{
    setLonExtent([-180,180])
    setLatExtent([-90,90])
  }
}

export async function testCORSConfiguration(storePath: string): Promise<{
    isAccessible: boolean;
    corsEnabled: boolean;
    errorDetails: string | null;
}> {
    try {
        // Test with CORS mode
        const corsResponse = await fetch(storePath, {
            method: 'HEAD',
            mode: 'cors'
        });
        return {
            isAccessible: true,
            corsEnabled: true,
            errorDetails: String(corsResponse.status)
        };
    } catch (corsError) {
        try {
            // Test with no-cors mode
            await fetch(storePath, {
                method: 'HEAD',
                mode: 'no-cors'
            });
            
            return {
                isAccessible: true,
                corsEnabled: false,
                errorDetails: 'Server is accessible but CORS is not properly configured'
            };
        } catch (networkError) {
            return {
                isAccessible: false,
                corsEnabled: false,
                errorDetails: 'Server is not accessible or URL is incorrect'
            };
        }
    }
}
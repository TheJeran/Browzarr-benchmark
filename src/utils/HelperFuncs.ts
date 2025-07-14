'use client';
import * as THREE from 'three'
import { useGlobalStore } from './GlobalStates';

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
  
export function parseLoc(input:number, units: string | undefined) {
    if (!units){
        return input
    }
    if (typeof(input) == 'bigint'){
      try{
        const scale = parseTimeUnit(units)
        const timeStamp = Number(input) * scale;
        return new Date(timeStamp).toDateString()
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

export function getUnitAxis(vec: THREE.Vector3) {
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
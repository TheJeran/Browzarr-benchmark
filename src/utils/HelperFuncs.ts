'use client';

/**
 * Parses a CF time unit string and returns the scaling factor (milliseconds per unit).
 * @param units - Time unit string, e.g., "seconds since 1970-01-01" or "days since 1970-01-01"
 * @returns Scaling factor (milliseconds per unit)
 */

import * as THREE from 'three'

export function parseTimeUnit(units: string | undefined): number {
    if (units === "Default"){
        console.log("Aborting?")
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
        const scale = parseTimeUnit(units)
        const timeStamp = Number(input) * scale;
        return new Date(timeStamp).toDateString()
    }
    if ( units.match(/(degree|degrees|deg|°)/i) ){
        return `${input.toFixed(2)}°`
    }
    else {
        return input.toFixed(2);
    }
}

export function parseUVCoords({normal,uv}:{normal:THREE.Vector3,uv:THREE.Vector2}){
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
      return [1-uv.y,null,uv.x]
    default:
      return [0,0,0]
  }
}

export function ArrayMin(array:number[]){
  const minVal = array.reduce((a, b) => {
    if (isNaN(a)) return b;
    if (isNaN(b)) return a;
    return a > b ? a : b;
  });
  return minVal
}

export function ArrayMax(array:number[]){
  const maxVal = array.reduce((a, b) => {
    if (isNaN(a)) return b;
    if (isNaN(b)) return a;
    return a > b ? b : a;
  });
  return maxVal
}

export function ArrayMinMax(array:number[]){
  let minVal = 1e20;
  let maxVal = -1e20;
  for (let i = 0; i < array.length; i++){
    minVal = array[i] < minVal ? array[i] : minVal
    maxVal = array[i] > maxVal ? array[i] : maxVal
  }
  return [minVal,maxVal]
}
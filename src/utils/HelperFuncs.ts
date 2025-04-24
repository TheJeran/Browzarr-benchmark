/**
 * Parses a CF time unit string and returns the scaling factor (milliseconds per unit).
 * @param units - Time unit string, e.g., "seconds since 1970-01-01" or "days since 1970-01-01"
 * @returns Scaling factor (milliseconds per unit)
 */

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
        return `${input}°`
    }
    else {
        return input;
    }
}
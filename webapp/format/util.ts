import { ValueColor } from "sap/m/library";
import { IconColor } from "sap/ui/core/library";

export enum Threshold {
    Warm = 4,
    Hot = 5
}

export function formatIconColor(temperature: number) : IconColor|string {
    if (temperature < Threshold.Warm) {
      return "#0984e3";
    } else if(temperature >= Threshold.Warm && temperature < Threshold.Hot) {
        return IconColor.Critical;
    } else {
        return IconColor.Negative;
    }
}


export function formatValueColor(temperature: number) : ValueColor {
    if (temperature < Threshold.Warm) {
        return ValueColor.Neutral;
    } else if(temperature >= Threshold.Warm && temperature < Threshold.Hot) {
        return ValueColor.Critical;
    } else {
        return ValueColor.Error;
    }
}

export function formatTemperature(temperature: number, unit: string) : string {
    temperature = temperature * 1.8 + 32;
    if(unit === "°C") {
        temperature = (temperature - 32) / 1.8;
    }
    return (temperature).toFixed(2);
}

import { OptionType } from "../types";

const WeightUnits: OptionType[] = [
  { id: "kg", label: "Kilogram(s)", value: "kg" },
  { id: "g", label: "Gram(s)", value: "g" },
  { id: "mg", label: "Miligram(s)", value: "mg" },
  { id: "oz", label: "Ounces", value: "oz" },
  { id: "lb", label: "Pounds", value: "lb" },
] as const;
const VolumeUnits: OptionType[] = [
  { id: "l", label: "Liter(s)", value: "l" },
  { id: "ml", label: "Mililiter(s)", value: "ml" },
  { id: "fl oz", label: "Fluid ounce(s)", value: "fl oz" },
  { id: "gal", label: "Gallon(s)", value: "gal" },
] as const;

export const Units = {
  weight: WeightUnits,
  volume: VolumeUnits,
};

import { MaskitoOptions } from "@maskito/core";

export const defaultMask: MaskitoOptions = {
  mask: /[^]/,
};
export const numbersOnlyMask: MaskitoOptions = {
  mask: /^\d+$/,
};
export const phoneMask: MaskitoOptions = {
  mask: [/\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d?/],
};

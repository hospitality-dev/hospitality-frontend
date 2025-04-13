import { MaskitoOptions } from "@maskito/core";
import {
  maskitoAddOnFocusPlugin,
  maskitoDateTimeOptionsGenerator,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from "@maskito/kit";

export const defaultMask: MaskitoOptions = {
  mask: /[^]/,
};
export const numbersOnlyMask: MaskitoOptions = {
  mask: /^\d+$/,
};
export const phoneMask: MaskitoOptions = {
  mask: [/\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d?/],
};
export const websiteMask: MaskitoOptions = {
  mask: /^https:\/\/((\w*\.)?(\w*)((\.|\/)*)?([\w]*)?((\.|\/)*)?([\w]*))+$/,
  postprocessors: [maskitoPrefixPostprocessorGenerator("https://")],
  plugins: [maskitoAddOnFocusPlugin("https://"), maskitoRemoveOnBlurPlugin("https://")],
};
export const dateTimeMask: MaskitoOptions = maskitoDateTimeOptionsGenerator({
  dateMode: "dd/mm/yyyy",
  timeMode: "HH:MM",
  dateSeparator: ".",
  dateTimeSeparator: " | ",
  timeStep: 5,
});

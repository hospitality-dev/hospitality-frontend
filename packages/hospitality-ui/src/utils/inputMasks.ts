import { MaskitoOptions, maskitoUpdateElement } from "@maskito/core";
import {
  maskitoAddOnFocusPlugin,
  maskitoDateOptionsGenerator,
  maskitoDateTimeOptionsGenerator,
  maskitoEventHandler,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
  maskitoWithPlaceholder,
} from "@maskito/kit";

const DATETIME_PLACEHOLDER = "DD.MM.YYYY | HH:MM";
const DATE_PLACEHOLDER = "DD.MM.YYYY";
const { removePlaceholder, plugins, ...placeholderOptions } = maskitoWithPlaceholder(DATETIME_PLACEHOLDER);
const {
  removePlaceholder: dateRemovePlaceholder,
  plugins: datePlugins,
  ...datePlaceholderOptions
} = maskitoWithPlaceholder(DATE_PLACEHOLDER);

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
export const dateTimeMask: MaskitoOptions = {
  ...maskitoDateTimeOptionsGenerator({
    dateMode: "dd/mm/yyyy",
    timeMode: "HH:MM",
    dateSeparator: ".",
    dateTimeSeparator: " | ",
    timeStep: 5,
  }),
  preprocessors: placeholderOptions.preprocessors,
  postprocessors: placeholderOptions.postprocessors,
  plugins: [
    ...plugins,
    maskitoEventHandler("focus", (element) => {
      const initialValue = element.value;

      maskitoUpdateElement(element, initialValue + DATETIME_PLACEHOLDER.slice(initialValue.length));
    }),
    maskitoEventHandler("blur", (element) => {
      const cleanValue = removePlaceholder(element.value);

      maskitoUpdateElement(element, cleanValue);
    }),
  ],
};

export const dateMask: MaskitoOptions = {
  ...maskitoDateOptionsGenerator({
    mode: "dd/mm/yyyy",
    separator: ".",
  }),
  preprocessors: datePlaceholderOptions.preprocessors,
  postprocessors: datePlaceholderOptions.postprocessors,
  plugins: [
    ...datePlugins,
    maskitoEventHandler("focus", (element) => {
      const initialValue = element.value;

      maskitoUpdateElement(element, initialValue + DATE_PLACEHOLDER.slice(initialValue.length));
    }),
    maskitoEventHandler("blur", (element) => {
      const cleanValue = dateRemovePlaceholder(element.value);

      maskitoUpdateElement(element, cleanValue);
    }),
  ],
};

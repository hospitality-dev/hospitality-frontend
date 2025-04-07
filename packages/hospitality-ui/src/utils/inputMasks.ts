import { MaskitoOptions, MaskitoPreprocessor } from "@maskito/core";
import {
  maskitoAddOnFocusPlugin,
  maskitoCaretGuard,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from "@maskito/kit";
function trimPrefix(value: string): string {
  return value.replace(/^(\+381)/, "");
}
function countDigits(value: string): number {
  return value.replaceAll(/\D/g, "").length;
}
function createCompletePhoneInsertionPreprocessor(): MaskitoPreprocessor {
  return ({ elementState, data }) => {
    const { value, selection } = elementState;

    return {
      elementState: {
        selection,
        value: countDigits(value) > 11 ? trimPrefix(value) : value,
      },
      data: countDigits(data) >= 11 ? trimPrefix(data) : data,
    };
  };
}

export const defaultMask: MaskitoOptions = {
  mask: /[^]/,
};
export const numbersOnlyMask: MaskitoOptions = {
  mask: /^\d+$/,
};
export const phoneMask: MaskitoOptions = {
  mask: ["+", "3", "8", "1", " ", /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d?/],
  postprocessors: [
    // non-removable country prefix
    maskitoPrefixPostprocessorGenerator("+381"),
  ],
  preprocessors: [createCompletePhoneInsertionPreprocessor()],
  plugins: [
    maskitoAddOnFocusPlugin("+381"),
    maskitoRemoveOnBlurPlugin("+381"),
    // Forbids to put caret before non-removable country prefix
    // But allows to select all value!
    maskitoCaretGuard((value, [from, to]) => [from === to ? "+381".length : 0, value.length]),
  ],
};

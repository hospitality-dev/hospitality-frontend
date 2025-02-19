import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import eslintConfigStandard from "eslint-config-standard";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginN from "eslint-plugin-n";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import ignoreGenerated from "eslint-plugin-ignore-generated";
export default {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],

  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: "module",
      ecmaVersion: "latest",
    },
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
    promise: eslintPluginPromise,
    import: eslintPluginImport,
    prettier: eslintPluginPrettier,
    "simple-import-sort": eslintPluginSimpleImportSort,
    "unused-imports": eslintPluginUnusedImports,
    n: eslintPluginN,
    ignoreGenerated,
  },
  rules: {
    ...eslintConfigStandard.rules,
    ...eslintConfigPrettier.rules,
    "func-style": ["error", "declaration", { allowArrowFunctions: false }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/no-cycle": "error",
    "no-console": ["error", { allow: ["info", "error"] }],
    camelcase: ["error", { properties: "always" }],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "promise/catch-or-return": "error",
    "promise/always-return": "error",
  },
};

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
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

export default tseslint.config({
  globals: {
    ...eslintConfigStandard.globals,
  },
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  parser: tsParser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    ecmaVersion: "latest",
  },
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "@typescript-eslint": tsPlugin,
    react: eslintPluginReact,
    promise: eslintPluginPromise,
    import: eslintPluginImport,
    prettier: eslintPluginPrettier,
    "simple-import-sort": eslintPluginSimpleImportSort,
    "unused-imports": eslintPluginUnusedImports,
    n: eslintPluginN,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...eslintConfigStandard.rules,
    ...eslintConfigPrettier.rules,
    "react/jsx-sort-props": ["error", { reservedFirst: true }],
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
    "react/prop-types": "off", // Not needed with TypeScript
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
});

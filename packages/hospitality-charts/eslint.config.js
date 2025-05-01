import baseConfig from "../../eslint.config.js";
import tseslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config({
  ...baseConfig,
  name: "Hospitality-UI",
  plugins: {
    ...baseConfig.plugins,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    react: eslintPluginReact,
  },
  rules: {
    ...baseConfig.rules,
    ...reactHooks.configs.recommended.rules,
    camelcase: ["error", { allow: ["^relation__"] }],
    "react/jsx-sort-props": ["error", { reservedFirst: true }],
    "react/prop-types": "off", // Not needed with TypeScript
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/boolean-prop-naming": [
      "error",
      {
        rule: "^(is|has)[A-Z]([A-Za-z0-9]?)+",
        message: "Boolean props should be prefixed with 'is' or 'has'",
      },
    ],
  },
});

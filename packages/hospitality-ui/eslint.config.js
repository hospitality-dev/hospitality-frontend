import baseConfig from "../../eslint.config";
import tseslint from "typescript-eslint";
export default tseslint.config({
  ...baseConfig,
  extends: [...baseConfig.extends, "plugin:@typescript-eslint/recommended"],
});

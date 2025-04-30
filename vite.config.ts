import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ReactCompilerConfig = {};
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    tailwindcss(),
  ],
  base: "/",
  build: {
    minify: true,

    rollupOptions: {
      output: {
        minifyInternalExports: true,
        manualChunks(id) {
          if (id.includes("@zxing")) return "@zxing";
          if (id.includes("lodash")) return "lodash";
          if (id.includes("@floating-ui")) return "@floating-ui";
          // if (id.includes("hospitality-ui/inventory-managemety"))
          if (id.includes("hospitality-ui/src/hooks")) return "@hospitality-ui/hooks";
          if (id.includes("hospitality-ui/src/components")) return "@hospitality-ui/components";
          if (id.includes("hospitality-ui/src/sections")) return "@hospitality-ui/sections";
          if (id.includes("hospitality-frontend/apps/")) {
            return `@hospitality-${id.split("/")[6]}`;
          }
          if (id.includes("@tanstack/react-form")) return "@tanstack/react-form";
          if (id.includes("@tanstack/react-query")) return "@tanstack/react-query";
          if (id.includes("@tanstack/react-table")) return "@tanstack/react-table";
        },
      },
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      jsx: "automatic",
    },
  },
});

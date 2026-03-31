import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss(), react(), svgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: {
        "arkada-widgets": resolve(
          __dirname,
          "src/web-components/index.ts",
        ),
        "arkada-wv-widget": resolve(
          __dirname,
          "src/web-components/arkada-wv-widget.ts",
        ),
        "arkada-vwb-widget": resolve(
          __dirname,
          "src/web-components/arkada-vwb-widget.tsx",
        ),
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "arkada-widgets.[ext]",
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

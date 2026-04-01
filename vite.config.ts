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
    emptyOutDir: false,
    lib: {
      entry: {
        // Main bundle — all ready web components in one file
        "arkada-widgets": resolve(
          __dirname,
          "src/web-components/index.ts",
        ),
        // Standalone smart button — can be loaded independently
        "arkada-wvbs-widget": resolve(
          __dirname,
          "src/web-components/arkada-wvbs-widget.tsx",
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

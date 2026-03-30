import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/web-components/arkada-wv-widget.ts"),
      name: "ArkadaWidgets",
      fileName: "arkada-widgets",
      formats: ["es", "umd"],
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

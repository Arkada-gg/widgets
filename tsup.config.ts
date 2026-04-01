import { defineConfig } from "tsup";

export default defineConfig({
  // Single public entry — only WalletVerificationButton is exposed
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  // Generate .d.ts files so consumers get full type safety
  dts: true,
  // Disable code splitting to produce a single flat bundle per format
  splitting: false,
  sourcemap: true,
  clean: true,
  // React and React DOM must be provided by the consumer
  external: ["react", "react-dom"],
  tsconfig: "tsconfig.lib.json",
});

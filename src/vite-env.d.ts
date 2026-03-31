/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_R2_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

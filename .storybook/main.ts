import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  managerHead: (head) => `${head}<base href="/widgets/">`,
  viteFinal: (config, { configType }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": new URL("../src", import.meta.url).pathname,
    };
    config.build = config.build || {};
    delete config.build.lib;
    if (configType === "PRODUCTION") {
      config.base = "/widgets/";
    }
    return config;
  },
};
export default config;

import { defineConfig } from "@rslib/core"
import { pluginStyledComponents } from "@rsbuild/plugin-styled-components"

export default defineConfig({
  lib: [
    {
      format: "esm",
      bundle: false,
      autoExtension: false,
      output: { distPath: { root: "./dist/esm" } },
      dts: false,
    },
    {
      format: "cjs",
      bundle: false,
      output: { distPath: { root: "./dist/cjs" } },
      dts: { bundle: false },
    },
  ],
  source: {
    entry: {
      index: [
        "./src/**/*.{ts,tsx}",
        "!./src/**/*.test.*",
        "!./src/**/*.story.*",
        "!./src/**/__tests__/**",
        "!./src/**/__stories__/**",
        "!./src/**/jestShim.*",
      ],
    },
  },
  output: {
    target: "web",
    sourceMap: { js: "source-map" },
  },
  plugins: [pluginStyledComponents()],
})

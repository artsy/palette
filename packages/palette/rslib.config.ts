// Bundleless libs set `outputCss: false` because Rslib leaves the plugin's virtual CSS imports in the JS.
// The bundled lib extracts palette.css.
import { rspack } from "@rsbuild/core"
import { defineConfig } from "@rslib/core"
import { pluginStyledComponents } from "@rsbuild/plugin-styled-components"
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin"

const LAYER_ORDER =
  "@layer palette.reset, palette.components, palette.utilities.base, palette.utilities.xs, palette.utilities.sm, palette.utilities.md, palette.utilities.lg;"

const SOURCE_FILES = [
  "./src/**/*.{ts,tsx}",
  "!./src/**/*.test.*",
  "!./src/**/*.story.*",
  "!./src/**/__tests__/**",
  "!./src/**/__stories__/**",
  "!./src/**/__mocks__/**",
  "!./src/**/storybookBlocklist.ts",
  "!./src/**/jestShim.*",
  "!./src/styles/palette.css.ts",
]

const vanillaExtract = ({ outputCss }: { outputCss: boolean }) => {
  return new VanillaExtractPlugin({ identifiers: "short", outputCss })
}

export default defineConfig({
  lib: [
    {
      format: "esm",
      bundle: false,
      autoExtension: false,
      source: { entry: { index: SOURCE_FILES } },
      output: { distPath: { root: "./dist/esm" } },
      dts: false,
      tools: {
        rspack: { plugins: [vanillaExtract({ outputCss: false })] },
      },
    },
    {
      format: "cjs",
      bundle: false,
      source: { entry: { index: SOURCE_FILES } },
      output: { distPath: { root: "./dist/cjs" } },
      dts: { bundle: false },
      tools: {
        rspack: { plugins: [vanillaExtract({ outputCss: false })] },
      },
    },
    {
      format: "esm",
      bundle: true,
      source: { entry: { palette: "./src/styles/palette.css.ts" } },
      output: {
        distPath: { root: "./dist" },
        cleanDistPath: false,
        sourceMap: false,
        overrideBrowserslist: [
          "chrome >= 111",
          "edge >= 111",
          "firefox >= 111",
          "safari >= 16.4",
        ],
      },
      dts: false,
      tools: {
        rspack: {
          plugins: [
            vanillaExtract({ outputCss: true }),
            new rspack.BannerPlugin({
              banner: LAYER_ORDER,
              raw: true,
              test: /\.css$/,
            }),
          ],
        },
      },
    },
  ],
  output: {
    target: "web",
    sourceMap: { js: "source-map" },
  },
  plugins: [pluginStyledComponents()],
})

import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import { pluginStyledComponents } from "@rsbuild/plugin-styled-components"

const require = createRequire(import.meta.url)

/** @type { import('storybook-react-rsbuild').StorybookConfig } */
const config = {
  stories: [
    "./guides/GettingStarted.story.tsx",
    "./guides/Accessibility.story.tsx",
    "./guides/DevelopingForPalette.story.tsx",
    "./guides/HowPaletteWorks.story.tsx",
    "./guides/ResponsiveProps.story.tsx",
    "../src/**/*.story.@(tsx|mdx)",
    "../../palette-charts/src/**/*.story.@(tsx|mdx)",
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],

  framework: {
    name: getAbsolutePath("storybook-react-rsbuild"),
    options: {},
  },

  docs: {
    autodocs: "tag",
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    check: false,
    reactDocgen: "react-docgen",
  },

  rsbuildFinal: (config) => {
    config.plugins = [...(config.plugins || []), pluginStyledComponents()]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@storybook/test": "storybook/test",
      },
    }
    config.dev = {
      ...config.dev,
      lazyCompilation: false,
    }
    return config
  },
}

export default config

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")))
}

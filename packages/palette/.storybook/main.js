import { createRequire } from "node:module"
import { dirname, join } from "node:path"

const require = createRequire(import.meta.url)

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
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
    getAbsolutePath("@storybook/addon-viewport"),
    getAbsolutePath("@storybook/addon-docs"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },

  docs: {
    autodocs: "tag",
  },

  core: {
    disableTelemetry: true,
    builder: {
      name: getAbsolutePath("@storybook/builder-webpack5"),
    },
  },

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },

  babel: (config) => {
    return { ...config, rootMode: "upward" }
  },

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            [
              "@babel/plugin-transform-private-property-in-object",
              { loose: true },
            ],
            ["@babel/plugin-transform-private-methods", { loose: true }],
          ],
        },
      },
    })

    config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx")

    return config
  },
}

export default config

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")))
}

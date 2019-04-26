// @ts-check

const env = require("dotenv")
const path = require("path")
const webpack = require("webpack")

const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin")

// @ts-ignore
const package = require("../package.json")

env.load()

const cacheDirectory = path.resolve(__dirname, "../", ".cache")

const {
  CI,
  NETLIFY,
  WEBPACK_DEVTOOL = "cheap-module-eval-source-map",
} = process.env

const isCI = CI || NETLIFY
const notOnCI = value => (isCI ? [] : [value])

const plugins = [
  new ForkTsCheckerWebpackPlugin({
    formatter: "codeframe",
    formatterOptions: "highlightCode",
    checkSyntacticErrors: true,
    watch: ["./src"],
  }),
  new ForkTsCheckerNotifierWebpackPlugin({
    excludeWarnings: true,
    skipFirstNotification: true,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  // @ts-ignore
  ...notOnCI(new SimpleProgressWebpackPlugin({ format: "compact" })),
]

console.log("\n[Palette] Booting...\n")

/**
 * Booting in full-control mode: https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode-default
 */
module.exports = async ({ config, mode }) => {
  config.mode = mode.toLowerCase()
  config.devtool = WEBPACK_DEVTOOL
  config.devServer = {
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: "errors-only",
  }
  config.resolve = {
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
  }
  config.plugins = [...config.plugins, ...plugins]

  // Filter out default Storybooks progress bar plugin if CI, which is merged in
  // with custom plugins. See: https://github.com/storybooks/storybook/issues/1260#issuecomment-308036626
  if (isCI) {
    config.plugins = config.plugins.filter(plugin => {
      return !(plugin instanceof webpack.ProgressPlugin)
    })
  }

  config.module.rules.push(
    {
      test: /\.graphql$/,
      include: [/data/],
      exclude: [/node_modules/],
      use: [
        {
          loader: "raw-loader",
        },
      ],
    },
    {
      test: /\.tsx?$/,
      include: [/src/],
      exclude: [/node_modules/, new RegExp(package.jest.testRegex)],
      use: [
        {
          loader: "cache-loader",
          options: {
            cacheDirectory: path.join(cacheDirectory),
          },
        },
        {
          loader: "babel-loader",
          options: {
            cacheDirectory: path.join(cacheDirectory, "babel"),
          },
        },
      ],
    },
    // ESM support. See: https://github.com/apollographql/react-apollo/issues/1737#issuecomment-371178602
    {
      type: "javascript/auto",
      test: /\.mjs$/,
      use: [],
    }
  )

  return config
}

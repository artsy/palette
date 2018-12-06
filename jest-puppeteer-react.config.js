const webpack = require("webpack")
const path = require("path")
const buildDevWebpackConfig = require("./packages/core/dev/webpack/dev")

module.exports = {
  generateWebpackConfig: function generateWebpackConfig(
    entryFiles,
    aliasObject
  ) {
    const webpackConfig = buildDevWebpackConfig(
      "test",
      {
        root: __dirname,
        app: "x",
      },
      {
        template: path.join(
          __dirname,
          "./packages/dev-test-lib/screenshot/index.ejs"
        ),
      },
      webpack
    )

    webpackConfig.entry = { test: entryFiles }
    webpackConfig.resolve.alias = aliasObject

    return webpackConfig
  },
  port: 1111,
}

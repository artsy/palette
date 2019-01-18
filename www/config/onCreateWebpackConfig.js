// @ts-check

const path = require("path")
const WebpackNotifierPlugin = require("webpack-notifier")

/**
 * Update default Webpack configuration
 */
module.exports = function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    plugins: [
      new WebpackNotifierPlugin({
        skipFirstNotification: true,
      }),
    ],
    resolve: {
      modules: [path.resolve(__dirname, "../src"), "node_modules"],
    },
  })
}

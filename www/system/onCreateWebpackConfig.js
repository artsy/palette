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
      alias: {
        palette: path.resolve(process.cwd(), "src"),
      },
      modules: [path.resolve(process.cwd(), "src"), "node_modules"],
    },
  })
}

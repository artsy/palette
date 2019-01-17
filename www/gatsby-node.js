/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const WebpackNotifierPlugin = require("webpack-notifier")

/**
 * Update default Webpack configuration
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new WebpackNotifierPlugin({
        skipFirstNotification: true,
      }),
    ],
    resolve: {
      alias: {
        palette: path.resolve(__dirname, "../src"),
      },
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

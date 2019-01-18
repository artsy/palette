// @ts-check

const path = require("path")
const WebpackNotifierPlugin = require("webpack-notifier")
const WebpackShellPlugin = require("webpack-shell-plugin")

/**
 * Update default Webpack configuration
 */
module.exports = function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    plugins: [
      new WebpackNotifierPlugin({
        skipFirstNotification: true,
      }),

      // FIXME: Investigate Apollo error
      // new WebpackShellPlugin({
      //   onBuildEnd: ["yarn emit-graphql-types"],
      // }),
    ],
    resolve: {
      modules: [path.resolve(__dirname, "../src"), "node_modules"],
    },
  })
}

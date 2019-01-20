// @ts-check

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const WebpackNotifierPlugin = require("webpack-notifier")
const WebpackShellPlugin = require("webpack-shell-plugin")
const { createFilePath } = require("gatsby-source-filesystem")
const { toLower } = require("lodash")

/**
 * Intercept and modify the GraphQL schema
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const route = toLower(
      createFilePath({
        node,
        getNode,
        trailingSlash: false,
      })
    )
    createNodeField({
      node,
      name: "route",
      value: route,
    })
  }
}

/**
 * Update default Webpack configuration
 */
exports.onCreateWebpackConfig = ({ actions }) => {
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
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

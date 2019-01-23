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
  if (node.internal.type === "Mdx") {
    const route = toLower(
      createFilePath({
        node,
        getNode,
        trailingSlash: false,
      })
    )

    // Add a new field -- route -- which can be accessed from the schema under
    // fields { route }.
    actions.createNodeField({
      node,
      name: "route",
      value: route,
    })
  }
}

/**
 * Dynamically create pages for all .mdx content.
 *
 * NOTE: Content located in /pages is created automatically but should be limited
 * to static pages like "About" or "Home", etc, and is subject data limitations
 * since query data resolved below cannot be injected in at build time.
 */
exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMdx {
            edges {
              node {
                id
                fields {
                  route
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        // TODO: Figure out why `pages/index.mdx` isn't being created, requiring
        // us to redirect from '/' to `/home`.
        actions.createRedirect({
          fromPath: `/`,
          isPermanent: true,
          redirectInBrowser: true,
          toPath: `/home`,
        })

        result.data.allMdx.edges.forEach(({ node }) => {
          actions.createPage({
            // Encode the route
            path: node.fields.route,
            // Layout for the page
            component: path.resolve("./src/layouts/DefaultLayout.tsx"),
            // Values defined here are injected into the page as props and can
            // be passed to a GraphQL query as arguments
            context: {
              id: node.id,
            },
          })
        })
      })
    )
  })
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

const { createFilePath } = require("gatsby-source-filesystem")
const { toLower } = require("lodash")

/**
 * Intercept and modify the GraphQL schema
 */
module.exports = function onCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const route = toLower(
      createFilePath({
        node,
        getNode,
        trailingSlash: false,
      })
    )

    // Add the node to the gql schema

    createNodeField({
      node,
      name: "route",
      value: route,
    })
  }
}

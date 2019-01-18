// @ts-check

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { graphql } = require("gatsby")

// Modifies the GraphQL schema
exports.onCreateNode = require("./config/onCreateNode")

// Additional Webpack setup
exports.onCreateWebpackConfig = require("./config/onCreateWebpackConfig")

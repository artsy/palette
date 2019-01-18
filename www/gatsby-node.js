// @ts-check

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const onCreateNode = require("./config/onCreateNode")
const onCreateWebpackConfig = require("./config/onCreateWebpackConfig")

// Modifies the GraphQL schema
exports.onCreateNode = onCreateNode

// Additional Webpack setup
exports.onCreateWebpackConfig = onCreateWebpackConfig

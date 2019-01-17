/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const onCreateNode = require("./system/onCreateNode")
const onCreateWebpackConfig = require("./system/onCreateWebpackConfig")

// Modifies the GraphQL schema
exports.onCreateNode = onCreateNode

// Additional Webpack setup
exports.onCreateWebpackConfig = onCreateWebpackConfig

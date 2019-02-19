// @ts-check

const playgroundHastPlugin = require("./src/utils/playgroundHastPlugin")
const copyChangelog = require("./src/utils/copyChangelog")

// FIXME: Figure out a better way to do this
// copyChangelog()

module.exports = {
  siteMetadata: {
    title: "Palette",
    description: "Artsy's design system",
    author: "Artsy",
    changelog: {},
  },
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"],

        // Default layouts are meta wrappers around .mdx pages. Can be useful to
        // share queries across different types of pages.
        defaultLayouts: {
          default: require.resolve("./src/layouts/DefaultLayout.tsx"),
        },

        // MDX AST transformers
        hastPlugins: [playgroundHastPlugin],

        // Imports here are available globally to .mdx files, with the exception
        // of automatically created pages located in /pages. This is a bug in
        // gatsby-mdx. See https://github.com/ChristopherBiscardi/gatsby-mdx/issues/243
        globalScope: `
          import * as Elements from "@artsy/palette"
          import { CodeEditor, Playground  } from "components/Playground"
          import { Toggle as Toggler } from 'react-powerplug'
          export default {
            CodeEditor,
            Playground,
            Toggler,
            ...Elements
          }
        `,
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.jsx`,
        enableIdentityWidget: false, // default: true
        publicPath: "admin",
        htmlTitle: "Palette | Admin",
        manualInit: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "design-system",
        path: `${__dirname}/content/docs/`,
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-force-trailing-slashes",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
  ],
}

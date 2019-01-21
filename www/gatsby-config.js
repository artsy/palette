// @ts-check

const playgroundHastPlugin = require("./src/app/utils/playgroundHastPlugin")

module.exports = {
  siteMetadata: {
    title: "Palette",
    description: "Artsy's design system",
    author: "Artsy",
  },
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"],

        // Default layouts are meta wrappers around .mdx pages. Can be useful to
        // share queries across different types of pages.
        defaultLayouts: {
          default: require.resolve("./src/app/layouts/DocsLayout.tsx"),
        },

        // MDX AST transformers
        hastPlugins: [playgroundHastPlugin],

        // Imports here are available globally to .mdx files, with the exception
        // of automatically created pages located in /pages. This is a bug in
        // gatsby-mdx. See https://github.com/ChristopherBiscardi/gatsby-mdx/issues/243
        globalScope: `
          import * as Elements from "@artsy/palette/dist/elements"
          import { CodeEditor, Playground  } from "app/components/Playground"
          export default {
            CodeEditor,
            Playground,
            ...Elements
          }
        `,

        // mdPlugins: [],
        // gatsbyRemarkPlugins: [{}],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "app",
        path: `${__dirname}/src/app/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "design-system",
        path: `${__dirname}/src/docs/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
  ],
}

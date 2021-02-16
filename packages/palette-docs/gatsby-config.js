// @ts-check

const playgroundHastPlugin = require("./src/utils/playgroundHastPlugin")

// FIXME: Figure out a better way to do this
// const copyChangelog = require("./src/utils/copyChangelog")
// copyChangelog()

module.exports = {
  siteMetadata: {
    title: "Palette",
    description: "Artsy's design system",
    author: "Artsy",
    changelog: {},
    siteUrl: "https://palette.artsy.net",
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
          import { ColorComponent } from "components/ColorComponent"
          import { Table } from "components/Table"
          import { TextSpecification } from "components/TextSpecification"
          import { CodeEditor, Playground  } from "components/Playground"
          import { Toggle as Toggler, State } from 'react-powerplug'
          export default {
            CodeEditor,
            ColorComponent,
            Playground,
            Toggler,
            State,
            Table,
            TextSpecification,
            ...Elements
          }
        `,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "artsy-palette",
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
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-local-algolia-docsearch",
      options: {
        apiKey: "e4ea4437446d07b0549e0db7928d92d1",
        indexName: "artsy_palette",
        debug: false,
      },
    },
  ],
}

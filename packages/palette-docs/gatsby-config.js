const playgroundHastPlugin = require("./src/utils/playgroundHastPlugin")

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
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve("./src/layouts/MainLayout.tsx"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `header-link-icon`,
            },
          },
        ],

        // MDX AST transformers
        rehypePlugins: [playgroundHastPlugin],

        /**
         * NOTE:
         *
         * The below `globalScope` prop has been deprecated in
         * `gatsby-plugin-mdx` but is still required, seemingly. Otherwise we get
         * --- ReferenceError: <SomeComponentName> not found.
         * in the playground code area. For now, adding gatsby-plugin-mdx to
         * package.json resolutions.
         *
         * See: https://github.com/ChristopherBiscardi/gatsby-mdx/issues/239
         *
         * Imports here are available globally to .mdx files, with the exception
         * of automatically created pages located in /pages. This is a bug in
         * gatsby-mdx.
         *
         * See https://github.com/ChristopherBiscardi/gatsby-mdx/issues/243
         */
        globalScope: `
          import * as Elements from "@artsy/palette"
          import { ColorComponent } from "components/ColorComponent"
          import { Table } from "components/Table"
          import { CodeEditor, Playground  } from "components/CodeEditor"
          import { Toggle as Toggler, State } from 'react-powerplug'
          export default {
            CodeEditor,
            ColorComponent,
            Playground,
            Toggler,
            State,
            Table,
            ...Elements,
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
        name: "docs",
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

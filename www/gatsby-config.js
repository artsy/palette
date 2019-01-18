// @ts-check

module.exports = {
  siteMetadata: {
    title: "Palette",
    description: "Artsy's design system",
    author: "Artsy",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/components/`,
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-mdx",
      options: {
        defaultLayouts: {
          posts: require.resolve("./src/components/Layout.tsx"),
          default: require.resolve("./src/components/Layout.tsx"),
        },
      },
    },
  ],
}

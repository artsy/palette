# Palette Docs

https://palette.artsy.net

Palette is built on top of [Gatsby](https://www.gatsbyjs.org/).

### Development

```sh
yarn start

open http://localhost:8000
open http://localhost:8000/___graphql
open http://localhost:8000/admin
```

### Deployment

Merges to master are automatically deployed to https://palette.artsy.net.

### Docs Architecture

**TODO:**:

- Document Playground
- Document hastePlugin
- Document NetlifyCMS

<details>
  <summary>Gatsby API Details</summary>

1.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage
    of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/)
    (if any). These allow customization/extension of default Gatsby settings
    affecting the browser.
1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby
    site. This is where you can specify information about your site (metadata)
    like the site title and description, which Gatsby plugins you’d like to
    include, etc. (Check out the
    [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more
    detail).
1.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of
    the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any).
    These allow customization/extension of default Gatsby settings affecting
    pieces of the site build process.
1.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of
    the
    [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/)
    (if any). These allow customization of default Gatsby settings affecting
    server-side rendering.

</details>

### Docs Search

Search within the Palette docs is implemented with [Algolia DocSearch](https://docsearch.algolia.com/). How? 

1. The Palette docs are decorated with markers for Algolia's crawler. (See [here](https://github.com/artsy/palette/blob/5928d6ef3baeb9cfab4cdecb5fa496a5393b1d35/packages/palette-docs/src/layouts/MainLayout.tsx#L35-L36), [here](https://github.com/artsy/palette/blob/5928d6ef3baeb9cfab4cdecb5fa496a5393b1d35/packages/palette-docs/src/layouts/MainLayout.tsx#L51), and [here](https://github.com/artsy/palette/blob/5928d6ef3baeb9cfab4cdecb5fa496a5393b1d35/packages/palette-docs/src/layouts/MainLayout.tsx#L63).)
2. The Palette docs site is configured to be crawled by Algolia in [their `algolia/docsearch-configs` project](https://github.com/algolia/docsearch-configs/blob/master/configs/artsy_palette.json).
3. The [search box](https://github.com/artsy/palette/blob/5928d6ef3baeb9cfab4cdecb5fa496a5393b1d35/packages/palette-docs/src/components/Sidebar/SearchBox.tsx#L13) on the docs site sends search text through Algolia's JavaScript, to hit the index built by crawling the Palette docs. See [this implementation PR](https://github.com/artsy/palette/pull/642).
4. The search results are styled by [overriding Algolia's default styles](https://github.com/artsy/palette/blob/5928d6ef3baeb9cfab4cdecb5fa496a5393b1d35/packages/palette-docs/src/components/Sidebar/algolia.css#L15). 
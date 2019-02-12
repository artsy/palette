# @artsy/palette [![CircleCI](https://circleci.com/gh/artsy/palette.svg?style=shield)](https://circleci.com/gh/artsy/palette) [![npm version](https://badge.fury.io/js/%40artsy%2Fpalette.svg)](https://www.npmjs.com/package/@artsy/palette) [![Netlify Status](https://api.netlify.com/api/v1/badges/beb9e8d7-10cc-4a2e-99bb-0d4c6f46db82/deploy-status)](https://app.netlify.com/sites/artsy-palette/deploys)

Artsy's Design System

## Meta

- Point People: @damassi, @zephraph, @l2succes

## What is Palette?

Palette is a collection of primitive, product-agnostic elements that help encapsulate Artsy's look and feel at base level. This project is intended to be used
across our digital product portfoilo.

Palette is built on top of [Gatsby](https://www.gatsbyjs.org/).

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

## Does my component belong in Palette?

If the component applies to Artsy as a brand and can/will be used across multiple digital products, then Palette is a great place for it. If it's highly product
specific then it's best to leave the component where it's used. We can always move things later!

If the above guidance still doesn't give you a good sense of what to do, please join the bi-weekly design systems sync.

## How to contribute

If you'd like to add a new component to Palette please create an issue using the component spec template. That'll give both design and engineering a chance
to peek at the proposal and provide feedback before moving forward.

## Local development

        $ cd www && yarn install
        $ cd .. && yarn docs
        $ open http://localhost:8000/

To develop systems (such as [reaction](https://github.com/artsy/reaction)) using your local copy of palette, run:

        $ yarn link
        $ yarn watch

Then `cd` to the appropriate directory and run:

        $ yarn link @artsy/palette
        $ yarn start

To use the Netlify file system, visit http://localhost:8000/admin

To run GraphQL queries, visit open http://localhost:8000/___graphql

## Deployment process

### Commits and Deployments

Palette uses [auto-release](https://github.com/intuit/auto-release#readme) to automatically release on every PR. Every PR should have a label that matches one of the following

- Version: Trivial
- Version: Patch
- Version: Minor
- Version: Major

Major, minor, and patch will cause a new release to be generated. Use major for breaking changes, minor for new non-breaking features,
and patch for bug fixes. Trivial will not cause a release and should be used when updating documentation or non-project code.

If you don't want to release on a particular PR but the changes aren't trivial then use the `Skip Release` tag along side the appropriate version tag.

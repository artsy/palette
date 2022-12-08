# Artsy's Design System 

### Storybook 
[https://palette-storybook.artsy.net](https://palette-storybook.artsy.net) 
The latest design system and components are available here 🙌🏻 We have a new repo for icons and prefer to use that one ⬇️ 
Icons will be removed from palette-storybook.artsy.net eventually

### Icons 
[https://icons.artsy.net](https://icons.artsy.net) use this for icons

### Other links
- Docs [https://palette.artsy.net](https://palette.artsy.net) To be depracated. It contains out of date Design System and Components. Docs will eventually move to the palette-storybook.artsy.net
- Docs Github Repo: [https://github.com/artsy/palette-docs](https://github.com/artsy/palette-docs)

## Meta 
- **@artsy/palette**

- [![CircleCI](https://circleci.com/gh/artsy/palette.svg?style=shield)](https://circleci.com/gh/artsy/palette) [![npm version](https://badge.fury.io/js/%40artsy%2Fpalette.svg)](https://www.npmjs.com/package/@artsy/palette) [![Netlify Status](https://api.netlify.com/api/v1/badges/beb9e8d7-10cc-4a2e-99bb-0d4c6f46db82/deploy-status)](https://app.netlify.com/sites/artsy-palette/deploys)

- Point People: [@dzucconi](https://github.com/dzucconi), [@damassi](https://github.com/damassi)

## What is Palette?

Palette is a collection of primitive, product-agnostic elements that help encapsulate Artsy's look and feel at base level. This project is intended to be used across our digital product portfolio.

## Does my component belong in Palette?

If the component applies to Artsy as a brand and can/will be used across multiple digital products, then Palette is a great place for it. If it's highly product specific then it's best to leave the component where it's used. We can always move things later.

## How to contribute

If you'd like to add a new component to Palette please create an issue using the component spec template [- link?]. 
That'll give both design and engineering a chance to peek at the proposal and provide feedback before moving forward.

## Local development

In the project root run the following:

```sh
$ lerna bootstrap
$ yarn storybook
```

This will compile Palette and boot Storybooks, our default development environment.

Other relevant commands are:

```sh
$ yarn test
$ yarn type-check
```

For more info, check out our [development guide in the docs](https://palette.artsy.net/guides/development/).

## Deployment process

### Commits and Deployments

Palette uses [auto-release](https://github.com/intuit/auto-release#readme) to automatically release on every PR. Every PR should have a label that matches one of the following

- Version: Trivial
- Version: Patch
- Version: Minor
- Version: Major
- Canary

Major, minor, and patch will cause a new release to be generated. Use major for breaking changes, minor for new non-breaking features,
and patch for bug fixes. Trivial will not cause a release and should be used when updating documentation or non-project code.

If you don't want to release on a particular PR but the changes aren't trivial then use the `Skip Release` tag along side the appropriate version tag.

`Canary` tags will publish a canary version to NPM which can be used to test work in progress. See [the CircleCI job](https://app.circleci.com/pipelines/github/artsy/palette/4138/workflows/ffc56588-35bf-41ed-a0a8-a806fc807678/jobs/20148) for the exact version published and update your consuming app accordingly.

## Repos consuming Palette

- [Force](https://github.com/artsy/force)
- [Volt-V2](https://github.com/artsy/volt-v2)
- [Volt](https://github.com/artsy/volt)
- [Prediction](https://github.com/artsy/prediction)
- [Positron](https://github.com/artsy/positron)
- [Forque](https://github.com/artsy/forque)

## About Artsy

<a href="https://www.artsy.net/">
  <img align="left" src="https://avatars2.githubusercontent.com/u/546231?s=200&v=4"/>
</a>

This project is the work of designers and engineers at [Artsy][footer_website], the
world's leading and largest online art marketplace and platform for discovering art.
One of our core [Engineering Principles][footer_principles] is being [Open
Source by Default][footer_open] which means we strive to share as many details
of our work as possible.

You can learn more about this work from [our blog][footer_blog] and by following
[@ArtsyOpenSource][footer_twitter] or explore our public data by checking out
[our API][footer_api]. If you're interested in a career at Artsy, read through
our [job postings][footer_jobs]!

[footer_website]: https://www.artsy.net/
[footer_principles]: culture/engineering-principles.md
[footer_open]: culture/engineering-principles.md#open-source-by-default
[footer_blog]: https://artsy.github.io/
[footer_twitter]: https://twitter.com/ArtsyOpenSource
[footer_api]: https://developers.artsy.net/
[footer_jobs]: https://www.artsy.net/jobs

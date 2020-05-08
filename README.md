# @artsy/palette [![CircleCI](https://circleci.com/gh/artsy/palette.svg?style=shield)](https://circleci.com/gh/artsy/palette) [![npm version](https://badge.fury.io/js/%40artsy%2Fpalette.svg)](https://www.npmjs.com/package/@artsy/palette) [![Netlify Status](https://api.netlify.com/api/v1/badges/beb9e8d7-10cc-4a2e-99bb-0d4c6f46db82/deploy-status)](https://app.netlify.com/sites/artsy-palette/deploys)

Artsy's Design System

## Meta

- Point People: [@damassi](https://github.com/damassi), [@zephraph](https://github.com/zephraph)

## What is Palette?

Palette is a collection of primitive, product-agnostic elements that help encapsulate Artsy's look and feel at base level. This project is intended to be used
across our digital product portfolio.

## Does my component belong in Palette?

If the component applies to Artsy as a brand and can/will be used across multiple digital products, then Palette is a great place for it. If it's highly product
specific then it's best to leave the component where it's used. We can always move things later!

If the above guidance still doesn't give you a good sense of what to do, please join the bi-weekly design systems sync.

## How to contribute

If you'd like to add a new component to Palette please create an issue using the component spec template. That'll give both design and engineering a chance
to peek at the proposal and provide feedback before moving forward.

## Local development

In the project root run the following:

```
$ yarn start
$ open http://localhost:8000/
```

## Link with Eigen

When developing components for [our iOS codebase](https://github.com/artsy/eigen), boot the Simulator and from the Palette project root run:

```
$ yarn workspace @artsy/palette watch:eigen
```

Since React Native doesn't support symlinks, this will copy changes directly to the Eigen folder and hot-reload the app.

## Linking and Unlinking with Reaction

To _link_ your local palette with your local reaction, run:

```
$ yarn workspace @artsy/palette link && yarn workspace @artsy/palette watch
(wait until you see a message that X files have been successfully compiled before moving on)

$ cd ../reaction && yarn link @artsy/palette && yarn start

To _unlink_ your local palette from your local reaction, run (in **Reaction**):

$ yarn unlink @artsy/palette
$ yarn add @artsy/palette
$ yarn start

```

### ⚠️ Don't Forget About iOS!

When adding a new component to Palette, it's important to be aware that this library is used on the web as well as in React Native, via Eigen, and therefore must follow a few rules in terms of structure, namely:

> If a mobile component has platform-specific features, that code has to live in a `Component.ios.tsx` file. Or if a web component has browser-only features, then a `Component.ios.tsx` file must be created, or React Native will error out. If the code between a web and native component is identical, a `.ios.tx` file isn’t needed. If some code can be shared between platforms, then that shared code should live in a `Component.shared.tsx` file.

Example:

```
/elements
  /MyComponent
    index.tsx
    MyComponent.tsx
    MyComponent.ios.tsx
```

And from within `/elements/index.tsx`, we export our component:

```tsx
export * from "./MyComponent";
```

When React Native imports `@artsy/palette`, it will automatically look for files with a `.ios` extension and import those first, and then secondarily import everything else. If a component contains web-only features but doesn't have a corresponding iOS file stub, React Native tooling will error out.

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

## Zeplin Plugin

Artsy uses [Zeplin](https://app.zeplin.io/) and we have developed [a plugin](https://github.com/artsy/palette-zeplin-extension) that you can install to get Palette component JSX copied directly from Zeplin mocks.

## Repos consuming Palette

- [Force](https://github.com/artsy/force)
- [Reaction](https://github.com/artsy/reaction)
- [Volt](https://github.com/artsy/volt)
- [Prediction](https://github.com/artsy/prediction)
- [Positron](https://github.com/artsy/positron)

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

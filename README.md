# @artsy/palette [![CircleCI](https://circleci.com/gh/artsy/palette.svg?style=shield)](https://circleci.com/gh/artsy/palette) [![npm version](https://badge.fury.io/js/%40artsy%2Fpalette.svg)](https://www.npmjs.com/package/@artsy/palette)

Artsy's Design System

## What is Palette?

Palette is a collection of primitive, product-agnostic elements that help encapsulate Artsy's look and feel at base level. This project is intended to be used
across our digital product portfoilo.

## Does my component belong in Palette?

If the component applies to Artsy as a brand and can/will be used across multiple digital products, then Palette is a great place for it. If it's highly product
specific then it's best to leave the component where it's used. We can always move things later!

If the above guidance still doesn't give you a good sense of what to do, please join the bi-weekly design systems sync.

## How to contribute

If you'd like to add a new component to Palette please create an issue using the component spec template. That'll give both design and engineering a chance
to peek at the proposal and provide feedback before moving forward.

## Local development

        $ yarn docs
        $ open http://localhost:3000/

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

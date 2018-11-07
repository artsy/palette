# @artsy/palette

[![CircleCI](https://circleci.com/gh/artsy/palette.svg?style=shield)](https://circleci.com/gh/artsy/palette)
[![npm version](https://badge.fury.io/js/%40artsy%2Fpalette.svg)](https://www.npmjs.com/package/@artsy/palette)

Artsy's Design System

## Commits and Deployments

Circle CI is set up to publish releases to NPM automatically via [semantic-release](https://github.com/semantic-release/semantic-release) following every successful merge to master.

Release versions (major, minor, patch) are triggered [by commit messages](https://github.com/semantic-release/semantic-release#commit-message-format), when they adhere to [Ember conventions](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-ember/README.md):

```
[TAG context] commit message
```

[Valid tags](https://github.com/artsy/palette/blob/master/package.json#L10) for release include PATCH, DOC, FIX (patch), FEATURE (minor), and BREAKING (major). A context is also required. Commits that do not adhere to this convention will not trigger an NPM release.

##### Example Patch Release

```
[FIX typeface] Add missing unit
[PATCH tooling] Bump version
```

##### Example Minor (Feature) Release

```
[FEATURE ios] Add View primitive
```

##### Example Major (Breaking) Release

```
[BREAKING refactor] Update API to support new platform
```

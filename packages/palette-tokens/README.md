# `palette-tokens`

The [design tokens](https://www.lightningdesignsystem.com/design-tokens/) that power [Artsy](https://www.artsy.net)'s [Palette](https://palette.artsy.net).

:warning: This package isn't intended to be consumed directly, but rather included as a transitive dependency of palette. :warning:

## Usage

In the main theme file for a Palette implementation:

```
import tokens from "@artsy/palette-tokens"
import { fontFamily } from "./platform/fonts"

/**
 * This is required only in consuming versions of palette to keep
 * the existing api the same. If you're using the tokens as a standalone
 * you may not necessarily need to include this export statement.
 */
export * from "@artsy/palette-tokens";

/**
 * Any platform specific tokens can be included in the final `themeConfig` as
 * shown.
 */
export const themeConfig = {
  ...tokens,
  fontFamily
}
```

## License

MIT License. See [LICENSE](../../LICENSE).

## About Artsy

<a href="https://www.artsy.net/">
  <img align="left" src="https://avatars2.githubusercontent.com/u/546231?s=200&v=4"/>
</a>

This project is the work of engineers at [Artsy][footer_website], the world's
leading and largest online art marketplace and platform for discovering art.
One of our core [Engineering Principles][footer_principles] is being [Open
Source by Default][footer_open] which means we strive to share as many details
of our work as possible.

You can learn more about this work from [our blog][footer_blog] and by following
[@ArtsyOpenSource][footer_twitter] or explore our public data by checking out
[our API][footer_api]. If you're interested in a career at Artsy, read through
our [job postings][footer_jobs]!

[footer_website]: https://www.artsy.net/
[footer_principles]: https://github.com/artsy/README/blob/master/culture/engineering-principles.md
[footer_open]: https://github.com/artsy/README/blob/master/culture/engineering-principles.md#open-source-by-default
[footer_blog]: https://artsy.github.io/
[footer_twitter]: https://twitter.com/ArtsyOpenSource
[footer_api]: https://developers.artsy.net/
[footer_jobs]: https://www.artsy.net/jobs

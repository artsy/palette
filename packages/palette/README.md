# @artsy/palette

Artsy's Design System

## What is Palette?

Palette is a collection of primitive, product-agnostic elements that help encapsulate Artsy's look and feel at base level. This project is intended to be used across our digital product portfolio.

Find out more at [github.com/artsy/palette](https://github.com/artsy/palette).

## Setup: palette.css

Palette ships its styles as one stylesheet, `@artsy/palette/palette.css`. Components that have moved off styled-components (`Spacer` and `Separator` so far) render with class names from this file. Without it, they have no styles.

Import it once, at your app entry:

```ts
import "@artsy/palette/palette.css"
```

The root `<Theme>` sets `data-palette-theme="light|dark"` on `<html>` and keeps it in sync on the client. Palette reads that attribute to pick the colour variables, so portaled content (modals, toasts) follows the theme.

### Server rendering

An app that renders on the server must do two things, or the first paint has no Palette styles and the wrong theme:

1. Emit a `<link rel="stylesheet">` for `palette.css` in `<head>`.
2. Set `data-palette-theme` on `<html>`. `getPaletteThemeAttributes` returns the attribute:

```tsx
import { getPaletteThemeAttributes } from "@artsy/palette"

<html {...getPaletteThemeAttributes("light")}>
```

Setup by framework:

- **Next.js.** Import `@artsy/palette/palette.css` in the root layout. Next emits the `<link>`. Spread `getPaletteThemeAttributes` on `<html>` in the same file.
- **Shakapacker.** Import the stylesheet in your pack, and add `stylesheet_pack_tag` to the layout `<head>`.
- **Custom SSR (Force).** Import the stylesheet in the client entry so the bundler puts it in the manifest. In the server template, read the stylesheet's URL from the manifest and write the `<link>` yourself.

### Cascade layers

Every rule in `palette.css` sits in a cascade layer (`palette.reset`, `palette.components`, `palette.utilities.*`). Unlayered CSS beats layered CSS, so your styled-components overrides, which are unlayered, still win over Palette. `styled(Spacer)` and `styled(Separator)` keep working.

### Nested themes

A `<Theme>` inside another `<Theme>` with the same value renders no extra element. A nested `<Theme>` with a different value renders a `<div style="display: contents">` with its own `data-palette-theme`.

If a nested `<Theme>` changes between matching and not matching its parent while mounted, React sees a different tree and remounts its children. They lose state. Keep nested themes static.

### Testing with Jest

Jest cannot load a `.css` file. Add one of these to your Jest config:

- A stub for the stylesheet:

  ```json
  { "moduleNameMapper": { "\\.css$": "<rootDir>/test/styleMock.js" } }
  ```

  where `styleMock.js` is `module.exports = {}`.
- Or the vanilla-extract transform (`@vanilla-extract/jest-transform`), if your own code includes `*.css.ts` files.

Palette's own setup file imports `@vanilla-extract/css/disableRuntimeStyles` so that jsdom does not try to parse layered CSS.

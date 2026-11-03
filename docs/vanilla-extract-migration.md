# Palette on vanilla-extract

Status: milestone 1 (foundation) is built and checked in Palette and in Force. Force shows no visual change. The one measured cost is the new render-blocking `palette.css` request on slow mobile networks (see Results).

## Why

Palette's web components use styled-components and styled-system. styled-components is in maintenance mode, and its style collection during server rendering blocks streaming SSR (this came up while evaluating TanStack Start).

The cost shows in Force today. A synthetic benchmark of 2,000 Palette `Box`, `Flex` and `Text` elements took 18.6 ms to render on the server and 33.2 ms to mount in jsdom. A class-per-prop stand-in took 2.2 ms and 11.5 ms. Live pages inline 25 to 52 KB (5 to 9 KB gzipped) of styled-components CSS in every HTML response.

The plan: move Palette to vanilla-extract, in steps, without changing the public API. Force keeps its own styled-components code.

## Architecture

Palette compiles `*.css.ts` files into one `dist/palette.css`. Every rule sits inside `@layer palette.*`. The JS modules export class names only and never import CSS.

A resolver turns styled-system-style props into class names. Scale values (space keys, color names) map to prebuilt utility classes, kept in plain class-name maps (no Sprinkles runtime). Any other value (`"31px"`, negative numbers, `"100%"`) sets an inline CSS variable that a prebuilt class reads at the right breakpoint.

Tokens are CSS custom properties: `--color-<name>`, `--space-<key>`, `--effect-<name>`. Dark mode is the `data-palette-theme` attribute on `<html>`, so portaled content (modals, toasts) follows the theme.

The release is a major version, because consumers must import the CSS. Setup steps are in the package README.

Force imports `@artsy/palette/palette.css` once and links it in the SSR `<head>`. styled-components keeps running next to it. Its rules are unlayered, so they still beat every layered Palette rule, and Force's `styled(Box)` wrappers keep winning.

Before and after, for `<Spacer y={2}/>`:

```
Before: Palette Box (styled.div) -> styled-system builds a CSS object
        -> styled-components hashes it and injects a <style> rule
        SSR collects the rules into an inline <style data-styled> block.
After:  resolveStyleProps -> <div class="mt_2">
        No CSS work at runtime. The rule lives in palette.css.
```

## Milestones

1. **Foundation.** The CSS pipeline, tokens as CSS variables, the style-prop resolver, `Spacer` and `Separator`. No visible change expected, and a small speed gain.
2. **Text.**
3. **Box and Flex.** Most of the speed gain arrives here.
4. **The rest of Palette.**

Each milestone is measured with the harness below, on a quiet machine, before and after.

## Results

How to read the tables: `delta` is after minus before. A change smaller than the noise floor is reported as "no measurable change". The noise floor is the spread between two runs of the same build (A/A), measured on a quiet machine, with the same run counts as the real comparison.

Times are in ms, sizes in bytes. Medians unless the metric says otherwise.

### Milestone 1: Foundation (Spacer, Separator)

Measured on 2026-11-03, in Palette and in Force. Force before: `da34c37f5d` with published `@artsy/palette` 46.11.0. Force after: `13c93d02a9` with a local build of this branch at `2890bd59`. Both are production builds served side by side on one machine.

**Visual check.** The Storybook stories for `Spacer` and `Separator` (16 stories at 1440x900, 1024x768 and 375x800, 48 screenshots) were shot before and after the port and compared with pixelmatch at threshold 0. Result: 0 differing pixels in all 48.

**Parity with styled-system.** The resolver is tested against styled-system itself.

- 72 prop sets must pick the same winning declaration as styled-system at every breakpoint.
- 6 prop sets are known to differ (`KNOWN_DIFFERENCES` in `cascade.test.ts`). Each test asserts that the difference still exists:
  - `{ borderWidth: 2, borderTop: "1px solid" }`: a later `border-<side>` resets one side of an earlier `border-width`.
  - `{ borderColor: "mono10", borderBottom: "1px solid" }`: a later `border-<side>` resets one side of an earlier `border-color`.
  - `{ border: "1px solid", borderColor: "mono10", borderTop: "none" }`: a later `border-<side>` resets one side of an earlier `border-color`.
  - `{ mt: { _: 2 }, m: 1 }`: an object value makes styled-system sort keys alphabetically.
  - `{ px: 2, p: 1, opacity: { _: 1 } }`: same reason.
  - `{ borderTop: "1px solid", borderColor: "mono10", opacity: { _: 1 } }`: same reason.

**Stylesheet and class maps.**

| metric | before | after | delta |
| --- | --- | --- | --- |
| `dist/palette.css`, raw | 3,644 B | 43,590 B | +39,946 B |
| `dist/palette.css`, gzip -6 | 963 B | 4,885 B | +3,922 B |
| Classes in `palette.css` | not counted | 574 | |
| Class-map JS (`dynamic.css.js` and `sprinkles.css.js`, ESM), raw | none | 22,257 B | |
| Class-map JS, gzip -6 (each file gzipped alone) | none | 2,863 B | |

"Before" is the stylesheet with tokens and layers only, before the resolver existed. It has no utility classes, so it is a floor, not a styled-components baseline. Every Force page already inlines 5 to 9 KB of gzipped styled-components CSS (see Why).

Classes per layer: `palette.utilities.base` 177, `palette.utilities.xs`, `.sm`, `.md` and `.lg` 99 each (396 together), `palette.components` 1 (Separator), `palette.reset` 0 (it holds the light and dark token variables). Utility classes: 573 in all.

**Force and speed.** The full report (side-by-side screenshots, per-route tables, Lighthouse JSON) is a folder of HTML pages in the Force worktree: `.superpowers/sdd/2026-11-03-palette-vanilla-extract-foundation/artifacts/report/index.html` (in `/Users/mounirdhahri/work/force/.claude/worktrees/palette-css-foundation`).

Page-load rows come from 6 routes (home, artist, artwork, article, search, collect) x 15 runs, with a third label, `before-2`, on the before build as the A/A. Their noise floor is the A/A gap of the 15-run medians. A second, wider estimate is the worst A/A gap inside one 5-run chunk, shown as "chunk". Server rows cover all 12 routes x 30 requests. Ranges run over routes.

| metric | before | after | delta | noise floor |
| --- | --- | --- | --- | --- |
| Force page-level screens (computed styles, screenshots) | 72 captures: 12 routes x 3 widths x 2 themes, captured at the same time as after | 0 fail, 1 warn | No computed-style difference and no unmatched element. The warn (artist, 1440 px, dark, 10.3% of pixels) is a Related Categories block that the before build also shows in some loads and not others. | Same-day A/A on the before build: 1 fail (one `pointer-events` value), 2 pixel warns (9.7%, 13.8%), all on artist |
| Server render, median and p90 per route (`render`) | median 20.9 to 52.3 ms, p90 22.4 to 54.5 ms | median 20.5 to 53.3 ms, p90 22.2 to 56.6 ms | median -0.4 to +1.2 ms (mean +0.3 ms, about 1%), p90 -0.8 to +2.1 ms | median 0.0 to 0.6 ms (mean 0.1 ms), p90 0.2 to 2.1 ms |
| Server total, median per route (`total`) | 178.9 to 474.1 ms | 181.3 to 470.3 ms | -3.8 to +6.0 ms: no measurable change | 0.3 to 66.7 ms |
| FCP, median per route (local Chromium, CPU 4x, no network throttle) | 312 to 680 ms | 336 to 720 ms | -8 to +40 ms | 15-run 0 to 12 ms, chunk 12 to 676 ms: no measurable change against chunk noise; the sign flips between chunks |
| LCP, median per route | 312 to 680 ms | 336 to 720 ms | -36 to +80 ms | 15-run 0 to 40 ms, chunk 40 to 676 ms: no measurable change |
| TBT, median per route | 280 to 833 ms | 272 to 833 ms | -21 (artist) to +13 (article) ms; other routes within 8 ms | 15-run 0 to 5 ms, chunk 3 to 20 ms |
| AppReady, median per route | 1,082 to 1,638 ms | 1,091 to 1,725 ms | -10 to +87 ms | 15-run 1 to 41 ms, chunk 8 to 231 ms: no measurable change except collect (+9 vs 8 ms) |
| Lighthouse 12 mobile (default, simulated 4G), FCP median per route | 4,947 to 5,280 ms | 5,089 to 5,428 ms | +142 to +152 ms on all 5 routes (home, artist, artwork, search, collect) | before min-max spread 17 to 263 ms: slower on 3 routes, inside the spread on 2 |
| Lighthouse 12 mobile (default), performance score | 49 to 58 | 48 to 59 | -8 (artist) to +1; artist is bimodal in the simulator (3 of 5 runs), not seen with real throttling | 1 to 8 points |
| Lighthouse 12 mobile with devtools (real) throttling, FCP | 785 to 840 ms | 1,450 to 1,515 ms | +628 to +729 ms: FCP waits for `palette.css`, which downloads next to about 700 KB of JS on the throttled link | 8 to 278 ms |
| Lighthouse 12 desktop, score and FCP | score 90 to 92, FCP 963 to 1,093 ms | score 90 to 91, FCP 1,004 to 1,089 ms | score -1 to 0, FCP -3 to +42 ms: no measurable change | score 1 to 3, FCP 19 to 759 ms |
| CSS rules at AppReady | 528 to 899 | 1,116 to 1,487 | +588 on every route (the rules of `palette.css`) | 0 |
| HTML, CSS and JS bytes (transferred, per load) | CSS 0; HTML 32,748 to 96,543 | CSS 4,472; HTML 32,676 to 96,490 | CSS +4,472; HTML -1 to -199 (fewer inlined styled-components rules); JS +43 | 0 to 3 bytes (article JS varies with a lazy chunk) |
| Initial JS and CSS, gzipped (`dist/manifest.json`, entry `index`, gzip -9) | JS 706,253 B, CSS 0 B | JS 706,294 B, CSS 4,422 B (`palette.css`, 31,200 B raw after Force's minifier) | JS +41 B, CSS +4,422 B | exact |
| render-bench, Spacer-heavy tree, SSR and jsdom mount | SSR 11.3 ms, mount 27.0 ms | SSR 11.0 ms, mount 24.9 ms | SSR -0.3 ms (no measurable change), mount -2.1 ms (faster) | SSR 0.5 ms, mount 0.4 ms (before run twice) |
| render-bench, Separator-heavy tree, SSR and jsdom mount | SSR 13.1 ms, mount 28.8 ms | SSR 11.7 ms, mount 27.5 ms | SSR -1.4 ms, mount -1.3 ms (both faster) | SSR 0.3 ms, mount 0.8 ms |

The Lighthouse render-blocking and unused-CSS audits report nothing on either build. Lighthouse leaves out files whose estimated saving is under 50 ms or 10 KB, and `palette.css` is 4.4 KB. The FCP rows show the cost directly. Ways to remove it (inline the CSS in the SSR `<head>`, or rely on the 103 Early Hints that already list it in production) are follow-ups and were not measured here.

### Known limitations and follow-ups

1. **The global reset is unlayered.** `injectGlobalStyles` writes `h1`-`h6`, `ol`, `ul`, `dl` and `a` resets outside any layer. Unlayered rules beat layered ones, so `<Text as="h1" mt={2}>` or `<Flex as="ul" p={2}>` would lose its utility class. `Spacer` and `Separator` render `div` and `hr`, so they are not affected. Move the reset into `@layer palette.reset` before porting `Text`, `Link`, `Box` or `Flex`.
2. **Top-level `@keyframes` have no policy.** A top-level `@keyframes` rule sits outside the layers, and the build test that requires every rule to sit in a layer fails on it. Decide how to handle them before any animated component moves.
3. **A nested `Theme` can remount its children.** A nested `Theme` renders no wrapper when it equals its parent, and a `display: contents` div when it differs. If it flips between the two while mounted, its children remount and lose state. Always wrapping would avoid that, but it adds a div under every nested `Theme` and breaks `parent > child` selectors in consumer overrides. Force's nested themes are static.
4. **Colour minification can shift alpha by up to 1/255.** The CSS build minifies colours, so an alpha channel may differ from the token by one 8-bit step.
5. **Known cascade differences.** The six prop sets above resolve differently from styled-system. A scan of Force found none of these prop orders in use.
6. **Consumers need `palette.css`.** Without it, `Spacer` and `Separator` have no styles. A missing stylesheet gives no warning at runtime (a dev-time warning was considered and dropped).

### Milestone 2: Text

| metric | before | after | delta | noise floor |
| --- | --- | --- | --- | --- |
| | | | | |

### Milestone 3: Box and Flex

| metric | before | after | delta | noise floor |
| --- | --- | --- | --- | --- |
| | | | | |

### Milestone 4: The rest of Palette

| metric | before | after | delta | noise floor |
| --- | --- | --- | --- | --- |
| | | | | |

## How to rerun

The harness lives in Force under `playwright/styling-migration/`. Output goes to `tmp/styling-migration/`, which is git-ignored. Do all measuring on a quiet machine: other builds or browsers running at the same time inflate every number.

Build and serve Force with `yarn start:prod` (it builds first, then serves). To run two builds at once, start each in its own worktree on its own port:

```sh
SESSION_LOCAL_INSECURE=true NODE_ENV=production PORT=4000 yarn start   # main, after yarn build
SESSION_LOCAL_INSECURE=true NODE_ENV=production PORT=4001 yarn start   # branch, after yarn build
```

**Screens (computed styles and screenshots).**

```sh
PLAYWRIGHT_BASE_URL=http://localhost:4000 STYLING_LABEL=before npx playwright test -c playwright.styling-migration.config.ts
PLAYWRIGHT_BASE_URL=http://localhost:4001 STYLING_LABEL=after  npx playwright test -c playwright.styling-migration.config.ts
node -r @swc-node/register playwright/styling-migration/compare.ts --a before --b after
```

Run the two captures at the same time with 2 workers each. Captures taken minutes apart differ on live data.

**Browser timings (FCP, LCP, TBT, AppReady, CSS rules, bytes).** Chromium, a fresh context per load, cache off, CPU throttled 4x, one worker. With `PERF_TARGETS`, loads alternate between the two builds, one after the other.

```sh
PERF_TARGETS=before=http://localhost:4000,after=http://localhost:4001 \
  npx playwright test -c playwright.styling-perf.config.ts
```

This writes `tmp/styling-migration/<label>/perf.json`. `PERF_RUNS` (default 15) sets the runs per route and `PERF_ROUTES=home,artist` limits the routes. For one server, use `PERF_LABEL=<label>` and `PLAYWRIGHT_BASE_URL`.

**Server render time.** Reads `Server-Timing` (`render` is `renderToString` plus `getStyleTags()`, `total` is the whole request). Both are only sent with `?serverTiming=true`, which the tool adds. The 404 page has no `render` value because it does not go through the React render.

```sh
node -r @swc-node/register playwright/styling-migration/server-render.ts \
  --a http://localhost:4000 --b http://localhost:4001 --requests 30 --json server-render.json
```

**Component benchmark.** Run it in each checkout, with that checkout's `@artsy/palette` installed.

```sh
NODE_ENV=production node -r @swc-node/register playwright/styling-migration/render-bench.ts
```

**Noise floor.** Point both sides at the same build (two servers from one checkout, or the same URL twice), run the tools above, and read the spread between A and A. Do that with the real run counts, on a quiet machine.

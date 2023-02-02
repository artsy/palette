# v29.2.0 (Thu Feb 02 2023)

#### 🚀  Enhancement

- feat(popover): renders into a portal [#1251](https://github.com/artsy/palette/pull/1251) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(popover): renders into a portal ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v29.1.0 (Wed Jan 25 2023)

#### 🚀  Enhancement

- feat(tooltip/popover): supports offset [#1249](https://github.com/artsy/palette/pull/1249) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(tooltip/popover): supports offset ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v29.0.0 (Thu Jan 19 2023)

#### 💥  Breaking Change

- chore: removes luxon and related components [#1247](https://github.com/artsy/palette/pull/1247) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore: removes luxon and related components ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v28.1.1 (Wed Jan 18 2023)

#### 🐛  Bug Fix

- fix(tooltip): spreads rest props [#1246](https://github.com/artsy/palette/pull/1246) ([@dzucconi](https://github.com/dzucconi))
- fix(tooltip): spreads rest props ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v28.1.0 (Wed Jan 18 2023)

#### 🚀  Enhancement

- feat(tooltip): supports external control [#1245](https://github.com/artsy/palette/pull/1245) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(tooltip): supports external control ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v28.0.0 (Wed Jan 18 2023)

#### 💥  Breaking Change

- feat(popover/tooltip): variants and pointers [#1242](https://github.com/artsy/palette/pull/1242) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(tooltip/popover): adds support for pointers ([@dzucconi](https://github.com/dzucconi))
- feat(popover/tooltip): supports dark color variant ([@dzucconi](https://github.com/dzucconi))
- feat(popover/tooltip): adjusts spacing and props interface ([@dzucconi](https://github.com/dzucconi))
- chore(doc): Attempt to improve Link deprecation message [#1239](https://github.com/artsy/palette/pull/1239) ([@araujobarret](https://github.com/araujobarret))
- Update packages/palette/src/elements/Link/Link.tsx ([@araujobarret](https://github.com/araujobarret))
- chore(doc): Attempt to improve Link deprecation message ([@araujobarret](https://github.com/araujobarret))

#### Authors: 2

- Carlos Alberto de Araujo Barreto ([@araujobarret](https://github.com/araujobarret))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v27.1.0 (Fri Dec 09 2022)

#### 🚀  Enhancement

- fix(modaldialog): addresses long titles; focus-visible close state [#1236](https://github.com/artsy/palette/pull/1236) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(modaldialog): addresses long titles; focus-visible close state ([@dzucconi](https://github.com/dzucconi))
- feat(text): adds support for hyphenation ([@dzucconi](https://github.com/dzucconi))
- docs: updates readme ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- docs: updates readme [#1235](https://github.com/artsy/palette/pull/1235) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v27.0.0 (Fri Dec 02 2022)

### Release Notes

#### feat: Spacer uses `x`/`y` now ([#1232](https://github.com/artsy/palette/pull/1232))

To migrate to this version, replace the following props on`Spacer`:
- `mb`, `mt` with `y`.
- `ml`, `mr` with `x`.
- `my` with `y`. if in a flex context, double the value (`my={1}` becomes `y={2}`).
- `mx` with `x`. if in a flex context,double the value (`mx={1}` becomes `x={2}`).
- `m` with either `x` or `y`, figure out which one you need based on the case. if in a flex context, double the value as well.
- similarly for `p*`.

---

#### 💥  Breaking Change

- feat: Spacer uses `x`/`y` now [#1232](https://github.com/artsy/palette/pull/1232) ([@pvinis](https://github.com/pvinis))

#### 🐛  Bug Fix

- fix(spacer): converts spacer to use x, y api; restricts types ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v26.1.2 (Tue Nov 22 2022)

#### 🐛  Bug Fix

- fix(select): corrects types [#1227](https://github.com/artsy/palette/pull/1227) ([@dzucconi](https://github.com/dzucconi))
- fix(select): corrects types ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v26.1.1 (Thu Nov 17 2022)

#### 🐛  Bug Fix

- fix(modaldialogcontent): fixes width for shorter content [#1225](https://github.com/artsy/palette/pull/1225) ([@dzucconi](https://github.com/dzucconi))
- fix(modaldialogcontent): fixes width for shorter content ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v26.1.0 (Thu Nov 17 2022)

#### 🚀  Enhancement

- feat(modaldialog): adds left/right panel support [#1224](https://github.com/artsy/palette/pull/1224) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(modaldialog): adds support for left/right panels ([@dzucconi](https://github.com/dzucconi))
- fix(modalcontent): ensures shadow covers inputs ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v26.0.1 (Tue Nov 01 2022)

#### 🐛  Bug Fix

- fix(horizontaloverflow): accommodate half pixel differences [#1220](https://github.com/artsy/palette/pull/1220) ([@dzucconi](https://github.com/dzucconi))
- fix(horizontaloverflow): accommodate half pixel differences ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v26.0.0 (Fri Oct 21 2022)

#### 💥  Breaking Change

- fix: updates react-remove-scroll [#1217](https://github.com/artsy/palette/pull/1217) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(modaldialog): fixes animation by waiting for next tick ([@dzucconi](https://github.com/dzucconi))
- chore(deps): bumps react-lazy-image ([@dzucconi](https://github.com/dzucconi))
- chore(deps): bumps react-remove-scroll ([@dzucconi](https://github.com/dzucconi))
- chore(skeleton): sets display name ([@dzucconi](https://github.com/dzucconi))
- chore: bumps storybook version ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore: bumps storybook version [#1215](https://github.com/artsy/palette/pull/1215) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v25.1.0 (Fri Oct 21 2022)

#### 🚀  Enhancement

- feat: add ability to pass `onClose` prop for `Popover` component [#1216](https://github.com/artsy/palette/pull/1216) ([@dimatretyak](https://github.com/dimatretyak))

#### 🐛  Bug Fix

- feat: add ability to onClose prop ([@dimatretyak](https://github.com/dimatretyak))

#### Authors: 1

- Dima Tretyak ([@dimatretyak](https://github.com/dimatretyak))

---

# v25.0.1 (Thu Oct 20 2022)

#### 🐛  Bug Fix

- chore: removes v2 tab [#1214](https://github.com/artsy/palette/pull/1214) ([@dzucconi](https://github.com/dzucconi))
- fix: fixes paths ([@dzucconi](https://github.com/dzucconi))
- chore(storybook): removes v2 tab ([@dzucconi](https://github.com/dzucconi))
- chore: removes platform files ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v25.0.0 (Thu Oct 20 2022)

#### 💥  Breaking Change

- fix: removes typography components [#1213](https://github.com/artsy/palette/pull/1213) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(breaking): removes sans/serif components ([@dzucconi](https://github.com/dzucconi))
- fix(radiogroup): removes deprecated typography components ([@dzucconi](https://github.com/dzucconi))
- fix(breaking): deletes menu component ([@dzucconi](https://github.com/dzucconi))
- fix(staticcountdowntimer): removes deprecated typography components ([@dzucconi](https://github.com/dzucconi))
- fix(timeremaining): removes deprecated typography components ([@dzucconi](https://github.com/dzucconi))
- fix(dialog): removes deprecated typography components ([@dzucconi](https://github.com/dzucconi))
- fix(breaking): removes colors ([@dzucconi](https://github.com/dzucconi))
- fix(breaking): removes toggle ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v24.5.1 (Tue Oct 18 2022)

#### 🐛  Bug Fix

- fix(shelf): adds label to scrollbar thumb [#1212](https://github.com/artsy/palette/pull/1212) ([@dzucconi](https://github.com/dzucconi))
- fix(shelf): adds label to scrollbar thumb ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v24.5.0 (Mon Oct 17 2022)

#### 🚀  Enhancement

- fix(Box): add gridArea mixin [#1211](https://github.com/artsy/palette/pull/1211) ([@laurabeth](https://github.com/laurabeth))

#### Authors: 1

- Laura Bhayani ([@laurabeth](https://github.com/laurabeth))

---

# v24.4.0 (Thu Oct 13 2022)

#### 🚀  Enhancement

- chore: forward box props to `Popover` component [#1210](https://github.com/artsy/palette/pull/1210) ([@dimatretyak](https://github.com/dimatretyak))

#### 🐛  Bug Fix

- chore: foward box props for Popover ([@dimatretyak](https://github.com/dimatretyak))

#### Authors: 1

- Dima Tretyak ([@dimatretyak](https://github.com/dimatretyak))

---

# v24.3.1 (Mon Oct 03 2022)

#### 🐛  Bug Fix

- fix(types): adds children to types [#1209](https://github.com/artsy/palette/pull/1209) ([@dzucconi](https://github.com/dzucconi))
- fix(types): adds children to types ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v24.3.0 (Wed Sep 21 2022)

#### 🚀  Enhancement

- feat(FX-4151): Add new guarantee icons [#1207](https://github.com/artsy/palette/pull/1207) ([@gkartalis](https://github.com/gkartalis))

#### Authors: 1

- George Kartalis ([@gkartalis](https://github.com/gkartalis))

---

# v24.2.0 (Fri Sep 09 2022)

#### 🚀  Enhancement

- feat(TX-649): create radio size variants [#1205](https://github.com/artsy/palette/pull/1205) ([@rquartararo](https://github.com/rquartararo))

#### Authors: 1

- Rachel Quartararo ([@rquartararo](https://github.com/rquartararo))

---

# v24.1.2 (Fri Sep 02 2022)

#### 🐛  Bug Fix

- refactor(Select): add useForwardRef [#1204](https://github.com/artsy/palette/pull/1204) ([@laurabeth](https://github.com/laurabeth))
- cleanup ([@laurabeth](https://github.com/laurabeth))
- refactor Select into ForwardRef component ([@laurabeth](https://github.com/laurabeth))

#### Authors: 1

- Laura Bhayani ([@laurabeth](https://github.com/laurabeth))

---

# v24.1.1 (Tue Aug 30 2022)

#### 🐛  Bug Fix

- feat: make ShowMore more flexible [#1202](https://github.com/artsy/palette/pull/1202) ([@mdole](https://github.com/mdole))

#### Authors: 1

- Matt Dole ([@mdole](https://github.com/mdole))

---

# v24.1.0 (Tue Aug 30 2022)

#### 🚀  Enhancement

- feat: close dropdown only when link is clicked [#1203](https://github.com/artsy/palette/pull/1203) ([@dimatretyak](https://github.com/dimatretyak))

#### 🐛  Bug Fix

- feat: close dropdown only when link is clicked ([@dimatretyak](https://github.com/dimatretyak))

#### 🏠  Internal

- chore(deps): bump moment from 2.29.1 to 2.29.4 [#1191](https://github.com/artsy/palette/pull/1191) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Dima Tretyak (Dzmitry Tratsiak) ([@dimatretyak](https://github.com/dimatretyak))

---

# v24.0.1 (Fri Jul 15 2022)

#### 🐛  Bug Fix

- fix(select): supresses top margin when inline [#1196](https://github.com/artsy/palette/pull/1196) ([@dzucconi](https://github.com/dzucconi))
- fix(select): supresses top margin when inline ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v24.0.0 (Fri Jul 15 2022)

#### 💥  Breaking Change

- chore: removes grid + styled-bootstrap-grid [#1195](https://github.com/artsy/palette/pull/1195) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore: removes grid + styled-bootstrap-grid ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v23.0.0 (Fri Jul 15 2022)

#### 💥  Breaking Change

- chore(v2): drops support for v2 completely [#1194](https://github.com/artsy/palette/pull/1194) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(theme): default text variant export should be v3 ([@dzucconi](https://github.com/dzucconi))
- chore(readmore): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(html): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(skip): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(checkbox): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(labeledinput): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(expandable): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(pagination): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(marquee): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(message): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(progressbar): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(progressdots): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(entityheader): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(radio): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(tabs): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(cards): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(avatar): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(basetabs): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore: removes unused tags component ([@dzucconi](https://github.com/dzucconi))
- chore(stepper): drops support for v2 ([@dzucconi](https://github.com/dzucconi))
- chore(text): drops support for v2 ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v22.1.0 (Thu Jul 14 2022)

#### 🚀  Enhancement

- feat(banner): exports variants; ensures text stays centered when dismissible [#1193](https://github.com/artsy/palette/pull/1193) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(banner): exports variants; ensures text stays centered when dismissable ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v22.0.3 (Fri Jul 08 2022)

#### 🐛  Bug Fix

- chore: sync local state with `value` prop for `Range` component [#1192](https://github.com/artsy/palette/pull/1192) ([@dimatretyak](https://github.com/dimatretyak))
- chore: sync local state with value prop ([@dimatretyak](https://github.com/dimatretyak))

#### Authors: 1

- Dima Tretyak (Dzmitry Tratsiak) ([@dimatretyak](https://github.com/dimatretyak))

---

# v22.0.2 (Thu Jun 30 2022)

#### 🐛  Bug Fix

- fix(toggle): deprecates toggle [#1189](https://github.com/artsy/palette/pull/1189) ([@dzucconi](https://github.com/dzucconi))
- fix(toggle): deprecates toggle ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v22.0.1 (Thu Jun 30 2022)

#### 🐛  Bug Fix

- fix(icons): removes hover functionality from wechat icon [#1187](https://github.com/artsy/palette/pull/1187) ([@dzucconi](https://github.com/dzucconi))
- fix(icons): removes hover functionality from wechat icon ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v22.0.0 (Thu Jun 30 2022)

#### 💥  Breaking Change

- feat: 3.1 input updates [#1182](https://github.com/artsy/palette/pull/1182) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(inputs): updates inputs to 3.1 styling ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v21.1.3 (Wed Jun 29 2022)

#### 🐛  Bug Fix

- fix(range): adds ability to label each slider [#1186](https://github.com/artsy/palette/pull/1186) ([@dzucconi](https://github.com/dzucconi))
- fix(range): adds ability to label each slider ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v21.1.2 (Thu Jun 23 2022)

#### 🐛  Bug Fix

- fix(pills): fixes hover on selected pills [#1185](https://github.com/artsy/palette/pull/1185) ([@dzucconi](https://github.com/dzucconi))
- fix(pills): fixes hover on selected pills ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.7.3 to v4.7.4 [#1184](https://github.com/artsy/palette/pull/1184) ([@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 2

- [@renovate[bot]](https://github.com/renovate[bot])
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v21.1.1 (Wed Jun 15 2022)

#### 🐛  Bug Fix

- fix(useportal): guards on removal [#1183](https://github.com/artsy/palette/pull/1183) ([@dzucconi](https://github.com/dzucconi))
- fix(useportal): guards on removal ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v21.1.0 (Thu Jun 09 2022)

#### 🚀  Enhancement

- feat(button): implements responsive sizes [#1181](https://github.com/artsy/palette/pull/1181) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(button): implements responsive sizes ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v21.0.0 (Wed Jun 08 2022)

#### 💥  Breaking Change

- 3.1 updates [#1169](https://github.com/artsy/palette/pull/1169) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix: q/a updates ([@dzucconi](https://github.com/dzucconi))
- chore: fixes deps ([@dzucconi](https://github.com/dzucconi))
- feat(button): adds icon slot to button ([@dzucconi](https://github.com/dzucconi))
- refactor(button): removes v2 support from button ([@dzucconi](https://github.com/dzucconi))
- feat(pill): updates pill to 3.1 ([@dzucconi](https://github.com/dzucconi))
- feat(avatar): upgrades avatar to 3.1 ([@dzucconi](https://github.com/dzucconi))
- feat(label): renames badge => label; upgrades to 3.1 ([@dzucconi](https://github.com/dzucconi))
- feat(breadcrumbs): updates breadcrumbs to 3.1 ([@dzucconi](https://github.com/dzucconi))
- feat(radio): upgrades radio to 3.1 ([@dzucconi](https://github.com/dzucconi))
- feat(checkbox): upgrades checkbox to 3.1 ([@dzucconi](https://github.com/dzucconi))
- feat(button): upgrades buttons to 3.1 ([@dzucconi](https://github.com/dzucconi))
- feat(banner): upgrades banner to 3.1 ([@dzucconi](https://github.com/dzucconi))
- feat(message): upgrades message to 3.1 ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v20.1.0 (Wed Jun 08 2022)

#### 🚀  Enhancement

- feat: add ability to open Dropdown by click [#1180](https://github.com/artsy/palette/pull/1180) ([@dimatretyak](https://github.com/dimatretyak))

#### 🐛  Bug Fix

- chore: specify `openDropdownByClick` in deps ([@dimatretyak](https://github.com/dimatretyak))
- feat: add click mode for Dropdown ([@dimatretyak](https://github.com/dimatretyak))

#### Authors: 1

- Dima Tretyak (Dzmitry Tratsiak) ([@dimatretyak](https://github.com/dimatretyak))

---

# v20.0.3 (Mon Jun 06 2022)

#### 🐛  Bug Fix

- fix(responsivebox): utilize native aspect-ratio property in place of padding-bottom hack [#1176](https://github.com/artsy/palette/pull/1176) ([@dzucconi](https://github.com/dzucconi))
- fix(responsivebox): utilize native aspect-ratio property in place of padding-bottom hack ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.7.2 to v4.7.3 [#1173](https://github.com/artsy/palette/pull/1173) ([@renovate-bot](https://github.com/renovate-bot))
- chore(deps): update dep typescript from 4.6.4 to v4.7.2 [#1168](https://github.com/artsy/palette/pull/1168) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v20.0.2 (Fri May 20 2022)

#### 🐛  Bug Fix

- fix(spinner): supports box props; respects theme [#1166](https://github.com/artsy/palette/pull/1166) ([@dzucconi](https://github.com/dzucconi))
- fix(spinner): supports box props; respects theme ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v20.0.1 (Fri May 20 2022)

#### 🐛  Bug Fix

- fix(text): updates default variant to v3 [#1165](https://github.com/artsy/palette/pull/1165) ([@dzucconi](https://github.com/dzucconi))
- fix(text): updates default variant to v3 ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v20.0.0 (Thu May 19 2022)

#### 💥  Breaking Change

- feat(tokens): updated typography scale [#1164](https://github.com/artsy/palette/pull/1164) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(tokens): updates token names ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.7.0 (Fri May 13 2022)

#### 🚀  Enhancement

- feat(range): implements range [#1154](https://github.com/artsy/palette/pull/1154) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(range): implements range ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.6.0 (Thu May 05 2022)

#### 🚀  Enhancement

- feat(icon): add white Guarantee icon [#1161](https://github.com/artsy/palette/pull/1161) ([@tam-kis](https://github.com/tam-kis))
- feat(icon): add new guarantee icon [#1157](https://github.com/artsy/palette/pull/1157) ([@tam-kis](https://github.com/tam-kis))

#### 🐛  Bug Fix

- fix(icon): remove white guarantee icon and use color props ([@tam-kis](https://github.com/tam-kis))
- fix(icon): change title of guarantee white icon ([@tam-kis](https://github.com/tam-kis))
- feat(icon): add white Guarantee icon ([@tam-kis](https://github.com/tam-kis))
- feat(icon): add new guarantee icon ([@tam-kis](https://github.com/tam-kis))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.6.3 to v4.6.4 [#1160](https://github.com/artsy/palette/pull/1160) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Tam ([@tam-kis](https://github.com/tam-kis))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v19.5.1 (Thu Apr 14 2022)

#### 🐛  Bug Fix

- fix: some small improvements for FilterSelectContext [#1156](https://github.com/artsy/palette/pull/1156) ([@dimatretyak](https://github.com/dimatretyak))
- fix: some small improvements for FilterSelectContext ([@dimatretyak](https://github.com/dimatretyak))

#### Authors: 1

- Dima Tretyak (Dzmitry Tratsiak) ([@dimatretyak](https://github.com/dimatretyak))

---

# v19.5.0 (Wed Apr 13 2022)

#### 🚀  Enhancement

- feat(fx-3803): FilterSelect tracks changes in selectedItems [#1155](https://github.com/artsy/palette/pull/1155) ([@nickskalkin](https://github.com/nickskalkin) [@dimatretyak](https://github.com/dimatretyak))

#### 🐛  Bug Fix

- chore: rename toggleSelectedItems to toggleSelectedItem ([@dimatretyak](https://github.com/dimatretyak))
- chore: add setSelectedItems ([@dimatretyak](https://github.com/dimatretyak))
- chore: rename setSelectedItems to toggleSelectedItems ([@dimatretyak](https://github.com/dimatretyak))
- chore: small updates ([@dimatretyak](https://github.com/dimatretyak))
- feat(fx-3803): FilterSelect tracks changes in selectedItems ([@nickskalkin](https://github.com/nickskalkin))

#### Authors: 2

- Dima Tretyak (Dzmitry Tratsiak) ([@dimatretyak](https://github.com/dimatretyak))
- Nikita Skalkin ([@nickskalkin](https://github.com/nickskalkin))

---

# v19.4.1 (Tue Apr 12 2022)

#### 🐛  Bug Fix

- fix: add white-space: nowrap to pill component [#1153](https://github.com/artsy/palette/pull/1153) ([@gkartalis](https://github.com/gkartalis))
- chore: add story for pill with children ([@gkartalis](https://github.com/gkartalis))
- fix: add white-space: nowrap to pill component ([@gkartalis](https://github.com/gkartalis))

#### Authors: 1

- George Kartalis ([@gkartalis](https://github.com/gkartalis))

---

# v19.4.0 (Tue Apr 05 2022)

#### 🚀  Enhancement

- feat(TX-255): ability to close expandable within expandable content [#1151](https://github.com/artsy/palette/pull/1151) ([@rquartararo](https://github.com/rquartararo))

#### 🐛  Bug Fix

- fix: bug fix ([@rquartararo](https://github.com/rquartararo))
- feat: add story option with close button ([@rquartararo](https://github.com/rquartararo))
- feat: pass setExpanded to children ([@rquartararo](https://github.com/rquartararo))

#### Authors: 1

- Rachel Quartararo ([@rquartararo](https://github.com/rquartararo))

---

# v19.3.0 (Thu Mar 31 2022)

#### 🚀  Enhancement

- GRO-836 Update: Marquee with newly decided default coloring [#1150](https://github.com/artsy/palette/pull/1150) ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))

#### 🐛  Bug Fix

- Update: Marquee with newly decided default coloring ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))

#### Authors: 1

- Ana Lisa Sutherland ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))

---

# v19.2.0 (Thu Mar 31 2022)

#### 🚀  Enhancement

- GRO-836: Adding design update for gallery attributes, until further approval on designs met [#1149](https://github.com/artsy/palette/pull/1149) ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))

#### 🐛  Bug Fix

- Adding design update for badges, until further approval on designs met ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.6.2 to v4.6.3 [#1148](https://github.com/artsy/palette/pull/1148) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Ana Lisa Sutherland ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v19.1.5 (Thu Mar 24 2022)

#### 🐛  Bug Fix

- fix(badge): prevents wrapping; handles truncation on badges [#1146](https://github.com/artsy/palette/pull/1146) ([@dzucconi](https://github.com/dzucconi))
- fix(badge): prevents wrapping; handles truncation on badges ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.1.4 (Tue Mar 22 2022)

#### 🐛  Bug Fix

- Revert "fix(join): prefers the provided child key; fallsback to index… [#1145](https://github.com/artsy/palette/pull/1145) ([@dzucconi](https://github.com/dzucconi))
- Revert "fix(join): prefers the provided child key; fallsback to index if missing" ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.1.3 (Mon Mar 21 2022)

#### 🐛  Bug Fix

- fix(tabs): cached tabs rendering [#1144](https://github.com/artsy/palette/pull/1144) ([@dzucconi](https://github.com/dzucconi))
- fix(tabs): improves tabs rendering (still problematic) ([@dzucconi](https://github.com/dzucconi))
- fix(join): prefers the provided child key; fallsback to index if missing ([@dzucconi](https://github.com/dzucconi))
- fix(basetabs): adds display name ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.1.2 (Fri Mar 18 2022)

#### 🐛  Bug Fix

- fix(filterselect): avoids calling onchange on mount [#1143](https://github.com/artsy/palette/pull/1143) ([@dzucconi](https://github.com/dzucconi))
- fix(filterselect): avoids calling onchange on mount ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.1.1 (Wed Mar 16 2022)

#### 🐛  Bug Fix

- fix(badge): includes in exports [#1142](https://github.com/artsy/palette/pull/1142) ([@dzucconi](https://github.com/dzucconi))
- fix(badge): includes in exports ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.1.0 (Mon Mar 07 2022)

#### 🚀  Enhancement

- fix: modalDialog width [#1140](https://github.com/artsy/palette/pull/1140) ([@araujobarret](https://github.com/araujobarret))
- fix: removed line height from pill text [#1139](https://github.com/artsy/palette/pull/1139) ([@gkartalis](https://github.com/gkartalis))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.5.5 to v4.6.2 [#1138](https://github.com/artsy/palette/pull/1138) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 3

- Carlos Alberto de Araujo Barreto ([@araujobarret](https://github.com/araujobarret))
- George Kartalis ([@gkartalis](https://github.com/gkartalis))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v19.0.2 (Tue Feb 22 2022)

#### 🐛  Bug Fix

- fix(useclickoutside): wait for stack to clear before adding event [#1135](https://github.com/artsy/palette/pull/1135) ([@dzucconi](https://github.com/dzucconi))
- fix(useclickoutside): wait for stack to clear before adding event ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.0.1 (Tue Feb 22 2022)

#### 🐛  Bug Fix

- fix(modal): fixes support for percentage based widths [#1134](https://github.com/artsy/palette/pull/1134) ([@dzucconi](https://github.com/dzucconi))
- fix(modal): fixes support for percentage based widths ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v19.0.0 (Fri Feb 18 2022)

#### 💥  Breaking Change

- fix: tooltip/positioning improvements [#1130](https://github.com/artsy/palette/pull/1130) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(dropdown): accepts boxprops ([@dzucconi](https://github.com/dzucconi))
- fix(useportal): makes hook safe for ssr ([@dzucconi](https://github.com/dzucconi))
- fix(dropdown): portals panel and manages focus ([@dzucconi](https://github.com/dzucconi))
- fix(usefocuslock): accepts an options object ([@dzucconi](https://github.com/dzucconi))
- feat(hooks): extracts use portal ([@dzucconi](https://github.com/dzucconi))
- fix(dropdown): maintains offset when flipping ([@dzucconi](https://github.com/dzucconi))
- fix(useposition): respond to changes in dimensions of target tooltip ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.23.1 (Fri Feb 11 2022)

#### 🐛  Bug Fix

- Revert "chore: move some type declarations to regular deps" [#1127](https://github.com/artsy/palette/pull/1127) ([@anandaroop](https://github.com/anandaroop))

#### Authors: 1

- Anandaroop Roy ([@anandaroop](https://github.com/anandaroop))

---

# v18.23.0 (Thu Feb 10 2022)

#### 🚀  Enhancement

- chore: move some type declarations to regular deps [#1125](https://github.com/artsy/palette/pull/1125) ([@anandaroop](https://github.com/anandaroop))

#### Authors: 1

- Anandaroop Roy ([@anandaroop](https://github.com/anandaroop))

---

# v18.22.0 (Wed Feb 09 2022)

#### 🚀  Enhancement

- GRO-770: Added New Cultural Badges Component [#1122](https://github.com/artsy/palette/pull/1122) ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez) [@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(entityheader): adds badges support ([@dzucconi](https://github.com/dzucconi))
- feat: supports variants ([@dzucconi](https://github.com/dzucconi))
- Updated: renamed CulturalBadge to Badge in order to make it more flexible ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))
- Updated: Per PR feedback, removing extra wrapper elements and hard coded width setting ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))
- Merge branch 'main' into The_Beez_Kneez/GRO770 ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))
- Added: This is to add in a basic cultural badge component for Black Owned galleries, will need to be expanded in the future if more badges added ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))

#### Authors: 2

- AL_Sutherland ([@The-Beez-Kneez](https://github.com/The-Beez-Kneez))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.21.0 (Wed Feb 09 2022)

#### 🚀  Enhancement

- feat: [Icons] Add Google and Apple icons [#1123](https://github.com/artsy/palette/pull/1123) ([@jacobherrington](https://github.com/jacobherrington))

#### 🐛  Bug Fix

- feat: [Icons] Add Google and Apple icons ([@jacobherrington](https://github.com/jacobherrington))

#### 🏠  Internal

- docs: Add link to svg optimization tool [#1124](https://github.com/artsy/palette/pull/1124) ([@jacobherrington](https://github.com/jacobherrington))

#### Authors: 1

- Jacob Herrington ([@jacobherrington](https://github.com/jacobherrington))

---

# v18.20.0 (Mon Feb 07 2022)

#### 🚀  Enhancement

- Scrolling marquee for black owned galleries project [#1120](https://github.com/artsy/palette/pull/1120) ([@lilyfromseattle](https://github.com/lilyfromseattle))

#### 🐛  Bug Fix

- PR fixes ([@lilyfromseattle](https://github.com/lilyfromseattle))
- deleted ribbon component ([@lilyfromseattle](https://github.com/lilyfromseattle))
- added scrolling marquee ([@lilyfromseattle](https://github.com/lilyfromseattle))
- scroll is working ([@lilyfromseattle](https://github.com/lilyfromseattle))

#### Authors: 1

- Lily Pace ([@lilyfromseattle](https://github.com/lilyfromseattle))

---

# v18.19.0 (Fri Feb 04 2022)

#### 🚀  Enhancement

- feat(icons): image set icon [#1121](https://github.com/artsy/palette/pull/1121) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- docs: cleans up icon/color docs ([@dzucconi](https://github.com/dzucconi))
- feat(icons): adds image set icon ([@dzucconi](https://github.com/dzucconi))

#### 📝  Documentation

- chore(docs): Super minor fixes [#1119](https://github.com/artsy/palette/pull/1119) ([@damassi](https://github.com/damassi))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.18.0 (Fri Feb 04 2022)

#### 🚀  Enhancement

- feat(icon-button): implements icon button [#1115](https://github.com/artsy/palette/pull/1115) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(ModalBase): Make SSR friendly [#1118](https://github.com/artsy/palette/pull/1118) ([@damassi](https://github.com/damassi))
- fix(ModalBase): Make SSR friendly ([@damassi](https://github.com/damassi))
- Docs updates; clean up; fixes [#1116](https://github.com/artsy/palette/pull/1116) ([@dzucconi](https://github.com/dzucconi))
- chore: silences type warning on old component version ([@dzucconi](https://github.com/dzucconi))
- chore: deprecates timeremaining ([@dzucconi](https://github.com/dzucconi))
- chore: deprecates tags ([@dzucconi](https://github.com/dzucconi))
- chore: deprecates staticcountdowntimer ([@dzucconi](https://github.com/dzucconi))
- docs: updates spacer example ([@dzucconi](https://github.com/dzucconi))
- docs: adds show more example; cleans up story ([@dzucconi](https://github.com/dzucconi))
- docs: updates responsive box examples ([@dzucconi](https://github.com/dzucconi))
- chore: fix linting errors ([@dzucconi](https://github.com/dzucconi))
- chore: deprecates menu component ([@dzucconi](https://github.com/dzucconi))
- docs: adds filter select doc ([@dzucconi](https://github.com/dzucconi))
- fix: deprecates borderbox ([@dzucconi](https://github.com/dzucconi))
- fix(banner): properly support icons ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete,useposition): removes concept of a scrollable parent; always use position: fixed which is relative to document ([@dzucconi](https://github.com/dzucconi))
- feat(icon-button): implements icon button ([@dzucconi](https://github.com/dzucconi))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.17.0 (Tue Feb 01 2022)

#### 🚀  Enhancement

- fix(storybooks): Hot reloading [#1114](https://github.com/artsy/palette/pull/1114) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix(storybooks): Hot reloading ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v18.16.1 (Tue Feb 01 2022)

#### 🐛  Bug Fix

- feature: Lodash Full [#1112](https://github.com/artsy/palette/pull/1112) ([@icirellik](https://github.com/icirellik))
- feature: Lodash Full ([@icirellik](https://github.com/icirellik))
- chore(docs): Fix docs by deleting monorepo lockfile [#1111](https://github.com/artsy/palette/pull/1111) ([@damassi](https://github.com/damassi))
- chore:upgrade webpack ([@damassi](https://github.com/damassi))
- chore(docs): Fix docs by deleting monorepo lockfile ([@damassi](https://github.com/damassi))

#### Authors: 2

- Cameron Rollheiser ([@icirellik](https://github.com/icirellik))
- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v18.16.0 (Thu Jan 27 2022)

#### 🚀  Enhancement

- fix(button): Alias size=large to medium [#1110](https://github.com/artsy/palette/pull/1110) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix(button): Alias size=large to medium ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v18.15.2 (Tue Jan 25 2022)

#### 🐛  Bug Fix

- fix(usefocuslock): skips -1 tabindex elements [#1109](https://github.com/artsy/palette/pull/1109) ([@dzucconi](https://github.com/dzucconi))
- fix(usefocuslock): skips -1 tabindex elements ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.5.4 to v4.5.5 [#1107](https://github.com/artsy/palette/pull/1107) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v18.15.1 (Wed Jan 19 2022)

#### 🐛  Bug Fix

- Fix: Center briefcase and page icons [#1106](https://github.com/artsy/palette/pull/1106) ([@MrSltun](https://github.com/MrSltun))
- center briefcase and page icons ([@MrSltun](https://github.com/MrSltun))

#### Authors: 1

- Sultan Al-Maari ([@MrSltun](https://github.com/MrSltun))

---

# v18.15.0 (Wed Jan 19 2022)

#### 🚀  Enhancement

- feat(filterselect): Add multiselect option [#1104](https://github.com/artsy/palette/pull/1104) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- add ReadonlyArray to satisfy relay list ([@damassi](https://github.com/damassi))
- feat(filterselect): add multiselect=false option ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v18.14.0 (Tue Jan 18 2022)

#### 🚀  Enhancement

- chore(component): export filterselect [#1103](https://github.com/artsy/palette/pull/1103) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- chore(component): export filterselect ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v18.13.0 (Tue Jan 18 2022)

#### 🚀  Enhancement

- feat(FilterSelect): Adds new <FilterSelect> component [#1099](https://github.com/artsy/palette/pull/1099) ([@damassi](https://github.com/damassi))
- toolchain(linting): Add rule-of-hooks [#1093](https://github.com/artsy/palette/pull/1093) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat(FilterSelect): add new component ([@damassi](https://github.com/damassi))
- toolchain(linting): Add rule-of-hooks ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v18.12.2 (Thu Jan 06 2022)

#### 🐛  Bug Fix

- feat(autocomplete): supports footer [#1087](https://github.com/artsy/palette/pull/1087) ([@dzucconi](https://github.com/dzucconi))
- feat(autocomplete): adds footer ([@dzucconi](https://github.com/dzucconi))
- fix(usefocuslock): guards in the event here are no focusable nodes ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.12.1 (Wed Dec 29 2021)

#### 🐛  Bug Fix

- fix(SWA): Fix onEnter in AutocompleteInput [#1092](https://github.com/artsy/palette/pull/1092) ([@Serge0n](https://github.com/Serge0n))
- onEnter fix ([@Serge0n](https://github.com/Serge0n))

#### Authors: 1

- Sergey Kravchyonok ([@Serge0n](https://github.com/Serge0n))

---

# v18.12.0 (Tue Dec 14 2021)

#### 🚀  Enhancement

- feat: exports button variants/mixin [#1090](https://github.com/artsy/palette/pull/1090) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat: exports button variants/mixin ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.5.3 to v4.5.4 [#1088](https://github.com/artsy/palette/pull/1088) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v18.11.1 (Fri Dec 10 2021)

#### 🐛  Bug Fix

- fix: blacklist -> blocklist [#1085](https://github.com/artsy/palette/pull/1085) ([@mdole](https://github.com/mdole))
- fix: blacklist -> blocklist ([@mdole](https://github.com/mdole))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.5.2 to v4.5.3 [#1084](https://github.com/artsy/palette/pull/1084) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Matt Dole ([@mdole](https://github.com/mdole))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v18.11.0 (Wed Dec 08 2021)

#### 🚀  Enhancement

- feat(modaldialog): implements new modal [#1083](https://github.com/artsy/palette/pull/1083) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(modaldialog): addresses feedback ([@dzucconi](https://github.com/dzucconi))
- feat(modaldialog): implements transition ([@dzucconi](https://github.com/dzucconi))
- feat(modaldialog): implements new modal ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.10.0 (Tue Dec 07 2021)

#### 🚀  Enhancement

- feat(NX-3032): add space of 20px in xs breakpoint [#1081](https://github.com/artsy/palette/pull/1081) ([@araujobarret](https://github.com/araujobarret))

#### Authors: 1

- Carlos Alberto de Araujo Barreto ([@araujobarret](https://github.com/araujobarret))

---

# v18.9.0 (Wed Dec 01 2021)

#### 🚀  Enhancement

- fix: modal background color [#1080](https://github.com/artsy/palette/pull/1080) ([@araujobarret](https://github.com/araujobarret))

#### Authors: 1

- Carlos Alberto de Araujo Barreto ([@araujobarret](https://github.com/araujobarret))

---

# v18.8.1 (Tue Nov 30 2021)

#### 🐛  Bug Fix

- fix(autocomplete): only closes when options are visible [#1079](https://github.com/artsy/palette/pull/1079) ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): only closes when options are visible ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.8.0 (Thu Nov 25 2021)

#### 🚀  Enhancement

- feat(NX02486): adjusts the modal to the new design [#1076](https://github.com/artsy/palette/pull/1076) ([@araujobarret](https://github.com/araujobarret))

#### Authors: 1

- Carlos Alberto de Araujo Barreto ([@araujobarret](https://github.com/araujobarret))

---

# v18.7.4 (Wed Nov 24 2021)

#### 🐛  Bug Fix

- fix(clickable): resets margin for safari [#1078](https://github.com/artsy/palette/pull/1078) ([@dzucconi](https://github.com/dzucconi))
- fix(clickable): resets margin for safari ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.7.3 (Wed Nov 24 2021)

#### 🐛  Bug Fix

- fix(autocomplete): improves onclose; fixes memory leak [#1077](https://github.com/artsy/palette/pull/1077) ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): improves onclose; fixes memory leak ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.7.2 (Mon Nov 22 2021)

#### 🐛  Bug Fix

- fix(DSWGW-99): Autocomplete Q/A [#1075](https://github.com/artsy/palette/pull/1075) ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): fixes performance issue ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): close options when focus leaves component ([@dzucconi](https://github.com/dzucconi))
- feat(hooks): adds hook for detecting if focus lies within ref ([@dzucconi](https://github.com/dzucconi))
- chore(deps): removes unused dependency ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): disables tabbing to individual options ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): clears staged options ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.4.4 to v4.5.2 [#1074](https://github.com/artsy/palette/pull/1074) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v18.7.1 (Fri Nov 12 2021)

#### 🐛  Bug Fix

- feat(pill): supports pill with icons [#1073](https://github.com/artsy/palette/pull/1073) ([@dzucconi](https://github.com/dzucconi))
- feat(pill): supports pill with icons ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.7.0 (Thu Nov 11 2021)

#### 🚀  Enhancement

- feat(button): improves support for icon buttons [#1071](https://github.com/artsy/palette/pull/1071) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(button): fixes alignment for icons ([@dzucconi](https://github.com/dzucconi))
- fix(color): supports currentColor ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.6.1 (Thu Nov 11 2021)

#### 🐛  Bug Fix

- fix(tabs): avoids scrolling on mount [#1070](https://github.com/artsy/palette/pull/1070) ([@dzucconi](https://github.com/dzucconi))
- fix(tabs): avoids scrolling on mount ([@dzucconi](https://github.com/dzucconi))
- feat: forwards refs ([@dzucconi](https://github.com/dzucconi))

#### 🔩 Dependency Updates

- chore(deps): bump prismjs from 1.24.1 to 1.25.0 [#1039](https://github.com/artsy/palette/pull/1039) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.6.0 (Wed Nov 03 2021)

#### 🚀  Enhancement

- fix(tabs): add scrollIntoView for active tab [#1066](https://github.com/artsy/palette/pull/1066) ([@tam-kis](https://github.com/tam-kis))

#### 🐛  Bug Fix

- fix(tabs): import elements separately ([@tam-kis](https://github.com/tam-kis))
- fix(tabs): remove comment for scroll on active ([@tam-kis](https://github.com/tam-kis))
- fix(tabs): remove unused imports ([@tam-kis](https://github.com/tam-kis))
- fix(tabs): add scrollIntoView for active tab ([@tam-kis](https://github.com/tam-kis))

#### Authors: 1

- Tam ([@tam-kis](https://github.com/tam-kis))

---

# v18.5.0 (Thu Oct 28 2021)

#### 🚀  Enhancement

- feat(toasts): supports retracting toasts [#1065](https://github.com/artsy/palette/pull/1065) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(chromatic): disables stories ([@dzucconi](https://github.com/dzucconi))
- feat(toasts): supports retracting toasts ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.4.2 (Mon Oct 25 2021)

#### 🐛  Bug Fix

- fix(autocompleteinput): improves select ux [#1063](https://github.com/artsy/palette/pull/1063) ([@dzucconi](https://github.com/dzucconi))
- refactor(autocompleteinput): moves state into reducer ([@dzucconi](https://github.com/dzucconi))
- fix(autocompleteinput): prevents default for escape ([@dzucconi](https://github.com/dzucconi))
- fix(usefocuslock): prevents redundant focus when used in conjunction with autocomplete ([@dzucconi](https://github.com/dzucconi))
- fix(select): changes default state color [#1064](https://github.com/artsy/palette/pull/1064) ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): improves ignore list ([@dzucconi](https://github.com/dzucconi))
- fix(select): changes default state color ([@dzucconi](https://github.com/dzucconi))
- fix(autocompleteinput): fixes casing ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): includes on clear callback ([@dzucconi](https://github.com/dzucconi))
- fix(autocompleteinput): improves select ux ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.4.1 (Thu Oct 21 2021)

#### 🐛  Bug Fix

- fix(autocomplete): display options if they are present regardless of query [#1062](https://github.com/artsy/palette/pull/1062) ([@dzucconi](https://github.com/dzucconi))
- fix(autocomplete): display options if they are present regardless of query ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.4.0 (Wed Oct 20 2021)

#### 🚀  Enhancement

- feat: implements password input [#1061](https://github.com/artsy/palette/pull/1061) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat: implements password input ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.3.0 (Mon Oct 18 2021)

#### 🚀  Enhancement

- feat: implements toasts [#1060](https://github.com/artsy/palette/pull/1060) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat: implements toasts ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.4.3 to v4.4.4 [#1058](https://github.com/artsy/palette/pull/1058) ([@renovate-bot](https://github.com/renovate-bot))

#### 🔩 Dependency Updates

- chore(deps): bump tmpl from 1.0.4 to 1.0.5 [#1040](https://github.com/artsy/palette/pull/1040) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v18.2.0 (Wed Oct 13 2021)

#### 🚀  Enhancement

- feat(icons): adds pinterest, tumblr icons [#1059](https://github.com/artsy/palette/pull/1059) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(icons): adds pinterest, tumblr icons ([@dzucconi](https://github.com/dzucconi))
- chore(deps): update dep @artsy/auto-config from 1.0.2 to v1.1.0 ([@renovate-bot](https://github.com/renovate-bot))

#### 🏠  Internal

- chore(deps): update dep @artsy/auto-config from 1.0.2 to v1.1.0 [#1046](https://github.com/artsy/palette/pull/1046) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 3

- [@renovate[bot]](https://github.com/renovate[bot])
- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v18.1.1 (Fri Oct 08 2021)

#### 🐛  Bug Fix

- fix(labeledinput): fixes height when title/description are present [#1057](https://github.com/artsy/palette/pull/1057) ([@dzucconi](https://github.com/dzucconi))
- fix(labeledinput): fixes height when title/description are present ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v18.1.0 (Thu Oct 07 2021)

#### 🚀  Enhancement

- docs(types): Improve DX on Button/Text variants [#1055](https://github.com/artsy/palette/pull/1055) ([@araujobarret](https://github.com/araujobarret))

#### Authors: 1

- Carlos Alberto de Araujo Barreto ([@araujobarret](https://github.com/araujobarret))

---

# v18.0.0 (Wed Oct 06 2021)

#### 💥  Breaking Change

- [breaking change] feat(cards): migrates to v3 [#1053](https://github.com/artsy/palette/pull/1053) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(cards): loosens up typing ([@dzucconi](https://github.com/dzucconi))
- fix(cards): allows nulls ([@dzucconi](https://github.com/dzucconi))
- fix(cards): renames cards to make more sense ([@dzucconi](https://github.com/dzucconi))
- feat(cards): migrates to v3 ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.8.0 (Tue Oct 05 2021)

#### 🚀  Enhancement

- feat(tabs): supports autoscrolling on tab selection [#1051](https://github.com/artsy/palette/pull/1051) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(tabs): supports autoscrolling on tab selection ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.7.6 (Mon Oct 04 2021)

#### 🐛  Bug Fix

- fix(horizontaloverflow): ensures internal heights match external [#1049](https://github.com/artsy/palette/pull/1049) ([@dzucconi](https://github.com/dzucconi))
- fix(horizontaloverflow): ensures internal heights match external ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.7.5 (Wed Sep 29 2021)

#### 🐛  Bug Fix

- fix(shelf): when shelf contents change; keep the scrollbar in sync [#1048](https://github.com/artsy/palette/pull/1048) ([@dzucconi](https://github.com/dzucconi))
- fix(shelf): when shelf contents change; keep the scrollbar in sync ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.7.4 (Fri Sep 24 2021)

#### 🐛  Bug Fix

- Deprecate <Link> [#1047](https://github.com/artsy/palette/pull/1047) ([@damassi](https://github.com/damassi))
- Deprecate <Link>` ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v17.7.3 (Wed Sep 22 2021)

#### 🐛  Bug Fix

- fix(hooks): improves focus lock and mutation observer hooks [#1045](https://github.com/artsy/palette/pull/1045) ([@dzucconi](https://github.com/dzucconi))
- fix(usefocuslock): handles clicks ([@dzucconi](https://github.com/dzucconi))
- fix(usemutationobserver): simply return if undefined ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.7.2 (Tue Sep 21 2021)

#### 🐛  Bug Fix

- fix(modalbase): keeps maxheight in sync [#1044](https://github.com/artsy/palette/pull/1044) ([@dzucconi](https://github.com/dzucconi))
- fix(modalbase): keeps maxheight in sync ([@dzucconi](https://github.com/dzucconi))
- fix(modal): fixes stale focusable inputs [#1038](https://github.com/artsy/palette/pull/1038) ([@dzucconi](https://github.com/dzucconi))
- fix(modal): fixes stale focusable inputs ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.7.1 (Tue Sep 21 2021)

#### 🐛  Bug Fix

- fix(button): ensures submit buttons are same font-weight [#1042](https://github.com/artsy/palette/pull/1042) ([@dzucconi](https://github.com/dzucconi))
- fix(button): ensures submit buttons are same font-weight ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore: migrates to eslint [#1043](https://github.com/artsy/palette/pull/1043) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.7.0 (Tue Sep 21 2021)

#### 🚀  Enhancement

- feat(pill): filter pill hover state [#1041](https://github.com/artsy/palette/pull/1041) ([@tr-ann](https://github.com/tr-ann))

#### 🐛  Bug Fix

- feat(pill): updated hover state for filter pill ([@tr-ann](https://github.com/tr-ann))

#### Authors: 1

- Hanna Trapachka ([@tr-ann](https://github.com/tr-ann))

---

# v17.6.0 (Thu Sep 16 2021)

#### 🚀  Enhancement

- feat(ReadMore): Added Read less functionality [#1036](https://github.com/artsy/palette/pull/1036) ([@anastasiapyzhik](https://github.com/anastasiapyzhik))

#### 🐛  Bug Fix

- FX-3315 Updated tests ([@anastasiapyzhik](https://github.com/anastasiapyzhik))
- FX-3315 Added Read less functionality to ReadMore component ([@anastasiapyzhik](https://github.com/anastasiapyzhik))

#### Authors: 1

- Anastasia ([@anastasiapyzhik](https://github.com/anastasiapyzhik))

---

# v17.5.0 (Wed Sep 15 2021)

#### 🚀  Enhancement

- feat(pill): updates pill variants to match current specs [#1035](https://github.com/artsy/palette/pull/1035) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(pill): updates pill variants to match current specs ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.4.0 (Wed Sep 15 2021)

#### 🚀  Enhancement

- feat: extracts horizontal overflow component from base tabs [#1034](https://github.com/artsy/palette/pull/1034) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat: extracts horizontal overflow component from base tabs ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.4.2 to v4.4.3 [#1033](https://github.com/artsy/palette/pull/1033) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v17.3.0 (Tue Sep 07 2021)

#### 🚀  Enhancement

- feat(autocompleteinput): adds loading indicator [#1032](https://github.com/artsy/palette/pull/1032) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(autocompleteinput): adds loading indicator ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.2.2 (Wed Sep 01 2021)

#### 🐛  Bug Fix

- change modal close to onMouseDown [#1030](https://github.com/artsy/palette/pull/1030) ([@laurabeth](https://github.com/laurabeth))
- handle scrollIsolation element to handleMouseDown ([@laurabeth](https://github.com/laurabeth))

#### Authors: 1

- Laura Bhayani ([@laurabeth](https://github.com/laurabeth))

---

# v17.2.1 (Wed Sep 01 2021)

#### 🐛  Bug Fix

- fix(tabs): loosens up tab types so as to support conditional children [#1029](https://github.com/artsy/palette/pull/1029) ([@dzucconi](https://github.com/dzucconi))
- fix(tabs): loosens up tab types so as to support conditional children ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript to v4.4.2 [#1026](https://github.com/artsy/palette/pull/1026) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v17.2.0 (Tue Aug 31 2021)

#### 🚀  Enhancement

- feat(autocomplete): implements autocomplete [#1027](https://github.com/artsy/palette/pull/1027) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(autocomplete): implements autocomplete input ([@dzucconi](https://github.com/dzucconi))
- refactor: extracts hook to mirror the width of a node ([@dzucconi](https://github.com/dzucconi))
- chore(chromatic): disables popover story ([@dzucconi](https://github.com/dzucconi))
- chore: ignores type error ([@dzucconi](https://github.com/dzucconi))
- chore(chromatic): disables stories ([@dzucconi](https://github.com/dzucconi))
- chore(chromatic): tweaks diff threshold ([@dzucconi](https://github.com/dzucconi))
- chore(chromatic): disables story ([@dzucconi](https://github.com/dzucconi))
- chore(chromatic): adds delay ([@dzucconi](https://github.com/dzucconi))
- fix(story): fixes pill active story ([@dzucconi](https://github.com/dzucconi))
- chore: Enable TypeScript strict mode ([@damassi](https://github.com/damassi))

#### 🏠  Internal

- chore(chromatic): adds delay [#1025](https://github.com/artsy/palette/pull/1025) ([@dzucconi](https://github.com/dzucconi))
- chore: Enable TypeScript strict mode [#1024](https://github.com/artsy/palette/pull/1024) ([@damassi](https://github.com/damassi) [@dzucconi](https://github.com/dzucconi))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.1.0 (Fri Aug 20 2021)

#### 🚀  Enhancement

- feat(multiselect): implements multi-select [#1012](https://github.com/artsy/palette/pull/1012) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(multiselect): adds specs ([@dzucconi](https://github.com/dzucconi))
- feat(multiselect): brings multi-select and select into correspondence ([@dzucconi](https://github.com/dzucconi))
- feat(multiselect): implements multi-select ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v17.0.0 (Thu Aug 19 2021)

#### 💥  Breaking Change

- chore(image): removes responsive image; cleans up types [#1019](https://github.com/artsy/palette/pull/1019) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(image): removes responsive image; cleans up types ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v16.0.1 (Thu Aug 19 2021)

#### 🐛  Bug Fix

- fix(pill): fixes multi-line pills [#1020](https://github.com/artsy/palette/pull/1020) ([@dzucconi](https://github.com/dzucconi))
- fix(pill): fixes multi-line pills ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v16.0.0 (Thu Aug 12 2021)

#### 💥  Breaking Change

- feature: Palette Chart Lib [#1016](https://github.com/artsy/palette/pull/1016) ([@icirellik](https://github.com/icirellik))

#### 🐛  Bug Fix

- feature: Palette Chart Lib ([@icirellik](https://github.com/icirellik))

#### Authors: 1

- Cameron Rollheiser ([@icirellik](https://github.com/icirellik))

---

# v15.0.0 (Thu Aug 12 2021)

#### 💥  Breaking Change

- chore: removes slider and related components [#1018](https://github.com/artsy/palette/pull/1018) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore: removes slider and related components ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.55.0 (Wed Aug 11 2021)

#### 🚀  Enhancement

- fix(avatar,entityheader): supports detailed image props [#1015](https://github.com/artsy/palette/pull/1015) ([@dzucconi](https://github.com/dzucconi))
- docs: More docs [#1013](https://github.com/artsy/palette/pull/1013) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix(avatar,entityheader): supports detailed image props ([@dzucconi](https://github.com/dzucconi))
- docs: More docs ([@damassi](https://github.com/damassi))

#### 🏠  Internal

- chore(deps): update yarn orb from 5.1.3 to v6 [#1003](https://github.com/artsy/palette/pull/1003) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 4

- [@renovate[bot]](https://github.com/renovate[bot])
- Christopher Pappas ([@damassi](https://github.com/damassi))
- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v14.54.1 (Fri Aug 06 2021)

#### 🐛  Bug Fix

- fix: changes default font to unica; cleans up [#1009](https://github.com/artsy/palette/pull/1009) ([@dzucconi](https://github.com/dzucconi))
- fix: changes default font to unica; cleans up ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.54.0 (Fri Aug 06 2021)

#### 🚀  Enhancement

- fix(text): exports text-transform type [#1008](https://github.com/artsy/palette/pull/1008) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(text): exports text-transform type ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.53.0 (Fri Aug 06 2021)

#### 🐛  Bug Fix

- fix(text): increases text styles specificity [#1007](https://github.com/artsy/palette/pull/1007) ([@dzucconi](https://github.com/dzucconi))
- fix(text): increases text styles specificity ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.52.0 (Thu Aug 05 2021)

#### 🚀  Enhancement

- [palette-docs] Upgrade Palette to latest version of Gatsby; some light cleanup [#1004](https://github.com/artsy/palette/pull/1004) ([@damassi](https://github.com/damassi))
- Light cleanup [#1002](https://github.com/artsy/palette/pull/1002) ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.51.0 (Wed Aug 04 2021)

#### 🚀  Enhancement

- feat: implements dropdown [#986](https://github.com/artsy/palette/pull/986) ([@dzucconi](https://github.com/dzucconi))
- Fix some deploy issues [#996](https://github.com/artsy/palette/pull/996) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat: implements dropdown ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): bump prismjs from 1.23.0 to 1.24.0 [#958](https://github.com/artsy/palette/pull/958) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump handlebars from 4.7.6 to 4.7.7 [#924](https://github.com/artsy/palette/pull/924) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump url-parse from 1.4.7 to 1.5.1 [#927](https://github.com/artsy/palette/pull/927) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump dns-packet from 1.3.1 to 1.3.4 [#938](https://github.com/artsy/palette/pull/938) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 3

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Christopher Pappas ([@damassi](https://github.com/damassi))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.50.0 (Tue Aug 03 2021)

#### 🚀  Enhancement

- feat(input): supports inputs with custom heights [#994](https://github.com/artsy/palette/pull/994) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(labeledinput): correctly threads custom heights [#995](https://github.com/artsy/palette/pull/995) ([@dzucconi](https://github.com/dzucconi))
- fix(labeledinput): correctly threads custom heights ([@dzucconi](https://github.com/dzucconi))
- feat(input): supports inputs with custom heights ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.49.0 (Mon Aug 02 2021)

#### 🚀  Enhancement

- [GRO-462] Add EarnMoreIcon to icon list [#991](https://github.com/artsy/palette/pull/991) (tanjiemcmeans@tanjiemcmeans-c02fqa2jmd6r.myfiosgateway.com [@TMcMeans](https://github.com/TMcMeans))

#### 🐛  Bug Fix

- Remove old comment (tanjiemcmeans@tanjiemcmeans-c02fqa2jmd6r.myfiosgateway.com)
- Fix linter issues (tanjiemcmeans@tanjiemcmeans-c02fqa2jmd6r.myfiosgateway.com)
- Remove color function from Icon component (tanjiemcmeans@tanjiemcmeans-c02fqa2jmd6r.myfiosgateway.com)
- Alphabetize location of new icon export (tanjiemcmeans@tanjiemcmeans-c02fqa2jmd6r.myfiosgateway.com)
- Remove comment noise from EarnMoreIcon (tanjiemcmeans@tanjiemcmeans-c02fqa2jmd6r.myfiosgateway.com)
- Add EarnMoreIcon to icon list (tanjiemcmeans@tanjiemcmeans-c02fqa2jmd6r.myfiosgateway.com)

#### Authors: 2

- Tanjie McMeans (tanjiemcmeans@tanjiemcmeans-c02fqa2jmd6r.myfiosgateway.com)
- TanjieM ([@TMcMeans](https://github.com/TMcMeans))

---

# v14.48.0 (Mon Aug 02 2021)

#### 🚀  Enhancement

- chore(space,color): deprecates space & color functions [#992](https://github.com/artsy/palette/pull/992) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(space,color): deprecates space & color functions ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.47.2 (Fri Jul 30 2021)

#### 🐛  Bug Fix

- Input/TextArea refinements [#990](https://github.com/artsy/palette/pull/990) ([@dzucconi](https://github.com/dzucconi))
- fix(input/textarea): threads through required prop ([@dzucconi](https://github.com/dzucconi))
- fix(textarea): removes small space when not needed ([@dzucconi](https://github.com/dzucconi))
- fix(textarea): improves line-height ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.47.1 (Fri Jul 30 2021)

#### 🐛  Bug Fix

- fix(textarea): passes default value [#989](https://github.com/artsy/palette/pull/989) ([@dzucconi](https://github.com/dzucconi))
- fix(textarea): passes default value ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.47.0 (Fri Jul 30 2021)

#### 🚀  Enhancement

- feat(textarea): supports v3 [#988](https://github.com/artsy/palette/pull/988) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(textarea): supports v3 ([@dzucconi](https://github.com/dzucconi))
- refactor(textarea): converts to a functional component ([@dzucconi](https://github.com/dzucconi))
- chore(textarea): converts stories to states ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.46.0 (Thu Jul 29 2021)

#### 🚀  Enhancement

- feat: Export v2/v3 theme constants [#987](https://github.com/artsy/palette/pull/987) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat: Export v2/v3 theme constants ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.45.1 (Mon Jul 26 2021)

#### 🐛  Bug Fix

- fix(PX-4059): prevent link click if there is no next or prev page [#984](https://github.com/artsy/palette/pull/984) (kiry.zubarau@artsymail.com [@kiryl-zubarau](https://github.com/kiryl-zubarau))
- Prevent link click if there is no next or prev page (kiry.zubarau@artsymail.com)
- chore(deps): update dep typescript from 4.2.4 to v4.3.5 ([@renovate-bot](https://github.com/renovate-bot))
- chore(deps): pin dependencies ([@renovate-bot](https://github.com/renovate-bot))

#### 🏠  Internal

- chore(deps): bump hosted-git-info from 2.8.8 to 2.8.9 [#928](https://github.com/artsy/palette/pull/928) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump ws from 6.2.1 to 6.2.2 [#945](https://github.com/artsy/palette/pull/945) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump ssri from 6.0.1 to 6.0.2 [#915](https://github.com/artsy/palette/pull/915) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): pin dependencies [#632](https://github.com/artsy/palette/pull/632) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))
- chore(deps): update dep typescript from 4.2.4 to v4.3.5 [#936](https://github.com/artsy/palette/pull/936) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 5

- [@dependabot[bot]](https://github.com/dependabot[bot])
- [@kiryl-zubarau](https://github.com/kiryl-zubarau)
- [@renovate[bot]](https://github.com/renovate[bot])
- Kirill Zuborev (kiry.zubarau@artsymail.com)
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v14.45.0 (Wed Jul 21 2021)

#### 🚀  Enhancement

- fix: Make sure to compile monorepo packages before publish [#982](https://github.com/artsy/palette/pull/982) ([@damassi](https://github.com/damassi))
- fix: storybook compile [#981](https://github.com/artsy/palette/pull/981) ([@damassi](https://github.com/damassi))
- feat(hooks): exports hooks [#979](https://github.com/artsy/palette/pull/979) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix: Make sure to compile monorepo packages before publish ([@damassi](https://github.com/damassi))
- fix: Fix missing TextVariant export [#980](https://github.com/artsy/palette/pull/980) ([@damassi](https://github.com/damassi))
- fix types ([@damassi](https://github.com/damassi))
- feat(hooks): exports hooks ([@dzucconi](https://github.com/dzucconi))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.44.1 (Wed Jul 21 2021)

#### 🐛  Bug Fix

- fix(image): supports native img props [#978](https://github.com/artsy/palette/pull/978) ([@dzucconi](https://github.com/dzucconi))
- fix(image): supports native img props ([@dzucconi](https://github.com/dzucconi))
- fix(PX-3894): fix end shadow for BaseTabs component [#976](https://github.com/artsy/palette/pull/976) (kiry.zubarau@artsymail.com [@kiryl-zubarau](https://github.com/kiryl-zubarau))
- Fix end shadow for BaseTabs component (kiry.zubarau@artsymail.com)

#### Authors: 3

- [@kiryl-zubarau](https://github.com/kiryl-zubarau)
- Damon ([@dzucconi](https://github.com/dzucconi))
- Kirill Zuborev (kiry.zubarau@artsymail.com)

---

# v14.44.0 (Mon Jul 19 2021)

#### 🚀  Enhancement

- fix: Fix CI deploys [#974](https://github.com/artsy/palette/pull/974) ([@damassi](https://github.com/damassi))
- feat: Migrate Palette to @artsy/palette-tokens package [#971](https://github.com/artsy/palette/pull/971) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- refactor: Swap ...new Array syntax with Array.from ([@damassi](https://github.com/damassi))
- prettier ([@damassi](https://github.com/damassi))
- lib: bump palette-tokens ([@damassi](https://github.com/damassi))
- feat: Update palette to support palette-tokens; use v3 ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.43.1 (Tue Jul 13 2021)

#### 🐛  Bug Fix

- fix(useposition): silences uselayouteffect ssr warning [#970](https://github.com/artsy/palette/pull/970) ([@dzucconi](https://github.com/dzucconi))
- fix(useposition): silences uselayouteffect ssr warning ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.43.0 (Fri Jul 09 2021)

#### 🚀  Enhancement

- fix(PX-4310): get page count information from Swiper and Carousel [#969](https://github.com/artsy/palette/pull/969) (kiry.zubarau@artsymail.com [@kiryl-zubarau](https://github.com/kiryl-zubarau))

#### 🐛  Bug Fix

- Use useUpdateEffect to prevent call onPageCountChange on initial mount (kiry.zubarau@artsymail.com)
- Add onPageCountChange event (kiry.zubarau@artsymail.com)

#### Authors: 2

- [@kiryl-zubarau](https://github.com/kiryl-zubarau)
- Kirill Zuborev (kiry.zubarau@artsymail.com)

---

# v14.42.0 (Thu Jul 01 2021)

#### 🚀  Enhancement

- chore(chromatic): updates chromatic [#968](https://github.com/artsy/palette/pull/968) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(storybook): changes default theme to v3 [#966](https://github.com/artsy/palette/pull/966) ([@dzucconi](https://github.com/dzucconi))
- chore(storybook): changes default theme to v3 ([@dzucconi](https://github.com/dzucconi))
- chore(chromatic): updates chromatic ([@dzucconi](https://github.com/dzucconi))
- fix(tabs): fixes styling [#967](https://github.com/artsy/palette/pull/967) ([@dzucconi](https://github.com/dzucconi))
- fix(tabs): fixes styling ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.41.2 (Thu Jul 01 2021)

#### 🐛  Bug Fix

- fix(tabs): attempts to fix unstyled tabs in force [#965](https://github.com/artsy/palette/pull/965) ([@dzucconi](https://github.com/dzucconi))
- fix(tabs): attempts to fix unstyled tabs in force ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.41.1 (Wed Jun 30 2021)

#### 🐛  Bug Fix

- fix(swiper,carousel): loosens children type [#964](https://github.com/artsy/palette/pull/964) ([@dzucconi](https://github.com/dzucconi))
- fix(swiper,carousel): loosens children type ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.41.0 (Wed Jun 30 2021)

#### 🚀  Enhancement

- feat(text): adds line-clamp [#963](https://github.com/artsy/palette/pull/963) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(text): adds line-clamp ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.40.0 (Wed Jun 30 2021)

#### 🚀  Enhancement

- feat(shelf): exports shelf nav buttons; improves feedback [#962](https://github.com/artsy/palette/pull/962) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(shelf): exports shelf nav buttons; improves feedback ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.39.0 (Wed Jun 30 2021)

#### 🚀  Enhancement

- fix(progressdots): supports click [#961](https://github.com/artsy/palette/pull/961) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(progressdots): supports click ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.38.2 (Tue Jun 29 2021)

#### 🐛  Bug Fix

- fix(carousel,swiper): supports conditional children [#960](https://github.com/artsy/palette/pull/960) ([@dzucconi](https://github.com/dzucconi))
- fix(carousel,swiper): supports conditional children ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.38.1 (Tue Jun 29 2021)

#### 🐛  Bug Fix

- fix(join): supports nested children [#959](https://github.com/artsy/palette/pull/959) ([@dzucconi](https://github.com/dzucconi))
- chore(stories): cleans up stories ([@dzucconi](https://github.com/dzucconi))
- fix(join): supports nested children ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.38.0 (Fri Jun 25 2021)

#### 🚀  Enhancement

- fix: Remove react-spring [#956](https://github.com/artsy/palette/pull/956) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix: Remove react-spring ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.37.0 (Mon Jun 21 2021)

#### 🚀  Enhancement

- feat(placeholder): implements placeholder [#951](https://github.com/artsy/palette/pull/951) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(skeleton): removes placeholder; updates skeleton [#953](https://github.com/artsy/palette/pull/953) ([@dzucconi](https://github.com/dzucconi))
- fix(skeleton): removes placeholder; updates skeleton ([@dzucconi](https://github.com/dzucconi))
- feat(placeholder): implements placeholder ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.36.1 (Thu Jun 17 2021)

#### 🐛  Bug Fix

- fix(image,skeleton): optimizes skeleton animations [#950](https://github.com/artsy/palette/pull/950) ([@dzucconi](https://github.com/dzucconi))
- fix(image,skeleton): optimizes skeleton animations ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.36.0 (Thu Jun 17 2021)

#### 🚀  Enhancement

- Some small cleanup [#942](https://github.com/artsy/palette/pull/942) ([@pvinis](https://github.com/pvinis))

#### 🐛  Bug Fix

- Merge branch 'master' into pavlos/cleanup ([@pvinis](https://github.com/pvinis))
- remove PageViewsIcon ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v14.35.2 (Fri Jun 11 2021)

#### 🐛  Bug Fix

- fix(tooltip): avoids blowing away child props [#949](https://github.com/artsy/palette/pull/949) ([@dzucconi](https://github.com/dzucconi))
- fix(tooltip): avoids blowing away child props ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.35.1 (Fri Jun 11 2021)

#### 🐛  Bug Fix

- fix(popover): skips focus management on initial mount [#948](https://github.com/artsy/palette/pull/948) ([@dzucconi](https://github.com/dzucconi))
- fix(popover): skips focus management on initial mount ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.35.0 (Fri Jun 11 2021)

#### 🚀  Enhancement

- Tooltip/Popover positioning [#947](https://github.com/artsy/palette/pull/947) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(popover): implements popovers ([@dzucconi](https://github.com/dzucconi))
- fix(tooltip,popover): fixes tab order ([@dzucconi](https://github.com/dzucconi))
- fix(tooltip): updates default ([@dzucconi](https://github.com/dzucconi))
- fix(tooltip): support null widths for implict widths ([@dzucconi](https://github.com/dzucconi))
- fix(button): fixes display name ([@dzucconi](https://github.com/dzucconi))
- fix: removes unused import ([@dzucconi](https://github.com/dzucconi))
- fix(popover): sets default placement ([@dzucconi](https://github.com/dzucconi))
- refactor(borderbox): cleans up border box ([@dzucconi](https://github.com/dzucconi))
- fix: updates tooltips to v3 ([@dzucconi](https://github.com/dzucconi))
- feat(hooks): adds click outside hook ([@dzucconi](https://github.com/dzucconi))
- fix(tooltip): removes wrapper divs ([@dzucconi](https://github.com/dzucconi))
- refactor(tooltip): updates tooltip to use positioning engine hook ([@dzucconi](https://github.com/dzucconi))
- feat: adds usePosition hook ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.34.0 (Mon Jun 07 2021)

#### 🚀  Enhancement

- feat(button): supports `as` prop [#946](https://github.com/artsy/palette/pull/946) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(button): supports as ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.33.1 (Fri Jun 04 2021)

#### 🐛  Bug Fix

- fix(radio): allows for custom labels to occupy immediate container [#944](https://github.com/artsy/palette/pull/944) ([@dzucconi](https://github.com/dzucconi))
- fix(radio): allows for custom labels to occupy immediate container ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.33.0 (Fri Jun 04 2021)

#### 🚀  Enhancement

- fix: images width [#943](https://github.com/artsy/palette/pull/943) (nastassia@wsa-231-72b.local)

#### Authors: 1

- nastassia (nastassia@wsa-231-72b.local)

---

# v14.32.0 (Wed Jun 02 2021)

#### 🚀  Enhancement

- add increase/decrease icons [#940](https://github.com/artsy/palette/pull/940) ([@pvinis](https://github.com/pvinis))

#### 🐛  Bug Fix

- lint ([@pvinis](https://github.com/pvinis))
- ugh ([@pvinis](https://github.com/pvinis))
- add new icons ([@pvinis](https://github.com/pvinis))
- sort ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v14.31.0 (Wed Jun 02 2021)

#### 🚀  Enhancement

- feat(tooltip): supports v3; supports keyboard focus [#939](https://github.com/artsy/palette/pull/939) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(tooltip): supports v3; supports keyboard focus ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.30.1 (Thu May 27 2021)

#### 🐛  Bug Fix

- fix(shelf): vertically centers arrows relative to rail [#937](https://github.com/artsy/palette/pull/937) ([@dzucconi](https://github.com/dzucconi))
- fix(shelf): corrects vertical centering of arrows relative to rail ([@dzucconi](https://github.com/dzucconi))
- chore(deps): bumps use-cursor ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.30.0 (Wed May 26 2021)

#### 🚀  Enhancement

- feat(shelf): implements custom scrollbar [#935](https://github.com/artsy/palette/pull/935) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- refactor(shelf): cleans up and adds specs ([@dzucconi](https://github.com/dzucconi))
- feat(shelf): implements custom scrollbar ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.29.0 (Fri May 14 2021)

#### 🚀  Enhancement

- fix(shelf): improves first page previous button navigation [#933](https://github.com/artsy/palette/pull/933) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(shelf): improves first page previous button navigation ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.28.3 (Fri May 14 2021)

#### 🐛  Bug Fix

- fix(select): vertically centers label [#932](https://github.com/artsy/palette/pull/932) ([@dzucconi](https://github.com/dzucconi))
- fix(select): vertically centers label ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.28.2 (Wed May 12 2021)

#### 🐛  Bug Fix

- Loosen tab types to allow null, undefined [#931](https://github.com/artsy/palette/pull/931) ([@zephraph](https://github.com/zephraph))
- Loosen tab types to allow null, undefined ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v14.28.1 (Tue May 11 2021)

#### 🐛  Bug Fix

- fix(button): improves vertical centering in some situations [#930](https://github.com/artsy/palette/pull/930) ([@dzucconi](https://github.com/dzucconi))
- fix(entityheader): adds right-hand margin ([@dzucconi](https://github.com/dzucconi))
- fix(avatar): ensure image sizes correctly ([@dzucconi](https://github.com/dzucconi))
- fix(button): improves vertical centering in some situations ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.28.0 (Mon May 10 2021)

#### 🚀  Enhancement

- [v3] Supports EntityHeader, Avatar [#929](https://github.com/artsy/palette/pull/929) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(entityheader): supports v3 ([@dzucconi](https://github.com/dzucconi))
- feat(avatar): supports v3 ([@dzucconi](https://github.com/dzucconi))
- fix(spacer): fixes types ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.27.1 (Fri May 07 2021)

#### 🐛  Bug Fix

- fix(shelf): smoother progress [#925](https://github.com/artsy/palette/pull/925) ([@dzucconi](https://github.com/dzucconi))
- fix(shelf): smoother progress ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.27.0 (Fri May 07 2021)

#### 🚀  Enhancement

- fix: [Shelf] Dont show arrows if on touch device [#923](https://github.com/artsy/palette/pull/923) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix: [Shelf] Dont show arrows if on touch device ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.26.0 (Fri May 07 2021)

#### 🚀  Enhancement

- feat: [Image] add maxHeight props [#922](https://github.com/artsy/palette/pull/922) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat: [Image] add maxHeight props ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.25.0 (Fri May 07 2021)

#### 🚀  Enhancement

- fix: Increase scroll bar space [#921](https://github.com/artsy/palette/pull/921) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix: Increase scroll bar space ([@damassi](https://github.com/damassi))
- feat: Fix Shelf stories ([@damassi](https://github.com/damassi))

#### 🏠  Internal

- feat: Fix Shelf stories [#920](https://github.com/artsy/palette/pull/920) ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.24.0 (Thu May 06 2021)

#### 🚀  Enhancement

- feat: Add showProgress prop to Shelf [#919](https://github.com/artsy/palette/pull/919) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat: Add showProgress prp to Shelf ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.23.0 (Thu May 06 2021)

#### 🚀  Enhancement

- feat: Add alignItems prop to shelf [#918](https://github.com/artsy/palette/pull/918) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat: Add alignItems prop to shelf ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.22.0 (Thu May 06 2021)

#### 🚀  Enhancement

- Shelf component [#917](https://github.com/artsy/palette/pull/917) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat: implements shelf ([@dzucconi](https://github.com/dzucconi))
- feat: implements full bleed ([@dzucconi](https://github.com/dzucconi))
- feat: extracts visually disable scrollbar helper ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.21.1 (Wed Apr 28 2021)

#### 🐛  Bug Fix

- fix(expandable): bumps chevron over 10px in v3 [#914](https://github.com/artsy/palette/pull/914) ([@dzucconi](https://github.com/dzucconi))
- fix(expandable): bumps chevron over 10px in v3 ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.21.0 (Mon Apr 26 2021)

#### 🚀  Enhancement

- feat(types): exports ColumnSpan/Start type [#913](https://github.com/artsy/palette/pull/913) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(types): exports ColumnSpan/Start type ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.20.0 (Fri Apr 23 2021)

#### 🚀  Enhancement

- feat(theme): allows theme to be easily swapped [#912](https://github.com/artsy/palette/pull/912) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(theme): allows theme to be easily swapped ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.19.0 (Tue Apr 20 2021)

#### 🚀  Enhancement

- Fixes unstyled text when using interpolation/fragments [#911](https://github.com/artsy/palette/pull/911) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- refactor: renames isSimpleChildren => isText ([@dzucconi](https://github.com/dzucconi))
- fix: uses isSimpleChildren helper ([@dzucconi](https://github.com/dzucconi))
- feat(helpers): adds helper to detect if children are simple ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.18.3 (Fri Apr 16 2021)

#### 🐛  Bug Fix

- fix(pagination): correctly disables next/prev [#910](https://github.com/artsy/palette/pull/910) ([@dzucconi](https://github.com/dzucconi))
- fix(pagination): correctly disables next/prev ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.18.2 (Fri Apr 16 2021)

#### 🐛  Bug Fix

- fix(pagination): removes extraneous padding [#909](https://github.com/artsy/palette/pull/909) ([@dzucconi](https://github.com/dzucconi))
- fix(pagination): removes extraneous padding ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.18.1 (Fri Apr 16 2021)

#### 🐛  Bug Fix

- fix(pagination): fixes last page error [#908](https://github.com/artsy/palette/pull/908) ([@dzucconi](https://github.com/dzucconi))
- fix(pagination): fixes last page error ([@dzucconi](https://github.com/dzucconi))
- fix(pagination): updates copy; adjusts aria [#907](https://github.com/artsy/palette/pull/907) ([@dzucconi](https://github.com/dzucconi))
- fix(pagination): updates copy; adjusts aria ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.18.0 (Thu Apr 15 2021)

#### 🚀  Enhancement

- [v3] Pagination [#906](https://github.com/artsy/palette/pull/906) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(pagination): supports v3 ([@dzucconi](https://github.com/dzucconi))
- checkpoint ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.2.3 to v4.2.4 [#904](https://github.com/artsy/palette/pull/904) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v14.17.1 (Thu Apr 08 2021)

#### 🐛  Bug Fix

- fix(button): updates v3 button styling [#905](https://github.com/artsy/palette/pull/905) ([@dzucconi](https://github.com/dzucconi))
- fix(button): updates v3 button styling ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.17.0 (Fri Apr 02 2021)

#### 🚀  Enhancement

- bugfix: Ensure read more only operates on strings [#903](https://github.com/artsy/palette/pull/903) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- Ensure read more only operates on strings ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.16.0 (Fri Apr 02 2021)

#### 🚀  Enhancement

- Send out palette version [#902](https://github.com/artsy/palette/pull/902) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix: protects against error on ssr [#901](https://github.com/artsy/palette/pull/901) ([@dzucconi](https://github.com/dzucconi))
- fix(readmore): removes ability to render markup; fixes error during ssr ([@dzucconi](https://github.com/dzucconi))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.15.0 (Thu Apr 01 2021)

#### 🚀  Enhancement

- fix(theme): corrects media queries [#900](https://github.com/artsy/palette/pull/900) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(theme): corrects media queries ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.14.0 (Thu Apr 01 2021)

#### 🚀  Enhancement

- feat(radio): implements v3 styles [#898](https://github.com/artsy/palette/pull/898) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(expandable): box props should apply to entire component [#899](https://github.com/artsy/palette/pull/899) ([@dzucconi](https://github.com/dzucconi))
- fix(expandable): box props should apply to entire component ([@dzucconi](https://github.com/dzucconi))
- feat(radio): v3 styles for radio ([@dzucconi](https://github.com/dzucconi))
- fix(checkbox): ensures disabled checkboxes aren't tabbable ([@dzucconi](https://github.com/dzucconi))
- fix(theme): uses correct black5 color ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.13.0 (Tue Mar 30 2021)

#### 🚀  Enhancement

- feat(checkbox): implements v3 styles [#897](https://github.com/artsy/palette/pull/897) ([@dzucconi](https://github.com/dzucconi))
- feat(expandable): implements expandable [#896](https://github.com/artsy/palette/pull/896) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(checkbox): implements v3 styles ([@dzucconi](https://github.com/dzucconi))
- feat(expandable): implements expandable ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.12.1 (Thu Mar 25 2021)

#### 🐛  Bug Fix

- fix(select): adjusts padding to accommodate caret [#895](https://github.com/artsy/palette/pull/895) ([@dzucconi](https://github.com/dzucconi))
- fix(select): adjusts padding to accommodate caret ([@dzucconi](https://github.com/dzucconi))
- fix(labeledinput): corrects tabindex [#894](https://github.com/artsy/palette/pull/894) ([@dzucconi](https://github.com/dzucconi))
- fix(labeledinput): corrects tabindex ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.12.0 (Wed Mar 24 2021)

#### 🚀  Enhancement

- feat(labeledinput): supports ref [#893](https://github.com/artsy/palette/pull/893) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(labeledinput): supports ref ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.11.1 (Wed Mar 24 2021)

#### 🐛  Bug Fix

- fix(labeledinput): allows for clickable labels [#892](https://github.com/artsy/palette/pull/892) ([@dzucconi](https://github.com/dzucconi))
- fix(labeledinput): allows for clickable labels ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.11.0 (Wed Mar 24 2021)

#### 🚀  Enhancement

- feat(helpers): exports shadow constants [#891](https://github.com/artsy/palette/pull/891) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(helpers): exports shadow constants ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.10.0 (Wed Mar 24 2021)

#### 🚀  Enhancement

- feat: Add CalendarIcon, WatchIcon [#890](https://github.com/artsy/palette/pull/890) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat: Add new icons ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.9.0 (Tue Mar 23 2021)

#### 🚀  Enhancement

- LabeledInput [#887](https://github.com/artsy/palette/pull/887) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat: implements labeled input ([@dzucconi](https://github.com/dzucconi))
- fix(input): ensures classname is on the outermost div ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.8.0 (Tue Mar 23 2021)

#### 🚀  Enhancement

- ci: Deploy storybooks via Circle orb [#888](https://github.com/artsy/palette/pull/888) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- storybook: Rename helpers/controls > components [#889](https://github.com/artsy/palette/pull/889) ([@damassi](https://github.com/damassi))
- storybook: Rename helpers/controls > components ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v14.7.3 (Mon Mar 22 2021)

#### 🐛  Bug Fix

- feat: add optional onClick prop to Toggle [#884](https://github.com/artsy/palette/pull/884) ([@mdole](https://github.com/mdole))

#### Authors: 1

- Matt Dole ([@mdole](https://github.com/mdole))

---

# v14.7.2 (Fri Mar 19 2021)

#### 🐛  Bug Fix

- fix(divider): resets default styling when presenting as hr [#886](https://github.com/artsy/palette/pull/886) ([@dzucconi](https://github.com/dzucconi))
- fix(divider): resets default styling when presenting as hr ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.7.1 (Fri Mar 19 2021)

#### 🐛  Bug Fix

- fix(inputs): sets font-family to sans [#885](https://github.com/artsy/palette/pull/885) ([@dzucconi](https://github.com/dzucconi))
- fix(inputs): sets font-family to sans ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.7.0 (Fri Mar 19 2021)

#### 🚀  Enhancement

- Deprecates Sans/Serif; mixes in textTransform to Text [#883](https://github.com/artsy/palette/pull/883) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(text): mixes in a text transform prop ([@dzucconi](https://github.com/dzucconi))
- chore(typography): deprecates sans and serif ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.6.1 (Thu Mar 18 2021)

#### 🐛  Bug Fix

- fix(input): corrects input types [#882](https://github.com/artsy/palette/pull/882) ([@dzucconi](https://github.com/dzucconi))
- fix(input): corrects input types ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.6.0 (Wed Mar 17 2021)

#### 🚀  Enhancement

- [v3] Input [#881](https://github.com/artsy/palette/pull/881) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(stories): inputs theme story ([@dzucconi](https://github.com/dzucconi))
- feat(select): allows select to also support a boolean error state ([@dzucconi](https://github.com/dzucconi))
- feat(input): v3 theme for input ([@dzucconi](https://github.com/dzucconi))
- chore(stories): checks in input stories ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(stories): checks in input stories [#880](https://github.com/artsy/palette/pull/880) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.5.1 (Tue Mar 16 2021)

#### 🐛  Bug Fix

- fix(select): fix type signature for deprecated exports [#879](https://github.com/artsy/palette/pull/879) ([@dzucconi](https://github.com/dzucconi))
- fix(select): partially apply variant manually to avoid non-portable type sig warning ([@dzucconi](https://github.com/dzucconi))
- chore(select): moves test file into tests dir ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.5.0 (Fri Mar 12 2021)

#### 🚀  Enhancement

- [v3] Select [#878](https://github.com/artsy/palette/pull/878) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(stories): disables chromatic for problematic stories ([@dzucconi](https://github.com/dzucconi))
- feat(select): v3 theme for select ([@dzucconi](https://github.com/dzucconi))
- chore(grid): deprecates grid ([@dzucconi](https://github.com/dzucconi))
- refactor(text): cleans up ([@dzucconi](https://github.com/dzucconi))
- refactor(button): clean up ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.4.0 (Fri Mar 12 2021)

#### 🚀  Enhancement

- [v3] Sup, ProgressBar, CarouselBar, Progress dashes [#877](https://github.com/artsy/palette/pull/877) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- chore(stories): cleans up ([@dzucconi](https://github.com/dzucconi))
- feat(progressdots): implements dash variant ([@dzucconi](https://github.com/dzucconi))
- feat: implements carousel bar ([@dzucconi](https://github.com/dzucconi))
- feat(progressbar): v3 theme for progress bar ([@dzucconi](https://github.com/dzucconi))
- feat(sup): improves sup implementation ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.3.0 (Wed Mar 10 2021)

#### 🚀  Enhancement

- [v3] Tabs, Stepper [#876](https://github.com/artsy/palette/pull/876) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(tabs): implements v3 theme for tabs ([@dzucconi](https://github.com/dzucconi))
- feat(theme): copy of theme util for inside of styled-components (and other non-react places) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.2.1 (Wed Mar 10 2021)

#### 🐛  Bug Fix

- refactor(tabs,stepper): refactors to utilize basetabs [#875](https://github.com/artsy/palette/pull/875) ([@dzucconi](https://github.com/dzucconi))
- refactor(tabs,stepper): simplifies ([@dzucconi](https://github.com/dzucconi))
- refactor(tabs,stepper): refactors to utilize basetabs ([@dzucconi](https://github.com/dzucconi))
- chore(stories): cleans up swiper stories ([@dzucconi](https://github.com/dzucconi))
- chore(stories): adds tabs/stepper stories ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(stories): adds tabs/stepper stories [#874](https://github.com/artsy/palette/pull/874) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.2.0 (Mon Mar 08 2021)

#### 🚀  Enhancement

- feat(breadcrumbs): implements breadcrumbs component [#873](https://github.com/artsy/palette/pull/873) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(breadcrumbs): implements breadcrumbs component ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v14.1.0 (Sat Mar 06 2021)

#### 🚀  Enhancement

- [v3] Pill [#872](https://github.com/artsy/palette/pull/872) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(pill): implements pill ([@dzucconi](https://github.com/dzucconi))
- refactor(button): cleans up ([@dzucconi](https://github.com/dzucconi))
- refactor: extracts shadows ([@dzucconi](https://github.com/dzucconi))
- fix(clickable): improves clickable reset ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.2.2 to v4.2.3 [#871](https://github.com/artsy/palette/pull/871) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v14.0.0 (Fri Mar 05 2021)

#### 💥  Breaking Change

- [v3] Banner/Message [#869](https://github.com/artsy/palette/pull/869) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(message): v3 message ([@dzucconi](https://github.com/dzucconi))
- feat(banner): v3 banner ([@dzucconi](https://github.com/dzucconi))
- feat(theme): adds alias for brand color ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.36.1 (Thu Mar 04 2021)

#### 🐛  Bug Fix

- Avoids failing specs on unthemed components [#870](https://github.com/artsy/palette/pull/870) ([@dzucconi](https://github.com/dzucconi))
- chore(tests): removes unnecessary mount wrapper ([@dzucconi](https://github.com/dzucconi))
- fix(tests): prevents unthemed buttons from throwing ([@dzucconi](https://github.com/dzucconi))
- feat(theme): adds util for switching configs based on theme ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.36.0 (Thu Mar 04 2021)

#### 🚀  Enhancement

- V3 Theme [#865](https://github.com/artsy/palette/pull/865) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(themes): fleshes out text variants ([@dzucconi](https://github.com/dzucconi))
- fix(theme): fixes types ([@dzucconi](https://github.com/dzucconi))
- fix(tests): provides theme for modal specs ([@dzucconi](https://github.com/dzucconi))
- fix(types): ignores ThemeContext import ([@dzucconi](https://github.com/dzucconi))
- refactor(button): splits out button into versioned implementations ([@dzucconi](https://github.com/dzucconi))
- chore(stories): adds button theme story ([@dzucconi](https://github.com/dzucconi))
- feat(buttons): implements v3 buttons ([@dzucconi](https://github.com/dzucconi))
- feat(spinner): supports currentColor in spinner ([@dzucconi](https://github.com/dzucconi))
- refactor(text): cleans up text tokens ([@dzucconi](https://github.com/dzucconi))
- feat(separator): allows separator color to be altered ([@dzucconi](https://github.com/dzucconi))
- chore(stories): persist theme selection ([@dzucconi](https://github.com/dzucconi))
- feat(theme): prunes/updates breakpoints; spacing scale ([@dzucconi](https://github.com/dzucconi))
- feat(gridcolumns): by default if using 12 col on mobile use smaller gaps ([@dzucconi](https://github.com/dzucconi))
- feat(themes): set up multiple theme support ([@dzucconi](https://github.com/dzucconi))
- chore(deps): bumps @types/styled-components ([@dzucconi](https://github.com/dzucconi))
- chore(stories): pulls over story updates from radio button ([@dzucconi](https://github.com/dzucconi))
- chore(stories): fleshes out entityheader stories ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- Pulling over stories from radio button [#868](https://github.com/artsy/palette/pull/868) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.35.2 (Wed Mar 03 2021)

#### 🐛  Bug Fix

- Revert "fix(a11y): makes radio / radio groups accessible" [#866](https://github.com/artsy/palette/pull/866) ([@dzucconi](https://github.com/dzucconi))
- Revert "fix(a11y): makes radio / radio groups accessible" ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.35.1 (Tue Mar 02 2021)

#### 🐛  Bug Fix

- fix(a11y): makes radio / radio groups accessible [#863](https://github.com/artsy/palette/pull/863) ([@dzucconi](https://github.com/dzucconi))
- fix(radio): re-break vertical alignment ([@dzucconi](https://github.com/dzucconi))
- fix(radio): makes radio / radio groups accessible ([@dzucconi](https://github.com/dzucconi))
- chore(stories): fleshes out entityheader stories ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.35.0 (Thu Feb 25 2021)

#### 🚀  Enhancement

- fix: check for empty strings in join [#864](https://github.com/artsy/palette/pull/864) ([@MounirDhahri](https://github.com/MounirDhahri))

#### 🏠  Internal

- chore(deps): update dep typescript from 4.1.5 to v4.2.2 [#862](https://github.com/artsy/palette/pull/862) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Mounir Dhahri ([@MounirDhahri](https://github.com/MounirDhahri))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v13.34.2 (Tue Feb 23 2021)

#### 🐛  Bug Fix

- fix(toggle): supports keyboard accessibility [#860](https://github.com/artsy/palette/pull/860) ([@dzucconi](https://github.com/dzucconi))
- fix(toggle): makes toggle keyboard accessible ([@dzucconi](https://github.com/dzucconi))
- refactor(toggle): converts to functional component; converts stories ([@dzucconi](https://github.com/dzucconi))
- chore(storybook): rewrites some stories with storybook-states ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(storybook): rewrites some stories with storybook-states [#859](https://github.com/artsy/palette/pull/859) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.34.1 (Thu Feb 18 2021)

#### 🐛  Bug Fix

- Change default Clickable type; minor checkbox fix [#858](https://github.com/artsy/palette/pull/858) ([@dzucconi](https://github.com/dzucconi))
- chore(chromatic): loosens up spec ([@dzucconi](https://github.com/dzucconi))
- fix(checkbox): prevents scrolling when using keyboard to select ([@dzucconi](https://github.com/dzucconi))
- fix(clickable): sets default type to button ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.34.0 (Thu Feb 18 2021)

#### 🚀  Enhancement

- fix(checkbox): makes a11y updates without using button [#857](https://github.com/artsy/palette/pull/857) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(checkbox): makes a11y updates without using button ([@dzucconi](https://github.com/dzucconi))
- Revert "Revert "fix(checkbox): makes checkbox accessible; supports box props"" ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.33.1 (Thu Feb 18 2021)

#### 🐛  Bug Fix

- Revert "fix(checkbox): makes checkbox accessible; supports box props" [#856](https://github.com/artsy/palette/pull/856) ([@dzucconi](https://github.com/dzucconi))
- Revert "fix(checkbox): makes checkbox accessible; supports box props" ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.33.0 (Wed Feb 17 2021)

#### 🚀  Enhancement

- fix(checkbox): makes checkbox accessible; supports box props [#855](https://github.com/artsy/palette/pull/855) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(checkbox): makes checkbox accessible; supports box props ([@dzucconi](https://github.com/dzucconi))
- chore(checkbox): adds stories for checkbox ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- chore(checkbox): adds stories for checkbox [#854](https://github.com/artsy/palette/pull/854) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.32.1 (Tue Feb 16 2021)

#### 🐛  Bug Fix

- Fix more tests ([@damassi](https://github.com/damassi))
- [storybook 6 upgrade]: Converts stories to CSF [#853](https://github.com/artsy/palette/pull/853) ([@dzucconi](https://github.com/dzucconi) [@damassi](https://github.com/damassi))
- chore(chromatic): upgrades chromatic ([@dzucconi](https://github.com/dzucconi))
- chore: passing specs ([@dzucconi](https://github.com/dzucconi))
- Ensure styled-components resolves to 4.3.2 ([@damassi](https://github.com/damassi))
- Remove netlify cms ([@damassi](https://github.com/damassi))
- chore(storybook): cleans up preview config ([@dzucconi](https://github.com/dzucconi))
- Ensure react resolves to react@17 ([@damassi](https://github.com/damassi))
- chore: upgrades babel/jest/etc ([@dzucconi](https://github.com/dzucconi))
- chore(storybook): upgrades to storybook 6 ([@dzucconi](https://github.com/dzucconi))
- chore(storybook): converts remaining by hand to csf ([@dzucconi](https://github.com/dzucconi))
- chore(storybook): runs codemod to convert to csf format ([@dzucconi](https://github.com/dzucconi))
- chore(storybook): ensures csf stories are loaded ([@dzucconi](https://github.com/dzucconi))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.32.0 (Fri Feb 12 2021)

#### 🚀  Enhancement

- feat: Add ability to pass in a component into Toggle label prop [#852](https://github.com/artsy/palette/pull/852) ([@annacarey](https://github.com/annacarey))

#### 🐛  Bug Fix

- Move label component inline in story ([@annacarey](https://github.com/annacarey))
- Add ability to pass in a component as well as a string to the label prop in Toggle ([@annacarey](https://github.com/annacarey))

#### Authors: 1

- Anna Carey ([@annacarey](https://github.com/annacarey))

---

# v13.31.0 (Thu Feb 11 2021)

#### 🚀  Enhancement

- Adds Money Icon [#851](https://github.com/artsy/palette/pull/851) ([@jo-rs](https://github.com/jo-rs))

#### 🐛  Bug Fix

- Adds Money Icon ([@jo-rs](https://github.com/jo-rs))

#### 🏠  Internal

- Update dep typescript from 4.1.4 to v4.1.5 [#850](https://github.com/artsy/palette/pull/850) ([@renovate-bot](https://github.com/renovate-bot))
- Update dep typescript from 4.1.3 to v4.1.4 [#849](https://github.com/artsy/palette/pull/849) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Joel Rosenblatt ([@jo-rs](https://github.com/jo-rs))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v13.30.0 (Wed Feb 03 2021)

#### 🚀  Enhancement

- feat: Add chevronSize prop to Toggle component [#846](https://github.com/artsy/palette/pull/846) ([@annacarey](https://github.com/annacarey))

#### Authors: 1

- Anna Carey ([@annacarey](https://github.com/annacarey))

---

# v13.29.1 (Fri Jan 15 2021)

#### 🐛  Bug Fix

- fix(button): ensure loading styles take precedence over hover [#842](https://github.com/artsy/palette/pull/842) ([@dzucconi](https://github.com/dzucconi))
- fix(button): ensure loading styles take precedence over hover ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.29.0 (Fri Jan 15 2021)

#### 🚀  Enhancement

- fix(button): button updates [#841](https://github.com/artsy/palette/pull/841) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- refactor(button): cleans up ([@dzucconi](https://github.com/dzucconi))
- refactor(button): converts color themes to use styled-system variants ([@dzucconi](https://github.com/dzucconi))
- chore(button): removes unused code ([@dzucconi](https://github.com/dzucconi))
- chore(button): clean up stories ([@dzucconi](https://github.com/dzucconi))
- refactor(button): removes longesttext ([@dzucconi](https://github.com/dzucconi))
- fix(button): types and clean up ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.28.0 (Fri Jan 08 2021)

#### 🚀  Enhancement

- feat(pagination): includes page number on next callback [#840](https://github.com/artsy/palette/pull/840) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- feat(pagination): includes page number on next callback ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.27.2 (Thu Jan 07 2021)

#### 🐛  Bug Fix

- fix: Populate pagination next/prev hrefs correctly [#839](https://github.com/artsy/palette/pull/839) ([@jonallured](https://github.com/jonallured))
- Correctly populate hrefs for next/prev links ([@jonallured](https://github.com/jonallured))
- Pin dependencies ([@renovate-bot](https://github.com/renovate-bot))
- Fix babel build failure ([@zephraph](https://github.com/zephraph))
- Update babel ([@renovate-bot](https://github.com/renovate-bot))

#### 🏠  Internal

- Pin dependencies [#826](https://github.com/artsy/palette/pull/826) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))
- Update babel [#837](https://github.com/artsy/palette/pull/837) ([@renovate-bot](https://github.com/renovate-bot) [@zephraph](https://github.com/zephraph) [@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 4

- [@renovate[bot]](https://github.com/renovate[bot])
- Jon Allured ([@jonallured](https://github.com/jonallured))
- Justin Bennett ([@zephraph](https://github.com/zephraph))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v13.27.1 (Wed Jan 06 2021)

#### 🐛  Bug Fix

- Fix failing storybook tests by guarding getHref call [#838](https://github.com/artsy/palette/pull/838) ([@zephraph](https://github.com/zephraph))
- Fix failing storybook tests by guarding getHref call ([@zephraph](https://github.com/zephraph))
- chore(deps): update dep typescript from 4.1.2 to v4.1.3 ([@renovate-bot](https://github.com/renovate-bot))

#### 🏠  Internal

- Update yarn orb from 4.0.2 to v5 [#811](https://github.com/artsy/palette/pull/811) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))
- Update dep typescript from 4.1.2 to v4.1.3 [#828](https://github.com/artsy/palette/pull/828) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 3

- [@renovate[bot]](https://github.com/renovate[bot])
- Justin Bennett ([@zephraph](https://github.com/zephraph))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v13.27.0 (Tue Jan 05 2021)

#### 🚀  Enhancement

- refactor: Use links for pagination [#824](https://github.com/artsy/palette/pull/824) ([@jonallured](https://github.com/jonallured) [@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- Add test around getHref ([@damassi](https://github.com/damassi))
- Update structure a bit ([@damassi](https://github.com/damassi))
- WIP: next next/prev buttons working ([@jonallured](https://github.com/jonallured))
- WIP ([@jonallured](https://github.com/jonallured))
- Bubble click events ([@jonallured](https://github.com/jonallured))
- Use better props name ([@jonallured](https://github.com/jonallured))
- Use links for pagination ([@jonallured](https://github.com/jonallured))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Jon Allured ([@jonallured](https://github.com/jonallured))

---

# v13.26.4 (Tue Jan 05 2021)

#### 🐛  Bug Fix

- Add global styles for lists [#834](https://github.com/artsy/palette/pull/834) ([@eessex](https://github.com/eessex))
- add global ol/ul styles ([@eessex](https://github.com/eessex))
- add description list margins to global styles ([@eessex](https://github.com/eessex))

#### Authors: 1

- Eve Essex ([@eessex](https://github.com/eessex))

---

# v13.26.3 (Thu Dec 17 2020)

#### 🐛  Bug Fix

- feat: add circle fill icon [#833](https://github.com/artsy/palette/pull/833) ([@mdole](https://github.com/mdole))
- feat: add circle fill icon ([@mdole](https://github.com/mdole))

#### Authors: 1

- Matt Dole ([@mdole](https://github.com/mdole))

---

# v13.26.2 (Thu Dec 17 2020)

#### 🐛  Bug Fix

- fix(skeleton): implements appropriate scaling for multiline texts [#832](https://github.com/artsy/palette/pull/832) ([@dzucconi](https://github.com/dzucconi))
- fix(skeleton): implements appropriate scaling for multiline texts ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.26.1 (Tue Dec 15 2020)

#### 🐛  Bug Fix

- fix(swiper): inlines default margins to simplify setting alternatives [#831](https://github.com/artsy/palette/pull/831) ([@dzucconi](https://github.com/dzucconi))
- fix(swiper): inlines default margins to simplify setting alternatives ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.26.0 (Tue Dec 15 2020)

#### 🚀  Enhancement

- fix(basetabs): support nested fragments [#830](https://github.com/artsy/palette/pull/830) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(basetabs): support nested fragments ([@dzucconi](https://github.com/dzucconi))
- feat(helpers): adds flattenChildren ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.25.1 (Mon Dec 14 2020)

#### 🐛  Bug Fix

- fix(tabs): converts back to anys [#829](https://github.com/artsy/palette/pull/829) ([@dzucconi](https://github.com/dzucconi))
- fix(tabs): converts back to anys ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.25.0 (Mon Dec 14 2020)

#### 🚀  Enhancement

- feat: implements base tabs [#821](https://github.com/artsy/palette/pull/821) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- fix(tabs): minor styling updates for consistency ([@dzucconi](https://github.com/dzucconi))
- chore(stories): adds stories for tabs and stepper ([@dzucconi](https://github.com/dzucconi))
- feat: implements base tabs component ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.24.2 (Wed Dec 09 2020)

#### 🐛  Bug Fix

- feature: Development Dependencies [#825](https://github.com/artsy/palette/pull/825) ([@icirellik](https://github.com/icirellik))
- feature: Development Dependencies ([@icirellik](https://github.com/icirellik))

#### Authors: 1

- Cameron Rollheiser ([@icirellik](https://github.com/icirellik))

---

# v13.24.1 (Mon Dec 07 2020)

#### 🐛  Bug Fix

- Improve coverage for the pages part ([@jonallured](https://github.com/jonallured))
- chore(webfonts): update webfonts domain references [#823](https://github.com/artsy/palette/pull/823) ([@dzucconi](https://github.com/dzucconi))
- Fix linting issues ([@jonallured](https://github.com/jonallured))
- Add page cursor interfaces ([@jonallured](https://github.com/jonallured))
- Fix some linter misses ([@jonallured](https://github.com/jonallured))
- Extract components for first/last page ([@jonallured](https://github.com/jonallured))
- Remove a level of indirection ([@jonallured](https://github.com/jonallured))
- Promote RenderPage to React component ([@jonallured](https://github.com/jonallured))
- Simplify dot dot dot component ([@jonallured](https://github.com/jonallured))
- chore(webfonts): update webfonts domain references ([@dzucconi](https://github.com/dzucconi))
- Make buttons more similar across sizes ([@jonallured](https://github.com/jonallured))
- Migrate prev/next tests to large component ([@jonallured](https://github.com/jonallured))
- Remove setup that I don't understand ([@jonallured](https://github.com/jonallured))
- Make buttons look more alike ([@jonallured](https://github.com/jonallured))
- Extract factory for mounting the component ([@jonallured](https://github.com/jonallured))
- Reduce indirection around opacity for buttons ([@jonallured](https://github.com/jonallured))
- Extract button components ([@jonallured](https://github.com/jonallured))
- Cover more cases and simplify test setup ([@jonallured](https://github.com/jonallured))
- Split pagination components into separate files ([@jonallured](https://github.com/jonallured))

#### 🏠  Internal

- refactor: Reorganize pagination and improve tests [#822](https://github.com/artsy/palette/pull/822) ([@jonallured](https://github.com/jonallured))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- Jon Allured ([@jonallured](https://github.com/jonallured))

---

# v13.24.0 (Mon Nov 30 2020)

#### 🚀  Enhancement

- feat: update message component [#820](https://github.com/artsy/palette/pull/820) ([@mdole](https://github.com/mdole))

#### 🐛  Bug Fix

- feat: new Message variants ([@mdole](https://github.com/mdole))

#### Authors: 1

- Matt Dole ([@mdole](https://github.com/mdole))

---

# v13.23.0 (Tue Nov 24 2020)

#### 🚀  Enhancement

- feat: update colors [#819](https://github.com/artsy/palette/pull/819) ([@mdole](https://github.com/mdole))

#### 🐛  Bug Fix

- feat: update colors ([@mdole](https://github.com/mdole))
- Update dep typescript from 4.0.3 to v4.1.2 ([@renovate-bot](https://github.com/renovate-bot))

#### 🏠  Internal

- Update dep typescript from 4.0.3 to v4.1.2 [#808](https://github.com/artsy/palette/pull/808) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 3

- [@renovate[bot]](https://github.com/renovate[bot])
- Matt Dole ([@mdole](https://github.com/mdole))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v13.22.0 (Fri Nov 20 2020)

#### 🚀  Enhancement

- fix: Use ResponsiveValue helper [#816](https://github.com/artsy/palette/pull/816) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix: Use ResponsiveValue helper ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v13.21.0 (Fri Nov 20 2020)

#### 🚀  Enhancement

- fix: Fix type def [#815](https://github.com/artsy/palette/pull/815) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix: Fix type def ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v13.20.0 (Fri Nov 20 2020)

#### 🚀  Enhancement

- fix: [Text] update variant type to support array syntax [#814](https://github.com/artsy/palette/pull/814) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix: [Text] update variant type to support array syntax ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v13.19.0 (Sat Nov 14 2020)

#### 🚀  Enhancement

- Add new icons for /consign2 [#813](https://github.com/artsy/palette/pull/813) ([@williardx](https://github.com/williardx))

#### 🐛  Bug Fix

- Add new icons ([@williardx](https://github.com/williardx))

#### Authors: 1

- Will Doenlen ([@williardx](https://github.com/williardx))

---

# v13.18.0 (Thu Nov 12 2020)

#### 🚀  Enhancement

- trivial: add target to MenuItem [#812](https://github.com/artsy/palette/pull/812) ([@eessex](https://github.com/eessex))

#### 🐛  Bug Fix

- add target to MenuItem ([@eessex](https://github.com/eessex))

#### Authors: 1

- Eve Essex ([@eessex](https://github.com/eessex))

---

# v13.17.0 (Mon Nov 09 2020)

#### 🚀  Enhancement

- feat: support boolean errors for Input [#810](https://github.com/artsy/palette/pull/810) ([@mdole](https://github.com/mdole))

#### 🐛  Bug Fix

- feat: support boolean errors for Input ([@mdole](https://github.com/mdole))

#### Authors: 1

- Matt Dole ([@mdole](https://github.com/mdole))

---

# v13.16.0 (Fri Oct 30 2020)

#### 🚀  Enhancement

- Includes documentation on how to create a responsive image [#809](https://github.com/artsy/palette/pull/809) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Includes documentation on how to create a responsive image ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.15.0 (Mon Oct 26 2020)

#### 🚀  Enhancement

- feat: Add blue100 color [#807](https://github.com/artsy/palette/pull/807) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat: Add blue100 color ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v13.13.0 (Fri Oct 23 2020)

#### 🚀  Enhancement

- fix: All icon to be filled [#803](https://github.com/artsy/palette/pull/803) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- fix: All icon to be filled ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v13.12.0 (Fri Oct 23 2020)

#### 🚀  Enhancement

- feat: [Icons] Add TriangleDownIcon [#802](https://github.com/artsy/palette/pull/802) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- feat: [Icons] Add TriangleDownIcon ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v13.11.0 (Tue Oct 20 2020)

#### 🚀  Enhancement

- [PCI-3] Supports props based navigation in Swiper/Carousel [#799](https://github.com/artsy/palette/pull/799) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Supports props based navigation in Swiper/Carousel ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.10.1 (Tue Oct 13 2020)

#### 🐛  Bug Fix

- Swiper and Carousel cells should have normal white-space [#797](https://github.com/artsy/palette/pull/797) ([@dzucconi](https://github.com/dzucconi))
- Swiper and Carousel cells should have normal white-space ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.10.0 (Fri Oct 09 2020)

#### 🚀  Enhancement

- feat: add drag icon to icon library [#796](https://github.com/artsy/palette/pull/796) ([@mdole](https://github.com/mdole))

#### 🐛  Bug Fix

- feat: add drag icon to icon library ([@mdole](https://github.com/mdole))

#### Authors: 1

- Matt Dole ([@mdole](https://github.com/mdole))

---

# v13.9.1 (Thu Oct 08 2020)

#### 🐛  Bug Fix

- GridColumns typing [#795](https://github.com/artsy/palette/pull/795) ([@dzucconi](https://github.com/dzucconi))
- Omits gridTemplateColumns; since it cannot be set ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.9.0 (Thu Oct 08 2020)

#### 🚀  Enhancement

- Implements GridColumns [#794](https://github.com/artsy/palette/pull/794) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Lowers diff sensitivity on cards ([@dzucconi](https://github.com/dzucconi))
- Implements GridColumns ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.8.0 (Tue Oct 06 2020)

#### 🚀  Enhancement

- style(FX-2320): Remove XS horizontal padding within tabs container [#793](https://github.com/artsy/palette/pull/793) ([@dblandin](https://github.com/dblandin))

#### Authors: 1

- Devon Blandin ([@dblandin](https://github.com/dblandin))

---

# v13.7.5 (Thu Oct 01 2020)

#### 🐛  Bug Fix

- [FX-2317] Fixes pagination arrow alignment [#791](https://github.com/artsy/palette/pull/791) ([@dzucconi](https://github.com/dzucconi))
- Fixes pagination arrow alignment ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.7.4 (Thu Oct 01 2020)

#### 🐛  Bug Fix

- Converts ReadMore class component to functional component [#790](https://github.com/artsy/palette/pull/790) ([@dzucconi](https://github.com/dzucconi))
- Converts ReadMore class component to functional component ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.7.3 (Thu Sep 24 2020)

#### 🐛  Bug Fix

- Only calls onChange when the active index actually changes [#789](https://github.com/artsy/palette/pull/789) ([@dzucconi](https://github.com/dzucconi))
- Uses deterministic example images to prevent visual specs from triggering ([@dzucconi](https://github.com/dzucconi))
- Only calls onChange when the active index actually changes ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.7.2 (Wed Sep 23 2020)

#### 🐛  Bug Fix

- Ensures consistent typography in EntityHeaders [#788](https://github.com/artsy/palette/pull/788) ([@dzucconi](https://github.com/dzucconi))
- Ensures consistent typography in EntityHeaders ([@dzucconi](https://github.com/dzucconi))
- Disables spurious spec ([@dzucconi](https://github.com/dzucconi))
- Removes primitives indirection ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- Removes primitives indirection [#787](https://github.com/artsy/palette/pull/787) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.7.1 (Tue Sep 22 2020)

#### 🐛  Bug Fix

- Removed white background from XCircleIcon [#786](https://github.com/artsy/palette/pull/786) ([@lilyfromseattle](https://github.com/lilyfromseattle))
- removed white background from x circle icon ([@lilyfromseattle](https://github.com/lilyfromseattle))

#### Authors: 1

- Lily Pace ([@lilyfromseattle](https://github.com/lilyfromseattle))

---

# v13.7.0 (Tue Sep 22 2020)

#### 🚀  Enhancement

- [FX-2245] ReadMore styling [#782](https://github.com/artsy/palette/pull/782) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Allows ReadMore to accept HTML-styling ([@dzucconi](https://github.com/dzucconi))
- Supports styling of children in HTML ([@dzucconi](https://github.com/dzucconi))
- Mixes in common clickable props ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.6.0 (Tue Sep 22 2020)

#### 🚀  Enhancement

- Sets default Text variant to `"text"` [#785](https://github.com/artsy/palette/pull/785) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Sets default Text variant to `"text"` ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.5.0 (Mon Sep 21 2020)

#### 🚀  Enhancement

- Add receipt and pending icon [#784](https://github.com/artsy/palette/pull/784) ([@lilyfromseattle](https://github.com/lilyfromseattle))

#### 🐛  Bug Fix

- added receipt and pending icon ([@lilyfromseattle](https://github.com/lilyfromseattle))

#### Authors: 1

- Lily Pace ([@lilyfromseattle](https://github.com/lilyfromseattle))

---

# v13.4.1 (Mon Sep 21 2020)

#### 🐛  Bug Fix

- Fixes horizontal margin overrides [#783](https://github.com/artsy/palette/pull/783) ([@dzucconi](https://github.com/dzucconi))
- Fixes horizontal margin overrides ([@dzucconi](https://github.com/dzucconi))
- Update dep typescript from 3.7.5 to v4 ([@renovate-bot](https://github.com/renovate-bot))
- Fix path build issue ([@zephraph](https://github.com/zephraph))

#### 🏠  Internal

- Update dep typescript from 3.7.5 to v4 [#758](https://github.com/artsy/palette/pull/758) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))
- Update gatsby plugins to be node v12 compatible [#781](https://github.com/artsy/palette/pull/781) ([@zephraph](https://github.com/zephraph))

#### Authors: 4

- [@renovate[bot]](https://github.com/renovate[bot])
- Damon ([@dzucconi](https://github.com/dzucconi))
- Justin Bennett ([@zephraph](https://github.com/zephraph))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v13.4.0 (Tue Sep 15 2020)

#### 🚀  Enhancement

- Exposes text variants under theme [#778](https://github.com/artsy/palette/pull/778) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Exposes text variants under theme ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.3.0 (Mon Sep 14 2020)

#### 🚀  Enhancement

- Cleans up Cards; support all image attributes [#776](https://github.com/artsy/palette/pull/776) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Cleans up Cards; support all image attributes ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.2.0 (Mon Sep 14 2020)

#### 🚀  Enhancement

- Add 1.5 and 5 to our spacing units [#777](https://github.com/artsy/palette/pull/777) ([@zephraph](https://github.com/zephraph))

#### 🐛  Bug Fix

- Add 1.5 and 5 to our spacing units ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v13.1.0 (Thu Sep 03 2020)

#### 🚀  Enhancement

- [Carousel/Swiper] Allows structural components to be injected [#767](https://github.com/artsy/palette/pull/767) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Allows structural components to be injected ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v13.0.0 (Thu Sep 03 2020)

#### 💥  Breaking Change

- [MX-444] Remove iOS components [#766](https://github.com/artsy/palette/pull/766) ([@MounirDhahri](https://github.com/MounirDhahri))

#### 🐛  Bug Fix

- removed Modal.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed eigen scripts from package.json ([@MounirDhahri](https://github.com/MounirDhahri))
- updated documentation ([@MounirDhahri](https://github.com/MounirDhahri))
- removed LabeledRange.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed ModalBase.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Radio.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed ios svg icons ([@MounirDhahri](https://github.com/MounirDhahri))
- removed typescript configuration on ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed ProgressBarTimer.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Slider.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Platfrom.ios and Primitives.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Tooltip.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Toggle.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed TextArea.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Text.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Tags.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Tabs.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Stepper.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed StaticCountdownTimer.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed SelectableBorderBox.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Spinner.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed ProgressBar.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed PriceRange.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Pagination.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- remove type-check-ios from ci type-check ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Menu.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Link.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed LineChart.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Input.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Image.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed HTML.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Grid.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed EntityHeader.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed DonutChart.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Dialog.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Datavis.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Colors.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Collapse.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Clickable.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Checkbox.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Caroussel.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed cssgrid.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Cards.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed  Button.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Radiogroup.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Borderbox.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Barchart.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Banner.ios ([@MounirDhahri](https://github.com/MounirDhahri))
- removed Avatar.ios ([@MounirDhahri](https://github.com/MounirDhahri))

#### Authors: 1

- Mounir Dhahri ([@MounirDhahri](https://github.com/MounirDhahri))

---

# v12.5.0 (Tue Sep 01 2020)

#### 🚀  Enhancement

- Move paginateCarousel Rename to Original File [#765](https://github.com/artsy/palette/pull/765) ([@icirellik](https://github.com/icirellik))

#### 🐛  Bug Fix

- Move paginateCarousel Rename to Original File ([@icirellik](https://github.com/icirellik))

#### Authors: 1

- Cameron Rollheiser ([@icirellik](https://github.com/icirellik))

---

# v12.4.3 (Mon Aug 31 2020)

#### 🐛  Bug Fix

- Adds support for `srcSet` [#764](https://github.com/artsy/palette/pull/764) ([@dzucconi](https://github.com/dzucconi))
- Adds support for `srcSet` ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v12.4.2 (Mon Aug 31 2020)

#### 🐛  Bug Fix

- Pass through done prop on SkeletonText [#763](https://github.com/artsy/palette/pull/763) ([@dzucconi](https://github.com/dzucconi))
- Pass through done prop on SkeletonText ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v12.4.1 (Thu Aug 27 2020)

#### 🐛  Bug Fix

- Updates carousel arrow sizing and color [#762](https://github.com/artsy/palette/pull/762) ([@dzucconi](https://github.com/dzucconi))
- Updates carousel arrow sizing and color ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v12.4.0 (Thu Aug 27 2020)

#### 🚀  Enhancement

- [FX-2175] Swiper, ProgressDots, custom navigation Carousel buttons [#761](https://github.com/artsy/palette/pull/761) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Fixes initial onChange handling ([@dzucconi](https://github.com/dzucconi))
- Supports custom navigation arrows ([@dzucconi](https://github.com/dzucconi))
- Implements Swiper ([@dzucconi](https://github.com/dzucconi))
- Implements ProgressDots ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v12.3.0 (Tue Aug 25 2020)

#### 🚀  Enhancement

- [FX-2175] Carousel [#760](https://github.com/artsy/palette/pull/760) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Implements Carousel ([@dzucconi](https://github.com/dzucconi))
- Implements Skip ([@dzucconi](https://github.com/dzucconi))
- Implements VisuallyHidden ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v12.2.0 (Mon Aug 24 2020)

#### 🚀  Enhancement

- Chore - Cleanup Dependency Cycles [#759](https://github.com/artsy/palette/pull/759) ([@icirellik](https://github.com/icirellik))

#### 🐛  Bug Fix

- Chore - Cleanup Dependency Cycles ([@icirellik](https://github.com/icirellik))

#### Authors: 1

- Cameron Rollheiser ([@icirellik](https://github.com/icirellik))

---

# v12.1.0 (Fri Aug 14 2020)

#### 🚀  Enhancement

- Updates avatar size and typography for entity header small variant [#757](https://github.com/artsy/palette/pull/757) ([@sweir27](https://github.com/sweir27))

#### 🐛  Bug Fix

- Updates avatar size and typography for entity header small variant ([@sweir27](https://github.com/sweir27))

#### Authors: 1

- Sarah Weir ([@sweir27](https://github.com/sweir27))

---

# v12.0.2 (Thu Aug 13 2020)

#### 🐛  Bug Fix

- Removes lodash [#755](https://github.com/artsy/palette/pull/755) ([@dzucconi](https://github.com/dzucconi))
- Fixes exports ([@dzucconi](https://github.com/dzucconi))
- Removes lodash ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- Pin dep @types/debounce from ^1.2.0 to 1.2.0 [#756](https://github.com/artsy/palette/pull/756) ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v12.0.1 (Wed Aug 05 2020)

#### 🐛  Bug Fix

- Adds remaining block-level elements that can come from rendered Markdown [#752](https://github.com/artsy/palette/pull/752) ([@dzucconi](https://github.com/dzucconi))
- Adds remaining block-level elements that can come from rendered Markdown ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v12.0.0 (Mon Aug 03 2020)

#### 💥  Breaking Change

- Reverts serif removal, migrates HTML to new typography [#751](https://github.com/artsy/palette/pull/751) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Moves HTML to new typography ([@dzucconi](https://github.com/dzucconi))
- Revert "Removes serif option" ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.15.0 (Fri Jul 31 2020)

#### 🚀  Enhancement

- Implements ResponsiveBox [#747](https://github.com/artsy/palette/pull/747) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Supports 100% maxWidth ([@dzucconi](https://github.com/dzucconi))
- Implements ResponsiveBox ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.13.1 (Tue Jul 28 2020)

#### 🐛  Bug Fix

- Removes shadow on iOS [#744](https://github.com/artsy/palette/pull/744) ([@dzucconi](https://github.com/dzucconi))
- Removes shadow on iOS ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.13.0 (Thu Jul 23 2020)

#### 🚀  Enhancement

- Implements Skeleton [#741](https://github.com/artsy/palette/pull/741) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Adds docs for Skeleton ([@dzucconi](https://github.com/dzucconi))
- Adds support for SkeletonText; specifies SkeletonBox ([@dzucconi](https://github.com/dzucconi))
- Improves Text typing ([@dzucconi](https://github.com/dzucconi))
- Makes the splitProps function generic ([@dzucconi](https://github.com/dzucconi))
- Implements Skeleton ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.11.1 (Wed Jul 22 2020)

#### 🐛  Bug Fix

- Breakpoints aliasing [#738](https://github.com/artsy/palette/pull/738) ([@dzucconi](https://github.com/dzucconi))
- Compose props and adds types ([@dzucconi](https://github.com/dzucconi))
- Aliases breakpoints so as to expose object syntax ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.11.0 (Tue Jul 21 2020)

#### 🚀  Enhancement

- Implements utility for breaking apart layout props [#737](https://github.com/artsy/palette/pull/737) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Implements utility for breaking apart layout props ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.10.0 (Mon Jul 20 2020)

#### 🚀  Enhancement

- Text extends Box [#736](https://github.com/artsy/palette/pull/736) ([@dzucconi](https://github.com/dzucconi))
- Removes serif from Text [#734](https://github.com/artsy/palette/pull/734) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Has Text extend Box ([@dzucconi](https://github.com/dzucconi))
- Updates to support styled-components v5 ([@dzucconi](https://github.com/dzucconi))
- Cleans up after styled-system upgrade ([@dzucconi](https://github.com/dzucconi))
- Supports overrides on variants ([@dzucconi](https://github.com/dzucconi))
- Adds overflowEllipsis ([@dzucconi](https://github.com/dzucconi))
- Removes serif option ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.9.0 (Fri Jul 17 2020)

#### 🚀  Enhancement

- GALL-2970 Add web version of medium card [#731](https://github.com/artsy/palette/pull/731) ([@ansor4](https://github.com/ansor4))

#### 🐛  Bug Fix

- Add web version of medium_card ([@ansor4](https://github.com/ansor4))

#### Authors: 1

- Anson Wang ([@ansor4](https://github.com/ansor4))

---

# v11.8.1 (Wed Jul 15 2020)

#### 🐛  Bug Fix

- Upgrades styled-bootstrap-grid; removes overflow: hidden [#716](https://github.com/artsy/palette/pull/716) ([@dzucconi](https://github.com/dzucconi))
- Removes overflow: hidden from grid container ([@dzucconi](https://github.com/dzucconi))
- Upgrades styled-bootstrap-grid ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.8.0 (Tue Jul 14 2020)

#### 🚀  Enhancement

- addinging some grammer :p [#728](https://github.com/artsy/palette/pull/728) ([@pvinis](https://github.com/pvinis))

#### 🐛  Bug Fix

- Upping the diffThreshold a bit more for BarChart ([@pvinis](https://github.com/pvinis))
- Prevents Chromatic spec diffs ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- Upping the diffThreshold a bit more for BarChart [#729](https://github.com/artsy/palette/pull/729) ([@pvinis](https://github.com/pvinis))
- [chore] Prevents Chromatic spec diffs [#727](https://github.com/artsy/palette/pull/727) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v11.7.0 (Tue Jul 07 2020)

#### 🚀  Enhancement

- [Part of GALL-2970] - adding a small card to web view [#723](https://github.com/artsy/palette/pull/723) ([@oxaudo](https://github.com/oxaudo))

#### 🐛  Bug Fix

- add option to set CardTag position ([@oxaudo](https://github.com/oxaudo))
- Merge branch 'master' of github.com:artsy/palette into updates ([@oxaudo](https://github.com/oxaudo))
- adding a small card to web view ([@oxaudo](https://github.com/oxaudo))

#### Authors: 1

- Oksana ([@oxaudo](https://github.com/oxaudo))

---

# v11.6.2 (Tue Jul 07 2020)

#### 🐛  Bug Fix

- Removes theme from config [#725](https://github.com/artsy/palette/pull/725) ([@dzucconi](https://github.com/dzucconi))
- Removes theme ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.6.1 (Tue Jul 07 2020)

#### 🐛  Bug Fix

- Removes blanket focus disable [#724](https://github.com/artsy/palette/pull/724) ([@dzucconi](https://github.com/dzucconi))
- Removes blanket focus disable ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.6.0 (Thu Jul 02 2020)

#### 🚀  Enhancement

- Supports a small entity header design via "smallVariant" prop [#722](https://github.com/artsy/palette/pull/722) ([@ashleyjelks](https://github.com/ashleyjelks))

#### 🐛  Bug Fix

- renames prop ([@ashleyjelks](https://github.com/ashleyjelks))
- supports a small entity header via "small" prop ([@ashleyjelks](https://github.com/ashleyjelks))

#### Authors: 1

- Ashley Jelks ([@ashleyjelks](https://github.com/ashleyjelks))

---

# v11.5.0 (Wed Jul 01 2020)

#### 🚀  Enhancement

- Add new BriefcaseIcon to palette system [#721](https://github.com/artsy/palette/pull/721) ([@jpotts244](https://github.com/jpotts244))

#### 🐛  Bug Fix

- Add new BriefcaseIcon to palette system ([@jpotts244](https://github.com/jpotts244))

#### Authors: 1

- Jacqueline Potts ([@jpotts244](https://github.com/jpotts244))

---

# v11.4.0 (Tue Jun 30 2020)

#### 🚀  Enhancement

- [FX-2067] Implements Text.ios [#719](https://github.com/artsy/palette/pull/719) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Sets runInBand flag ([@dzucconi](https://github.com/dzucconi))
- Utilize the existing font names ([@dzucconi](https://github.com/dzucconi))
- Implements Text.ios ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.3.0 (Mon Jun 29 2020)

#### 🚀  Enhancement

- Add cards from viewing rooms [#717](https://github.com/artsy/palette/pull/717) ([@pvinis](https://github.com/pvinis))

#### 🐛  Bug Fix

- Bumps react-lazy-load-image-component [#718](https://github.com/artsy/palette/pull/718) ([@dzucconi](https://github.com/dzucconi))
- Bumps react-lazy-load-image-component ([@dzucconi](https://github.com/dzucconi))

#### Authors: 2

- Damon ([@dzucconi](https://github.com/dzucconi))
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v11.2.0 (Fri Jun 26 2020)

#### 🚀  Enhancement

- [web] Implements new typographic styles [#714](https://github.com/artsy/palette/pull/714) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Implements new typographic styles ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.1.1 (Wed Jun 24 2020)

#### 🐛  Bug Fix

- Disables knobs to remove dependency on emotion typings [#715](https://github.com/artsy/palette/pull/715) ([@dzucconi](https://github.com/dzucconi))
- Disables knobs to remove dependency on emotion typings ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.1.0 (Mon Jun 22 2020)

#### 🚀  Enhancement

- Remove margin on Toggle component [#712](https://github.com/artsy/palette/pull/712) ([@williardx](https://github.com/williardx))

#### 🐛  Bug Fix

- Fixes random images breaking visual specs by utilizing seed param ([@dzucconi](https://github.com/dzucconi))
- Configures viewport to use our breakpoints in addition to the defaults ([@dzucconi](https://github.com/dzucconi))
- Upgrades Storybook packages ([@dzucconi](https://github.com/dzucconi))
- Remove margin on Toggle component ([@williardx](https://github.com/williardx))

#### 🏠  Internal

- Pin dependencies [#699](https://github.com/artsy/palette/pull/699) ([@renovate-bot](https://github.com/renovate-bot))
- [chore] Minor Storybook updates [#713](https://github.com/artsy/palette/pull/713) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 3

- Damon ([@dzucconi](https://github.com/dzucconi))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))
- Will Doenlen ([@williardx](https://github.com/williardx))

---

# v11.0.2 (Tue Jun 16 2020)

#### 🐛  Bug Fix

- BorderBox should support custom padding [#711](https://github.com/artsy/palette/pull/711) ([@oxaudo](https://github.com/oxaudo))
- BorderBox should support custom padding ([@oxaudo](https://github.com/oxaudo))

#### Authors: 1

- Oksana ([@oxaudo](https://github.com/oxaudo))

---

# v11.0.1 (Mon Jun 15 2020)

#### 🐛  Bug Fix

- Fixes avatars in React Native [#710](https://github.com/artsy/palette/pull/710) ([@dzucconi](https://github.com/dzucconi))
- Fixes avatars in React Native ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v11.0.0 (Mon Jun 15 2020)

#### 💥  Breaking Change

- Unifies Box/Flex [#707](https://github.com/artsy/palette/pull/707) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Avoids changing picture on every PR ([@dzucconi](https://github.com/dzucconi))
- Unifies props interfaces for Box/Flex ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v10.1.0 (Sat Jun 06 2020)

#### 🚀  Enhancement

- allow customizing border color for BorderBox [#708](https://github.com/artsy/palette/pull/708) ([@oxaudo](https://github.com/oxaudo))

#### 🐛  Bug Fix

- allow customizing border color for BorderBox ([@oxaudo](https://github.com/oxaudo))

#### Authors: 1

- Oksana ([@oxaudo](https://github.com/oxaudo))

---

# v10.0.0 (Wed Jun 03 2020)

#### 💥  Breaking Change

- Upgrades to styled-system v5 [#705](https://github.com/artsy/palette/pull/705) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Sorts properties ([@dzucconi](https://github.com/dzucconi))
- Adds stories for Image ([@dzucconi](https://github.com/dzucconi))
- Upgrades to styled-system v5 ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v9.13.0 (Mon Jun 01 2020)

#### 🚀  Enhancement

- Update avatar component to use Sans [#706](https://github.com/artsy/palette/pull/706) ([@xtina-starr](https://github.com/xtina-starr))

#### 🐛  Bug Fix

- Change avatar from from serif to sans ([@xtina-starr](https://github.com/xtina-starr))

#### Authors: 1

- Christina ([@xtina-starr](https://github.com/xtina-starr))

---

# v9.12.0 (Fri May 29 2020)

#### 🚀  Enhancement

- Clickable [#703](https://github.com/artsy/palette/pull/703) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Implements Clickable ([@dzucconi](https://github.com/dzucconi))
- Composes and exports the boxMixin ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v9.11.0 (Fri May 29 2020)

#### 🚀  Enhancement

- adding `endash` and a `range` helper [#702](https://github.com/artsy/palette/pull/702) ([@pvinis](https://github.com/pvinis))

#### 🐛  Bug Fix

- better import ([@pvinis](https://github.com/pvinis))
- Merge branch 'master' into adding-endash ([@pvinis](https://github.com/pvinis))
- no need to render it actually ([@pvinis](https://github.com/pvinis))
- adding `endash` and a `range` helper ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v9.10.0 (Thu May 28 2020)

#### 🚀  Enhancement

- Update Modal to use Sans title [#700](https://github.com/artsy/palette/pull/700) ([@dblandin](https://github.com/dblandin))

#### Authors: 1

- Devon Blandin ([@dblandin](https://github.com/dblandin))

---

# v9.9.0 (Wed May 27 2020)

#### 🚀  Enhancement

- [FX-1936] Implements ModalBase (take II) [#693](https://github.com/artsy/palette/pull/693) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Makes chromatic specs less sensitive ([@dzucconi](https://github.com/dzucconi))
- Implements ModalBase ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v9.8.1 (Wed May 27 2020)

#### 🐛  Bug Fix

- Fixes mixed-in classnames coming from styled-components [#697](https://github.com/artsy/palette/pull/697) ([@dzucconi](https://github.com/dzucconi))
- Fixes mixed-in classnames coming from styled-components ([@dzucconi](https://github.com/dzucconi))
- Adjusts Chromatic settings ([@dzucconi](https://github.com/dzucconi))

#### 🏠  Internal

- Adjusts Chromatic settings [#694](https://github.com/artsy/palette/pull/694) ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v9.8.0 (Tue May 26 2020)

#### 🚀  Enhancement

- Use Sans Instead of Serif in EntityHeader component [#692](https://github.com/artsy/palette/pull/692) ([@ashleyjelks](https://github.com/ashleyjelks))

#### 🐛  Bug Fix

- updates entity header to use sans ([@ashleyjelks](https://github.com/ashleyjelks))

#### Authors: 1

- Ashley Jelks ([@ashleyjelks](https://github.com/ashleyjelks))

---

# v9.7.0 (Thu May 21 2020)

#### 🚀  Enhancement

- Add disabledtext to radiogroup [#689](https://github.com/artsy/palette/pull/689) ([@pvinis](https://github.com/pvinis))

#### 🐛  Bug Fix

- tiny ([@pvinis](https://github.com/pvinis))
- test too ([@pvinis](https://github.com/pvinis))
- add the actual functionality ([@pvinis](https://github.com/pvinis))
- fix comment ([@pvinis](https://github.com/pvinis))
- adding peripheral code ([@pvinis](https://github.com/pvinis))
- adding knobs ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v9.6.0 (Thu May 21 2020)

#### 🚀  Enhancement

- Adds HTML.ios.tsx [#691](https://github.com/artsy/palette/pull/691) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Adds .ios ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v9.5.0 (Wed May 20 2020)

#### 🚀  Enhancement

- Adds HTML component [#690](https://github.com/artsy/palette/pull/690) ([@dzucconi](https://github.com/dzucconi))

#### 🐛  Bug Fix

- Adds HTML component ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v9.4.0 (Tue May 19 2020)

#### 🚀  Enhancement

- Export BorderBoxProps in top-level package [#688](https://github.com/artsy/palette/pull/688) ([@dblandin](https://github.com/dblandin))

#### Authors: 1

- Devon Blandin ([@dblandin](https://github.com/dblandin))

---

# v9.3.0 (Tue May 19 2020)

#### 🚀  Enhancement

- [CSGN-203] Add PaymentIcon [#687](https://github.com/artsy/palette/pull/687) ([@pepopowitz](https://github.com/pepopowitz))

#### 🐛  Bug Fix

- Add PaymentIcon ([@pepopowitz](https://github.com/pepopowitz))

#### Authors: 1

- Steven Hicks ([@pepopowitz](https://github.com/pepopowitz))

---

# v9.2.2 (Tue May 19 2020)

#### 🐛  Bug Fix

- No unstable_trackIn in eigen [#685](https://github.com/artsy/palette/pull/685) ([@ds300](https://github.com/ds300))
- no unstable_trackIn on react-native ([@ds300](https://github.com/ds300))

#### Authors: 1

- David Sheldrick ([@ds300](https://github.com/ds300))

---

# v9.2.1 (Tue May 19 2020)

#### 🐛  Bug Fix

- Update tsconfig.json ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v9.2.0 (Tue May 19 2020)

#### 🚀  Enhancement

- Update the Banner component to work well with a content that takes more space [#686](https://github.com/artsy/palette/pull/686) ([@yuki24](https://github.com/yuki24))

#### 🐛  Bug Fix

- Make sure the close button is always vertically centered ([@yuki24](https://github.com/yuki24))
- Make the message prop for <Banner> optional ([@yuki24](https://github.com/yuki24))

#### Authors: 1

- Yuki Nishijima ([@yuki24](https://github.com/yuki24))

---

# v9.1.0 (Sat May 16 2020)

#### 🚀  Enhancement

- [COM-16] - add unstable_trackIn as a prop to Sans and Serif [#684](https://github.com/artsy/palette/pull/684) ([@oxaudo](https://github.com/oxaudo))

#### 🐛  Bug Fix

- do not expose letterSpacing directly and add a spec for unstable_trackIn ([@oxaudo](https://github.com/oxaudo))
- add unstable_trackIn as a prop to Sans and Serif ([@oxaudo](https://github.com/oxaudo))

#### Authors: 1

- Oksana ([@oxaudo](https://github.com/oxaudo))

---

# v9.0.1 (Wed May 13 2020)

#### 🐛  Bug Fix

- [Modal] Do not fire external `onClose` callback on first render [#683](https://github.com/artsy/palette/pull/683) ([@dblandin](https://github.com/dblandin))

#### Authors: 1

- Devon Blandin ([@dblandin](https://github.com/dblandin))

---

# v9.0.0 (Wed May 13 2020)

#### 💥  Breaking Change

- Remove Modal `forcedScroll` prop / Default `overflow` to `auto` [#680](https://github.com/artsy/palette/pull/680) ([@dblandin](https://github.com/dblandin))

#### Authors: 1

- Devon Blandin ([@dblandin](https://github.com/dblandin))

---

# v8.2.6 (Wed May 13 2020)

#### 🐛  Bug Fix

- Update Theme.tsx ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v8.2.5 (Wed May 13 2020)

#### 🐛  Bug Fix

- Update Theme.tsx ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v8.2.4 (Tue May 12 2020)

#### 🐛  Bug Fix

- Mixes in missing flex-related functions [#681](https://github.com/artsy/palette/pull/681) ([@dzucconi](https://github.com/dzucconi))
- Mixes in missing flex-related functions ([@dzucconi](https://github.com/dzucconi))

#### Authors: 1

- Damon ([@dzucconi](https://github.com/dzucconi))

---

# v8.2.3 (Sat May 09 2020)

#### 🐛  Bug Fix

- [ProgressBar] Make transition customizable [#679](https://github.com/artsy/palette/pull/679) ([@damassi](https://github.com/damassi))
- [ProgressBar] Make transition customizable ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v8.2.2 (Fri May 08 2020)

#### 🐛  Bug Fix

- Updates Palette to use new Eigen repo structure [#678](https://github.com/artsy/palette/pull/678) ([@ashfurrow](https://github.com/ashfurrow))
- Updates Palette to use new Eigen repo structure. ([@ashfurrow](https://github.com/ashfurrow))

#### Authors: 1

- Ash Furrow ([@ashfurrow](https://github.com/ashfurrow))

---

# v8.2.1 (Mon Apr 27 2020)

#### 🐛  Bug Fix

- [FX-1907] make background color darker for legibility with light text colors [#673](https://github.com/artsy/palette/pull/673) ([@xtina-starr](https://github.com/xtina-starr))
- make background color conditional more clear ([@xtina-starr](https://github.com/xtina-starr))
- make background color darker for legibility with light text colors ([@xtina-starr](https://github.com/xtina-starr))

#### Authors: 1

- Christina ([@xtina-starr](https://github.com/xtina-starr))

---

# v8.2.0 (Wed Apr 22 2020)

#### 🚀  Enhancement

- [Grid] Add maxWidth prop [#672](https://github.com/artsy/palette/pull/672) ([@damassi](https://github.com/damassi))

#### 🐛  Bug Fix

- [Grid] Add maxWidth prop ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v8.1.3 (Fri Apr 17 2020)

#### 🐛  Bug Fix

- Update menu component style props [#671](https://github.com/artsy/palette/pull/671) ([@xtina-starr](https://github.com/xtina-starr))
- refactor padding ([@xtina-starr](https://github.com/xtina-starr))
- be able to adjust top and bottom padding in Menu container ([@xtina-starr](https://github.com/xtina-starr))
- allow menu to expand to fullscreen of the window ([@xtina-starr](https://github.com/xtina-starr))

#### 🏠  Internal

- Update auto orb from 1.1.0 to v1.2.0 [#669](https://github.com/artsy/palette/pull/669) ([@renovate-bot](https://github.com/renovate-bot) [@renovate[bot]](https://github.com/renovate[bot]))

#### Authors: 3

- [@renovate[bot]](https://github.com/renovate[bot])
- Christina ([@xtina-starr](https://github.com/xtina-starr))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v8.1.2 (Fri Apr 17 2020)

#### 🐛  Bug Fix

- Stop testing implementation details of input  ([@zephraph](https://github.com/zephraph))
- Fix lint issues  ([@zephraph](https://github.com/zephraph))
- Style tweaks for text inputs

Changed font family on text inputs to Sans. Created a storybook file for inputs.  ([@willanderson](https://github.com/willanderson))

#### Authors: 2

- Justin Bennett ([@zephraph](https://github.com/zephraph))
- Will Anderson ([@willanderson](https://github.com/willanderson))

---

# v8.1.1 (Wed Apr 15 2020)

#### 🐛  Bug Fix

- More prettier updates  ([@zephraph](https://github.com/zephraph))
- Fix a prettier issue  ([@zephraph](https://github.com/zephraph))
- Removed spacing, changed font for text area  ([@willanderson](https://github.com/willanderson))

#### Authors: 2

- Justin Bennett ([@zephraph](https://github.com/zephraph))
- Will Anderson ([@willanderson](https://github.com/willanderson))

---

# v8.1.0 (Sun Apr 12 2020)

#### 🐛  Bug Fix

- Ensure all icons have default titles  ([@zephraph](https://github.com/zephraph))
- Update icon script to generate w/ editable title  ([@zephraph](https://github.com/zephraph))
- Allow titles to be modifiable for SVGs  ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v8.0.0 (Fri Apr 10 2020)

#### 🐛  Bug Fix

- [Deletion] Remove page loader  ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v7.8.1 (Fri Apr 10 2020)

#### 🐛  Bug Fix

- fixed a type error  ([@xtina-starr](https://github.com/xtina-starr))
- add types  ([@xtina-starr](https://github.com/xtina-starr))
- expand menu component to work with new nav DropDownMenu in reaction  ([@xtina-starr](https://github.com/xtina-starr))
- Pin dep @types/react-lazy-load-image-component from ^1.3.0 to 1.3.0  ([@renovate-bot](https://github.com/renovate-bot))

#### Authors: 2

- Christina ([@xtina-starr](https://github.com/xtina-starr))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))

---

# v7.8.0 (Sat Apr 04 2020)

#### 🐛  Bug Fix

- Make input a forwarded ref  ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v7.7.0 (Sat Apr 04 2020)

#### 🐛  Bug Fix

- Add top to flex  ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v7.6.0 (Sun Mar 29 2020)

#### 🐛  Bug Fix

- Add test for avatar fallback  ([@zephraph](https://github.com/zephraph))
- Allow fallback to work when hooking into onError  ([@zephraph](https://github.com/zephraph))
- Add fallback image support to avatar  ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v7.5.1 (Thu Mar 26 2020)

#### 🐛  Bug Fix

- Add flexShrink to Flex component  ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v7.5.0 (Thu Mar 26 2020)

#### 🐛  Bug Fix

- Update the width/height to be scale  ([@zephraph](https://github.com/zephraph))
- Allow main artsy logo to be scaled  ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v7.4.2 (Wed Mar 25 2020)

#### 🐛  Bug Fix

- changed small button padding  ([@lilyfromseattle](https://github.com/lilyfromseattle))
- change  ([@lilyfromseattle](https://github.com/lilyfromseattle))

#### Authors: 1

- Lily Pace ([@lilyfromseattle](https://github.com/lilyfromseattle))

---

# v7.4.1 (Tue Mar 24 2020)

#### 🐛  Bug Fix

- changed casing of fillrule and cliprule for no artowrk icon  ([@lilyfromseattle](https://github.com/lilyfromseattle))
- Use a stable image for CSSGrid story, to avoid visual diffs every build.  ([@pepopowitz](https://github.com/pepopowitz))

#### Authors: 2

- Lily Pace ([@lilyfromseattle](https://github.com/lilyfromseattle))
- Steven Hicks ([@pepopowitz](https://github.com/pepopowitz))

---

# v7.4.0 (Mon Mar 23 2020)

#### 🐛  Bug Fix

- Add label to storybooks  ([@zephraph](https://github.com/zephraph))
- Add more examples to storybook  ([@zephraph](https://github.com/zephraph))
- Add the ability to have a secondary action on the toggle  ([@zephraph](https://github.com/zephraph))

#### Authors: 1

- Justin Bennett ([@zephraph](https://github.com/zephraph))

---

# v7.3.0 (Thu Mar 19 2020)

#### 🐛  Bug Fix

- Add name prop to TextArea  ([@pepopowitz](https://github.com/pepopowitz))

#### Authors: 1

- Steven Hicks ([@pepopowitz](https://github.com/pepopowitz))

---

# v7.2.0 (Wed Mar 18 2020)

#### 🐛  Bug Fix

- added no artwork icon  ([@lilyfromseattle](https://github.com/lilyfromseattle))

#### Authors: 1

- Lily Pace ([@lilyfromseattle](https://github.com/lilyfromseattle))

---

# v7.1.2 (Sun Mar 01 2020)

#### 🐛  Bug Fix

- [Spinner] Remove fade  ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v7.1.0 (Fri Feb 21 2020)

#### 🐛  Bug Fix

- fixed select bug  ([@lilyfromseattle](https://github.com/lilyfromseattle))
- [Spinner] Add quiick slight fade in  ([@damassi](https://github.com/damassi))
- [Spinner] Adds delay prop for visibility  ([@damassi](https://github.com/damassi))
- Pin dep @artsy/auto-config from ^1.0.2 to 1.0.2  ([@renovate-bot](https://github.com/renovate-bot))
- Bump corresponding auto config version  ([@zephraph](https://github.com/zephraph))

#### Authors: 4

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Justin Bennett ([@zephraph](https://github.com/zephraph))
- Lily Pace ([@lilyfromseattle](https://github.com/lilyfromseattle))
- WhiteSource Renovate ([@renovate-bot](https://github.com/renovate-bot))
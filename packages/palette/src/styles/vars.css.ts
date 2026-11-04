import { THEME } from "@artsy/palette-tokens/dist/themes/v3"
import { THEME_DARK } from "@artsy/palette-tokens/dist/themes/v3Dark"
import {
  assignVars,
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from "@vanilla-extract/css"
import { layers } from "./layers.css"
import { PALETTE_THEME_ATTRIBUTE } from "./themeAttribute"

const LIGHT_SELECTOR = `:root, [${PALETTE_THEME_ATTRIBUTE}="light"]`
const DARK_SELECTOR = `[${PALETTE_THEME_ATTRIBUTE}="dark"]`

export const vars = createGlobalThemeContract(
  {
    color: THEME.colors,
    space: THEME.space,
    effect: THEME.effects,
  },
  (_value, path) => {
    return path.join("-").replace(".", "_")
  }
)

createGlobalTheme(LIGHT_SELECTOR, vars, {
  "@layer": layers.reset,
  color: THEME.colors,
  space: THEME.space,
  effect: THEME.effects,
})

// Declared after the light block: `:root` and the attribute selector have equal
// specificity, so source order lets dark win on <html data-palette-theme="dark">.
// THEME_DARK only restates colors and effects; the light values cover the rest.
globalStyle(DARK_SELECTOR, {
  "@layer": {
    [layers.reset]: {
      vars: {
        ...assignVars(vars.color, THEME_DARK.colors),
        ...assignVars(vars.effect, THEME_DARK.effects),
      },
    },
  },
})

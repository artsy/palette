import { globalLayer } from "@vanilla-extract/css"

// Declaration order is cascade order: keep it in sync with the order in rslib.config.ts.
const palette = globalLayer("palette")
const reset = globalLayer({ parent: palette }, "reset")
const components = globalLayer({ parent: palette }, "components")
const utilities = globalLayer({ parent: palette }, "utilities")

export const layers = {
  reset,
  components,
  utilities: {
    base: globalLayer({ parent: utilities }, "base"),
    xs: globalLayer({ parent: utilities }, "xs"),
    sm: globalLayer({ parent: utilities }, "sm"),
    md: globalLayer({ parent: utilities }, "md"),
    lg: globalLayer({ parent: utilities }, "lg"),
  },
}

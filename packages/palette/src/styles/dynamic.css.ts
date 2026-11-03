import { style, StyleRule } from "@vanilla-extract/css"
import { layers } from "./layers.css"
import {
  Breakpoint,
  BREAKPOINTS,
  dynamicVarName,
  STYLE_PROPERTIES,
  utilityRule,
} from "./styleProperties"

/** `dynamicClasses[breakpoint][property]`, reading `var(--<alias>-<breakpoint>)`. */
export const dynamicClasses = Object.fromEntries(
  BREAKPOINTS.map((breakpoint) => {
    const byProperty = Object.fromEntries(
      Object.keys(STYLE_PROPERTIES).map((property) => {
        const className = style(
          utilityRule({
            layer: layers.utilities[breakpoint],
            breakpoint,
            property,
            value: `var(${dynamicVarName({ property, breakpoint })})`,
          }) as StyleRule
        )
        return [property, className]
      })
    )
    return [breakpoint, byProperty]
  })
) as Record<Breakpoint, Record<string, string>>

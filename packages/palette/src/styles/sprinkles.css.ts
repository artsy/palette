import { StyleRule, styleVariants } from "@vanilla-extract/css"
import { layers } from "./layers.css"
import {
  Breakpoint,
  BREAKPOINTS,
  STYLE_PROPERTIES,
  TOKEN_KEYS,
  TokenScale,
  utilityRule,
} from "./styleProperties"
import { vars } from "./vars.css"

const TOKEN_VARS: Record<TokenScale, Record<string, string>> = {
  space: vars.space,
  colors: vars.color,
}

const TOKEN_PROPERTIES = Object.entries(STYLE_PROPERTIES).flatMap(
  ([property, { scale }]) => {
    if (!scale) return []
    return [{ property, scale }]
  }
)

/** `tokenClasses[breakpoint][property][tokenKey]`, e.g. `.base["margin-top"]["2"]`. */
export const tokenClasses = Object.fromEntries(
  BREAKPOINTS.map((breakpoint) => {
    const byProperty = Object.fromEntries(
      TOKEN_PROPERTIES.map(({ property, scale }) => {
        const tokenVars = Object.fromEntries(
          TOKEN_KEYS[scale].map((key) => [key, TOKEN_VARS[scale][key]])
        )
        const classes = styleVariants(tokenVars, (value) => {
          return utilityRule({
            layer: layers.utilities[breakpoint],
            breakpoint,
            property,
            value,
          }) as StyleRule
        })
        return [property, classes]
      })
    )
    return [breakpoint, byProperty]
  })
) as Record<Breakpoint, Record<string, Record<string, string>>>

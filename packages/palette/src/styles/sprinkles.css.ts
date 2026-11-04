import { StyleRule, styleVariants } from "@vanilla-extract/css"
import { layers } from "./layers.css"
import {
  Breakpoint,
  BREAKPOINTS,
  STYLE_PROPERTIES,
  TOKEN_ALIASES,
  TOKEN_BREAKPOINTS,
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

const tokenClassesFor = ({
  breakpoint,
  property,
  scale,
}: {
  breakpoint: Breakpoint
  property: string
  scale: TokenScale
}) => {
  const aliases = TOKEN_ALIASES[scale]
  const tokenVars = Object.fromEntries(
    TOKEN_KEYS[scale]
      .filter((key) => !aliases[key])
      .map((key) => [key, TOKEN_VARS[scale][key]])
  )
  const classes: Record<string, string> = styleVariants(tokenVars, (value) => {
    return utilityRule({
      layer: layers.utilities[breakpoint],
      breakpoint,
      property,
      value,
    }) as StyleRule
  })
  const aliasClasses = Object.fromEntries(
    Object.entries(aliases).map(([key, target]) => [key, classes[target]])
  )
  return { ...classes, ...aliasClasses }
}

/**
 * `tokenClasses[breakpoint][property][tokenKey]`, e.g.
 * `.base["margin-top"]["2"]`. A missing entry means the dynamic class applies.
 */
export const tokenClasses = Object.fromEntries(
  BREAKPOINTS.map((breakpoint) => {
    const byProperty = Object.fromEntries(
      TOKEN_PROPERTIES.filter(({ scale }) => {
        return TOKEN_BREAKPOINTS[scale].includes(breakpoint)
      }).map(({ property, scale }) => {
        return [property, tokenClassesFor({ breakpoint, property, scale })]
      })
    )
    return [breakpoint, byProperty]
  })
) as Record<Breakpoint, Record<string, Record<string, string> | undefined>>

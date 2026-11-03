import { THEME } from "@artsy/palette-tokens/dist/themes/v3"

export type Breakpoint = "base" | "xs" | "sm" | "md" | "lg"

export const BREAKPOINTS: readonly Breakpoint[] = [
  "base",
  "xs",
  "sm",
  "md",
  "lg",
]

export type TokenScale = "space" | "colors"

export const TOKEN_KEYS: Record<TokenScale, readonly string[]> = {
  space: Object.keys(THEME.space),
  colors: Object.keys(THEME.colors),
}

// Keys that reuse another key's class because both hold the same value in
// every theme.
export const TOKEN_ALIASES: Record<TokenScale, Record<string, string>> = {
  space: { half: "0.5" },
  colors: {},
}

// Responsive colors are rare, so color tokens get classes at base only. Other
// breakpoints use the dynamic class with `var(--color-<name>)`.
export const TOKEN_BREAKPOINTS: Record<TokenScale, readonly Breakpoint[]> = {
  space: BREAKPOINTS,
  colors: ["base"],
}

// Same media query styled-system prints, so print styles match too.
export const MEDIA_QUERIES: Record<Exclude<Breakpoint, "base">, string> = {
  xs: `screen and (min-width: ${THEME.breakpoints.xs})`,
  sm: `screen and (min-width: ${THEME.breakpoints.sm})`,
  md: `screen and (min-width: ${THEME.breakpoints.md})`,
  lg: `screen and (min-width: ${THEME.breakpoints.lg})`,
}

export interface StyleProperty {
  /** Short name used in the inline variable, e.g. `--mt-sm`. */
  alias: string
  /**
   * Rank inside a breakpoint layer. A longhand outranks the shorthands that
   * set it, so `border="1px solid" borderColor="mono10"` keeps its color.
   */
  level: number
  /** Properties this shorthand resets. */
  covers: readonly string[]
  /** Theme scale whose keys get token classes (see `TOKEN_BREAKPOINTS`). */
  scale?: TokenScale
}

const SIDES = ["top", "right", "bottom", "left"] as const
const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"]
const BORDER_PARTS = ["width", "style", "color"] as const

const sideLonghands = (property: string) => {
  return SIDES.map((side) => `${property}-${side}`)
}

const borderSideLonghands = (part: string) => {
  return SIDES.map((side) => `border-${side}-${part}`)
}

const entry = (
  property: string,
  { alias, level, covers = [], scale }: Partial<StyleProperty>
): [string, StyleProperty] => {
  return [
    property,
    { alias: alias ?? property, level: level ?? 0, covers, scale },
  ]
}

const spaceEntries = (property: "margin" | "padding") => {
  const letter = property[0]
  return [
    entry(property, {
      alias: letter,
      covers: sideLonghands(property),
      scale: "space",
    }),
    ...SIDES.map((side) => {
      return entry(`${property}-${side}`, {
        alias: `${letter}${side[0]}`,
        level: 1,
        scale: "space",
      })
    }),
  ]
}

const borderEntries = () => {
  // Per-side colors are rare, so they get no token classes.
  const sideParts = SIDES.flatMap((side) => {
    return BORDER_PARTS.map((part) => {
      return entry(`border-${side}-${part}`, {
        alias: `b${side[0]}${part[0]}`,
        level: 3,
      })
    })
  })

  return [
    entry("border", {
      alias: "b",
      covers: [
        ...sideLonghands("border"),
        ...BORDER_PARTS.map((part) => `border-${part}`),
        ...BORDER_PARTS.flatMap(borderSideLonghands),
      ],
    }),
    ...SIDES.map((side) => {
      return entry(`border-${side}`, {
        alias: `b${side[0]}`,
        level: 1,
        covers: BORDER_PARTS.map((part) => `border-${side}-${part}`),
      })
    }),
    ...BORDER_PARTS.map((part) => {
      return entry(`border-${part}`, {
        alias: `b${part[0]}`,
        level: 2,
        covers: borderSideLonghands(part),
        scale: part === "color" ? "colors" : undefined,
      })
    }),
    ...sideParts,
    entry("border-radius", {
      alias: "rad",
      covers: CORNERS.map((corner) => `border-${corner}-radius`),
    }),
    ...CORNERS.map((corner) => {
      const [vertical, horizontal] = corner.split("-")
      return entry(`border-${corner}-radius`, {
        alias: `rad-${vertical[0]}${horizontal[0]}`,
        level: 1,
      })
    }),
  ]
}

/** Every CSS property the style props can write, keyed by its kebab-case name. */
export const STYLE_PROPERTIES: Record<
  string,
  StyleProperty
> = Object.fromEntries([
  ...spaceEntries("margin"),
  ...spaceEntries("padding"),
  entry("width", { alias: "w" }),
  entry("color", { alias: "c", scale: "colors" }),
  entry("background-color", { alias: "bg", scale: "colors" }),
  entry("opacity", { alias: "o" }),
  ...borderEntries(),
])

export const dynamicVarName = ({
  property,
  breakpoint,
}: {
  property: string
  breakpoint: Breakpoint
}): string => {
  return `--${STYLE_PROPERTIES[property].alias}-${breakpoint}`
}

const camelCase = (property: string) => {
  return property.replace(/-([a-z])/g, (_match, letter: string) => {
    return letter.toUpperCase()
  })
}

/**
 * The vanilla-extract rule for one utility class: inside the breakpoint's
 * layer and media query, with the class repeated once per level so longhands
 * outrank shorthands in the same layer.
 */
export const utilityRule = ({
  layer,
  breakpoint,
  property,
  value,
}: {
  layer: string
  breakpoint: Breakpoint
  property: string
  value: string
}): Record<string, unknown> => {
  const declaration = { [camelCase(property)]: value }
  const { level } = STYLE_PROPERTIES[property]
  const rule =
    level === 0
      ? declaration
      : { selectors: { ["&".repeat(level + 1)]: declaration } }

  if (breakpoint === "base") return { "@layer": { [layer]: rule } }
  return {
    "@layer": { [layer]: { "@media": { [MEDIA_QUERIES[breakpoint]]: rule } } },
  }
}

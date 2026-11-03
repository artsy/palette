import { THEME } from "@artsy/palette-tokens/dist/themes/v3"
import { Breakpoint, TokenScale } from "./styleProperties"

export type { Breakpoint } from "./styleProperties"

export interface Declaration {
  breakpoint: Breakpoint
  /** CSS property, kebab-case. */
  property: string
  value: string
  token?: { scale: TokenScale; key: string }
}

type Transform = "margin" | "width" | "scale"

interface PropConfig {
  properties: readonly string[]
  scale: string
  transform: Transform
}

const margin = (...properties: string[]): PropConfig => {
  return { properties, scale: "space", transform: "margin" }
}

const padding = (...properties: string[]): PropConfig => {
  return { properties, scale: "space", transform: "scale" }
}

const scaled = (scale: string, ...properties: string[]): PropConfig => {
  return { properties, scale, transform: "scale" }
}

const MARGIN = margin("margin")
const MARGIN_TOP = margin("margin-top")
const MARGIN_RIGHT = margin("margin-right")
const MARGIN_BOTTOM = margin("margin-bottom")
const MARGIN_LEFT = margin("margin-left")
const MARGIN_X = margin("margin-left", "margin-right")
const MARGIN_Y = margin("margin-top", "margin-bottom")
const PADDING = padding("padding")
const PADDING_TOP = padding("padding-top")
const PADDING_RIGHT = padding("padding-right")
const PADDING_BOTTOM = padding("padding-bottom")
const PADDING_LEFT = padding("padding-left")
const PADDING_X = padding("padding-left", "padding-right")
const PADDING_Y = padding("padding-top", "padding-bottom")
const BACKGROUND_COLOR = scaled("colors", "background-color")
const WIDTH: PropConfig = {
  properties: ["width"],
  scale: "sizes",
  transform: "width",
}

// Mirrors styled-system's `space`, `width`, `color` and `border` configs: same
// props, CSS properties, theme scales and transforms.
const PROP_CONFIG = {
  m: MARGIN,
  margin: MARGIN,
  mt: MARGIN_TOP,
  marginTop: MARGIN_TOP,
  mr: MARGIN_RIGHT,
  marginRight: MARGIN_RIGHT,
  mb: MARGIN_BOTTOM,
  marginBottom: MARGIN_BOTTOM,
  ml: MARGIN_LEFT,
  marginLeft: MARGIN_LEFT,
  mx: MARGIN_X,
  marginX: MARGIN_X,
  my: MARGIN_Y,
  marginY: MARGIN_Y,
  p: PADDING,
  padding: PADDING,
  pt: PADDING_TOP,
  paddingTop: PADDING_TOP,
  pr: PADDING_RIGHT,
  paddingRight: PADDING_RIGHT,
  pb: PADDING_BOTTOM,
  paddingBottom: PADDING_BOTTOM,
  pl: PADDING_LEFT,
  paddingLeft: PADDING_LEFT,
  px: PADDING_X,
  paddingX: PADDING_X,
  py: PADDING_Y,
  paddingY: PADDING_Y,
  width: WIDTH,
  color: scaled("colors", "color"),
  bg: BACKGROUND_COLOR,
  backgroundColor: BACKGROUND_COLOR,
  border: scaled("borders", "border"),
  borderWidth: scaled("borderWidths", "border-width"),
  borderStyle: scaled("borderStyles", "border-style"),
  borderColor: scaled("colors", "border-color"),
  borderRadius: scaled("radii", "border-radius"),
  borderTop: scaled("borders", "border-top"),
  borderRight: scaled("borders", "border-right"),
  borderBottom: scaled("borders", "border-bottom"),
  borderLeft: scaled("borders", "border-left"),
  borderX: scaled("borders", "border-left", "border-right"),
  borderY: scaled("borders", "border-top", "border-bottom"),
  borderTopWidth: scaled("borderWidths", "border-top-width"),
  borderTopStyle: scaled("borderStyles", "border-top-style"),
  borderTopColor: scaled("colors", "border-top-color"),
  borderRightWidth: scaled("borderWidths", "border-right-width"),
  borderRightStyle: scaled("borderStyles", "border-right-style"),
  borderRightColor: scaled("colors", "border-right-color"),
  borderBottomWidth: scaled("borderWidths", "border-bottom-width"),
  borderBottomStyle: scaled("borderStyles", "border-bottom-style"),
  borderBottomColor: scaled("colors", "border-bottom-color"),
  borderLeftWidth: scaled("borderWidths", "border-left-width"),
  borderLeftStyle: scaled("borderStyles", "border-left-style"),
  borderLeftColor: scaled("colors", "border-left-color"),
  borderTopLeftRadius: scaled("radii", "border-top-left-radius"),
  borderTopRightRadius: scaled("radii", "border-top-right-radius"),
  borderBottomLeftRadius: scaled("radii", "border-bottom-left-radius"),
  borderBottomRightRadius: scaled("radii", "border-bottom-right-radius"),
  opacity: scaled("opacity", "opacity"),
}

export type StylePropName = keyof typeof PROP_CONFIG

export const STYLE_PROP_NAMES = Object.keys(PROP_CONFIG) as StylePropName[]

const BREAKPOINT_BY_MIN_WIDTH: Record<string, Breakpoint> = {
  [THEME.breakpoints.xs]: "xs",
  [THEME.breakpoints.sm]: "sm",
  [THEME.breakpoints.md]: "md",
  [THEME.breakpoints.lg]: "lg",
}

// styled-system reads array index n + 1 as `theme.breakpoints[n]`.
const ARRAY_BREAKPOINTS: readonly Breakpoint[] = [
  "base",
  ...THEME.breakpoints.map((minWidth) => BREAKPOINT_BY_MIN_WIDTH[minWidth]),
]

// Object keys go through `theme.breakpoints[key]`; anything unknown (like `_`)
// is the base style.
const breakpointForKey = (key: string): Breakpoint => {
  const breakpoints = (THEME.breakpoints as unknown) as Record<string, string>
  if (!Object.prototype.hasOwnProperty.call(breakpoints, key)) return "base"
  return BREAKPOINT_BY_MIN_WIDTH[breakpoints[key]] ?? "base"
}

const responsiveEntries = (raw: unknown): [Breakpoint, unknown][] => {
  if (raw === null) return []
  if (typeof raw !== "object") return [["base", raw]]
  if (Array.isArray(raw)) {
    return raw.slice(0, ARRAY_BREAKPOINTS.length).map((value, index) => {
      return [ARRAY_BREAKPOINTS[index], value]
    })
  }
  return Object.entries(raw).map(([key, value]) => {
    return [breakpointForKey(key), value]
  })
}

const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && !isNaN(value)
}

const THEME_SCALES = (THEME as unknown) as Record<string, unknown>

const TOKEN_SCALES: readonly string[] = ["space", "colors"]

interface Lookup {
  value: unknown
  token?: Declaration["token"]
}

// Same path semantics as styled-system's `get`: strings split on `.`, so the
// string "0.5" misses the `0.5` space key while the number 0.5 hits it.
const lookup = ({
  scaleName,
  key,
  fallback,
}: {
  scaleName: string
  key: unknown
  fallback: unknown
}): Lookup => {
  const scale = THEME_SCALES[scaleName]
  const path = typeof key === "string" ? key.split(".") : [key]
  const value = path.reduce<unknown>((node, part) => {
    if (!node) return undefined
    return (node as Record<string, unknown>)[String(part)]
  }, scale)

  if (value === undefined) return { value: fallback }

  const isToken =
    TOKEN_SCALES.includes(scaleName) &&
    path.length === 1 &&
    Object.prototype.hasOwnProperty.call(scale, String(key))

  if (!isToken) return { value }
  return { value, token: { scale: scaleName as TokenScale, key: String(key) } }
}

const transformMargin = ({
  scaleName,
  raw,
}: {
  scaleName: string
  raw: unknown
}): Lookup => {
  if (!isNumber(raw)) return lookup({ scaleName, key: raw, fallback: raw })

  const isNegative = raw < 0
  const absolute = Math.abs(raw)
  const resolved = lookup({ scaleName, key: absolute, fallback: absolute })

  if (!isNegative) return resolved
  if (isNumber(resolved.value)) return { value: -resolved.value }
  return { value: `-${resolved.value}` }
}

const transformWidth = ({
  scaleName,
  raw,
}: {
  scaleName: string
  raw: unknown
}): Lookup => {
  const fallback = !isNumber(raw) || raw > 1 ? raw : `${raw * 100}%`
  return lookup({ scaleName, key: raw, fallback })
}

const TRANSFORMS: Record<
  Transform,
  (args: { scaleName: string; raw: unknown }) => Lookup
> = {
  margin: transformMargin,
  width: transformWidth,
  scale: ({ scaleName, raw }) => lookup({ scaleName, key: raw, fallback: raw }),
}

const UNITLESS_PROPERTIES: readonly string[] = ["opacity"]

// How styled-components prints a value: falsish values are dropped and numbers
// other than 0 get `px` unless the property is unitless. Other types never
// reach valid CSS, so they are dropped.
const toCssValue = ({
  value,
  property,
}: {
  value: unknown
  property: string
}): string | null => {
  if (typeof value === "number") {
    if (value === 0 || UNITLESS_PROPERTIES.includes(property)) {
      return String(value)
    }
    return `${value}px`
  }
  if (typeof value === "string" && value !== "") return value
  return null
}

/**
 * Resolves style props to the declarations styled-system would emit, one per
 * breakpoint and CSS property. A later prop overrides an earlier one's value
 * but, like styled-system's object keys, keeps the position of the first write.
 */
export const resolveDeclarations = (
  props: Partial<Record<StylePropName, unknown>>
): Declaration[] => {
  const declarations = Object.entries(props).flatMap(([name, raw]) => {
    if (!Object.prototype.hasOwnProperty.call(PROP_CONFIG, name)) return []

    const config: PropConfig = PROP_CONFIG[name as StylePropName]

    return responsiveEntries(raw).flatMap(([breakpoint, value]) => {
      const { value: resolved, token } = TRANSFORMS[config.transform]({
        scaleName: config.scale,
        raw: value,
      })
      return config.properties.flatMap((property) => {
        const cssValue = toCssValue({ value: resolved, property })
        if (cssValue === null) return []

        const declaration: Declaration = {
          breakpoint,
          property,
          value: cssValue,
        }
        if (token) declaration.token = token
        return [declaration]
      })
    })
  })

  const byTarget = declarations.reduce((map, declaration) => {
    const target = `${declaration.breakpoint}|${declaration.property}`
    map.set(target, declaration)
    return map
  }, new Map<string, Declaration>())

  return Array.from(byTarget.values())
}

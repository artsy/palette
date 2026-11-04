import { THEME } from "@artsy/palette-tokens/dist/themes/v3"
import fs from "fs"
import { createRequire } from "module"
import path from "path"
import postcss, { AtRule, ChildNode, Container, Root, Rule } from "postcss"
import React from "react"
import styled, { ServerStyleSheet } from "styled-components"
import { border, color, compose, space, width } from "styled-system"
import { vars } from "../../vars.css"
import { StyleCaseProps } from "./styleCases"

// A small cascade simulator. It reports the winning value of every longhand at
// the first pixel of each breakpoint, once for real styled-components output
// and once for the resolver's classes in the compiled dist/palette.css.

export const WIDTHS = [0, 767, 768, 1280, 1920]

export type Winners = Record<string, string>

const DIST = path.resolve(__dirname, "../../../../dist")
const LAYER_ORDER = [
  "palette.reset",
  "palette.components",
  "palette.utilities.base",
  "palette.utilities.xs",
  "palette.utilities.sm",
  "palette.utilities.md",
  "palette.utilities.lg",
]

const nodeRequire = createRequire(__filename)
// react-dom 17 matches the `react` that Jest maps to react-17.
const { renderToString } = nodeRequire("react-dom-17/server")

interface Candidate {
  property: string
  value: string
  minWidth: number
  rank: number[]
}

const enclosing = (node: ChildNode, name: string): AtRule | undefined => {
  let parent = node.parent as Container | Root | undefined
  while (parent) {
    if (parent.type === "atrule" && (parent as AtRule).name === name) {
      return parent as AtRule
    }
    parent = (parent as { parent?: Container | Root }).parent
  }
  return undefined
}

const minWidthOf = (rule: Rule) => {
  const media = enclosing(rule, "media")
  if (!media) return 0
  const match = media.params.match(/(?:min-width:|>=)\s*(\d+)px/)
  if (!match) throw new Error(`Unexpected media query: ${media.params}`)
  return Number(match[1])
}

// Splits on spaces outside parentheses, so `calc(1px + 2px)` stays whole.
const splitValue = (value: string) => {
  const { parts, current } = value.split("").reduce(
    (state, char) => {
      if (char === "(") state.depth += 1
      if (char === ")") state.depth -= 1
      if (/\s/.test(char) && state.depth === 0) {
        if (state.current) state.parts.push(state.current)
        state.current = ""
        return state
      }
      state.current += char
      return state
    },
    { parts: [] as string[], current: "", depth: 0 }
  )
  return current ? [...parts, current] : parts
}

const SIDES = ["top", "right", "bottom", "left"]
const CORNERS = ["top-left", "top-right", "bottom-right", "bottom-left"]
const BORDER_STYLES = [
  "none",
  "hidden",
  "dotted",
  "dashed",
  "solid",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
]

const fourValues = (value: string) => {
  const [a, b = a, c = a, d = b] = splitValue(value)
  return [a, b, c, d]
}

const parseBorder = (value: string) => {
  return splitValue(value).reduce(
    (parts, token) => {
      if (BORDER_STYLES.includes(token)) return { ...parts, style: token }
      if (/^(thin|medium|thick|calc\(.*|-?[\d.]+[a-z%]*)$/.test(token)) {
        return { ...parts, width: token }
      }
      return { ...parts, color: token }
    },
    { width: "medium", style: "none", color: "currentcolor" }
  )
}

const borderSides = (sides: string[], value: string): [string, string][] => {
  const parts = parseBorder(value)
  return sides.flatMap((side) => {
    return [
      [`border-${side}-width`, parts.width],
      [`border-${side}-style`, parts.style],
      [`border-${side}-color`, parts.color],
    ] as [string, string][]
  })
}

/** Expands a declaration into the longhands it sets. */
export const expandToLonghands = (
  property: string,
  value: string
): [string, string][] => {
  if (property === "margin" || property === "padding") {
    const values = fourValues(value)
    return SIDES.map((side, i) => [`${property}-${side}`, values[i]])
  }
  if (property === "border") return borderSides(SIDES, value)
  const side = property.match(/^border-(top|right|bottom|left)$/)
  if (side) return borderSides([side[1]], value)
  const part = property.match(/^border-(width|style|color)$/)
  if (part) {
    const values = fourValues(value)
    return SIDES.map((s, i) => [`border-${s}-${part[1]}`, values[i]])
  }
  if (property === "border-radius") {
    const values = fourValues(value)
    return CORNERS.map((corner, i) => [`border-${corner}-radius`, values[i]])
  }
  return [[property, value]]
}

const compareRanks = (a: number[], b: number[]) => {
  const index = a.findIndex((value, i) => value !== b[i])
  if (index === -1) return 0
  return a[index] - b[index]
}

const normalize = (value: string) => {
  return value.trim().replace(/\s+/g, " ").toLowerCase()
}

const winnersOf = (candidates: Candidate[]): Winners => {
  return WIDTHS.reduce<Winners>((result, width) => {
    const best: Record<string, { value: string; rank: number[] }> = {}

    candidates
      .filter((candidate) => candidate.minWidth <= width)
      .forEach((candidate) => {
        expandToLonghands(candidate.property, candidate.value).forEach(
          ([longhand, value]) => {
            const current = best[longhand]
            if (current && compareRanks(candidate.rank, current.rank) < 0) {
              return
            }
            best[longhand] = { value, rank: candidate.rank }
          }
        )
      })

    Object.entries(best).forEach(([longhand, { value }]) => {
      result[`${width}px ${longhand}`] = normalize(value)
    })
    return result
  }, {})
}

const Oracle = styled.div.withConfig({ shouldForwardProp: () => false })(
  compose(space, width, color, border)
)

/** Winners for styled-components 6 + styled-system 5 rendering `props`. */
export const oracleWinners = (props: StyleCaseProps): Winners => {
  const sheet = new ServerStyleSheet()
  try {
    renderToString(
      sheet.collectStyles(
        React.createElement(Oracle, { ...props, theme: THEME } as never)
      )
    )
    const css = sheet.getStyleTags().replace(/<style[^>]*>|<\/style>/g, "")
    const candidates: Candidate[] = []
    let sourceIndex = 0

    postcss.parse(css).walkRules((rule) => {
      sourceIndex += 1
      // Skip styled-components' SSR marker rules (`data-styled.g1[id=...]`).
      if (!rule.selector.startsWith(".")) return
      const minWidth = minWidthOf(rule)
      rule.each((node) => {
        if (node.type !== "decl") return
        candidates.push({
          property: node.prop,
          value: node.value,
          minWidth,
          rank: [sourceIndex, candidates.length],
        })
      })
    })

    return winnersOf(candidates)
  } finally {
    sheet.seal()
  }
}

interface UtilityRule {
  rank: number[]
  minWidth: number
  declarations: [string, string][]
}

let utilityRules: Map<string, UtilityRule[]> | undefined

const readUtilityRules = () => {
  if (utilityRules) return utilityRules
  const rules = new Map<string, UtilityRule[]>()
  const css = fs.readFileSync(path.join(DIST, "palette.css"), "utf8")
  let sourceIndex = 0

  postcss.parse(css).walkRules((rule) => {
    sourceIndex += 1
    const layer = enclosing(rule, "layer")
    const classes = rule.selector.split(".").filter(Boolean)
    if (!layer || classes.length === 0) return

    const declarations: [string, string][] = []
    rule.each((node) => {
      if (node.type === "decl") declarations.push([node.prop, node.value])
    })
    const entry = {
      rank: [LAYER_ORDER.indexOf(layer.params), classes.length, sourceIndex],
      minWidth: minWidthOf(rule),
      declarations,
    }
    rules.set(classes[0], [...(rules.get(classes[0]) || []), entry])
  })

  utilityRules = rules
  return rules
}

const THEME_VARS: Record<string, string> = Object.fromEntries([
  ...Object.entries(THEME.colors).map(([name, value]) => {
    return [(vars.color as Record<string, string>)[name], value]
  }),
  ...Object.entries(THEME.space).map(([key, value]) => {
    return [(vars.space as Record<string, string>)[key], value]
  }),
])

const substitute = ({
  value,
  style,
}: {
  value: string
  style: Record<string, string>
}): string => {
  return value.replace(/var\((--[\w-]+)\)/g, (reference, name: string) => {
    const resolved = style[name] ?? THEME_VARS[reference]
    if (resolved === undefined) throw new Error(`Unset variable ${name}`)
    return substitute({ value: resolved, style })
  })
}

type ResolveStyleProps = (args: {
  props: StyleCaseProps
  names: readonly string[]
}) => { className: string; style: Record<string, string> }

/** Winners for the compiled resolver's classes and inline variables. */
export const resolverWinners = (props: StyleCaseProps): Winners => {
  const { resolveStyleProps } = nodeRequire(
    path.join(DIST, "cjs/styles/resolveStyleProps.js")
  ) as { resolveStyleProps: ResolveStyleProps }
  const { STYLE_PROP_NAMES } = nodeRequire(
    path.join(DIST, "cjs/styles/resolveDeclarations.js")
  ) as { STYLE_PROP_NAMES: string[] }

  const { className, style } = resolveStyleProps({
    props,
    names: STYLE_PROP_NAMES,
  })
  const rules = readUtilityRules()

  const candidates = className
    .split(" ")
    .filter(Boolean)
    .flatMap((name) => {
      const matches = rules.get(name)
      if (!matches) throw new Error(`No rule for class ${name}`)
      return matches.flatMap(({ rank, minWidth, declarations }) => {
        return declarations.map(([property, value], index) => {
          return {
            property,
            value: substitute({ value, style }),
            minWidth,
            rank: [...rank, index],
          }
        })
      })
    })

  return winnersOf(candidates)
}

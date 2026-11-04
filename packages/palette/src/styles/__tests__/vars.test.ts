/**
 * @jest-environment node
 */
import { THEME } from "@artsy/palette-tokens/dist/themes/v3"
import { THEME_DARK } from "@artsy/palette-tokens/dist/themes/v3Dark"
import fs from "fs"
import path from "path"
import postcss, { AtRule, Container, Root } from "postcss"

// Runs against the output of `yarn compile` (see the `pretest:build` script).

const PALETTE_CSS = path.resolve(__dirname, "../../../dist/palette.css")

const LIGHT_SELECTOR = ':root, [data-palette-theme="light"]'
const DARK_SELECTOR = '[data-palette-theme="dark"]'

// The build minifies colors (`#000000` -> `#000`, `rgba()`/`hsla()` -> 8-digit
// hex), so values are compared by their colors' channels instead of as text.
// The overlayGradient tokens end in a stray `;`, which CSS parsing drops.
const COLOR_PATTERN = /#[0-9a-f]{3,8}\b|(?:rgb|hsl)a?\([^)]*\)/gi
const CHANNEL_TOLERANCE = 1

type Rgba = number[]

const parseHex = (hex: string): Rgba => {
  const digits = hex.slice(1)
  const full =
    digits.length <= 4
      ? digits
          .split("")
          .map((digit) => digit + digit)
          .join("")
      : digits
  const channels = (full.match(/../g) || []).map((pair) => parseInt(pair, 16))
  return [channels[0], channels[1], channels[2], channels[3] ?? 255]
}

const hslToRgb = ({ h, s, l }: { h: number; s: number; l: number }) => {
  const chroma = (1 - Math.abs(2 * l - 1)) * s
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1))
  const offset = l - chroma / 2
  const sector = Math.floor((((h % 360) + 360) % 360) / 60)
  const [r, g, b] = [
    [chroma, x, 0],
    [x, chroma, 0],
    [0, chroma, x],
    [0, x, chroma],
    [x, 0, chroma],
    [chroma, 0, x],
  ][sector]
  return [r, g, b].map((channel) => Math.round((channel + offset) * 255))
}

const parseFunction = (color: string): Rgba => {
  const [name, args] = color.split("(")
  const [a, b, c, alpha] = args
    .replace(")", "")
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(parseFloat)
  const alphaChannel = Math.round((alpha ?? 1) * 255)

  if (name.toLowerCase().startsWith("hsl")) {
    return [...hslToRgb({ h: a, s: b / 100, l: c / 100 }), alphaChannel]
  }
  return [a, b, c, alphaChannel]
}

const parseColor = (color: string): Rgba => {
  return color.startsWith("#") ? parseHex(color) : parseFunction(color)
}

const describeValue = (value: string) => {
  return {
    skeleton: value
      .replace(COLOR_PATTERN, "#")
      .replace(/\s+/g, "")
      .replace(/;$/, ""),
    colors: (value.match(COLOR_PATTERN) || []).map(parseColor),
  }
}

const expectSameValue = ({
  actual,
  expected,
}: {
  actual: string | undefined
  expected: string
}) => {
  expect(actual).toEqual(expect.any(String))

  const actualValue = describeValue(actual as string)
  const expectedValue = describeValue(expected)

  expect(actualValue.skeleton).toBe(expectedValue.skeleton)
  expect(actualValue.colors).toHaveLength(expectedValue.colors.length)
  actualValue.colors.forEach((color, index) => {
    color.forEach((channel, channelIndex) => {
      const expectedChannel = expectedValue.colors[index][channelIndex]
      expect(Math.abs(channel - expectedChannel)).toBeLessThanOrEqual(
        CHANNEL_TOLERANCE
      )
    })
  })
}

const isInsideLayer = ({
  node,
  layer,
}: {
  node: { parent?: Container | Root }
  layer: string
}) => {
  let parent = node.parent
  while (parent) {
    if (
      parent.type === "atrule" &&
      (parent as AtRule).name === "layer" &&
      (parent as AtRule).params === layer
    ) {
      return true
    }
    parent = (parent as { parent?: Container | Root }).parent
  }
  return false
}

const readVariables = (selector: string) => {
  const root = postcss.parse(fs.readFileSync(PALETTE_CSS, "utf8"))
  const variables: Record<string, string> = {}

  root.walkRules((rule) => {
    if (rule.selectors.join(", ") !== selector) return
    if (!isInsideLayer({ node: rule, layer: "palette.reset" })) return

    rule.walkDecls(/^--/, (decl) => {
      variables[decl.prop] = decl.value
    })
  })

  return variables
}

const spaceName = (key: string) => {
  return `--space-${key.replace(".", "_")}`
}

describe("design tokens as CSS variables in dist/palette.css", () => {
  it("declares every light token on :root and the light theme attribute", () => {
    const variables = readVariables(LIGHT_SELECTOR)

    Object.entries(THEME.colors).forEach(([name, value]) => {
      expectSameValue({ actual: variables[`--color-${name}`], expected: value })
    })
    Object.entries(THEME.space).forEach(([key, value]) => {
      expectSameValue({ actual: variables[spaceName(key)], expected: value })
    })
    Object.entries(THEME.effects).forEach(([name, value]) => {
      expectSameValue({
        actual: variables[`--effect-${name}`],
        expected: value,
      })
    })
  })

  it("overrides every dark color and effect under the dark theme attribute", () => {
    const variables = readVariables(DARK_SELECTOR)

    Object.entries(THEME_DARK.colors).forEach(([name, value]) => {
      expectSameValue({ actual: variables[`--color-${name}`], expected: value })
    })
    Object.entries(THEME_DARK.effects).forEach(([name, value]) => {
      expectSameValue({
        actual: variables[`--effect-${name}`],
        expected: value,
      })
    })
  })

  it("does not repeat light values the dark theme leaves unchanged", () => {
    const variables = readVariables(DARK_SELECTOR)

    expect(
      Object.keys(variables).filter((name) => name.startsWith("--space-"))
    ).toEqual([])
  })

  it("names variables like generate-styles.ts", () => {
    const variables = readVariables(LIGHT_SELECTOR)

    expect(variables["--color-mono60"]).toBe("#707070")
    expect(variables["--space-0_5"]).toBe("5px")
    expect(variables["--space-half"]).toBe("5px")
    expect(variables["--effect-dropShadow"]).toEqual(expect.any(String))
  })
})

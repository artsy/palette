import { THEME } from "@artsy/palette-tokens/dist/themes/v3"
import { border, color, compose, space, width } from "styled-system"
import {
  Breakpoint,
  Declaration,
  resolveDeclarations,
  StylePropName,
} from "../resolveDeclarations"
import { PARITY_CASES } from "./helpers/styleCases"

type Props = Partial<Record<StylePropName, unknown>>
type FlatDeclaration = Omit<Declaration, "token">

const styledSystem = compose(space, width, color, border)

const BREAKPOINT_BY_MEDIA: Record<string, Breakpoint> = {
  "@media screen and (min-width: 767px)": "xs",
  "@media screen and (min-width: 768px)": "sm",
  "@media screen and (min-width: 1280px)": "md",
  "@media screen and (min-width: 1920px)": "lg",
}

const kebabCase = (property: string) => {
  return property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

// Mirrors how styled-components prints a style object: falsish values are
// dropped and numbers other than 0 get `px`, except on unitless properties.
const toCssValue = ({ key, value }: { key: string; value: unknown }) => {
  if (value === undefined || value === null || value === false) return null
  if (value === "") return null
  if (typeof value === "number" && value !== 0 && key !== "opacity") {
    return `${value}px`
  }
  return String(value)
}

const flatten = ({
  styles,
  breakpoint,
}: {
  styles: Record<string, unknown>
  breakpoint: Breakpoint
}): FlatDeclaration[] => {
  return Object.entries(styles).flatMap(([key, value]) => {
    if (key.startsWith("@media")) {
      const mediaBreakpoint = BREAKPOINT_BY_MEDIA[key]
      if (!mediaBreakpoint) throw new Error(`Unknown media query: ${key}`)
      return flatten({
        styles: value as Record<string, unknown>,
        breakpoint: mediaBreakpoint,
      })
    }

    const cssValue = toCssValue({ key, value })
    if (cssValue === null) return []
    return [{ breakpoint, property: kebabCase(key), value: cssValue }]
  })
}

const oracle = (props: Props) => {
  return flatten({
    styles: styledSystem({ ...props, theme: THEME }),
    breakpoint: "base",
  })
}

const sortDeclarations = (declarations: FlatDeclaration[]) => {
  return [...declarations].sort((a, b) => {
    return `${a.breakpoint}|${a.property}`.localeCompare(
      `${b.breakpoint}|${b.property}`
    )
  })
}

const withoutToken = (declarations: Declaration[]): FlatDeclaration[] => {
  return declarations.map(({ breakpoint, property, value }) => {
    return { breakpoint, property, value }
  })
}

describe("resolveDeclarations", () => {
  describe.each(PARITY_CASES.map((props) => [JSON.stringify(props), props]))(
    "%s",
    (_name, props) => {
      it("matches styled-system", () => {
        expect(
          sortDeclarations(withoutToken(resolveDeclarations(props as Props)))
        ).toEqual(sortDeclarations(oracle(props as Props)))
      })
    }
  )

  it("marks a value as a token only when it is a scale key", () => {
    const tokenOf = (props: Props) => {
      return resolveDeclarations(props).map((declaration) => {
        return declaration.token
      })
    }

    expect(tokenOf({ mt: 2 })).toEqual([{ scale: "space", key: "2" }])
    expect(tokenOf({ mt: 0.5 })).toEqual([{ scale: "space", key: "0.5" }])
    expect(tokenOf({ mt: "half" })).toEqual([{ scale: "space", key: "half" }])
    expect(tokenOf({ color: "mono10" })).toEqual([
      { scale: "colors", key: "mono10" },
    ])
    expect(tokenOf({ mx: 1 })).toEqual([
      { scale: "space", key: "1" },
      { scale: "space", key: "1" },
    ])

    expect(tokenOf({ mt: 0 })).toEqual([undefined])
    expect(tokenOf({ mt: -1 })).toEqual([undefined])
    expect(tokenOf({ mt: "0.5" })).toEqual([undefined])
    expect(tokenOf({ mt: "31px" })).toEqual([undefined])
    expect(tokenOf({ width: 0.5 })).toEqual([undefined])
    expect(tokenOf({ color: "red" })).toEqual([undefined])
    expect(tokenOf({ borderWidth: 2 })).toEqual([undefined])
  })

  it("keeps the last value at the position of the first write", () => {
    expect(resolveDeclarations({ m: 1, mt: 2 })).toEqual([
      {
        breakpoint: "base",
        property: "margin",
        value: "10px",
        token: { scale: "space", key: "1" },
      },
      {
        breakpoint: "base",
        property: "margin-top",
        value: "20px",
        token: { scale: "space", key: "2" },
      },
    ])
    expect(
      resolveDeclarations({ marginTop: 1, mt: 2 }).map(({ value }) => value)
    ).toEqual(["20px"])
    expect(
      resolveDeclarations({ ml: 1, m: 2, mx: 4 }).map(({ property, value }) => {
        return `${property}: ${value}`
      })
    ).toEqual(["margin-left: 40px", "margin: 20px", "margin-right: 40px"])
  })
})

import { dynamicClasses } from "../dynamic.css"
import { STYLE_PROP_NAMES } from "../resolveDeclarations"
import { resolveStyleProps } from "../resolveStyleProps"
import { tokenClasses } from "../sprinkles.css"
import { STYLE_PROPERTIES } from "../styleProperties"

const classList = (className: string) => {
  return className.split(" ").filter(Boolean)
}

describe("resolveStyleProps", () => {
  it("maps a token value to its class, with no inline style", () => {
    const result = resolveStyleProps({
      props: { mt: 2, id: "x" },
      names: ["mt"],
    })

    expect(classList(result.className)).toEqual([
      tokenClasses.base["margin-top"]["2"],
    ])
    expect(result.style).toEqual({})
    expect(result.rest).toEqual({ id: "x" })
  })

  it("maps other values to a dynamic class plus an inline variable", () => {
    const result = resolveStyleProps({
      props: { mt: [2, "31px"] },
      names: ["mt"],
    })

    expect(classList(result.className)).toEqual([
      tokenClasses.base["margin-top"]["2"],
      dynamicClasses.sm["margin-top"],
    ])
    expect(result.style).toEqual({ "--mt-sm": "31px" })
  })

  it("returns the same output for the same input", () => {
    const input = {
      props: { mt: [2, "31px"], px: { _: -1, md: 4 }, color: "mono60" },
      names: ["mt", "px", "color"] as const,
    }

    const first = resolveStyleProps(input)
    resolveStyleProps({ props: { mt: 4, mb: "1px" }, names: ["mt", "mb"] })
    const second = resolveStyleProps(input)

    expect(second).toEqual(first)
    expect(second).not.toBe(first)
  })

  it("never passes style prop names through in rest", () => {
    const styleProps = Object.fromEntries(
      STYLE_PROP_NAMES.map((name) => [name, 1])
    )

    const { rest } = resolveStyleProps({
      props: { ...styleProps, id: "x", "data-test": "y" },
      names: ["mt"],
    })

    expect(rest).toEqual({ id: "x", "data-test": "y" })
  })

  it("resolves only the names it is given", () => {
    const result = resolveStyleProps({
      props: { mt: 2, mb: "3px" },
      names: ["mt"],
    })

    expect(classList(result.className)).toEqual([
      tokenClasses.base["margin-top"]["2"],
    ])
    expect(result.style).toEqual({})
  })

  it("splits axis props into their physical properties", () => {
    const result = resolveStyleProps({
      props: { mx: "auto", py: 1 },
      names: ["mx", "py"],
    })

    expect(classList(result.className)).toEqual([
      dynamicClasses.base["margin-left"],
      dynamicClasses.base["margin-right"],
      tokenClasses.base["padding-top"]["1"],
      tokenClasses.base["padding-bottom"]["1"],
    ])
    expect(result.style).toEqual({ "--ml-base": "auto", "--mr-base": "auto" })
  })

  it("uses token classes for theme colors and dynamic ones for anything else", () => {
    const result = resolveStyleProps({
      props: { color: "mono60", bg: "red", borderColor: { md: "mono10" } },
      names: ["color", "bg", "borderColor"],
    })

    expect(classList(result.className)).toEqual([
      tokenClasses.base.color.mono60,
      dynamicClasses.base["background-color"],
      tokenClasses.md["border-color"].mono10,
    ])
    expect(result.style).toEqual({ "--bg-base": "red" })
  })

  // styled-system lets the later prop win. Classes cannot follow prop order, so
  // a shorthand that comes later drops the longhands it resets.
  it("drops a longhand that a later shorthand resets", () => {
    const result = resolveStyleProps({
      props: { mt: [2, 4], m: 1 },
      names: ["mt", "m"],
    })

    expect(classList(result.className)).toEqual([
      tokenClasses.sm["margin-top"]["4"],
      tokenClasses.base.margin["1"],
    ])
  })

  it("keeps a longhand that comes after its shorthand", () => {
    const result = resolveStyleProps({
      props: { border: "1px solid", borderColor: "mono10" },
      names: ["border", "borderColor"],
    })

    expect(classList(result.className)).toEqual([
      dynamicClasses.base.border,
      tokenClasses.base["border-color"].mono10,
    ])
    expect(result.style).toEqual({ "--b-base": "1px solid" })
  })

  it("gives every CSS property its own variable alias", () => {
    const aliases = Object.values(STYLE_PROPERTIES).map(({ alias }) => alias)
    expect(new Set(aliases).size).toEqual(aliases.length)
  })
})

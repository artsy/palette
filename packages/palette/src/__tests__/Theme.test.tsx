import React from "react"
import { mount } from "enzyme"
import {
  getPaletteThemeAttributes,
  PALETTE_THEME_ATTRIBUTE,
  Theme,
  useTheme,
} from "../Theme"

const Example = () => {
  const { theme } = useTheme()
  return <div>{theme.name}</div>
}

const HexExample = () => {
  const { theme } = useTheme()
  return <div>{theme.colors.mono100}</div>
}

describe("useTheme", () => {
  it("returns the current theme if one is provided", () => {
    const wrapper = mount(
      <Theme theme="dark">
        <Example />
      </Theme>
    )
    expect(wrapper.text()).toEqual("dark")
  })

  it("returns the default theme if none is provided", () => {
    const wrapper = mount(<Example />)
    expect(wrapper.text()).toEqual("light")
  })
})

describe("Theme", () => {
  afterEach(() => {
    document.documentElement.removeAttribute(PALETTE_THEME_ATTRIBUTE)
  })

  it("exposes the attribute name and its props helper", () => {
    expect(PALETTE_THEME_ATTRIBUTE).toBe("data-palette-theme")
    expect(getPaletteThemeAttributes("dark")).toEqual({
      "data-palette-theme": "dark",
    })
  })

  it("sets the attribute on <html> for the root theme", () => {
    const wrapper = mount(
      <Theme theme="dark">
        <span />
      </Theme>
    )
    expect(document.documentElement.getAttribute("data-palette-theme")).toBe(
      "dark"
    )

    wrapper.setProps({ theme: "light" })
    expect(document.documentElement.getAttribute("data-palette-theme")).toBe(
      "light"
    )
  })

  it("does not wrap the root theme", () => {
    const wrapper = mount(
      <Theme theme="dark">
        <span />
      </Theme>
    )
    expect(wrapper.getDOMNode().tagName).toBe("SPAN")
  })

  it("wraps a nested theme that differs from its parent", () => {
    const wrapper = mount(
      <Theme theme="light">
        <Theme theme="dark">
          <span />
        </Theme>
      </Theme>
    )

    const element = wrapper.getDOMNode() as HTMLElement
    expect(element.matches('div[data-palette-theme="dark"]')).toBe(true)
    expect(element.style.display).toBe("contents")
    expect(element.children).toHaveLength(1)
    expect(element.children[0].tagName).toBe("SPAN")
  })

  it("leaves <html> alone for a nested theme", () => {
    mount(
      <Theme theme="light">
        <Theme theme="dark">
          <span />
        </Theme>
      </Theme>
    )
    expect(document.documentElement.getAttribute("data-palette-theme")).toBe(
      "light"
    )
  })

  it("does not wrap a nested theme equal to its parent", () => {
    const wrapper = mount(
      <Theme theme="dark">
        <Theme theme="dark">
          <span />
        </Theme>
      </Theme>
    )
    expect(wrapper.getDOMNode().tagName).toBe("SPAN")
    expect(wrapper.find("[data-palette-theme]").exists()).toBe(false)
  })

  it("keeps providing the styled-components theme", () => {
    const wrapper = mount(
      <Theme theme="dark">
        <Theme theme="light">
          <HexExample />
        </Theme>
      </Theme>
    )
    expect(wrapper.text()).toMatch(/^#[0-9a-f]{6}$/i)
  })
})

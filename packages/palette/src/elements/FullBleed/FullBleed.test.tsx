import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { FullBleed } from "./FullBleed"

describe("FullBleed", () => {
  it("breaks out of its parent container by default", () => {
    const wrapper = mount(<FullBleed>content</FullBleed>)
    const node = wrapper.find("div").last()

    expect(node).toHaveStyleRule("width", "100vw")
    expect(node).toHaveStyleRule("margin-left", "-50vw")
    expect(node).toHaveStyleRule("left", "50%")
  })

  it("does not bleed when `enabled` is false", () => {
    const wrapper = mount(<FullBleed enabled={false}>content</FullBleed>)
    const node = wrapper.find("div").last()

    expect(node).not.toHaveStyleRule("width", "100vw")
    expect(node).not.toHaveStyleRule("margin-left", "-50vw")
    expect(node).not.toHaveStyleRule("left", "50%")
  })

  it("does not forward `enabled` to the DOM", () => {
    const wrapper = mount(<FullBleed enabled={false}>content</FullBleed>)

    expect(wrapper.find("div").last().prop("enabled")).toBeUndefined()
  })
})

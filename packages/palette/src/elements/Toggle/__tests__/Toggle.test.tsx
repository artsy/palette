import { mount } from "enzyme"
import React from "react"
import { ChevronIcon } from "../../../svgs"
import { Text } from "../../Text"
import { Toggle } from "../Toggle"

describe("Toggle", () => {
  it("hides content when not expanded", () => {
    const wrapper = mount(<Toggle>hidden content</Toggle>)
    expect(wrapper.html()).not.toContain("hidden content")
  })

  it("shows content when expanded", () => {
    const wrapper = mount(<Toggle expanded>visible content</Toggle>)
    expect(wrapper.html()).toContain("visible content")
  })

  it("toggles content when clicked", () => {
    const wrapper = mount(<Toggle>tab content</Toggle>)
    expect(wrapper.html()).not.toContain("tab content")
    wrapper.find("Header").simulate("click")
    expect(wrapper.html()).toContain("tab content")
    wrapper.find("Header").simulate("click")
    expect(wrapper.html()).not.toContain("tab content")
  })

  it("disables toggle", () => {
    const wrapper = mount(
      <Toggle disabled expanded>
        tab content
      </Toggle>
    )
    const header = wrapper.find("Header")
    expect(wrapper.html()).toContain("tab content")
    header.simulate("click")
    expect(wrapper.html()).toContain("tab content")
    header.simulate("click")
    expect(wrapper.html()).toContain("tab content")
  })

  it("defaults chevron size to 12px", () => {
    const wrapper = mount(<Toggle>tab content</Toggle>)
    const chevron = wrapper.find(ChevronIcon)
    expect(chevron.props().width).toEqual(12)
    expect(chevron.props().height).toEqual(12)
  })

  it("renders proper component when passed component as label", () => {
    const component = <Text variant="sm">Hello</Text>
    const wrapper = mount(<Toggle label={component}>tab content</Toggle>)
    expect(wrapper.find("Text")).toHaveLength(1)
  })

  it("renders Sans component when passed string as label", () => {
    const wrapper = mount(<Toggle label="label">tab content</Toggle>)
    expect(wrapper.find("Sans")).toHaveLength(1)
    expect(wrapper.find("Sans").text()).toEqual("label")
  })

  it("fires onClick when one is passed", () => {
    const mockCallback = jest.fn()
    const wrapper = mount(<Toggle onClick={mockCallback}>tab content</Toggle>)
    wrapper.find("Header").simulate("click")
    wrapper.find("Header").simulate("click")
    expect(mockCallback).toHaveBeenCalledTimes(2)
  })
})

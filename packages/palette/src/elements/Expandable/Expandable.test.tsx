import { mount } from "enzyme"
import React from "react"
import { Theme } from "../../Theme"
import { Expandable } from "./Expandable"

describe("Expandable", () => {
  it("renders content in DOM when expanded", () => {
    const wrapper = mount(
      <Theme>
        <Expandable label="Click to expand" expanded>
          <div>Content that should be visible</div>
        </Expandable>
      </Theme>
    )

    expect(wrapper.html()).toContain("Content that should be visible")
  })

  it("keeps content in DOM when collapsed (for SEO)", () => {
    const wrapper = mount(
      <Theme>
        <Expandable label="Click to expand" expanded={false}>
          <div>Content that should be in DOM</div>
        </Expandable>
      </Theme>
    )

    expect(wrapper.html()).toContain("Content that should be in DOM")
  })

  it("toggles expanded state when clicked", () => {
    const wrapper = mount(
      <Theme>
        <Expandable label="Click to expand" expanded={false}>
          <div>Expandable content</div>
        </Expandable>
      </Theme>
    )

    const clickable = wrapper.find("button")

    expect(clickable.prop("aria-expanded")).toBe(false)

    clickable.simulate("click")

    expect(wrapper.find("button").prop("aria-expanded")).toBe(true)
  })

  it("calls onToggle callback when toggled", () => {
    const onToggle = jest.fn()
    const wrapper = mount(
      <Theme>
        <Expandable label="Click to expand" expanded={false} onToggle={onToggle}>
          <div>Content</div>
        </Expandable>
      </Theme>
    )

    wrapper.find("button").simulate("click")

    expect(onToggle).toHaveBeenCalledWith(true)
  })

  it("supports children as a function", () => {
    const wrapper = mount(
      <Theme>
        <Expandable label="Click to expand" expanded>
          {({ expanded }) => <div>Expanded: {expanded ? "yes" : "no"}</div>}
        </Expandable>
      </Theme>
    )

    expect(wrapper.html()).toContain("Expanded: yes")
  })
})

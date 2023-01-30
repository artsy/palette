import { mount } from "enzyme"
import React from "react"
import { Input } from "../Input"

describe("Input", () => {
  it("returns a simple input with no options", () => {
    const wrapper = mount(<Input />)
    expect(wrapper.find("input").length).toEqual(1)
  })

  it("returns an input with title when provided", () => {
    const wrapper = mount(<Input title="This is the title" />)
    expect(wrapper.text()).toEqual("This is the title")
  })

  it("returns a required input with title when provided both flags", () => {
    const wrapper = mount(<Input title="This is the title" required />)
    expect(wrapper.text()).toContain("This is the title")
    expect(wrapper.text()).toContain("*Required")
  })

  it("returns an input with description when provided", () => {
    const wrapper = mount(<Input description="This is the title" />)
    expect(wrapper.text()).toContain("What is this?")
    expect(wrapper.text()).toContain("This is the title")
  })

  it("returns an input with error text when provided", () => {
    const wrapper = mount(<Input error="This is the error" />)
    expect(wrapper.text()).toContain("This is the error")
  })

  it("hides required when the error message is shown", () => {
    const wrapper = mount(<Input required error="This is the error" />)
    expect(wrapper.text()).not.toContain("*Required")
    expect(wrapper.text()).toContain("This is the error")
  })
})

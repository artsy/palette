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

  it("returns an input with a character counter when showCounter is provided", () => {
    const wrapper = mount(<Input maxLength={10} showCounter />)
    expect(wrapper.text()).toContain("0/10")
  })

  describe("label association", () => {
    it("associates the label with the input via a generated id", () => {
      const wrapper = mount(<Input title="Title" />)
      const id = wrapper.find("input").prop("id")

      expect(id).toBeTruthy()
      expect(wrapper.find("label").prop("htmlFor")).toEqual(id)
    })

    it("prefers a consumer-supplied id", () => {
      const wrapper = mount(<Input title="Title" id="my-input" />)

      expect(wrapper.find("input").prop("id")).toEqual("my-input")
      expect(wrapper.find("label").prop("htmlFor")).toEqual("my-input")
    })

    it("does not key the association off name", () => {
      const wrapper = mount(<Input title="Title" name="my-name" />)

      expect(wrapper.find("input").prop("name")).toEqual("my-name")
      expect(wrapper.find("label").prop("htmlFor")).not.toEqual("my-name")
      expect(wrapper.find("label").prop("htmlFor")).toEqual(
        wrapper.find("input").prop("id")
      )
    })

    it("gives two inputs on the same page distinct ids", () => {
      const wrapper = mount(
        <>
          <Input title="One" />
          <Input title="Two" />
        </>
      )
      const [first, second] = wrapper.find("input").map((n) => n.prop("id"))

      expect(first).not.toEqual(second)
    })
  })
})

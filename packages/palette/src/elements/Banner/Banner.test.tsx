import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Banner } from "../Banner"

describe("Button", () => {
  it("displays the message", () => {
    const message = "There was an error."
    const wrapper = mount(<Banner>There was an error.</Banner>)
    expect(wrapper.text()).toEqual(message)
    expect(wrapper.find("Clickable")).toHaveLength(0)
  })

  it("is dismissable", () => {
    const wrapper = mount(<Banner dismissable>There was an error.</Banner>)
    expect(wrapper.find("Clickable")).toHaveLength(1)
  })

  it("disappears when dismissed", () => {
    const wrapper = mount(<Banner dismissable>There was an error.</Banner>)
    expect(wrapper.find("Clickable")).toHaveLength(1)
    wrapper.find("Clickable").simulate("click")
    expect(wrapper.find("Clickable")).toHaveLength(0)
  })

  it("calls 'onClose' when dismissed", () => {
    const onClose = jest.fn()
    const wrapper = mount(
      <Banner dismissable onClose={onClose}>
        There was an error.
      </Banner>
    )
    wrapper.find("Clickable").simulate("click")
    expect(onClose).toHaveBeenCalled()
  })
})

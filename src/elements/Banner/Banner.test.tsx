import { mount } from "enzyme"
import React from "react"
import { Banner } from "../Banner"

describe("Button", () => {
  it("displays the message", () => {
    const message = "There was an error."
    const wrapper = mount(<Banner message={message} />)
    expect(wrapper.text()).toEqual(message)
    expect(wrapper.find("CloseButton")).toHaveLength(0)
  })

  it("is dismissable", () => {
    const message = "There was an error."
    const wrapper = mount(<Banner dismissable message={message} />)
    expect(wrapper.find("CloseButton")).toHaveLength(1)
  })

  it("disappears when dismissed", () => {
    const message = "There was an error."
    const wrapper = mount(<Banner dismissable message={message} />)
    expect(wrapper.find("CloseButton")).toHaveLength(1)
    wrapper.find("CloseButton").simulate("click")
    expect(wrapper.find("CloseButton")).toHaveLength(0)
  })
})

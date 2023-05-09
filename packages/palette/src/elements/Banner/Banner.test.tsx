import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Theme } from "../../Theme"
import { Banner } from "../Banner"

describe("Button", () => {
  it("has default black10 background to Banner", () => {
    const wrapper = mount(
      <Theme>
        <Banner />
      </Theme>
    )
    expect(wrapper).toHaveStyleRule("background-color", "#E7E7E7")
  })

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
})

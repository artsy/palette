import { mount } from "enzyme"
import React from "react"
import { Avatar } from "../Avatar"

describe("Avatar", () => {
  it("renders an AvatarImage if image url provided", () => {
    const wrapper = mount(<Avatar src="some/path.img" />)
    expect(wrapper.find("AvatarImage").length).toBe(1)
    expect(wrapper.find("InitialsHolder").length).toBe(0)
  })

  it("renders initials if no image url and initials provided", () => {
    const wrapper = mount(<Avatar initials="AB" />)
    expect(wrapper.find("AvatarImage").length).toBe(0)
    const holderWrapper = wrapper.find("InitialsHolder")
    expect(holderWrapper.length).toBe(1)
    expect(holderWrapper.text()).toEqual("AB")
  })

  it("returns null if no image url or initials", () => {
    const wrapper = mount(<Avatar />)
    expect(wrapper.instance()).toBe(null)
  })

  it("returns different sizes", () => {
    const getWrapper = size => mount(<Avatar size={size} initials="AB" />)
    expect(getWrapper("xs").html()).toContain("45px")
    expect(getWrapper("sm").html()).toContain("70px")
    expect(getWrapper("md").html()).toContain("100px")
  })
})

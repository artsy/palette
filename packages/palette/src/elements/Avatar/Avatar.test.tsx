import { mount } from "enzyme"
import React from "react"
import { Avatar } from "../Avatar"

describe("Avatar", () => {
  describe("on web", () => {
    it("renders an image if image url provided", () => {
      const wrapper = mount(<Avatar src="some/path.img" />)
      expect(wrapper.find("img").length).toBe(1)
    })
  })

  it("renders initials if no image url and initials provided", () => {
    const wrapper = mount(<Avatar initials="AB" />)
    expect(wrapper.find("img").length).toBe(0)
    expect(wrapper.text()).toEqual("AB")
  })

  it("returns null if no image url or initials", () => {
    const wrapper = mount(<Avatar />)
    expect(wrapper.instance()).toBe(null)
  })

  it("returns different sizes", () => {
    const getWrapper = (size) => mount(<Avatar size={size} initials="AB" />)
    expect(getWrapper("xs").html()).toContain("45")
    expect(getWrapper("sm").html()).toContain("70")
    expect(getWrapper("md").html()).toContain("100")
  })
})

import { mount } from "enzyme"
import React from "react"
import { Clickable } from "../../Clickable"
import { ReadMore } from "../ReadMore"

// jsdom reports zero height, so the toggle never renders unless the
// measurements are stubbed.
const LONG = "<p>" + "word ".repeat(400) + "</p>"

const mountOverflowing = () => {
  jest
    .spyOn(HTMLElement.prototype, "scrollHeight", "get")
    .mockReturnValue(1000)
  jest.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(20)

  return mount(<ReadMore content={LONG} maxLines={1} />)
}

describe("ReadMore", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("renders its content", () => {
    const wrapper = mount(<ReadMore content="<p>Hello</p>" />)
    expect(wrapper.html()).toContain("Hello")
  })

  describe("accessibility", () => {
    it("does not put aria-expanded on the container", () => {
      const wrapper = mountOverflowing()

      expect(wrapper.find("div[aria-expanded]").length).toEqual(0)
    })

    it("puts aria-expanded on the toggle and points it at the region", () => {
      const wrapper = mountOverflowing()
      const toggle = wrapper.find(Clickable)

      expect(toggle.length).toEqual(1)
      expect(toggle.prop("aria-expanded")).toEqual(false)
      expect(toggle.prop("aria-controls")).toBeTruthy()
      expect(
        wrapper.find(`#${toggle.prop("aria-controls")}`).length
      ).toBeGreaterThan(0)
    })
  })
})

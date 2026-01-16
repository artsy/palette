import { mount } from "enzyme"
import React from "react"
import { ProgressDots } from "../ProgressDots"

describe("ProgressDots", () => {
  it("renders correctly", () => {
    const wrapper = mount(
      <div>
        <ProgressDots activeIndex={3} amount={10} />
      </div>
    )

    // Renders all the dots
    expect(wrapper.find("Indicator").length).toBe(10)

    // Activates the correct dot
    expect(wrapper.find("Indicator").at(3).prop("bg")).toEqual("mono100")

    // Announces the progress
    expect(wrapper.html()).toContain("4 of 10")
  })

  it("passes the index when clicked", async () => {
    const handleClick = jest.fn()

    const wrapper = mount(
      <div>
        <ProgressDots activeIndex={3} amount={10} onClick={handleClick} />
      </div>
    )

    wrapper.find("button").at(6).simulate("click")

    expect(handleClick).toHaveBeenLastCalledWith(6)

    wrapper.find("button").at(1).simulate("click")

    expect(handleClick).toHaveBeenLastCalledWith(1)
  })

  describe("accessibility", () => {
    it("adds accessible labels when clickable", () => {
      const wrapper = mount(
        <div>
          <ProgressDots activeIndex={2} amount={5} onClick={jest.fn()} />
        </div>
      )

      const buttons = wrapper.find("button")
      expect(buttons.length).toBe(5)

      // First button should have correct aria-label
      expect(buttons.at(0).prop("aria-label")).toBe("Go to 1 of 5")
      expect(buttons.at(0).prop("aria-selected")).toBe(false)
      expect(buttons.at(0).prop("aria-current")).toBeUndefined()

      // Active button (index 2, which is the 3rd button) should be selected
      expect(buttons.at(2).prop("aria-label")).toBe("Go to 3 of 5")
      expect(buttons.at(2).prop("aria-selected")).toBe(true)
      expect(buttons.at(2).prop("aria-current")).toBe("page")
      expect(buttons.at(2).prop("role")).toBe("tab")
    })

    it("adds tablist role and aria-label to container when clickable", () => {
      const wrapper = mount(
        <div>
          <ProgressDots activeIndex={0} amount={3} onClick={jest.fn()} />
        </div>
      )

      const container = wrapper.find('div[role="tablist"]').hostNodes()
      expect(container.length).toBe(1)
      expect(container.prop("aria-label")).toBe("Progress indicators")
    })

    it("uses presentation role when not clickable", () => {
      const wrapper = mount(
        <div>
          <ProgressDots activeIndex={0} amount={3} />
        </div>
      )

      const container = wrapper.find('div[role="presentation"]').hostNodes()
      expect(container.length).toBe(1)
      expect(container.prop("aria-label")).toBeUndefined()
    })

    it("does not add button elements when not clickable", () => {
      const wrapper = mount(
        <div>
          <ProgressDots activeIndex={0} amount={3} />
        </div>
      )

      expect(wrapper.find("button").length).toBe(0)
    })
  })
})

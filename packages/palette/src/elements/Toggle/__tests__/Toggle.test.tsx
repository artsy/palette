import { mount } from "enzyme"
import React from "react"
import { Toggle } from "../index"

describe("Toggle", () => {
  it("renders correctly", () => {
    const wrapper1 = mount(<Toggle onSelect={jest.fn()} />)

    expect(wrapper1.find("div").first().prop("aria-checked")).toBe(false)

    const wrapper2 = mount(<Toggle onSelect={jest.fn()} selected />)

    expect(wrapper2.find("div").first().prop("aria-checked")).toBe(true)
  })

  it("triggers onSelect on click", () => {
    const handleSelect = jest.fn()
    const wrapper = mount(<Toggle onSelect={handleSelect} />)

    expect(handleSelect).not.toBeCalled()

    wrapper.simulate("click")

    expect(handleSelect).toBeCalledTimes(1)
  })

  it("triggers onSelect on spacebar keypress", () => {
    const handleSelect = jest.fn()
    const wrapper = mount(<Toggle onSelect={handleSelect} />)

    expect(handleSelect).not.toBeCalled()

    wrapper.simulate("keypress", { key: " " })

    expect(handleSelect).toBeCalledTimes(1)
  })

  describe("accessibility", () => {
    it("uses a valid ARIA role", () => {
      const wrapper = mount(<Toggle />)

      expect(wrapper.find('[role="switch"]').length).toBeGreaterThan(0)
      expect(wrapper.find('[role="toggle"]').length).toEqual(0)
    })

    it("reports its checked state", () => {
      expect(
        mount(<Toggle />).find('[role="switch"]').first().prop("aria-checked")
      ).toBe(false)
      expect(
        mount(<Toggle selected />)
          .find('[role="switch"]')
          .first()
          .prop("aria-checked")
      ).toBe(true)
    })
  })
})

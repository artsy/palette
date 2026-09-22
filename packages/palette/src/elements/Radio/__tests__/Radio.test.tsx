import { mount } from "enzyme"
import React from "react"
import { Radio } from "../Radio"

describe("Radio", () => {
  it("renders its label", () => {
    const wrapper = mount(<Radio>A label</Radio>)
    expect(wrapper.text()).toContain("A label")
  })

  it("calls onSelect when clicked", () => {
    const onSelect = jest.fn()
    const wrapper = mount(
      <Radio value="a" onSelect={onSelect}>
        A label
      </Radio>
    )
    wrapper.find('[role="radio"]').first().simulate("click")

    expect(onSelect).toHaveBeenCalledWith({ selected: true, value: "a" })
  })

  describe("accessibility", () => {
    it("does not put role=radio on a label element", () => {
      const wrapper = mount(<Radio>A label</Radio>)

      expect(wrapper.find("label").length).toEqual(0)
      expect(wrapper.find('div[role="radio"]').length).toEqual(1)
    })

    it("always emits aria-checked, even when unselected", () => {
      const wrapper = mount(<Radio>A label</Radio>)

      expect(wrapper.find('[role="radio"]').first().prop("aria-checked")).toBe(
        false
      )
    })

    it("emits aria-checked=true when selected", () => {
      const wrapper = mount(<Radio selected>A label</Radio>)

      expect(wrapper.find('[role="radio"]').first().prop("aria-checked")).toBe(
        true
      )
    })

    it("is focusable when enabled and not focusable when disabled", () => {
      const enabled = mount(<Radio>A label</Radio>)
      const disabled = mount(<Radio disabled>A label</Radio>)

      expect(enabled.find('[role="radio"]').first().prop("tabIndex")).toEqual(0)
      expect(disabled.find('[role="radio"]').first().prop("tabIndex")).toEqual(
        -1
      )
    })
  })
})

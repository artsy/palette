import { mount } from "enzyme"
import React from "react"
import { Checkbox } from "../index"

describe("Checkbox", () => {
  it("renders correctly", () => {
    const wrapper1 = mount(<Checkbox onSelect={jest.fn()}>a label</Checkbox>)

    expect(wrapper1.find("Container").prop("aria-checked")).toBe(false)

    const wrapper2 = mount(
      <Checkbox onSelect={jest.fn()} selected>
        a label
      </Checkbox>
    )

    expect(wrapper2.find("Container").prop("aria-checked")).toBe(true)
  })

  it("triggers onSelect on click", () => {
    const handleSelect = jest.fn()
    const wrapper = mount(<Checkbox onSelect={handleSelect}>a label</Checkbox>)

    expect(handleSelect).not.toBeCalled()

    wrapper.simulate("click")

    expect(handleSelect).toBeCalledTimes(1)
  })

  it("triggers onSelect on spacebar keypress", () => {
    const handleSelect = jest.fn()
    const wrapper = mount(<Checkbox onSelect={handleSelect}>a label</Checkbox>)

    expect(handleSelect).not.toBeCalled()

    wrapper.simulate("keypress", { key: " " })

    expect(handleSelect).toBeCalledTimes(1)
  })
})

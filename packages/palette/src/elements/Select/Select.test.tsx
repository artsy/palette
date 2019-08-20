import { mount } from "enzyme"
import React from "react"
import { SelectSmall } from "../Select"
import { LargeSelect } from "./Select"

describe("Select", () => {
  describe("SelectSmall", () => {
    const options = [
      {
        text: "First option",
        value: "firstOption",
      },
      {
        text: "Second option that is really long",
        value: "secondOption",
      },
    ]
    it("renders proper options with correct selected one", () => {
      const wrapper = mount(
        <SelectSmall options={options} selected="secondOption" />
      )

      expect(wrapper.find("option").length).toBe(2)
      expect(wrapper.find("select").props().value).toBe("secondOption")
    })

    it("renders with a placeholder value", () => {
      const wrapper = mount(
        <LargeSelect options={options} placeholder="I'm a placeholder" />
      )
      expect(wrapper.find("select").text()).toMatch(
        new RegExp("^I'm a placeholder")
      )
      expect(wrapper.find("option").length).toBe(3)
    })

    it("triggers callback on change", () => {
      const spy = jest.fn()
      const wrapper = mount(<SelectSmall options={options} onSelect={spy} />)
      wrapper
        .find("option")
        .at(1)
        .simulate("change")
      expect(spy).toHaveBeenCalled()
    })

    it("supports title attribute and renders it properly", () => {
      const wrapper = mount(<SelectSmall options={options} title="Sort" />)

      expect(wrapper.html()).toContain("Sort:")
    })
  })
})

import { mount } from "enzyme"
import React from "react"
import { MultiSelect, MultiSelectProps } from "../MultiSelect"

describe("MultiSelect", () => {
  const getWrapper = (props: Partial<MultiSelectProps> = {}) => {
    return mount(
      <div>
        <MultiSelect
          name="Example"
          options={[
            { text: "One", value: "one" },
            { text: "Two", value: "two" },
          ]}
          {...props}
        />
      </div>
    )
  }

  it("renders the closed select", () => {
    const wrapper = getWrapper()

    expect(wrapper.html()).toContain("Example")
    expect(wrapper.html()).not.toContain("One")
    expect(wrapper.html()).not.toContain("Two")
  })

  it("displays the selectable items when clicked", () => {
    const wrapper = getWrapper()

    wrapper.find("button").simulate("click")

    expect(wrapper.html()).toContain("Example")
    expect(wrapper.html()).toContain("One")
    expect(wrapper.html()).toContain("Two")
  })

  it("selects options when clicked", () => {
    const handleSelect = jest.fn()
    const wrapper = getWrapper({ onSelect: handleSelect })

    wrapper.find("button").simulate("click")

    wrapper.find('[role="checkbox"]').first().simulate("click")

    expect(handleSelect).toBeCalledTimes(1)
    expect(handleSelect).toHaveBeenLastCalledWith([
      { text: "One", value: "one" },
    ])

    wrapper.find('[role="checkbox"]').last().simulate("click")

    expect(handleSelect).toBeCalledTimes(2)
    expect(handleSelect).toHaveBeenLastCalledWith([
      { text: "One", value: "one" },
      { text: "Two", value: "two" },
    ])

    wrapper.find('[role="checkbox"]').last().simulate("click")

    expect(handleSelect).toBeCalledTimes(3)
    expect(handleSelect).toHaveBeenLastCalledWith([
      { text: "One", value: "one" },
    ])
  })
})

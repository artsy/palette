import { mount } from "enzyme"
import React from "react"
import { Clickable } from "../Clickable"
import { Tooltip } from "../Tooltip"

describe("Tooltip", () => {
  it("avoids blowing away child props", () => {
    const handleClick = jest.fn()
    const wrapper = mount(
      <div>
        <Tooltip content="Hello">
          <Clickable onClick={handleClick} data-test="example">
            World
          </Clickable>
        </Tooltip>
      </div>
    )

    expect(wrapper.html()).toContain('data-test="example"')
    expect(wrapper.text()).toEqual("WorldHello")

    expect(handleClick).not.toBeCalled()

    wrapper.find("button").simulate("click")

    expect(handleClick).toBeCalledTimes(1)
  })
})

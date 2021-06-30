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
    expect(wrapper.find("Indicator").at(3).prop("bg")).toEqual("black100")

    // Announces the page
    expect(wrapper.html()).toContain("Page 4 of 10")
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
})

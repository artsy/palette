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
    expect(wrapper.find("Dot").length).toBe(10)

    // Activates the correct dot
    expect(
      wrapper
        .find("Dot")
        .at(3)
        .props()
    ).toEqual({ active: true })

    // Announces the page
    expect(wrapper.html()).toContain("Page 4 of 10")
  })
})

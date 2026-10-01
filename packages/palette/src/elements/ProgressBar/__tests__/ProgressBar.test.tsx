import { mount } from "enzyme"
import React from "react"
import { CarouselBar } from "../../CarouselBar"
import { ProgressBar } from "../ProgressBar"

describe("ProgressBar", () => {
  it("exposes its progress", () => {
    const wrapper = mount(<ProgressBar percentComplete={40} />)
    const bar = wrapper.find('[role="progressbar"]').first()

    expect(bar.prop("aria-valuenow")).toEqual(40)
    expect(bar.prop("aria-valuemin")).toEqual(0)
    expect(bar.prop("aria-valuemax")).toEqual(100)
  })

  it("has a default accessible name", () => {
    const wrapper = mount(<ProgressBar percentComplete={40} />)

    expect(
      wrapper.find('[role="progressbar"]').first().prop("aria-label")
    ).toEqual("Progress")
  })

  it("lets the consumer override the name", () => {
    const wrapper = mount(
      <ProgressBar percentComplete={40} aria-label="Upload progress" />
    )

    expect(
      wrapper.find('[role="progressbar"]').first().prop("aria-label")
    ).toEqual("Upload progress")
  })

  it("names CarouselBar for its own context", () => {
    const wrapper = mount(<CarouselBar percentComplete={40} />)

    expect(
      wrapper.find('[role="progressbar"]').first().prop("aria-label")
    ).toEqual("Carousel progress")
  })
})

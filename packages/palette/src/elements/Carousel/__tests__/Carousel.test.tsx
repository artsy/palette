import { mount } from "enzyme"
import React from "react"
import { Box } from "../../Box"
import { Carousel } from "../Carousel"

describe("Carousel", () => {
  it("renders correctly", () => {
    const wrapper = mount(
      <Carousel>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Carousel>
    )

    // Renders navigation
    expect(wrapper.find("button").length).toBe(4)

    const previous = wrapper.find("button").at(1)

    expect(previous.props()["aria-label"]).toEqual("Previous page")
    expect(previous.props().disabled).toBe(true)

    const next = wrapper.find("button").at(2)

    expect(next.props()["aria-label"]).toEqual("Next page")
    expect(next.props().disabled).toBe(true)

    // Renders all cells
    expect(wrapper.find(Box).length).toBe(3)

    // Renders screen reader text
    expect(wrapper.html()).toContain("Page 1 of 1")
  })
})

import { mount } from "enzyme"
import React from "react"
import { Box } from "../../Box"
import { Swiper } from "../Swiper"

describe("Swiper", () => {
  it("renders correctly", () => {
    const wrapper = mount(
      <Swiper snap="center">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Swiper>
    )

    // Renders all cells
    expect(wrapper.find(Box).length).toBe(3)
    expect(wrapper.html()).toContain("scroll-snap-align: center")
  })
})

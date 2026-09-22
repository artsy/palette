import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Box } from "../../Box"
import { FullBleed } from "../../FullBleed"
import { Shelf } from "../Shelf"

describe("Shelf", () => {
  it("breaks out of its parent container by default", () => {
    const wrapper = mount(
      <Shelf>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Shelf>
    )

    expect(wrapper.find(FullBleed)).toHaveStyleRule("width", "100vw")
  })

  it("does not break out when fullBleed is false", () => {
    const wrapper = mount(
      <Shelf fullBleed={false}>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Shelf>
    )

    expect(wrapper.find(FullBleed)).not.toHaveStyleRule("width", "100vw")
  })
})

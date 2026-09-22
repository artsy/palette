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

  it("uses the default responsive gap between cells", () => {
    const wrapper = mount(
      <Shelf>
        <Box>1</Box>
        <Box>2</Box>
      </Shelf>
    )

    const cells = wrapper.find("li")
    expect(cells.at(0).prop("pr")).toEqual([1, 2])
  })

  it("allows overriding the gap between cells", () => {
    const wrapper = mount(
      <Shelf gap={[1, 1]}>
        <Box>1</Box>
        <Box>2</Box>
      </Shelf>
    )

    const cells = wrapper.find("li")
    expect(cells.at(0).prop("pr")).toEqual([1, 1])
  })

  it("does not apply the gap after the last cell", () => {
    const wrapper = mount(
      <Shelf gap={[1, 1]}>
        <Box>1</Box>
        <Box>2</Box>
      </Shelf>
    )

    const cells = wrapper.find("li")
    expect(cells.at(1).prop("pr")).not.toEqual([1, 1])
  })
})

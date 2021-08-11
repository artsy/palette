import { mount } from "enzyme"
import React from "react"
import { ThemeProviderV3 } from "../../../Theme"
import { EntityHeader } from "../EntityHeader"

describe("EntityHeader", () => {
  const getWrapper = () => {
    return mount(
      <ThemeProviderV3>
        <EntityHeader
          name="Example"
          image={{
            src: "example1x.jpg",
            srcSet: "example1x.jpg 1x, example2x.jpg 2x",
          }}
        />
      </ThemeProviderV3>
    )
  }

  it("renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain("Example")
    expect(wrapper.html()).toContain(
      'srcset="example1x.jpg 1x, example2x.jpg 2x"'
    )
  })
})

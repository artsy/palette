import React from "react"
import { mount } from "enzyme"
import { Theme, useTheme } from "../Theme"

const Example = () => {
  const { theme } = useTheme()
  return <div>{theme.name}</div>
}

describe("useTheme", () => {
  it("returns the current theme if one is provided", () => {
    const wrapper = mount(
      <Theme theme="dark">
        <Example />
      </Theme>
    )
    expect(wrapper.text()).toEqual("dark")
  })

  it("returns the default theme if none is provided", () => {
    const wrapper = mount(<Example />)
    expect(wrapper.text()).toEqual("light")
  })
})

import { shallow } from "enzyme"
import React from "react"
import { Tag } from "../Tag"

describe("Tag", () => {
  it("omits props", () => {
    const wrap = shallow(
      React.createElement(Tag, {
        // @ts-ignore
        id: "hello",
        theme: {},
        m: 2,
        px: 3,
        color: "blue",
      })
    )
    expect(wrap.prop("theme")).toBeUndefined()
    expect(wrap.prop("m")).toBeUndefined()
    expect(wrap.prop("px")).toBeUndefined()
    expect(wrap.prop("color")).toBeUndefined()
  })

  it("allows the type of element to be specified", () => {
    const wrap = shallow(React.createElement(Tag.as("span")))
    expect(wrap.type()).toBe("span")
  })

  it("allows the type of element to be overloaded by props", () => {
    const wrap = shallow(
      React.createElement(Tag, {
        is: "section",
      })
    )
    expect(wrap.type()).toBe("section")
  })
})

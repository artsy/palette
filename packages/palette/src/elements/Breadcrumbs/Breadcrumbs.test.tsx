import { mount } from "enzyme"
import React from "react"
import { Breadcrumbs } from "./Breadcrumbs"

describe("Breadcrumbs", () => {
  const wrapper = mount(
    <Breadcrumbs>
      <a>one</a>
      <a>two</a>
      <a>three</a>
    </Breadcrumbs>
  )

  it("renders an ordered list", () => {
    expect(wrapper.find("ol")).toHaveLength(1)
    expect(wrapper.find("li")).toHaveLength(3)
  })

  it("denotes the last crumb as the current page", () => {
    expect(wrapper.find("a").at(0).prop("aria-current")).toBeUndefined()
    expect(wrapper.find("a").at(1).prop("aria-current")).toBeUndefined()
    expect(wrapper.find("a").at(2).prop("aria-current")).toEqual("page")
  })
})

import { mount } from "enzyme"
import React from "react"
import { Shelf } from "../Shelf"
import { ShelfNext, ShelfPrevious } from "../ShelfNavigation"

describe("ShelfNavigation", () => {
  it("names the arrows by default", () => {
    expect(mount(<ShelfNext />).find("button").prop("aria-label")).toEqual(
      "Next page"
    )
    expect(mount(<ShelfPrevious />).find("button").prop("aria-label")).toEqual(
      "Previous page"
    )
  })

  it("lets the consumer override the name", () => {
    const wrapper = mount(<ShelfNext aria-label="Next artwork" />)

    expect(wrapper.find("button").prop("aria-label")).toEqual("Next artwork")
  })
})

describe("Shelf", () => {
  it("names its nav landmark, overridably", () => {
    const def = mount(
      <Shelf>
        <div>One</div>
      </Shelf>
    )
    const custom = mount(
      <Shelf aria-label="Recently viewed">
        <div>One</div>
      </Shelf>
    )

    expect(def.find("nav").prop("aria-label")).toEqual("Shelf navigation")
    expect(custom.find("nav").prop("aria-label")).toEqual("Recently viewed")
  })
})

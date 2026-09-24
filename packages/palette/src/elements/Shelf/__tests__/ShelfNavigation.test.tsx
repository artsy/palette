import { mount } from "enzyme"
import React from "react"
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

import { mount } from "enzyme"
import React from "react"
import { ShelfScrollBar } from "../ShelfScrollBar"

// The thumb only renders when the content overflows.
const overflowingViewport = () => {
  const el = document.createElement("div")
  Object.defineProperties(el, {
    scrollWidth: { value: 2000 },
    clientWidth: { value: 500 },
    scrollLeft: { value: 0, writable: true },
  })
  return el
}

describe("ShelfScrollBar", () => {
  it("has no interactive descendants inside role=scrollbar", () => {
    const wrapper = mount(<ShelfScrollBar viewport={overflowingViewport()} />)

    expect(wrapper.find('[role="scrollbar"]').length).toBeGreaterThan(0)
    expect(wrapper.find("button").length).toEqual(0)
  })
})

import { mount } from "enzyme"
import React from "react"
import { ShelfScrollBar } from "../ShelfScrollBar"

// The thumb only renders when the content actually overflows, so build a
// viewport that reports more scroll width than client width.
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
  it("renders a thumb only when the content overflows", () => {
    // Guards the assertions below from passing vacuously: with no overflow
    // there is no thumb at all, so "contains no button" would be trivially true.
    const withoutOverflow = mount(<ShelfScrollBar viewport={null} />)
    const withOverflow = mount(<ShelfScrollBar viewport={overflowingViewport()} />)

    expect(withOverflow.find("div").length).toBeGreaterThan(
      withoutOverflow.find("div").length
    )
  })

  it("has no interactive descendants inside role=scrollbar", () => {
    const wrapper = mount(<ShelfScrollBar viewport={overflowingViewport()} />)

    expect(wrapper.find('[role="scrollbar"]').length).toBeGreaterThan(0)
    expect(wrapper.find("button").length).toEqual(0)
  })

  it("reports a horizontal orientation", () => {
    const wrapper = mount(<ShelfScrollBar viewport={overflowingViewport()} />)

    expect(
      wrapper.find('[role="scrollbar"]').first().prop("aria-orientation")
    ).toEqual("horizontal")
  })
})

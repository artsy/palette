import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { Dropdown } from "../Dropdown"

jest.useFakeTimers()

describe("Dropdown", () => {
  it("renders", async () => {
    const wrapper = mount(
      <div>
        <Dropdown dropdown={<div>dropdown content</div>}>
          {({ anchorRef, anchorProps }) => {
            return (
              <a ref={anchorRef as any} {...anchorProps}>
                anchor
              </a>
            )
          }}
        </Dropdown>
      </div>
    )

    expect(wrapper.html()).toContain(
      '<a aria-expanded="false" aria-haspopup="true">anchor</a>'
    )

    expect(wrapper.html()).not.toContain("<div>dropdown content</div>")

    act(() => {
      wrapper.find("a").first().simulate("mouseenter")
      jest.runAllTimers()
    })

    expect(wrapper.html()).toContain(
      '<a aria-expanded="true" aria-haspopup="true">anchor</a>'
    )

    expect(wrapper.html()).toContain("<div>dropdown content</div>")
  })

  describe("keepInDOM", () => {
    it("keeps the dropdown in the DOM", () => {
      const wrapper = mount(
        <div>
          <Dropdown keepInDOM dropdown={<div>dropdown content</div>}>
            {({ anchorRef, anchorProps }) => {
              return (
                <a ref={anchorRef as any} {...anchorProps}>
                  anchor
                </a>
              )
            }}
          </Dropdown>
        </div>
      )

      expect(wrapper.html()).toContain(
        '<a aria-expanded="false" aria-haspopup="true">anchor</a>'
      )

      expect(wrapper.html()).toContain("<div>dropdown content</div>")

      act(() => {
        wrapper.find("a").first().simulate("mouseenter")
        jest.runAllTimers()
      })

      expect(wrapper.html()).toContain(
        '<a aria-expanded="true" aria-haspopup="true">anchor</a>'
      )

      expect(wrapper.html()).toContain("<div>dropdown content</div>")
    })
  })
})

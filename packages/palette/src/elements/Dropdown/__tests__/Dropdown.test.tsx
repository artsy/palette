import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { FocusOn } from "react-focus-on"
import { Dropdown } from "../Dropdown"

jest.useFakeTimers()

jest.mock("react-dom", () => ({ createPortal: (children) => children }))

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

  describe("returnFocus", () => {
    it("passes returnFocus=true to FocusOn by default", () => {
      const wrapper = mount(
        <div>
          <Dropdown
            dropdown={<div>dropdown content</div>}
            keepInDOM={true}
            openDropdownByClick={true}
          >
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

      act(() => {
        wrapper.find("a").first().simulate("mouseenter")
        jest.runAllTimers()
      })

      const focusOnComponent = wrapper.find(FocusOn)
      expect(focusOnComponent).toHaveLength(1)
      expect(focusOnComponent.prop("returnFocus")).toBe(true)
    })

    it("passes returnFocus=false to FocusOn when explicitly set", () => {
      const wrapper = mount(
        <div>
          <Dropdown
            returnFocus={false}
            dropdown={<div>dropdown content</div>}
            keepInDOM={true}
            openDropdownByClick={true}
          >
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

      act(() => {
        wrapper.find("a").first().simulate("mouseenter")
        jest.runAllTimers()
      })

      const focusOnComponent = wrapper.find(FocusOn)
      expect(focusOnComponent).toHaveLength(1)
      expect(focusOnComponent.prop("returnFocus")).toBe(false)
    })
  })
})

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

  describe("hover suppression", () => {
    const setup = (
      props: Partial<React.ComponentProps<typeof Dropdown>> = {}
    ) => {
      const actions: { setVisible?: (value: boolean) => void } = {}

      const wrapper = mount(
        <div>
          <Dropdown dropdown={<div>dropdown content</div>} {...props}>
            {({ anchorRef, anchorProps, setVisible }) => {
              actions.setVisible = setVisible

              return (
                <button ref={anchorRef as any} {...anchorProps}>
                  anchor
                </button>
              )
            }}
          </Dropdown>
        </div>
      )

      const anchor = () => wrapper.find("button").first()

      const isExpanded = () =>
        anchor().getDOMNode().getAttribute("aria-expanded") === "true"

      const hover = () => {
        act(() => {
          anchor().simulate("mouseenter")
          jest.runAllTimers()
        })
      }

      const leave = () => {
        act(() => {
          anchor().simulate("mouseleave")
          jest.runAllTimers()
        })
      }

      const click = (pointerType = "mouse") => {
        act(() => {
          anchor().simulate("pointerdown", { pointerType })
          anchor().simulate("click")
          jest.runAllTimers()
        })
      }

      return { wrapper, anchor, actions, isExpanded, hover, leave, click }
    }

    it("does not reopen on hover after a pointer click until the pointer leaves the anchor", () => {
      const { actions, isExpanded, hover, leave, click } = setup()

      hover()
      expect(isExpanded()).toBe(true)

      // Consumer clicks the anchor (e.g. a nav link) and closes the dropdown
      click()
      act(() => {
        actions.setVisible!(false)
      })
      expect(isExpanded()).toBe(false)

      // Pointer is still resting on the anchor
      hover()
      expect(isExpanded()).toBe(false)

      // Pointer leaves and re-enters: hover is re-armed
      leave()
      hover()
      expect(isExpanded()).toBe(true)
    })

    it("opens on hover by default", () => {
      const { isExpanded, hover } = setup()

      hover()
      expect(isExpanded()).toBe(true)
    })

    it("ignores mouse clicks in hover-mode but still opens via keyboard", () => {
      const { anchor, isExpanded, click } = setup()

      click()
      expect(isExpanded()).toBe(false)

      act(() => {
        anchor().simulate("keydown", { key: "Enter" })
        jest.runAllTimers()
      })
      expect(isExpanded()).toBe(true)
    })

    it("does not suppress anything in click-mode", () => {
      const { isExpanded, click, hover } = setup({ openDropdownByClick: true })

      click()
      expect(isExpanded()).toBe(true)

      click()
      expect(isExpanded()).toBe(false)

      // Hover is disabled in click-mode regardless
      hover()
      expect(isExpanded()).toBe(false)
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

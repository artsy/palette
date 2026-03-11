import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { FocusOn } from "react-focus-on"
import { Dropdown } from "../Dropdown"
import {
  DropdownGroupProvider,
  useDropdownGroup,
} from "../DropdownGroupContext"

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

  describe("DropdownGroupProvider", () => {
    const GroupedDropdowns = () => {
      const dropdownGroup = useDropdownGroup()

      return (
        <>
          <Dropdown {...dropdownGroup} dropdown={<div>first panel</div>}>
            {({ anchorRef, anchorProps }) => {
              return (
                <a ref={anchorRef as any} {...anchorProps}>
                  first anchor
                </a>
              )
            }}
          </Dropdown>

          <Dropdown {...dropdownGroup} dropdown={<div>second panel</div>}>
            {({ anchorRef, anchorProps }) => {
              return (
                <a ref={anchorRef as any} {...anchorProps}>
                  second anchor
                </a>
              )
            }}
          </Dropdown>
        </>
      )
    }

    it("delays lateral swaps between neighboring dropdowns", () => {
      const wrapper = mount(
        <div>
          <DropdownGroupProvider delay={200}>
            <GroupedDropdowns />
          </DropdownGroupProvider>
        </div>
      )

      const anchors = wrapper.find("a")

      act(() => {
        anchors.at(0).simulate("mouseenter")
      })
      wrapper.update()

      expect(wrapper.html()).toContain("first panel")
      expect(wrapper.html()).not.toContain("second panel")

      act(() => {
        anchors.at(0).simulate("mouseleave", {
          relatedTarget: anchors.at(1).getDOMNode(),
        })
        anchors.at(1).simulate("mouseenter")
        jest.advanceTimersByTime(199)
      })
      wrapper.update()

      expect(wrapper.html()).toContain("first panel")
      expect(wrapper.html()).not.toContain("second panel")

      act(() => {
        jest.advanceTimersByTime(1)
      })
      wrapper.update()

      expect(wrapper.html()).not.toContain("first panel")
      expect(wrapper.html()).toContain("second panel")
    })

    it("swaps cleanly when moving from a panel to a neighboring dropdown", () => {
      const wrapper = mount(
        <div>
          <DropdownGroupProvider delay={150}>
            <GroupedDropdowns />
          </DropdownGroupProvider>
        </div>
      )

      act(() => {
        wrapper.find("a").at(0).simulate("mouseenter")
      })
      wrapper.update()

      const panel = wrapper.find('[aria-label="Press escape to close"]').first()
      const secondAnchor = wrapper.find("a").at(1)

      act(() => {
        panel.simulate("mouseleave", {
          relatedTarget: secondAnchor.getDOMNode(),
        })
        secondAnchor.simulate("mouseenter")
        jest.advanceTimersByTime(149)
      })
      wrapper.update()

      expect(wrapper.html()).toContain("first panel")
      expect(wrapper.html()).not.toContain("second panel")

      act(() => {
        jest.advanceTimersByTime(1)
      })
      wrapper.update()

      expect(wrapper.html()).not.toContain("first panel")
      expect(wrapper.html()).toContain("second panel")
    })
  })
})

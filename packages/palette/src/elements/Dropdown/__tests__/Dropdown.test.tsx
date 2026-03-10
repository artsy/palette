import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { FocusOn } from "react-focus-on"
import { Dropdown } from "../Dropdown"
import {
  DropdownGroupProvider,
  useDropdownGroupItem,
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

  describe("grouped behavior", () => {
    it("marks grouped anchors with a shared group id", () => {
      const wrapper = mount(
        <div>
          <DropdownGroupProvider lateralOpenDelay={200}>
            <Dropdown dropdown={<div>first dropdown content</div>} delay={0}>
              {({ anchorRef, anchorProps }) => {
                return (
                  <a ref={anchorRef as any} {...anchorProps}>
                    first anchor
                  </a>
                )
              }}
            </Dropdown>

            <Dropdown dropdown={<div>second dropdown content</div>} delay={0}>
              {({ anchorRef, anchorProps }) => {
                return (
                  <a ref={anchorRef as any} {...anchorProps}>
                    second anchor
                  </a>
                )
              }}
            </Dropdown>
          </DropdownGroupProvider>
        </div>
      )

      const firstAnchor = wrapper.find("a").at(0)
      const secondAnchor = wrapper.find("a").at(1)

      expect(firstAnchor.prop("data-dropdown-group")).toBeDefined()
      expect(firstAnchor.prop("data-dropdown-group")).toBe(
        secondAnchor.prop("data-dropdown-group")
      )
    })

    it("resets to default delay after leaving the dropdown group", () => {
      const wrapper = mount(
        <div>
          <DropdownGroupProvider lateralOpenDelay={200}>
            <Dropdown dropdown={<div>first dropdown content</div>} delay={0}>
              {({ anchorRef, anchorProps }) => {
                return (
                  <a ref={anchorRef as any} {...anchorProps}>
                    first anchor
                  </a>
                )
              }}
            </Dropdown>

            <Dropdown dropdown={<div>second dropdown content</div>} delay={0}>
              {({ anchorRef, anchorProps }) => {
                return (
                  <a ref={anchorRef as any} {...anchorProps}>
                    second anchor
                  </a>
                )
              }}
            </Dropdown>
          </DropdownGroupProvider>
        </div>
      )

      const firstAnchor = wrapper.find("a").at(0)
      const secondAnchor = wrapper.find("a").at(1)

      act(() => {
        firstAnchor.simulate("mouseenter")
        jest.runOnlyPendingTimers()
      })

      act(() => {
        firstAnchor.simulate("mouseleave", { relatedTarget: null })
        jest.runAllTimers()
      })

      act(() => {
        secondAnchor.simulate("mouseenter")
        jest.advanceTimersByTime(1)
      })
      wrapper.update()

      expect(wrapper.html()).toContain("second dropdown content")
    })

    it("marks grouped floating panels with the same group id", () => {
      const wrapper = mount(
        <div>
          <DropdownGroupProvider lateralOpenDelay={200}>
            <Dropdown dropdown={<div>first dropdown content</div>} delay={0}>
              {({ anchorRef, anchorProps }) => {
                return (
                  <a ref={anchorRef as any} {...anchorProps}>
                    first anchor
                  </a>
                )
              }}
            </Dropdown>
          </DropdownGroupProvider>
        </div>
      )

      const firstAnchor = wrapper.find("a").at(0)

      act(() => {
        firstAnchor.simulate("mouseenter")
        jest.runOnlyPendingTimers()
      })
      wrapper.update()

      const groupId = firstAnchor.prop("data-dropdown-group")
      expect(groupId).toBeDefined()

      const groupedPanel = wrapper.find(`div[data-dropdown-group="${groupId}"]`)
      expect(groupedPanel.exists()).toBe(true)
    })

    it("does not treat anchor->panel movement as leaving the group", () => {
      const GroupHarness = () => {
        const first = useDropdownGroupItem({
          id: "first",
          enabled: true,
          delay: 0,
          transition: true,
        })
        const second = useDropdownGroupItem({
          id: "second",
          enabled: true,
          delay: 0,
          transition: true,
        })

        return (
          <>
            <div id="first-anchor" {...first.anchorGroupProps} />
            <button id="open-first" onClick={first.onHoverOpen} />
            <button id="close-first" onClick={first.onHoverClose} />
            <div id="second-delay">{second.openDelay}</div>
          </>
        )
      }

      const wrapper = mount(
        <DropdownGroupProvider lateralOpenDelay={200}>
          <GroupHarness />
        </DropdownGroupProvider>
      )

      act(() => {
        wrapper.find("#open-first").simulate("click")
      })
      wrapper.update()

      const firstAnchor = wrapper.find("#first-anchor")
      const groupId = firstAnchor.prop("data-dropdown-group")
      const panelTarget = document.createElement("div")
      panelTarget.setAttribute("data-dropdown-group", String(groupId))

      act(() => {
        firstAnchor.simulate("mouseleave", { relatedTarget: panelTarget })
        jest.runAllTimers()
      })
      wrapper.update()

      expect(wrapper.find("#second-delay").text()).toBe("200")
    })
  })
})

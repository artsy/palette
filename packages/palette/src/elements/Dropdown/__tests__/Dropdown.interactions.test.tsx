import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { Dropdown, DropdownProps } from "../Dropdown"

// Exercise native hover listeners and click handling, not the global hook mock.
jest.unmock("@floating-ui/react")

jest.useFakeTimers()

describe("Dropdown interactions", () => {
  let wrapper: ReactWrapper
  let container: HTMLDivElement
  let anchor: HTMLAnchorElement

  const setup = async (
    props: Partial<DropdownProps> = {},
    closeOnClick = true
  ) => {
    container = document.createElement("div")
    document.body.appendChild(container)
    await act(async () => {
      wrapper = mount(
        <Dropdown dropdown={<button>Menu item</button>} {...props}>
          {({ anchorRef, anchorProps, setVisible }) => (
            <a
              href="#destination"
              ref={anchorRef as any}
              {...anchorProps}
              onClick={(event) => {
                anchorProps.onClick?.(event)
                event.preventDefault()
                if (closeOnClick) setVisible(false)
              }}
            >
              Anchor
            </a>
          )}
        </Dropdown>,
        { attachTo: container }
      )
    })
    anchor = container.querySelector("a")!
  }

  const dispatch = async (event: Event) => {
    await act(async () => {
      anchor.dispatchEvent(event)
    })
  }

  const mouse = (type: string) =>
    dispatch(new MouseEvent(type, { bubbles: true }))

  const click = async (pointerType: string) => {
    // jsdom has no PointerEvent constructor.
    const pointer = new Event("pointerdown", { bubbles: true })
    Object.assign(pointer, { pointerType })
    await dispatch(pointer)
    await mouse("click")
  }

  const settle = async () => {
    await act(async () => {
      jest.runOnlyPendingTimers()
    })
  }

  const expectOpen = (open: boolean) => {
    expect(anchor.getAttribute("aria-expanded")).toBe(String(open))
  }

  afterEach(async () => {
    await act(async () => {
      wrapper?.unmount()
    })
    container?.remove()
    jest.clearAllTimers()
  })

  it.each([
    {},
    { transition: false },
    { delay: { open: 100, close: 100 } },
    { safePolygonOptions: { requireIntent: false } },
  ])("stays closed after clicking until the next hover (%j)", async (props) => {
    await setup(props)
    await mouse("mouseenter")
    await settle()
    expectOpen(true)

    await click("mouse")
    expectOpen(false)

    await mouse("mousemove")
    await settle()
    expectOpen(false)

    await mouse("mouseleave")
    await settle()
    expectOpen(false)

    await mouse("mouseenter")
    await settle()
    expectOpen(true)
  })

  it("ignores mouse and pen clicks but keeps touch and keyboard activation", async () => {
    await setup({}, false)
    await click("mouse")
    expectOpen(false)
    await click("pen")
    expectOpen(false)

    await dispatch(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
    )
    // The browser generates a click for Enter on a link.
    await mouse("click")
    expectOpen(true)

    await dispatch(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    )
    await settle()
    expectOpen(false)

    await click("touch")
    expectOpen(true)
  })

  it("preserves click-mode toggling and ignores hover", async () => {
    await setup({ openDropdownByClick: true }, false)
    await mouse("mouseenter")
    await settle()
    expectOpen(false)
    await click("mouse")
    expectOpen(true)
    await click("mouse")
    expectOpen(false)
  })
})

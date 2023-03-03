import { mount } from "enzyme"
import React, { useState } from "react"
import { act } from "react-dom/test-utils"
import { ModalBase } from "../ModalBase"

jest.mock("tabbable", () => {
  const tabbable = jest.requireActual("tabbable")

  return {
    ...tabbable,
    tabbable: (node, options) =>
      tabbable.tabbable(node, { ...options, displayCheck: "none" }),
    focusable: (node, options) =>
      tabbable.focusable(node, { ...options, displayCheck: "none" }),
    isFocusable: (node, options) =>
      tabbable.isFocusable(node, { ...options, displayCheck: "none" }),
    isTabbable: (node, options) =>
      tabbable.isTabbable(node, { ...options, displayCheck: "none" }),
  }
})

const flushPromiseQueue = () => new Promise((resolve) => setTimeout(resolve, 0))

describe("ModalBase", () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it("renders the children", () => {
    const wrapper = mount(<ModalBase onClose={jest.fn()}>content</ModalBase>)
    expect(wrapper.html()).toContain("content")
  })

  describe("focus management", () => {
    const Example = () => {
      const [open, setOpen] = useState(true)
      return (
        <>
          <input id="qux" autoFocus />

          <button id="open" onClick={() => setOpen((prevOpen) => !prevOpen)}>
            toggle
          </button>

          {open && (
            <ModalBase onClose={jest.fn()}>
              <input id="foo" />
              <input id="bar" />
              <input id="baz" />
            </ModalBase>
          )}
        </>
      )
    }

    const keydown = async (key: string, shift: boolean) => {
      act(() => {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key, shiftKey: shift })
        )
      })

      await flushPromiseQueue()
    }

    it("focuses the initial input", () => {
      const wrapper = mount(<Example />)

      jest.runAllTimers()

      const input = wrapper.find("#foo")
      expect(input.getElement().props.id).toEqual("foo")
      expect(document.activeElement!.id).toEqual("foo")
    })

    it("manages the focus", async () => {
      mount(<Example />)

      jest.runAllTimers()

      // Tabbing through
      expect(document.activeElement!.id).toEqual("foo")
      keydown("Tab", false)
      expect(document.activeElement!.id).toEqual("bar")
      keydown("Tab", false)
      expect(document.activeElement!.id).toEqual("baz")
      // Wraps around
      keydown("Tab", false)
      expect(document.activeElement!.id).toEqual("foo")
      // Shift+tab backwards
      keydown("Tab", true)
      expect(document.activeElement!.id).toEqual("baz")
      keydown("Tab", true)
      expect(document.activeElement!.id).toEqual("bar")
      keydown("Tab", true)
      expect(document.activeElement!.id).toEqual("foo")
      keydown("Tab", true)
      // Wraps around
      expect(document.activeElement!.id).toEqual("baz")
    })

    it("returns focus to the previous element when closed", () => {
      const wrapper = mount(<Example />, { attachTo: document.body })

      jest.runAllTimers()

      expect(document.activeElement!.id).toEqual("foo")
      wrapper.find("#open").simulate("click")
      expect(document.activeElement!.id).toEqual("qux")
    })
  })
})

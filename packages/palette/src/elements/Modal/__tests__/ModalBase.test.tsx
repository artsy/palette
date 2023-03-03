import { mount } from "enzyme"
import React, { useState } from "react"
import { ModalBase } from "../ModalBase"

describe("ModalBase", () => {
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

    it("focuses the initial input", () => {
      const wrapper = mount(<Example />)

      const input = wrapper.find("#foo")
      expect(input.getElement().props.id).toEqual("foo")
      expect(document.activeElement!.id).toEqual("foo")
    })

    it("returns focus to the previous element when closed", () => {
      const wrapper = mount(<Example />, { attachTo: document.body })

      expect(document.activeElement!.id).toEqual("foo")
      wrapper.find("#open").simulate("click")
      expect(document.activeElement!.id).toEqual("qux")
    })
  })
})

import { mount } from "enzyme"
import React from "react"
import { ModalBase } from "../ModalBase"

jest.mock("react-dom", () => ({ createPortal: children => children }))

describe("ModalBase", () => {
  const map: { [event: string]: any } = {}
  document.addEventListener = jest.fn((event, cb) => (map[event] = cb))

  it("renders", () => {
    const wrapper = mount(
      <div>
        hello
        <ModalBase>world</ModalBase>
      </div>
    )

    expect(wrapper.html()).toContain("hello")
    expect(wrapper.html()).toContain("world")
  })

  it("calls onClose when escape key is pressed", () => {
    const onClose = jest.fn()
    mount(<ModalBase onClose={onClose}>hello</ModalBase>)
    expect(onClose).not.toBeCalled()
    map.keydown({ key: "Escape" })
    expect(onClose).toBeCalled()
  })
})

import { mount } from "enzyme"
import React from "react"
import { ModalBase } from "../ModalBase"

describe("ModalBase", () => {
  const map: { [event: string]: any } = {}
  document.addEventListener = jest.fn((event, cb) => (map[event] = cb))

  it("renders", () => {
    const wrapper = mount(<ModalBase>hello</ModalBase>)
    expect(wrapper.html()).toContain("hello")
  })

  it("calls onClose when escape key is pressed", () => {
    const onClose = jest.fn()
    mount(<ModalBase onClose={onClose}>hello</ModalBase>)
    expect(onClose).not.toBeCalled()
    map.keydown({ key: "Escape" })
    expect(onClose).toBeCalled()
  })
})

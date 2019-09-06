import { mount } from "enzyme"
import React from "react"
import { CloseIcon } from "../../../svgs"
import { ArtsyLogoBlackIcon } from "../../../svgs/ArtsyLogoBlackIcon"
import { Button } from "../../Button"
import { Modal } from "../Modal"

describe("Modal", () => {
  it("displays logo when enabled", () => {
    const onClose = () => null
    const component = mount(<Modal onClose={onClose} hasLogo show />)
    expect(component.find(ArtsyLogoBlackIcon).length).toEqual(1)
  })

  it("displays custom title", () => {
    const onClose = () => null
    const component = mount(
      <Modal onClose={onClose} title="Condimentum Ridiculus" show />
    )
    expect(component.html()).toContain("Condimentum Ridiculus")
  })

  it("displays children", () => {
    const onClose = () => null
    const component = mount(
      <Modal onClose={onClose} show>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    expect(component.html()).toContain(
      "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
    )
  })

  it("displays custom fixed button", () => {
    const onClose = () => null
    const component = mount(
      <Modal onClose={onClose} show FixedButton={<Button>Click me</Button>}>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    expect(component.find(Button).length).toEqual(1)
  })

  it("doesnt display x if hideCloseXButton is passed", () => {
    let show = true
    const onClose = () => (show = false)
    const component = mount(
      <Modal show={show} onClose={onClose} hideCloseXButton>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    expect(component.find(CloseIcon).length).toEqual(0)
  })

  it("closes when x is clicked", () => {
    let show = true
    const onClose = () => (show = false)
    const component = mount(
      <Modal show={show} onClose={onClose}>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    component
      .find(CloseIcon)
      .parent()
      .props()
      .onClick()
    expect(show).toEqual(false)
  })

  it("closes when wrapper is clicked", () => {
    let show = true
    const onClose = () => (show = false)
    const component = mount(
      <Modal show={show} onClose={onClose}>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    component
      .childAt(0)
      .props()
      .onClick()
    expect(show).toEqual(false)
  })

  it("wont close when wrapper is clicked if hideCloseXButton is passed", () => {
    let show = true
    const onClose = () => (show = false)
    const component = mount(
      <Modal show={show} hideCloseXButton onClose={onClose}>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    component
      .childAt(0)
      .props()
      .onClick()
    expect(show).toEqual(true)
  })

  it("closes when escape key is pressed", () => {
    let show = true
    const onClose = () => (show = false)
    mount(
      <Modal show={show} onClose={onClose}>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    document.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }))
    expect(show).toEqual(false)
  })
})

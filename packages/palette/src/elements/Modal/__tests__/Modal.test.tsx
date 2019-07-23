import { mount } from "enzyme"
import React from "react"
import { CloseIcon } from "../../../svgs"
import { ArtsyLogoBlackIcon } from "../../../svgs/ArtsyLogoBlackIcon"
import { Button } from "../../Button"
import { Modal } from "../Modal"

describe("Modal", () => {
  it("displays logo when enabled", () => {
    const component = mount(<Modal hasLogo show />)
    expect(component.find(ArtsyLogoBlackIcon).length).toEqual(1)
  })

  it("displays custom title", () => {
    const component = mount(<Modal title="Condimentum Ridiculus" show />)
    expect(component.html()).toContain("Condimentum Ridiculus")
  })

  it("displays children", () => {
    const component = mount(
      <Modal show>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    expect(component.html()).toContain(
      "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
    )
  })

  it("displays custom fixed button", () => {
    const component = mount(
      <Modal show FixedButton={<Button>Click me</Button>}>
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </Modal>
    )
    expect(component.find(Button).length).toEqual(1)
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
})

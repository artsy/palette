import React from "react"
import { mount } from "enzyme"
import { Drawer } from "../Drawer"
import { Button } from "../../Button"
import { Text } from "../../Text"

const DrawerContent: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <Text>Drawer Content</Text>
      </Drawer>
    </>
  )
}

describe("Drawer", () => {
  jest.spyOn(console, "error").mockImplementation(() => null)

  it("renders the drawer content when the open button is clicked", () => {
    const wrapper = mount(<DrawerContent />)

    expect(wrapper.find(Drawer).children().length).toBe(0)

    wrapper.find(Button).simulate("click")

    expect(wrapper.find(Drawer).prop("open")).toBe(true)
  })

  it("hides the drawer when the overlay is clicked", () => {
    const wrapper = mount(<DrawerContent />)

    wrapper.find("Button").simulate("click")
    expect(wrapper.find(Drawer).prop("open")).toBe(true)

    wrapper.find("[data-testid='drawer-overlay']").first().simulate("click")
    expect(wrapper.find(Drawer).children().length).toBe(0)
  })
})

import React from "react"
import { mount } from "enzyme"
import { Drawer } from "../Drawer"
import { DrawerProvider } from "../DrawerProvider"
import { Button } from "../../Button"
import { Text } from "../../Text"
import { useDrawer } from "../useDrawer"

const Provider = ({ children }) => {
  return <DrawerProvider>{children}</DrawerProvider>
}

const DrawerContent: React.FC = () => {
  const { toggle } = useDrawer()

  return (
    <>
      <Button onClick={() => toggle()}>Open</Button>
      <Drawer>
        <Text>Drawer Content</Text>
      </Drawer>
    </>
  )
}

describe("Drawer", () => {
  it("renders the drawer content when the open button is clicked", () => {
    const wrapper = mount(
      <Provider>
        <DrawerContent />
      </Provider>
    )

    expect(wrapper.find(Drawer).childAt(0).prop("isOpen")).toBe(false)

    wrapper.find(Button).simulate("click")

    expect(wrapper.find(Drawer).childAt(0).prop("isOpen")).toBe(true)
  })

  it("hides the drawer when the overlay is clicked", () => {
    const wrapper = mount(
      <Provider>
        <DrawerContent />
      </Provider>
    )

    wrapper.find("Button").simulate("click")
    expect(wrapper.find(Drawer).childAt(0).prop("isOpen")).toBe(true)

    wrapper.find("[data-testid='drawer-overlay']").first().simulate("click")
    expect(wrapper.find(Drawer).childAt(0).prop("isOpen")).toBe(false)
  })
})

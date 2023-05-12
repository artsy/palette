import React from "react"
import { Drawer } from "./Drawer"
import { DrawerProvider } from "./DrawerProvider"
import { useDrawer } from "./useDrawer"
import { Flex } from "../Flex"
import { Button } from "../Button"

export default {
  title: "Components/Drawer",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <DrawerProvider>
        <Story />
      </DrawerProvider>
    ),
  ],
}

const Layout: React.FC = ({ children }) => {
  const { toggle } = useDrawer()

  return (
    <>
      {children}

      <Flex width="100%" height="100%" flexDirection={["column", "row"]}>
        <Flex flex={1} />
        <Flex flex={2} flexDirection="column">
          <Button size="small" onClick={toggle}>
            Open Drawer
          </Button>
        </Flex>
        <Flex flex={1} />
      </Flex>
    </>
  )
}

const Content = () => {
  const { toggle } = useDrawer()

  return (
    <Flex justifyContent="center" py={2}>
      <Button size="small" onClick={toggle}>
        Close Drawer
      </Button>
    </Flex>
  )
}

export const Default = () => {
  return (
    <Layout>
      <Drawer>
        <Content />
      </Drawer>
    </Layout>
  )
}

export const Left = () => {
  return (
    <Layout>
      <Drawer anchor="left">
        <Content />
      </Drawer>
    </Layout>
  )
}

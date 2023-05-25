import React, { useState } from "react"
import { Drawer } from "./Drawer"
import { Flex } from "../Flex"
import { Button } from "../Button"

export default {
  title: "Components/Drawer",
  parameters: {
    layout: "fullscreen",
  },
}

const Layout: React.FC<{ anchor: "left" | "right" }> = ({ anchor }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} anchor={anchor}>
        <Flex
          width={["100%", 400]}
          justifyContent="center"
          p={2}
          flexDirection="column"
        >
          <Button size="small" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Flex>
      </Drawer>

      <Flex width="100vw" height="100%" flexDirection={["column", "row"]}>
        <Flex flex={1} />
        <Flex flex={2} flexDirection="column">
          <Button size="small" onClick={() => setOpen(true)}>
            Open Drawer
          </Button>
        </Flex>
        <Flex flex={1} />
      </Flex>
    </>
  )
}

export const Default = () => {
  return <Layout anchor="right" />
}

export const Left = () => {
  return <Layout anchor="left" />
}

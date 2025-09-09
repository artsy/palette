import React, { useState } from "react"
import { Drawer } from "./Drawer"
import { Flex } from "../Flex"
import { Button } from "../Button"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Drawer,
  title: "Components/Drawer",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A sliding drawer component that can be anchored to the left or right side of the screen.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

const Layout: React.FC<
  React.PropsWithChildren<{ anchor: "left" | "right" }>
> = ({ anchor }) => {
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

export const Default = {
  args: {
    anchor: "right",
  },
  render: () => <Layout anchor="right" />,
  parameters: {
    docs: {
      description: {
        story: "Default drawer that slides in from the right side.",
      },
    },
  },
}

export const Left = {
  args: {
    anchor: "left",
  },
  render: () => <Layout anchor="left" />,
  parameters: {
    docs: {
      description: {
        story: "Drawer that slides in from the left side.",
      },
    },
  },
}

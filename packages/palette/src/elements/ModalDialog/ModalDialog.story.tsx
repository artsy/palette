import React from "react"
import { Text } from "../Text"
import { Button } from "../Button"
import { ModalDialog } from "./ModalDialog"
import { Box } from "../Box"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

const LOREM =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus sed iure repellendus animi, aliquid aut fuga maxime nemo minus quas. Error, incidunt fugit similique quidem culpa hic! Nemo, quas rerum. "

export default {
  component: ModalDialog,
  title: "Components/ModalDialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal dialog component with customizable layout, panels, and content areas.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

const Template = (args) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      {open && (
        <ModalDialog {...args} onClose={() => setOpen(false)}>
          {args.children || <Text variant="sm">{LOREM.repeat(2)}</Text>}
        </ModalDialog>
      )}
    </>
  )
}

export const Default = {
  args: {
    title: "Modal Title",
    children: <Text variant="sm">{LOREM}</Text>,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Default ModalDialog with title and content.",
      },
    },
  },
}

export const WithFooter = {
  args: {
    title: "Modal Title",
    children: <Text variant="sm">{LOREM}</Text>,
    footer: <Button width="100%">Confirm</Button>,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "ModalDialog with a footer button.",
      },
    },
  },
}

export const WithPanels = {
  args: {
    title: "With Left and Right Panels",
    width: "100%",
    leftPanel: (
      <Box bg="mono100" width={300} flexShrink={0} p={1}>
        <Text variant="xs" color="mono0">
          Some custom content on the left
        </Text>
      </Box>
    ),
    rightPanel: (
      <Box bg="mono100" width={300} flexShrink={0} p={1}>
        <Text variant="xs" color="mono0">
          Some custom content on the right
        </Text>
      </Box>
    ),
    children: <Text variant="sm">{LOREM}</Text>,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "ModalDialog with left and right panels.",
      },
    },
  },
}

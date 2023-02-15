import React, { useState } from "react"
import { States } from "storybook-states"
import { Text } from "../Text"
import { Button } from "../Button"
import { ModalDialog, ModalDialogProps } from "./ModalDialog"
import { Box } from "../Box"

const LOREM =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus sed iure repellendus animi, aliquid aut fuga maxime nemo minus quas. Error, incidunt fugit similique quidem culpa hic! Nemo, quas rerum. "

export default {
  title: "Components/ModalDialog",
}

const Demo = ({ children, ...rest }: Partial<ModalDialogProps>) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      {open && (
        <ModalDialog onClose={() => setOpen(false)} {...rest}>
          {children ? children : <Text variant="sm">{LOREM.repeat(15)}</Text>}
        </ModalDialog>
      )}
    </>
  )
}

export const Default = () => {
  return (
    <States<Partial<ModalDialogProps>>
      states={[
        {
          children: <Text variant="sm">{LOREM}</Text>,
        },
        { title: "Modal Title" },
        { title: "100% Width", width: "100%" },
        { title: "Responsive Percentage Width", width: ["75%", "66%", "50%"] },
        { title: "Responsive Width", width: ["100%", 550] },
        {
          title:
            "Modal Title with a longer title or headline text that runs on for mutliple lines",
        },
        { hasLogo: true },
        { title: "Modal Title", hasLogo: true },
        {
          children: <Text variant="sm">{LOREM}</Text>,
          footer: <Button width="100%">Confirm</Button>,
        },
        { title: "Modal Title", footer: <Button width="100%">Confirm</Button> },
        {
          title:
            "Modal Title with a longer title or headline text that runs on for mutliple lines",
          footer: <Button width="100%">Confirm</Button>,
        },
        {
          title:
            "Modal Title with a longer title or headline text that runs on for mutliple lines",
          hasLogo: true,
          footer: <Button width="100%">Confirm</Button>,
        },
        {
          width: 800,
          title: "With Left Panel",
          leftPanel: (
            <Box bg="black100" width={300} flexShrink={0} p={1}>
              <Text variant="xs" color="white100">
                Some custom content on the left
              </Text>
            </Box>
          ),
        },
        {
          width: 800,
          title: "With Right Panel",
          rightPanel: (
            <Box bg="black100" width={300} flexShrink={0} p={1}>
              <Text variant="xs" color="white100">
                Some custom content on the left
              </Text>
            </Box>
          ),
        },
        {
          width: "100%",
          title: "With Left and Right Panels",
          leftPanel: (
            <Box bg="black100" width={300} flexShrink={0} p={1}>
              <Text variant="xs" color="white100">
                Some custom content on the left
              </Text>
            </Box>
          ),
          rightPanel: (
            <Box bg="black100" width={300} flexShrink={0} p={1}>
              <Text variant="xs" color="white100">
                Some custom content on the left
              </Text>
            </Box>
          ),
        },
        {
          title: "With Header",
          header: (
            <Box bg="black10" p={2} textAlign="center">
              <Text variant="xs">Header Content</Text>
            </Box>
          ),
        },
        {
          title: "With Header and Footer",
          header: (
            <Box bg="black10" p={2} textAlign="center">
              <Text variant="xs">Header Content</Text>
            </Box>
          ),
          footer: <Button width="100%">Confirm</Button>,
        },
      ]}
    >
      {(props) => <Demo {...props} />}
    </States>
  )
}

import React, { useState } from "react"
import { States } from "storybook-states"
import { Text } from "../Text"
import { Button } from "../Button"
import { ModalDialog, ModalDialogProps } from "./ModalDialog"

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
      ]}
    >
      {(props) => <Demo {...props} />}
    </States>
  )
}

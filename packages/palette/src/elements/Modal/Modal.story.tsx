import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import { Button } from "../Button"
import { Modal, ModalProps } from "./Modal"

const Story = (props: Omit<ModalProps, "onClose">) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <button onClick={() => setOpen(true)} disabled={open}>
        {open ? "opened" : "open"}
      </button>

      {open && <Modal onClose={() => setOpen(false)} {...props} />}
    </>
  )
}

const Show = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      <button onClick={() => setShow(true)} disabled={show}>
        {show ? "opened" : "open"}
      </button>

      <Modal show={show} onClose={() => setShow(false)}>
        Some example content
      </Modal>
    </>
  )
}

storiesOf("Components/Modal", module)
  .add("Default", () => {
    return <Story show>Some example content</Story>
  })
  .add("With title", () => {
    return (
      <Story show title="Modal Title">
        Some example content
      </Story>
    )
  })
  .add("With logo", () => {
    return (
      <Story show title="Modal Title" hasLogo>
        Some example content
      </Story>
    )
  })
  .add("Modal with fixed button", () => {
    return (
      <Story
        show
        title="Modal Title"
        FixedButton={<Button width="100%">Click me</Button>}
      >
        Some example content
      </Story>
    )
  })
  .add("Wide modal", () => {
    return (
      <Story show title="Modal Title" isWide>
        Some example content
      </Story>
    )
  })
  .add("Utilizing `show`", () => <Show />)

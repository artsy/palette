import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import { Input } from "../Input"
import { ModalBase, ModalBaseProps } from "./ModalBase"

const Story = (props: ModalBaseProps) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <button onClick={() => setOpen(true)} disabled={open}>
        {open ? "opened" : "open"}
      </button>

      {open && (
        <ModalBase onClose={() => setOpen(false)} {...props}>
          <div>
            <Input placeholder="Door #1" />
            <Input placeholder="Door #2" />
          </div>
        </ModalBase>
      )}
    </>
  )
}

storiesOf("Components/Modal", module)
  .add("Base (defaults)", () => <Story />)
  .add("Base (no overlay)", () => <Story overlay={false} />)

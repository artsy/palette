import React, { useState } from "react"
import { States } from "storybook-states"
import { Button } from "../Button"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { Collapse, CollapseProps } from "./Collapse"

export default {
  title: "Components/Collapse",
}

export const Default = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <States<CollapseProps> states={[{ open: false }]}>
        <>
          <Button onClick={() => setOpen(!open)}>
            {open ? "Close" : "Open"}
          </Button>
          <Spacer y={1} />
          <Collapse open={open}>
            <Text>This collapse is open.</Text>
          </Collapse>
        </>
      </States>
    </>
  )
}

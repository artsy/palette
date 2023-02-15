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
  const [openCollapse, setOpenCollapse] = useState(false)

  return (
    <States<Partial<CollapseProps>> states={[{ open: false }]}>
      <>
        <Button onClick={() => setOpenCollapse(!openCollapse)}>
          {openCollapse ? "Close" : "Open"}
        </Button>
        <Spacer y={1} />
        <Collapse open={openCollapse}>
          <Text>This collapse is open.</Text>
        </Collapse>
      </>
    </States>
  )
}

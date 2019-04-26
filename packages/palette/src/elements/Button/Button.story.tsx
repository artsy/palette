import { storiesOf } from "@storybook/react"
import React from "react"
import { Button } from "./Button"

storiesOf("Components/Button", module)
  .add("small", () => {
    return (
      <>
        <Button size="small" variant="primaryBlack">
          primaryBlack
        </Button>
        <Button size="small" variant="primaryWhite">
          primaryWhite
        </Button>
        <Button size="small" variant="secondaryGray">
          secondaryGray
        </Button>
        <Button size="small" variant="secondaryOutline">
          secondaryOutline
        </Button>
        <Button size="small" variant="noOutline">
          noOutline
        </Button>
      </>
    )
  })
  .add("medium", () => {
    return (
      <>
        <Button size="medium" variant="primaryBlack">
          primaryBlack
        </Button>
        <Button size="medium" variant="primaryWhite">
          primaryWhite
        </Button>
        <Button size="medium" variant="secondaryGray">
          secondaryGray
        </Button>
        <Button size="medium" variant="secondaryOutline">
          secondaryOutline
        </Button>
        <Button size="medium" variant="noOutline">
          noOutline
        </Button>
      </>
    )
  })
  .add("medium", () => {
    return (
      <>
        <Button size="large" variant="primaryBlack">
          primaryBlack
        </Button>
        <Button size="large" variant="primaryWhite">
          primaryWhite
        </Button>
        <Button size="large" variant="secondaryGray">
          secondaryGray
        </Button>
        <Button size="large" variant="secondaryOutline">
          secondaryOutline
        </Button>
        <Button size="large" variant="noOutline">
          noOutline
        </Button>
      </>
    )
  })

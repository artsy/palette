import { action } from "@storybook/addon-actions"
import React from "react"
import { Box } from "../Box"
import { Step, Stepper } from "./"

export default {
  title: "Components/Stepper",
}

export const _Stepper = () => {
  return (
    <Box m={3}>
      <Stepper
        onChange={action("onChange")}
        initialTabIndex={2}
        currentStepIndex={2}
        disableNavigation={false}
      >
        <Step name="Review" />
        <Step name="Confirm" />
        <Step name="Pay" />
      </Stepper>
    </Box>
  )
}

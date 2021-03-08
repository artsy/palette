import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { Step, Stepper, StepperProps } from "./"

export default {
  title: "Components/Stepper",
}

export const Default = () => {
  return (
    <States<Omit<StepperProps, "children">>
      states={[
        { initialTabIndex: 0, currentStepIndex: 0 },
        { initialTabIndex: 0, currentStepIndex: 0 },
        { initialTabIndex: 0, currentStepIndex: 1 },
        { initialTabIndex: 1, currentStepIndex: 1 },
        { initialTabIndex: 2, currentStepIndex: 2 },
        { initialTabIndex: 2, currentStepIndex: 2, disableNavigation: true },
      ]}
    >
      {(props) => {
        return (
          <Stepper onChange={action("onChange")} {...props}>
            <Step name="Review" />
            <Step name="Confirm" />
            <Step name="Pay" />
          </Stepper>
        )
      }}
    </States>
  )
}

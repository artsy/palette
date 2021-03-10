import { action } from "@storybook/addon-actions"
import React, { useEffect, useState } from "react"
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
        { initialTabIndex: 2, currentStepIndex: 2, fill: true },
      ]}
    >
      {(props) => {
        return (
          <Stepper onChange={action("onChange")} {...props}>
            <Step name="Review">Review panel</Step>
            <Step name="Confirm">Confirm panel</Step>
            <Step name="Pay">Pay panel</Step>
          </Stepper>
        )
      }}
    </States>
  )
}

export const ChangingCurrentStep = () => {
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursor((prevCursor) => prevCursor + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const index = cursor % 3

  return (
    <Stepper initialTabIndex={index} currentStepIndex={index} disableNavigation>
      <Step name="Review">Review panel</Step>
      <Step name="Confirm">Confirm panel</Step>
      <Step name="Pay">Pay panel</Step>
    </Stepper>
  )
}

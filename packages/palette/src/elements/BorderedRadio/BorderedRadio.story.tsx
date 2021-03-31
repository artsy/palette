import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { RadioGroup, RadioGroupProps } from "../RadioGroup"
import { BorderedRadio } from "./BorderedRadio"

export default {
  title: "Components/BorderedRadio",
}

export const Default = () => {
  return (
    <States<Partial<RadioGroupProps>>
      states={[{}, { defaultValue: "Aural" }, { deselectable: true }]}
    >
      <RadioGroup onSelect={action("onSelect")}>
        {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
          (value) => {
            return (
              <BorderedRadio key={value} value={value}>
                {value}
              </BorderedRadio>
            )
          }
        )}
      </RadioGroup>
    </States>
  )
}

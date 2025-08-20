import { fn } from "@storybook/test"
import React from "react"
import { States } from "storybook-states"
import { RadioGroup, RadioGroupProps } from "../RadioGroup"
import { BorderedRadio } from "./BorderedRadio"
import { Clickable } from "../Clickable"

export default {
  title: "Components/BorderedRadio",
}

export const Default = () => {
  return (
    <States<Partial<RadioGroupProps<string>>>
      states={[{}, { defaultValue: "Aural" }, { deselectable: true }]}
    >
      <RadioGroup onSelect={fn()}>
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

export const WithClickableInLabel = () => {
  return (
    <States<Partial<RadioGroupProps<string>>>
      states={[{}, { defaultValue: "Aural" }, { deselectable: true }]}
    >
      <RadioGroup onSelect={fn()}>
        {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
          (value) => {
            return (
              <BorderedRadio key={value} value={value}>
                <>
                  {value}{" "}
                  <Clickable
                    border="1px solid cyan"
                    onClick={() => alert(`Clicked info for ${value}`)}
                  >
                    Trigger alert()
                  </Clickable>
                </>
              </BorderedRadio>
            )
          }
        )}
      </RadioGroup>
    </States>
  )
}

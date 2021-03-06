import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Button } from "../Button"
import { Radio } from "../Radio/Radio"
import { Text } from "../Text"
import { RadioGroup, RadioGroupProps } from "./RadioGroup"

export default {
  title: "Components/RadioGroup",
}

export const Default = () => {
  return (
    <States<Partial<RadioGroupProps>>
      states={[
        {},
        { defaultValue: "Aural" },
        { deselectable: true },
        { disabled: true },
        { disabled: true, disabledText: "Reason for disabled" },
      ]}
    >
      <RadioGroup onSelect={action("onSelect")}>
        {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
          (value) => {
            return (
              <Radio key={value} value={value} label={<Text>{value}</Text>} />
            )
          }
        )}
      </RadioGroup>
    </States>
  )
}

export const WithDefaultValue = () => {
  const [defaultValue, setValue] = useState("PICKUP")

  return (
    <>
      <Button
        mb={2}
        onClick={() => {
          setValue(defaultValue === "PICKUP" ? "SHIP" : "PICKUP")
        }}
      >
        Toggle default value: {defaultValue}
      </Button>

      <RadioGroup defaultValue={defaultValue} onSelect={action("onSelect")}>
        <Radio value="SHIP" label="Provide shipping address" />
        <Radio value="PICKUP" label="Arrange for pickup" />
      </RadioGroup>
    </>
  )
}

WithDefaultValue.story = {
  name: "With default value",
}

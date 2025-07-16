import { fn } from "@storybook/test"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Spacer } from "../Spacer"
import { Button } from "../Button"
import { Radio } from "../Radio/Radio"
import { RadioGroup, RadioGroupProps } from "./RadioGroup"
import { Join } from "../Join"

export default {
  title: "Components/RadioGroup",
}

export const Default = () => {
  return (
    <States<Partial<RadioGroupProps<string>>>
      states={[
        {},
        { defaultValue: "Aural" },
        { deselectable: true },
        { disabled: true },
        { disabled: true, disabledText: "Reason for disabled" },
      ]}
    >
      <RadioGroup onSelect={fn()}>
        <Join separator={<Spacer y={0.5} />}>
          {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
            (value) => {
              return <Radio key={value} value={value} label={value} />
            }
          )}
        </Join>
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

      <RadioGroup defaultValue={defaultValue} onSelect={fn()}>
        <Radio value="SHIP" label="Provide shipping address" />
        <Spacer y={0.5} />
        <Radio value="PICKUP" label="Arrange for pickup" />
      </RadioGroup>
    </>
  )
}

WithDefaultValue.story = {
  name: "With default value",
}

export const OtherTypes = () => {
  return (
    <States<Partial<RadioGroupProps<boolean | undefined>>>>
      <RadioGroup defaultValue={false} onSelect={fn()}>
        <Radio value={true} label="Yes" />

        <Spacer y={0.5} />

        <Radio value={false} label="No" />
      </RadioGroup>
    </States>
  )
}

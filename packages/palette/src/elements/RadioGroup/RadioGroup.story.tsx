import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { BorderBox } from "../BorderBox"
import { Radio } from "../Radio/Radio"
import { RadioGroup } from "./RadioGroup"

export default {
  title: "Components/RadioGroup",
}

export const WithDefaultValue = () => {
  const RadioGroupToggle = () => {
    const [defaultValue, setValue] = useState("PICKUP")
    return (
      <>
        <BorderBox
          mb={2}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setValue(defaultValue === "PICKUP" ? "SHIP" : "PICKUP")
          }}
        >
          Toggle default value: {defaultValue}
        </BorderBox>
        <RadioGroup defaultValue={defaultValue}>
          <Radio
            value="SHIP"
            label="Provide shipping address"
            onSelect={action("onSelect")}
          />
          <Radio
            value="PICKUP"
            label="Arrange for pickup"
            onSelect={action("onSelect")}
          />
        </RadioGroup>
      </>
    )
  }
  return <RadioGroupToggle />
}

WithDefaultValue.story = {
  name: "With default value",
}

export const Deselectable = () => {
  return (
    <RadioGroup defaultValue="SHIP" deselectable>
      <Radio value="SHIP" label="Provide shipping address" />
      <Radio value="PICKUP" label="Arrange for pickup" />
    </RadioGroup>
  )
}

export const Disabled = () => {
  return (
    <RadioGroup defaultValue="SHIP" disabled disabledText="disabled text">
      <Radio value="SHIP" label="Provide shipping address" />
      <Radio value="PICKUP" label="Arrange for pickup" />
    </RadioGroup>
  )
}

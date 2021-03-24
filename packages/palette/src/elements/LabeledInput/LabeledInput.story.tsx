import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Clickable } from "../Clickable"
import { LabeledInput, LabeledInputProps } from "./LabeledInput"

export default {
  title: "Components/LabeledInput",
}

export const Default = () => {
  return (
    <States<Partial<LabeledInputProps>>
      states={[
        { label: "$USD", placeholder: "Min", type: "number" },
        {
          placeholder: "Clickable label",
          label: (
            <Clickable
              onClick={action("onClick")}
              bg="black60"
              width={18}
              height={18}
              borderRadius="50%"
            />
          ),
        },
      ]}
    >
      <LabeledInput label="$" />
    </States>
  )
}

export const CharacterCountExample = () => {
  const defaultValue = "Hello world"
  const [length, setLength] = useState(defaultValue.length)
  return (
    <LabeledInput
      label={length}
      onChange={(e) => setLength(e.currentTarget.value.length)}
      defaultValue={defaultValue}
    />
  )
}

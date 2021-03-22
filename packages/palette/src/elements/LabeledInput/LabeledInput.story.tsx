import React, { useState } from "react"
import { States } from "storybook-states"
import { Text } from "../Text"
import { LabeledInput, LabeledInputProps } from "./LabeledInput"

export default {
  title: "Components/LabeledInput",
}

export const Default = () => {
  return (
    <States<Partial<LabeledInputProps>>
      states={[
        { label: "$", placeholder: "Min", type: "number" },
        {
          label: (
            <Text color="red100" lineHeight={1} variant="lg">
              $USD
            </Text>
          ),
          placeholder: "Min",
          type: "number",
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

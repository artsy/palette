import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { Text } from "../Text"
import { AutocompleteInput, AutocompleteInputProps } from "./AutocompleteInput"

export default {
  title: "Components/AutocompleteInput",
}

const OPTIONS = [
  {
    text: "Painting",
    value: "painting",
    subtitle: "An example subtitle",
  },
  { text: "Print", value: "print", subtitle: "An example subtitle" },
  { text: "Sculpture", value: "sculpture", subtitle: "An example subtitle" },
  {
    text: "Photography",
    value: "photography",
    subtitle: "An example subtitle",
  },
  {
    text: "Mixed Media",
    value: "mixed-media",
    subtitle: "An example subtitle",
  },
]

export const Default = () => {
  return (
    <States<Partial<AutocompleteInputProps<typeof OPTIONS[number]>>>
      states={[
        {},
        { loading: true },
        { options: [], height: 40 },
        {
          options: [
            ...OPTIONS,
            ...OPTIONS.map((option) => ({
              ...option,
              text: `Another ${option.text}`,
              value: `another-${option.value}`,
            })),
          ],
          renderOption: (option) => (
            <Box px={2} py={1}>
              <Text variant="md">{option.text}</Text>
              <Text variant="xs" color="black60">
                {option.subtitle}
              </Text>
            </Box>
          ),
        },
      ]}
    >
      <AutocompleteInput
        placeholder="Search"
        options={OPTIONS}
        onSelect={action("onSelect")}
        onSubmit={action("onSubmit")}
      />
    </States>
  )
}

export const Demo = () => {
  const [query, setQuery] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <AutocompleteInput
      placeholder="Begin typing..."
      options={[{ text: query, value: query }, ...OPTIONS]}
      onChange={handleChange}
      onSelect={action("onSelect")}
      onSubmit={action("onSubmit")}
      renderOption={(option, i) => (
        <Box
          px={2}
          py={1}
          {...(i === 0
            ? { borderBottom: "1px solid", borderColor: "black10" }
            : {})}
        >
          <Text variant="md">
            {i === 0 ? `See full results for “${option.text}”` : option.text}
          </Text>

          {"subtitle" in option && (
            <Text variant="xs" color="black60">
              {option.subtitle}
            </Text>
          )}
        </Box>
      )}
    />
  )
}

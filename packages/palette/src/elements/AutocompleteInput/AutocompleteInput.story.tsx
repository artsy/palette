import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { Text } from "../Text"
import { AutocompleteInput, AutocompleteInputProps } from "./AutocompleteInput"
import { Clickable } from "../Clickable"

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
              <Text variant="sm-display">{option.text}</Text>
              <Text variant="xs" color="black60">
                {option.subtitle}
              </Text>
            </Box>
          ),
        },
        {
          options: [
            ...OPTIONS,
            ...OPTIONS.map((option) => ({
              ...option,
              text: `Another ${option.text}`,
              value: `another-${option.value}`,
            })),
          ],
          footer: (
            <Box px={2} py={1} bg="black10">
              <Text variant="xs">Footer</Text>
            </Box>
          ),
        },
        {
          options: [OPTIONS[0], OPTIONS[1]],
          footer: (
            <Box px={2} py={1} bg="black10">
              <Text variant="xs">Footer</Text>
            </Box>
          ),
        },
        {
          options: [OPTIONS[0], OPTIONS[1]],
          header: (
            <Box px={2} py={1} bg="black10">
              <Text variant="xs">Header</Text>
            </Box>
          ),
          footer: (
            <Box px={2} py={1} bg="black10">
              <Text variant="xs">Footer</Text>
            </Box>
          ),
        },
        {
          options: [
            ...OPTIONS,
            ...OPTIONS.map((option) => ({
              ...option,
              text: `Another ${option.text}`,
              value: `another-${option.value}`,
            })),
          ],
          header: (
            <Box px={2} py={1} bg="black10">
              <Text variant="xs">Header</Text>
            </Box>
          ),
          footer: ({ onClose }) => (
            <Clickable
              display="flex"
              width={"100%"}
              onClick={onClose}
              px={2}
              py={1}
              bg="white"
            >
              <Text variant="xs">Footer</Text>
            </Clickable>
          ),
          dropdownMaxHeight: "700px",
        },
      ]}
    >
      <AutocompleteInput
        placeholder="Search"
        options={OPTIONS}
        onSelect={action("onSelect")}
        onSubmit={action("onSubmit")}
        onClose={action("onClose")}
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
      options={[...(query ? [{ text: query, value: query }] : []), ...OPTIONS]}
      onChange={handleChange}
      onSelect={action("onSelect")}
      onSubmit={action("onSubmit")}
      onClose={action("onClose")}
      renderOption={(option, i) => {
        const displayQuery = i === 0 && query !== ""

        return (
          <Box
            px={2}
            py={1}
            {...(displayQuery
              ? { borderBottom: "1px solid", borderColor: "black10" }
              : {})}
          >
            <Text variant="sm-display">
              {displayQuery
                ? `See full results for “${option.text}”`
                : option.text}
            </Text>

            {"subtitle" in option && (
              <Text variant="xs" color="black60">
                {option.subtitle}
              </Text>
            )}
          </Box>
        )
      }}
    />
  )
}

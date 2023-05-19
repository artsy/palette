import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { Text } from "../Text"
import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps,
} from "./AutocompleteInput"
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

const CITIES = [
  { text: "New York", value: "new-york" },
  { text: "Los Angeles", value: "los-angeles" },
  { text: "London", value: "london" },
  { text: "Berlin", value: "berlin" },
  { text: "Paris", value: "paris" },
  { text: "Rome", value: "rome" },
  { text: "Madrid", value: "madrid" },
  { text: "Barcelona", value: "barcelona" },
  { text: "Amsterdam", value: "amsterdam" },
  { text: "Brussels", value: "brussels" },
  { text: "Copenhagen", value: "copenhagen" },
  { text: "Dublin", value: "dublin" },
  { text: "Florence", value: "florence" },
  { text: "Geneva", value: "geneva" },
  { text: "Helsinki", value: "helsinki" },
  { text: "Hong Kong", value: "hong-kong" },
  { text: "Lisbon", value: "lisbon" },
  { text: "Milan", value: "milan" },
  { text: "Monaco", value: "monaco" },
  { text: "Moscow", value: "moscow" },
  { text: "Munich", value: "munich" },
  { text: "New Delhi", value: "new-delhi" },
  { text: "Oslo", value: "oslo" },
  { text: "Prague", value: "prague" },
  { text: "Rio de Janeiro", value: "rio-de-janeiro" },
  { text: "San Francisco", value: "san-francisco" },
  { text: "São Paulo", value: "sao-paulo" },
  { text: "Seoul", value: "seoul" },
  { text: "Shanghai", value: "shanghai" },
  { text: "Singapore", value: "singapore" },
  { text: "Stockholm", value: "stockholm" },
  { text: "Sydney", value: "sydney" },
  { text: "Taipei", value: "taipei" },
  { text: "Tokyo", value: "tokyo" },
  { text: "Toronto", value: "toronto" },
  { text: "Venice", value: "venice" },
  { text: "Vienna", value: "vienna" },
  { text: "Warsaw", value: "warsaw" },
  { text: "Zurich", value: "zurich" },
]

export const FilterDemo = () => {
  const [query, setQuery] = useState("")
  const [selection, setSelection] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSelect = (option: AutocompleteInputOptionType) => {
    setSelection(JSON.stringify(option))
  }

  const handleClear = () => {
    setQuery("")
  }

  return (
    <Box
      display="flex"
      height="150vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={2}
    >
      <AutocompleteInput
        width={["75%", "50%"]}
        placeholder="Begin typing..."
        options={CITIES.filter((option) => {
          return option.text.toLowerCase().includes(query.toLowerCase())
        })}
        onChange={handleChange}
        onSelect={handleSelect}
        onClear={handleClear}
        onSubmit={action("onSubmit")}
        onClose={action("onClose")}
      />

      <Text variant="xs">
        Selected: {selection ? selection : "Nothing Yet"}
      </Text>
    </Box>
  )
}

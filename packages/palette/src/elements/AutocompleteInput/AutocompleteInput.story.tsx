import { fn } from "@storybook/test"
import { AutocompleteInput } from "./AutocompleteInput"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"
import { Box } from "../Box/Box"
import React from "react"
import styled from "styled-components"

export default {
  title: "Components/AutocompleteInput",
  component: AutocompleteInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "AutocompleteInput component provides a text input with dropdown suggestions. Supports custom option rendering, loading states, and keyboard navigation.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
    },
  },
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

export const Default = {
  args: {
    title: "Search Medium",
    placeholder: "Start typing...",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const WithTitle = {
  args: {
    title: "Artwork Category",
    placeholder: "Select a category...",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const Required = {
  args: {
    title: "Required Field",
    required: true,
    placeholder: "This field is required",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const WithError = {
  args: {
    title: "Category",
    error: "Please select a valid category",
    placeholder: "Select category...",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const Loading = {
  args: {
    title: "Loading Categories",
    loading: true,
    placeholder: "Loading options...",
    options: [],
    onSelect: fn(),
  },
}

export const Disabled = {
  args: {
    title: "Disabled Input",
    disabled: true,
    placeholder: "Cannot select",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const WithDescription = {
  args: {
    title: "Category Selection",
    description: "Choose the primary medium for this artwork",
    placeholder: "Select medium...",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const EmptyOptions = {
  args: {
    title: "No Options",
    placeholder: "No options available",
    options: [],
    onSelect: fn(),
  },
}

export const WithHoverableUnderlay = () => {
  return (
    <>
      <AutocompleteInput
        title="Search Medium"
        placeholder="Start typing..."
        options={OPTIONS}
        onSelect={fn()}
      />

      <Underlay p={2}>
        This should not turn red when moving from input to results
      </Underlay>
    </>
  )
}

const Underlay = styled(Box)`
  &:hover {
    background-color: red;
  }
`

type Option = { text: string; value: string; subtitle: string }

const MENU: Record<string, { subtitle: string; artists: Option[] }> = {
  painting: {
    subtitle: "Visual art medium",
    artists: [
      { text: "Pablo Picasso", value: "picasso", subtitle: "Spanish painter" },
      { text: "Vincent van Gogh", value: "van-gogh", subtitle: "Dutch post-impressionist" },
      { text: "Claude Monet", value: "monet", subtitle: "French impressionist" },
    ],
  },
  sculpture: {
    subtitle: "3D art form",
    artists: [
      { text: "Michelangelo", value: "michelangelo", subtitle: "Italian Renaissance" },
      { text: "Auguste Rodin", value: "rodin", subtitle: "French sculptor" },
      { text: "Henry Moore", value: "henry-moore", subtitle: "British sculptor" },
    ],
  },
  photography: {
    subtitle: "Photo medium",
    artists: [
      { text: "Ansel Adams", value: "ansel-adams", subtitle: "American photographer" },
      { text: "Henri Cartier-Bresson", value: "cartier-bresson", subtitle: "French photographer" },
      { text: "Diane Arbus", value: "diane-arbus", subtitle: "American photographer" },
    ],
  },
  print: {
    subtitle: "Printed works",
    artists: [
      { text: "Andy Warhol", value: "warhol", subtitle: "Pop art" },
      { text: "Shepard Fairey", value: "fairey", subtitle: "Contemporary artist" },
      { text: "Keith Haring", value: "haring", subtitle: "Graffiti artist" },
    ],
  },
}

const CATEGORIES: Option[] = Object.entries(MENU).map(([value, { subtitle }]) => ({
  text: value.charAt(0).toUpperCase() + value.slice(1),
  value,
  subtitle,
}))

export const LoadNewSuggestionsAfterSelection = () => {
  const [key, setKey] = React.useState(0)
  const [options, setOptions] = React.useState<Option[]>(CATEGORIES)
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])

  const handleSelect = async (option: Option) => {
    setSelected((prev) => [...prev, option.value])

    const category = MENU[option.value]

    // Leaf node (an artist) — close immediately, no delay
    if (!category) return

    // Category node — simulate fetching artists then keep open
    setLoading(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 800))
    setOptions(category.artists)
    setLoading(false)

    return { keepOpen: true }
  }

  const handleReset = () => {
    setKey((k) => k + 1)
    setOptions(CATEGORIES)
    setLoading(false)
    setSelected([])
  }

  return (
    <Box>
      <Box mb={3} p={2} bg="gray10" borderRadius={1}>
        <strong>Instructions:</strong>
        <ol>
          <li>Select a category (Painting, Sculpture, etc.)</li>
          <li>Watch as new artist suggestions load automatically</li>
          <li>The dropdown stays open and focus remains in the input</li>
          <li>You can immediately select an artist without clicking back</li>
        </ol>
      </Box>
      <AutocompleteInput
        key={key}
        title="Search by Category or Artist"
        placeholder={loading ? "Loading artists..." : "Select a category..."}
        options={options}
        loading={loading}
        onSelect={(option) => handleSelect(option as typeof CATEGORIES[0])}
      />
      <Box mt={2}>
        <button onClick={handleReset}>Reset</button>
      </Box>
      {selected.length > 0 && (
        <Box mt={3} p={2} bg="blue10" borderRadius={1}>
          <strong>Selected Category: {selected.join(" > ")}</strong>
          <br />
          <small>
            {loading
              ? "Loading artists for this category..."
              : "New options loaded automatically! Select an artist to continue."}
          </small>
        </Box>
      )}
    </Box>
  )
}

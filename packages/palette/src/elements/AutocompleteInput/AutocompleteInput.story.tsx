import { fn } from "@storybook/test"
import { AutocompleteInput } from "./AutocompleteInput"

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
        include: [
          "title",
          "placeholder",
          "required",
          "disabled",
          "error",
          "loading",
          "options",
          "onSelect",
          "maxLength",
          "description",
        ],
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

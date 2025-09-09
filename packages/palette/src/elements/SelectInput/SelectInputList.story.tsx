import React from "react"
import { SelectInputList } from "./SelectInputList"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: SelectInputList,
  title: "Components/SelectInputList",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A dropdown list component for select inputs, supporting search and keyboard navigation.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLACKLIST,
    },
  },
}

const EXAMPLE_COUNTRIES = [
  {
    text: "🇦🇫 +93",
    name: "Afghanistan",
    value: "af",
    countryCode: "+93",
    flag: "🇦🇫",
  },
  {
    text: "🇦🇱 +355",
    name: "Albania",
    value: "al",
    countryCode: "+355",
    flag: "🇦🇱",
  },
  {
    text: "🇩🇿 +213",
    name: "Algeria",
    value: "dz",
    countryCode: "+213",
    flag: "🇩🇿",
  },
]

export const Default = {
  args: {
    options: EXAMPLE_COUNTRIES,
  },
  render: (args) => (
    <SelectInputList
      {...args}
      onSelect={(option) => console.log(option)}
      onClose={() => console.log("close")}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Default SelectInputList with example countries.",
      },
    },
  },
}

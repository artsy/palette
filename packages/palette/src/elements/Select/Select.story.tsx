import React from "react"
import { States } from "storybook-states"
import { Select, SelectProps } from "./Select"

export default {
  title: "Components/Select",
}

const OPTIONS = [
  { text: "Default", value: "-decayed_merch" },
  { text: "Price (desc.)", value: "-has_price,-prices" },
  { text: "Price (asc.)", value: "-has_price,prices" },
  { text: "Recently updated", value: "-partner_updated_at" },
  { text: "Recently added", value: "-published_at" },
  { text: "Artwork year (desc.)", value: "-year" },
  { text: "Artwork year (asc.)", value: "year" },
]

export const Default = () => {
  return (
    <States<Partial<SelectProps>>
      states={[
        // variant="default"
        {},
        { focus: true },
        { hover: true },
        { error: "Something went wrong." },
        { disabled: true },

        // variant="inline"
        { variant: "inline" },
        { variant: "inline", focus: true },
        { variant: "inline", hover: true },
        { variant: "inline", error: "Something went wrong." },
        { variant: "inline", disabled: true },
        { variant: "inline", title: "Sort:" },
        {
          variant: "inline",
          title: "Sort:",
          description: "A description of sorting",
        },

        // variant="default"
        { selected: "lastValue" },
        { title: "Pick something" },
        { title: "Pick something", required: true, id: "pick" },
        { title: "Pick something", description: "This matters a lot." },
      ]}
    >
      <Select options={OPTIONS} />
    </States>
  )
}

export const Example = () => {
  return (
    <Select
      display="inline-flex"
      variant="inline"
      title="Sort:"
      options={OPTIONS}
      selected="-year"
      autoComplete="year"
    />
  )
}

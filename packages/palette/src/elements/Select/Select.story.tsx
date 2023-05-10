import React from "react"
import { States } from "storybook-states"
import { Select, SelectProps } from "./Select"

export default {
  title: "Components/Select",
}

const OPTIONS = [
  { text: "Please select", value: "" },
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
        {},
        { focus: true },
        { hover: true },
        { error: "Something went wrong." },
        { disabled: true },
        { title: "Sort" },
        { title: "Sort", description: "A description of sorting" },
        { title: "Sort", focus: true },
        { title: "Sort", hover: true },
        { title: "Sort", error: "Something went wrong." },
        { title: "Sort", disabled: true },
        { title: "Sort", required: true },
        { selected: "lastValue" },
        { title: "Pick something", required: true, id: "pick" },
        { title: "Pick something", description: "This matters a lot." },
      ]}
    >
      <Select options={OPTIONS} />
    </States>
  )
}

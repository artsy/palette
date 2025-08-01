import { fn } from "@storybook/test"
import React from "react"
import { States } from "storybook-states"
import { FilterSelect } from "./FilterSelect"
import { FilterSelectProps } from "./FilterSelect"

export default {
  title: "Components/FilterSelect",
}

export const Default = () => {
  return (
    <States<FilterSelectProps>
      states={[
        // radio
        { multiselect: false },

        // checkboxes
        { multiselect: true },

        // checkboxes with searchable hidden text and quick select-all
        {
          multiselect: true,
          enableSelectAll: true,
          onSelectAll: (state) => console.log("onSelectAll", state),
          searchableText: (item) => {
            const extraSearchTerms =
              item.country === "American" ? "USA; Yankee; Murican" : ""
            return `${item.label}; ${item.country}; ${extraSearchTerms}`
          },
        },
      ]}
    >
      <FilterSelect
        placeholder="Filter by artist name"
        initialItemsToShow={6}
        order={[
          ["country", "name"],
          ["asc", "asc"],
        ]}
        renderItemLabel={(item) => `${item.label}, ${item.country}`}
        onChange={fn()}
        items={[
          {
            label: "Barbara Kruger",
            value: "barbara-kruger",
            country: "American",
          },
          {
            label: "Carrie Mae Weems",
            value: "carrie-weems",
            country: "American",
          },
          {
            label: "Daniel Arsham",
            value: "daniel-asham",
            country: "American",
          },
          {
            label: "Takashi Murakami",
            value: "takashi-muakami",
            country: "American",
          },
          {
            label: "Tracey Emin",
            value: "tracey-emin",
            country: "British-Nigerian",
          },
          {
            label: "Yinka Shonibare",
            value: "yinka-shonibare",
            country: "Japanese",
          },
          {
            label: "Barbara Kruger",
            value: "barbara-kruger-2",
            country: "British-Nigerian",
          },
        ]}
      />
    </States>
  )
}

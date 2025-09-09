import { fn } from "@storybook/test"
import React from "react"
import { States } from "storybook-states"
import { FilterSelect } from "./FilterSelect"
import { FilterSelectProps } from "./FilterSelect"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: FilterSelect,
  title: "Components/FilterSelect",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A filterable select component with support for single or multi-select, search functionality, and custom rendering.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

const items = [
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
]

export const Default = {
  args: {
    placeholder: "Filter by artist name",
    initialItemsToShow: 6,
    order: [
      ["country", "name"],
      ["asc", "asc"],
    ],
    renderItemLabel: (item) => `${item.label}, ${item.country}`,
    onChange: fn(),
    items,
    multiselect: false,
  },
}

export const Multiselect = {
  args: {
    ...Default.args,
    multiselect: true,
  },
}

export const WithSelectAll = {
  args: {
    ...Default.args,
    multiselect: true,
    enableSelectAll: true,
    onSelectAll: (state) => console.log("onSelectAll", state),
    searchableText: (item) => {
      const extraSearchTerms =
        item.country === "American" ? "USA; Yankee; Murican" : ""
      return `${item.label}; ${item.country}; ${extraSearchTerms}`
    },
  },
}

export const WithStates = {
  render: () => {
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

          // checkboxes with move selected to top disabled
          {
            multiselect: true,
            moveSelectedToTop: false,
            enableSelectAll: true,
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
          items={items}
        />
      </States>
    )
  },
}

import React from "react"
import { LargeSelect, SelectSmall } from "./Select"

const options = [
  {
    text: "First",
    value: "firstValue",
  },
  {
    text: "Last",
    value: "lastValue",
  },
]

export default {
  title: "Components/Select",
}

export const _LargeSelect = () => {
  return <LargeSelect options={options} selected="lastValue" />
}

_LargeSelect.story = {
  name: "LargeSelect",
}

export const SelectOnly = () => {
  return <LargeSelect options={options} />
}

SelectOnly.story = {
  name: "Select only",
}

export const SelectTitle = () => {
  return <LargeSelect options={options} title="Pick something" />
}

SelectTitle.story = {
  name: "Select + Title",
}

export const SelectTitleRequired = () => {
  return <LargeSelect options={options} required title="Pick something" />
}

SelectTitleRequired.story = {
  name: "Select + Title + Required",
}

export const SelectTitleDescription = () => {
  return (
    <LargeSelect
      description="This matters a lot."
      options={options}
      title="Pick something"
    />
  )
}

SelectTitleDescription.story = {
  name: "Select + Title + Description",
}

export const SelectWithError = () => {
  return <LargeSelect error="Something went wrong." options={options} />
}

SelectWithError.story = {
  name: "Select with error",
}

export const DisabledSelect = () => {
  return <LargeSelect disabled options={options} />
}

export const SelectSmallWithTitle = () => {
  return (
    <SelectSmall
      options={[
        {
          text: "Price",
          value: "price",
        },
        {
          text: "Estimate and some other text",
          value: "estimate",
        },
      ]}
      title="Sort"
    />
  )
}

SelectSmallWithTitle.story = {
  name: "SelectSmall with title",
}

export const SelectSmallWithoutTitle = () => {
  return (
    <SelectSmall
      options={[
        {
          text: "First option",
          value: "firstOption",
        },
        {
          text: "Second option that is really long",
          value: "SecondOption",
        },
      ]}
      selected="SecondOption"
    />
  )
}

SelectSmallWithoutTitle.story = {
  name: "SelectSmall without title",
}

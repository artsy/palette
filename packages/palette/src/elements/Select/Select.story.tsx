import { storiesOf } from "@storybook/react"
import React from "react"
import { LargeSelect, SelectSmall } from "./Select"

storiesOf("Components/Select", module)
  .add("LargeSelect", () => {
    return (
      <LargeSelect
        options={[
          {
            text: "First",
            value: "firstValue",
          },
          {
            text: "Last",
            value: "lastValue",
          },
        ]}
        selected="lastValue"
      />
    )
  })
  .add("LargeSelect with placeholder", () => {
    return (
      <LargeSelect
        placeholder="You must choose wisely"
        options={[
          {
            text: "First",
            value: "firstValue",
          },
          {
            text: "Last",
            value: "lastValue",
          },
        ]}
      />
    )
  })
  .add("SelectSmall with title", () => {
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
  })
  .add("SelectSmall without title", () => {
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
  })

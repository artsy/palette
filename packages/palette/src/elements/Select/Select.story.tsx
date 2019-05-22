import { storiesOf } from "@storybook/react"
import React from "react"
import { LargeSelect, MiniSelect } from "./Select"

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
  .add("MiniSelect with title", () => {
    return (
      <MiniSelect
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
  .add("MiniSelect with includeBackground", () => {
    return (
      <MiniSelect
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

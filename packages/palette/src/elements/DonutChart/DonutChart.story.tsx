import { storiesOf } from "@storybook/react"
import React from "react"
import { Serif } from "../Typography"
import { DonutChart } from "./DonutChart"

storiesOf("Components/DonutChart", module).add("DonutChart with labels", () => {
  return (
    <DonutChart
      points={[
        {
          value: 423,
          axisLabelX: "Sep 10",
          tooltip: { title: "Sep 10", description: "423 clicks" },
        },
        {
          value: 567,
          tooltip: (
            <Serif size="3" p={0.5}>
              yay!
            </Serif>
          ),
        },
        {
          value: 300,
          axisLabelX: "Sep 12",
          tooltip: { title: "Sep 12", description: "300 clicks" },
        },
        {
          value: 200,
          tooltip: { title: "Sep 13", description: "200 clicks" },
        },
        {
          value: 501,
          axisLabelX: "Sep 14",
          tooltip: { title: "Sep 14", description: "501 clicks" },
        },
        {
          value: 400,
          tooltip: { title: "Sep 15", description: "400 clicks" },
        },
        {
          value: 800,
          axisLabelX: "Sep 16",
          tooltip: { title: "Sep 16", description: "800 clicks" },
        },
      ]}
    />
  )
})

import { Box } from "@artsy/palette"
import React from "react"
import { DonutChart } from "../DonutChart"

export default {
  title: "Components/DonutChart",
}

export const SimpleDonut = () => {
  return (
    <Box width="500px">
      <DonutChart
        points={[
          {
            value: 567,
            axisLabelX: "Sep 11",
            tooltip: { title: "Sep 8", description: "100 clicks" },
          },
          {
            value: 300,
            axisLabelX: "Sep 12",
            tooltip: { title: "Sep 12", description: "300 clicks" },
          },
          {
            value: 800,
            axisLabelX: "Sep 16",
            tooltip: { title: "Sep 16", description: "800 clicks" },
          },
        ]}
      />
    </Box>
  )
}

SimpleDonut.story = {
  name: "simple donut",
}

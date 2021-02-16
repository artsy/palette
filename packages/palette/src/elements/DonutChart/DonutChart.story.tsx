import React from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { Serif } from "../Typography"
import { DonutChart } from "./DonutChart"

export default {
  title: "Components/DonutChart",
}

export const DonutChartWithLabels = () => {
  return (
    <Box width="50%">
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
    </Box>
  )
}

DonutChartWithLabels.story = {
  name: "DonutChart with labels",
  parameters: { chromatic: { delay: 500 } },
}

export const DonutChartWithCustomMargin = () => {
  return (
    <Box width="50%">
      <DonutChart
        margin={50}
        points={[
          {
            value: 423,
            axisLabelX: "September 10",
            tooltip: { title: "September 10", description: "423 clicks" },
          },
          {
            value: 567,
            axisLabelX: "September 11",
            tooltip: (
              <Serif size="3" p={0.5}>
                yay!
              </Serif>
            ),
          },
          {
            value: 300,
            axisLabelX: "September 12",
            tooltip: { title: "September 12", description: "300 clicks" },
          },
          {
            value: 200,
            axisLabelX: "September 13",
            tooltip: { title: "September 13", description: "200 clicks" },
          },
          {
            value: 501,
            axisLabelX: "September 14",
            tooltip: { title: "September 14", description: "501 clicks" },
          },
          {
            value: 400,
            axisLabelX: "September 15",
            tooltip: { title: "September 15", description: "400 clicks" },
          },
          {
            value: 800,
            axisLabelX: "September 16",
            tooltip: { title: "September 16", description: "800 clicks" },
          },
        ]}
      />
    </Box>
  )
}

DonutChartWithCustomMargin.story = {
  name: "DonutChart with custom margin",
  parameters: { chromatic: { delay: 500 } },
}

export const DonutChartWithTitleDescriptionLabels = () => {
  return (
    <Box width="50%">
      <DonutChart
        margin={50}
        points={[
          {
            value: 423,
            axisLabelX: { title: "September 10", description: "10%" },
            tooltip: { title: "September 10", description: "423 clicks" },
          },
          {
            value: 567,
            axisLabelX: { title: "September 11", description: "20%" },
            tooltip: (
              <Serif size="3" p={0.5}>
                yay!
              </Serif>
            ),
          },
          {
            value: 300,
            axisLabelX: { title: "September 12", description: "15%" },
            tooltip: { title: "September 12", description: "300 clicks" },
          },
          {
            value: 200,
            axisLabelX: "September 13",
            tooltip: { title: "September 13", description: "200 clicks" },
          },
          {
            value: 501,
            axisLabelX: "September 14",
            tooltip: { title: "September 14", description: "501 clicks" },
          },
          {
            value: 400,
            axisLabelX: "September 15",
            tooltip: { title: "September 15", description: "400 clicks" },
          },
          {
            value: 800,
            axisLabelX: "September 16",
            tooltip: { title: "September 16", description: "800 clicks" },
          },
        ]}
      />
    </Box>
  )
}

DonutChartWithTitleDescriptionLabels.story = {
  name: "DonutChart with title/description labels",
  parameters: { chromatic: { delay: 500 } },
}

export const DonutChartWithoutLabelsAnd0Margin = () => {
  return (
    <Box width="30%" p={2}>
      <DonutChart
        margin={0}
        points={[
          {
            value: 423,
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
            tooltip: { title: "Sep 12", description: "300 clicks" },
          },
          {
            value: 200,
            tooltip: { title: "Sep 13", description: "200 clicks" },
          },
          {
            value: 501,
            tooltip: { title: "Sep 14", description: "501 clicks" },
          },
          {
            value: 400,
            tooltip: { title: "Sep 15", description: "400 clicks" },
          },
          {
            value: 800,
            tooltip: { title: "Sep 16", description: "800 clicks" },
          },
        ]}
      />
    </Box>
  )
}

DonutChartWithoutLabelsAnd0Margin.story = {
  name: "DonutChart without labels and 0 margin",
  parameters: { chromatic: { delay: 500 } },
}

export const ChartMinimumWidth = () => {
  return (
    <Box width="1px" p={2}>
      <DonutChart
        margin={0}
        points={[
          {
            value: 423,
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
            tooltip: { title: "Sep 12", description: "300 clicks" },
          },
          {
            value: 200,
            tooltip: { title: "Sep 13", description: "200 clicks" },
          },
          {
            value: 501,
            tooltip: { title: "Sep 14", description: "501 clicks" },
          },
          {
            value: 400,
            tooltip: { title: "Sep 15", description: "400 clicks" },
          },
          {
            value: 800,
            tooltip: { title: "Sep 16", description: "800 clicks" },
          },
        ]}
      />
    </Box>
  )
}

ChartMinimumWidth.story = {
  name: "Chart minimum width",
  parameters: { chromatic: { delay: 500 } },
}

export const DonutChartResizesWhenContainerSizeChanges = () => {
  return (
    <>
      <GrowingBox p={2}>
        Hover to resize
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
      </GrowingBox>
    </>
  )
}

DonutChartResizesWhenContainerSizeChanges.story = {
  name: "DonutChart resizes when container size changes",
  parameters: { chromatic: { delay: 500 } },
}

const GrowingBox = styled(Box)`
  width: 200px;
  border-top: 1px dotted gray;
  border-left: 1px dotted gray;
  transition: width 3s linear;
  &:hover {
    width: 400px;
  }
`

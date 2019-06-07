import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Theme } from "../../Theme"
import { ChartProps } from "../DataVis/utils/SharedTypes"
import { Flex } from "../Flex"
import { Sans } from "../Typography"
import { LineChart, PointHoverArea } from "./LineChart"
import { Point } from "./Point"

jest.useFakeTimers()

const mockPoints = [
  { value: 0, axisLabelX: "x axis label" },
  { value: 100, axisLabelX: <div id="x-axis">lol</div> },
  {
    value: 200,
    tooltip: (
      <Flex alignItems="center" flexDirection="column">
        <Sans size="2" weight="medium">
          Sept 30
        </Sans>
        <Sans size="2" color="black60">
          423 views
        </Sans>
      </Flex>
    ),
  },
]

describe("LineChart", () => {
  const getWrapper = (props: Partial<ChartProps> = {}) => {
    return mount(
      <Theme>
        <LineChart points={mockPoints} {...props} />
      </Theme>
    )
  }

  it("shows the correct number of data points", () => {
    const chart = getWrapper()
    expect(chart.find(Point)).toHaveLength(mockPoints.length)
  })

  it("renders x axis labels labels", () => {
    const chart = getWrapper()

    expect(chart.text()).toContain("x axis label")
    expect(chart.find("#x-axis").text()).toBe("lol")
  })

  it("shows hover labels when you hover over the bar", () => {
    const chart = getWrapper()
    const hoverArea = chart
      .find(PointHoverArea)
      .last()
      .find("div")
      .first()
    hoverArea.simulate("mouseenter")
    expect(chart.text()).toContain("423 views")
    hoverArea.simulate("mouseleave")
    expect(chart.text()).not.toContain("423 views")
  })
})

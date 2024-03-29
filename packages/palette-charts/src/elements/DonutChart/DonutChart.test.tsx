import { Flex, Text, Theme } from "@artsy/palette"
import { mount } from "enzyme"
import "jest-styled-components"
import createMockRaf from "mock-raf"
import React from "react"
import { useWrapperWidth } from "../DataVis/utils/useWrapperWidth"
import { DonutChart, DonutChartProps } from "./DonutChart"

jest.useFakeTimers()

const mockRaf = createMockRaf()
const globalAny: any = global
globalAny.requestAnimationFrame = mockRaf.raf

jest.mock("../DataVis/utils/useWrapperWidth")
;(useWrapperWidth as jest.Mock).mockImplementation(() => 400)

const mockPoints = [
  { value: 40, axisLabelX: "x axis label" },
  { value: 100, axisLabelX: <div id="x-axis">lol</div> },
  {
    value: 200,
    tooltip: (
      <Flex alignItems="center" flexDirection="column">
        <Text>Sept 30</Text>
        <Text>423 views</Text>
      </Flex>
    ),
  },
]

describe("DonutChart", () => {
  const getWrapper = (props: Partial<DonutChartProps> = {}) => {
    return mount(
      <Theme>
        <DonutChart points={mockPoints} {...props} />
      </Theme>
    )
  }

  it("renders one path for zero state and one for each data points", () => {
    const chart = getWrapper()
    expect(chart.find("path")).toHaveLength(mockPoints.length + 1)
  })

  it("renders x axis labels labels", () => {
    const chart = getWrapper()

    expect(chart.text()).toContain("x axis label")
    expect(chart.find("#x-axis").text()).toBe("lol")
  })

  it("shows hover labels when you hover over the bar", () => {
    const chart = getWrapper()
    const hoverArea = chart.find("path").last()
    hoverArea.simulate("mouseenter")
    expect(chart.text()).toContain("423 views")
    hoverArea.simulate("mouseleave")
    expect(chart.text()).not.toContain("423 views")
  })
})

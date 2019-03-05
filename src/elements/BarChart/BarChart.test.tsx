import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { color } from "../../helpers"
import { Theme } from "../../Theme"
import { BarChart, BarChartProps } from "../BarChart"
import { Flex } from "../Flex"
import { Sans } from "../Typography"
import { Bar } from "./Bar"

const mockBars = [
  { value: 100 },
  { value: 1000 },
  {
    value: 4000,
    highlightLabel: (
      <Flex alignItems="center" flexDirection="column" id="highlight-label">
        <Sans weight="medium" size="2">
          $30,000
        </Sans>
        <Sans color={"black60"} size="2">
          This artwork
        </Sans>
      </Flex>
    ),
  },
  {
    value: 400,
    label: (
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

describe("BarChart", () => {
  const getWrapper = (props: Partial<BarChartProps> = {}) => {
    return mount(
      <Theme>
        <BarChart
          bars={mockBars}
          minLabel="min-label"
          maxLabel="max-label"
          {...props}
        />
      </Theme>
    )
  }

  it("renders the min and max labels", () => {
    const chart = getWrapper()

    expect(chart.text()).toContain("min-label")
    expect(chart.text()).toContain("max-label")
  })

  it("shows a highlightLabel all the time", () => {
    const chart = getWrapper({ bars: [mockBars[2]] })

    const label = chart.find("#highlight-label").hostNodes()

    expect(label.text()).toMatch("This artwork")
  })

  it("allows the min and max labels to be any old html", () => {
    const chart = getWrapper({
      minLabel: <div id="min">Hello min!</div>,
      maxLabel: <div id="max">Hello max!</div>,
    })

    expect(chart.find("#min").text()).toBe("Hello min!")
    expect(chart.find("#max").text()).toBe("Hello max!")
  })

  it("shows the correct number of bars", () => {
    const chart = getWrapper()
    expect(chart.find(Bar)).toHaveLength(mockBars.length)
  })

  it("shows the highlighted bar in a different color", () => {
    const chart = getWrapper()
    const normalBar = chart.find(Bar).at(0)
    const highlightedBar = chart.find(Bar).at(2)
    expect(normalBar).toHaveStyleRule("background", color("black10"))
    expect(highlightedBar).toHaveStyleRule("background", color("black60"))
  })

  it("renders a normal bar a different color when you hover", () => {
    const chart = getWrapper()
    const normalBar = chart.find(Bar).at(0)
    expect(normalBar).toHaveStyleRule("background", color("black30"), {
      modifier: ":hover",
    })
  })

  it("does not change the color of a highlighted bar when you hover", () => {
    const chart = getWrapper()
    const highlightedBar = chart.find(Bar).at(2)
    expect(highlightedBar).toHaveStyleRule("background", color("black60"), {
      modifier: ":hover",
    })
  })

  it("does not show hover labels by default", () => {
    const chart = getWrapper()
    expect(chart.text()).not.toContain("423 views")
  })

  it("shows hover labels when you hover over the bar", () => {
    const chart = getWrapper()
    const labelledBar = chart
      .find(Bar)
      .last()
      .find("div")
      .first()
    labelledBar.simulate("mouseenter")
    expect(chart.text()).toContain("423 views")
    labelledBar.simulate("mouseleave")
    expect(chart.text()).not.toContain("423 views")
  })
})

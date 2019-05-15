import { mount } from "enzyme"
import React from "react"
import { LineChart } from "./LineChart"
import { Point } from "./Point"

// TODO: add points and test
const mockPoints = [
  { value: 0 },
  { value: 100 },
  { value: 200 },
  { value: 300 },
  { value: 400 },
  { value: 500 },
]

describe("LineChart", () => {
  it("shows the correct number of data points", () => {
    const props = {
      points: mockPoints,
    }
    const chart = mount(<LineChart {...props} />)
    expect(chart.find(Point)).toHaveLength(mockPoints.length)
  })
})

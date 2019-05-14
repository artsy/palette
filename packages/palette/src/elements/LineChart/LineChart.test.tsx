import { shallow } from "enzyme"
import React from "react"
import { LineChart } from "./LineChart"

describe("LineChart", () => {
  it("shows hello world", () => {
    const chart = shallow(<LineChart />)
    expect(chart.text()).toContain("Hello, world!")
  })
})

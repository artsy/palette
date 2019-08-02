import { mount } from "enzyme"
import { Settings } from "luxon"
import React from "react"
import { Sans } from "../.."
import { TimeRemaining } from "../TimeRemaining"

describe("TimeRemaining", () => {
  const defaultZone = Settings.defaultZoneName
  const realNow = Settings.now

  beforeEach(() => {
    Settings.defaultZoneName = "America/New_York"
  })

  afterEach(() => {
    Settings.now = realNow
    Settings.defaultZoneName = defaultZone
  })

  it("doesn't render hours if end hour is the same as current hour", () => {
    Settings.now = () => new Date("2019-01-05T15:00:30.000-04:00").valueOf()
    const wrapper = mount(
      <TimeRemaining
        endDate="2019-01-14T15:30:00.000-04:00"
        highlight="purple100"
      />
    )
    expect(
      wrapper
        .find(Sans)
        .at(0)
        .html()
    ).toContain("09d&nbsp;&nbsp;00h&nbsp;&nbsp;29m&nbsp;&nbsp;30s")
  })

  it("doesn't render minutes if end hour is the same as current hour", () => {
    Settings.now = () => new Date("2019-01-05T15:30:00.000-04:00").valueOf()
    const wrapper = mount(
      <TimeRemaining
        endDate="2019-01-14T15:30:30.000-04:00"
        highlight="purple100"
      />
    )
    expect(
      wrapper
        .find(Sans)
        .at(0)
        .html()
    ).toContain("09d&nbsp;&nbsp;00h&nbsp;&nbsp;00m&nbsp;&nbsp;30s")
  })

  it("renders timeEndedDisplayText when time has ended if passed", () => {
    Settings.now = () => new Date("2019-01-05T15:30:00.000-04:00").valueOf()
    const wrapper = mount(
      <TimeRemaining
        endDate="2018-01-14T15:30:30.000-04:00"
        highlight="purple100"
        timeEndedDisplayText="O days left"
      />
    )

    expect(
      wrapper
        .find(Sans)
        .at(0)
        .html()
    ).toContain("O days left")
  })

  it("doesn't renders trailing text if provided", () => {
    Settings.now = () => new Date("2019-01-05T15:30:00.000-04:00").valueOf()
    const wrapper = mount(
      <TimeRemaining
        endDate="2019-01-14T15:30:30.000-04:00"
        highlight="purple100"
        trailingText="left"
      />
    )
    expect(
      wrapper
        .find(Sans)
        .at(0)
        .html()
    ).toContain("09d&nbsp;&nbsp;00h&nbsp;&nbsp;00m&nbsp;&nbsp;30s left")
  })
})

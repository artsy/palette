import { mount } from "enzyme"
import { Settings } from "luxon"
import React from "react"
import { TimeRemaining } from "../TimeRemaining"

describe("TimeRemaining", () => {
  beforeEach(() => {
    Settings.defaultZoneName = "America/New_York"
  })

  it("doesn't render hours if end hour is the same as current hour", () => {
    const wrapper = mount(
      <TimeRemaining
        countdownEnd="2019-01-14T15:30:00.000-04:00"
        currentTime="2019-01-05T15:00:30.000-04:00"
        highlight="purple100"
      />
    )
    expect(wrapper.html()).toContain("09d 29m 30s")
  })

  it("doesn't render minutes if end hour is the same as current hour", () => {
    const wrapper = mount(
      <TimeRemaining
        countdownEnd="2019-01-14T15:30:30.000-04:00"
        currentTime="2019-01-05T15:30:00.000-04:00"
        highlight="purple100"
      />
    )
    expect(wrapper.html()).toContain("09d 30s")
  })
})

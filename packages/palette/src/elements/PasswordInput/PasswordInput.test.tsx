import { mount } from "enzyme"
import React from "react"
import { Clickable } from "../Clickable"
import { PasswordInput } from "./PasswordInput"

describe("PasswordInput", () => {
  it("masks the value by default and reveals it when toggled", () => {
    const wrapper = mount(<PasswordInput />)
    expect(wrapper.find("input").prop("type")).toEqual("password")

    wrapper.find(Clickable).simulate("click")

    expect(wrapper.find("input").prop("type")).toEqual("text")
  })

  it("names the icon-only toggle for its current action", () => {
    const wrapper = mount(<PasswordInput />)
    expect(wrapper.find(Clickable).prop("aria-label")).toEqual("Show password")

    wrapper.find(Clickable).simulate("click")

    expect(wrapper.find(Clickable).prop("aria-label")).toEqual("Hide password")
  })
})

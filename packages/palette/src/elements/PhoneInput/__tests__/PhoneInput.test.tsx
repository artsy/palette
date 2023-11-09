import { mount } from "enzyme"
import React from "react"
import { PhoneInput } from "../PhoneInput"

const countriesExample = [
  {
    text: "🇦🇱 +355",
    name: "Albania",
    value: "al",
    countryCode: "+355",
    flag: "🇦🇱",
  },
  {
    text: "🇩🇿 +213",
    name: "Algeria",
    value: "dz",
    countryCode: "+213",
    flag: "🇩🇿",
  },
  {
    text: "🇦🇷 +54",
    name: "Argentina",
    value: "ar",
    countryCode: "+54",
    flag: "🇦🇷",
  },
  {
    text: "🇦🇹 +43",
    name: "Austria",
    value: "at",
    countryCode: "+43",
    flag: "🇦🇹",
  },
  {
    text: "🇧🇾 +375",
    name: "Belarus",
    value: "by",
    countryCode: "+375",
    flag: "🇧🇾",
  },
  {
    text: "🇧🇪 +32",
    name: "Belgium",
    value: "be",
    countryCode: "+32",
    flag: "🇧🇪",
  },
  {
    text: "🇧🇴 +591",
    name: "Bolivia",
    value: "bo",
    countryCode: "+591",
    flag: "🇧🇴",
  },
]

describe("PhoneInput", () => {
  const mockOnSelect = jest.fn()

  it("returns a phone input", () => {
    const wrapper = mount(
      <PhoneInput onSelect={mockOnSelect} options={countriesExample} />
    )

    expect(wrapper.find("input").length).toEqual(1)
    expect(wrapper.text()).toContain("Phone Number")
  })

  it("returns a required phone input when provided", () => {
    const wrapper = mount(
      <PhoneInput onSelect={mockOnSelect} options={countriesExample} required />
    )

    expect(wrapper.text()).toContain("*Required")
  })

  it("returns a phone input with an error text when provided", () => {
    const wrapper = mount(
      <PhoneInput
        onSelect={mockOnSelect}
        options={countriesExample}
        error="This is an error"
      />
    )

    expect(wrapper.text()).toContain("This is an error")
  })

  it("displays the list of countries when the country picker is clicked", () => {
    const wrapper = mount(
      <PhoneInput onSelect={mockOnSelect} options={countriesExample} />
    )

    wrapper.find('[data-testid="country-picker"]').first().simulate("click")

    expect(wrapper.html().match(/role="option"/g)?.length).toEqual(
      countriesExample.length
    )
  })

  it("filters the list of countries when the search input is filled", () => {
    const wrapper = mount(
      <PhoneInput onSelect={mockOnSelect} options={countriesExample} />
    )

    wrapper.find('[data-testid="country-picker"]').first().simulate("click")

    wrapper
      .find("input[placeholder='Search']")
      .simulate("change", { target: { value: "arg" } })

    expect(wrapper.html().match(/role="option"/g)?.length).toEqual(1)
    expect(wrapper.text()).toContain("Argentina")

    wrapper
      .find("input[placeholder='Search']")
      .simulate("change", { target: { value: "be" } })

    expect(wrapper.html().match(/role="option"/g)?.length).toEqual(2)
    expect(wrapper.text()).toContain("Belarus")
    expect(wrapper.text()).toContain("Belgium")
  })

  it("updates the selected country when a new country is selected", () => {
    const wrapper = mount(
      <PhoneInput onSelect={mockOnSelect} options={countriesExample} />
    )

    // pre-selected country (first on the list)
    expect(wrapper.text()).toContain("🇦🇱 +355")

    wrapper.find('[data-testid="country-picker"]').first().simulate("click")

    wrapper
      .find("input[placeholder='Search']")
      .simulate("change", { target: { value: "arg" } })

    wrapper.find("[role='option']").first().simulate("click")

    expect(mockOnSelect).toHaveBeenCalledWith({
      text: "🇦🇷 +54",
      name: "Argentina",
      value: "ar",
      countryCode: "+54",
      flag: "🇦🇷",
    })
    expect(wrapper.text()).not.toContain("🇦🇱 +355")
    expect(wrapper.text()).toContain("🇦🇷 +54")
  })
})

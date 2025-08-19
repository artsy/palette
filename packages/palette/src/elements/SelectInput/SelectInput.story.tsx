import React from "react"
import { States } from "storybook-states"
import { SelectInput, SelectInputProps } from "./SelectInput"

export default {
  title: "Components/SelectInput",
}

const currencyOptions = [
  {
    text: "USD",
    name: "US Dollar",
    value: "usd",
  },
  {
    text: "EUR",
    name: "Euro",
    value: "eur",
  },
  {
    text: "GBP",
    name: "British Pound",
    value: "gbp",
  },
  {
    text: "JPY",
    name: "Japanese Yen",
    value: "jpy",
  },
  {
    text: "CHF",
    name: "Swiss Franc",
    value: "chf",
  },
]

const countryOptions = [
  {
    text: "🇦🇫 +93",
    name: "Afghanistan",
    value: "af",
    countryCode: "+93",
    flag: "🇦🇫",
  },
  {
    text: "🇦🇽 +358",
    name: "Aland Islands",
    value: "ax",
    countryCode: "+358",
    flag: "🇦🇽",
  },
  {
    text: "🇦🇱 +355",
    name: "Albania",
    value: "al",
    countryCode: "+355",
    flag: "🇦🇱",
  },
]

const dimensionMetricOptions = [
  { text: "in", value: "in", name: "Inches" },
  { text: "cm", value: "cm", name: "Centimeters" },
]

export const Dimensions = () => {
  return (
    <States<Partial<SelectInputProps>>
      states={[
        {},
        { placeholder: "Enter amount" },
        { placeholder: "Enter amount", required: true },
        { placeholder: "Enter amount", disabled: true },
        { placeholder: "Enter amount", error: "Invalid amount" },
      ]}
    >
      <SelectInput
        label="Size"
        selectWidth={40}
        options={dimensionMetricOptions}
        onSelect={(option) => console.log(option)}
      />
    </States>
  )
}

export const Phone = () => {
  return (
    <States<Partial<SelectInputProps>>
      states={[
        {},
        { placeholder: "Enter amount" },
        { placeholder: "Enter amount", required: true },
        { placeholder: "Enter amount", disabled: true },
        { placeholder: "Enter amount", error: "Invalid amount" },
      ]}
    >
      <SelectInput
        options={countryOptions}
        onSelect={(option) => console.log(option)}
        label="Phone Number"
        type="tel"
        autoComplete="tel-national"
      />
    </States>
  )
}

export const Currency = () => {
  return (
    <States<Partial<SelectInputProps>>
      states={[
        {},
        { placeholder: "Enter amount" },
        { placeholder: "Enter amount", required: true },
        { placeholder: "Enter amount", disabled: true },
        { placeholder: "Enter amount", error: "Invalid amount" },
      ]}
    >
      <SelectInput
        label="Price"
        selectWidth={60}
        options={currencyOptions}
        onSelect={(option) => console.log(option)}
      />
    </States>
  )
}

export const WithCustomDropdownStyles = () => {
  return (
    <States<Partial<SelectInputProps>>
      states={[
        {
          dropdownProps: {
            minWidth: 400,
          },
          selectWidth: 60,
        },

        {
          placeholder: "Enter amount",
          selectWidth: 60,
          dropdownProps: {
            backgroundColor: "black10",
            p: 2,
            borderRadius: 1,
          },
        },
      ]}
    >
      <SelectInput
        options={currencyOptions}
        onSelect={(option) => console.log(option)}
        label="Currency"
      />
    </States>
  )
}

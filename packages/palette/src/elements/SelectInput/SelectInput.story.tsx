import React from "react"
import { SelectInput } from "./SelectInput"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: SelectInput,
  title: "Components/SelectInput",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A composite input component that combines a dropdown selector with a text input, commonly used for phone numbers with country codes.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLOCKLIST,
    },
  },
}

const countriesExample = [
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
  {
    text: "🇩🇿 +213",
    name: "Algeria",
    value: "dz",
    countryCode: "+213",
    flag: "🇩🇿",
  },
  {
    text: "🇦🇸 +1684",
    name: "American Samoa",
    value: "as",
    countryCode: "+1684",
    flag: "🇦🇸",
  },
  {
    text: "🇦🇩 +376",
    name: "Andorra",
    value: "ad",
    countryCode: "+376",
    flag: "🇦🇩",
  },
  {
    text: "🇦🇴 +244",
    name: "Angola",
    value: "ao",
    countryCode: "+244",
    flag: "🇦🇴",
  },
  {
    text: "🇦🇮 +1264",
    name: "Anguilla",
    value: "ai",
    countryCode: "+1264",
    flag: "🇦🇮",
  },
  {
    text: "🇦🇶 +672",
    name: "Antarctica",
    value: "aq",
    countryCode: "+672",
    flag: "🇦🇶",
  },
  {
    text: "🇦🇬 +1268",
    name: "Antigua and Barbuda",
    value: "ag",
    countryCode: "+1268",
    flag: "🇦🇬",
  },
  {
    text: "🇦🇷 +54",
    name: "Argentina",
    value: "ar",
    countryCode: "+54",
    flag: "🇦🇷",
  },
  {
    text: "🇦🇲 +374",
    name: "Armenia",
    value: "am",
    countryCode: "+374",
    flag: "🇦🇲",
  },
  {
    text: "🇦🇼 +297",
    name: "Aruba",
    value: "aw",
    countryCode: "+297",
    flag: "🇦🇼",
  },
  {
    text: "🇦🇺 +61",
    name: "Australia",
    value: "au",
    countryCode: "+61",
    flag: "🇦🇺",
  },
  {
    text: "🇦🇹 +43",
    name: "Austria",
    value: "at",
    countryCode: "+43",
    flag: "🇦🇹",
  },
  {
    text: "🇦🇿 +994",
    name: "Azerbaijan",
    value: "az",
    countryCode: "+994",
    flag: "🇦🇿",
  },
  {
    text: "🇧🇸 +1242",
    name: "Bahamas",
    value: "bs",
    countryCode: "+1242",
    flag: "🇧🇸",
  },
  {
    text: "🇧🇭 +973",
    name: "Bahrain",
    value: "bh",
    countryCode: "+973",
    flag: "🇧🇭",
  },
  {
    text: "🇧🇩 +880",
    name: "Bangladesh",
    value: "bd",
    countryCode: "+880",
    flag: "🇧🇩",
  },
  {
    text: "🇧🇧 +1246",
    name: "Barbados",
    value: "bb",
    countryCode: "+1246",
    flag: "🇧🇧",
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
    text: "🇧🇿 +501",
    name: "Belize",
    value: "bz",
    countryCode: "+501",
    flag: "🇧🇿",
  },
  {
    text: "🇧🇯 +229",
    name: "Benin",
    value: "bj",
    countryCode: "+229",
    flag: "🇧🇯",
  },
  {
    text: "🇧🇲 +1441",
    name: "Bermuda",
    value: "bm",
    countryCode: "+1441",
    flag: "🇧🇲",
  },
  {
    text: "🇧🇹 +975",
    name: "Bhutan",
    value: "bt",
    countryCode: "+975",
    flag: "🇧🇹",
  },
  {
    text: "🇧🇴 +591",
    name: "Bolivia",
    value: "bo",
    countryCode: "+591",
    flag: "🇧🇴",
  },
  {
    text: "🇧🇦 +387",
    name: "Bosnia and Herzegovina",
    value: "ba",
    countryCode: "+387",
    flag: "🇧🇦",
  },
]

export const Default = {
  args: {
    options: countriesExample,
    label: "Phone number",
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: true,
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic SelectInput with search enabled.",
      },
    },
  },
}

export const WithPlaceholder = {
  args: {
    options: countriesExample,
    label: "Phone number",
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: true,
    placeholder: "(000) 000 0000",
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "SelectInput with placeholder text.",
      },
    },
  },
}

export const WithoutSearch = {
  args: {
    options: countriesExample,
    label: "Phone number",
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: false,
    placeholder: "(000) 000 0000",
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "SelectInput without search functionality.",
      },
    },
  },
}

export const WithoutLabel = {
  args: {
    options: countriesExample,
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: true,
    placeholder: "(000) 000 0000",
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "SelectInput without a label.",
      },
    },
  },
}

export const Required = {
  args: {
    options: countriesExample,
    label: "Phone number",
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: true,
    placeholder: "(000) 000 0000",
    required: true,
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Required SelectInput with validation indicator.",
      },
    },
  },
}

export const Disabled = {
  args: {
    options: countriesExample,
    label: "Phone number",
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: true,
    placeholder: "(000) 000 0000",
    disabled: true,
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled SelectInput.",
      },
    },
  },
}

export const CustomSelectWidth = {
  args: {
    options: countriesExample,
    label: "Phone number",
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: true,
    placeholder: "(000) 000 0000",
    selectWidth: 100,
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "SelectInput with custom select dropdown width.",
      },
    },
  },
}

export const CustomOptionTextWidth = {
  args: {
    options: countriesExample,
    label: "Phone number",
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: true,
    placeholder: "(000) 000 0000",
    optionTextMinWidth: "20ch",
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "SelectInput with custom minimum width for option text.",
      },
    },
  },
}

export const WithError = {
  args: {
    options: countriesExample,
    label: "Phone number",
    type: "tel",
    autoComplete: "tel-national",
    enableSearch: true,
    placeholder: "(000) 000 0000",
    error: "Something is wrong",
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "SelectInput with error state.",
      },
    },
  },
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

export const CurrencySelect = {
  args: {
    options: currencyOptions,
    label: "Currency",
    selectWidth: 70,
    optionTextMinWidth: "5ch",
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Currency select input with custom width settings.",
      },
    },
  },
}

export const CurrencyWithPlaceholder = {
  args: {
    options: currencyOptions,
    label: "Currency",
    selectWidth: 70,
    optionTextMinWidth: "5ch",
    placeholder: "Currency",
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Currency select with placeholder text.",
      },
    },
  },
}

export const CurrencyWithSearch = {
  args: {
    options: currencyOptions,
    label: "Currency",
    selectWidth: 70,
    optionTextMinWidth: "5ch",
    placeholder: "Currency",
    enableSearch: true,
  },
  render: (args) => (
    <SelectInput {...args} onSelect={(option) => console.log(option)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Currency select with search enabled.",
      },
    },
  },
}

export const LoadingDisplayTest = {
  render: () => {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [countryCode, setCountryCode] = React.useState("ad")
    const [phoneNumber, setPhoneNumber] = React.useState("")

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 500)
      return () => clearTimeout(timer)
    }, [])

    return (
      <div>
        <div
          style={{
            display: isLoaded ? "grid" : "none",
            marginTop: "16px",
          }}
        >
          <SelectInput
            key="loading-test-phone-input"
            name="phoneNumber"
            placeholder="(000) 000 0000"
            options={countriesExample}
            onSelect={(option) => {
              console.log("Selected:", option)
              setCountryCode(option.value)
            }}
            dropdownValue={countryCode}
            label="Phone number"
            type="tel"
            autoComplete="tel-national"
            inputValue={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            data-testid="LoadingTestSelectInput"
            required
          />
        </div>
        {!isLoaded && <div>Loading phone input...</div>}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Test loading state for SelectInput.",
      },
    },
  },
}

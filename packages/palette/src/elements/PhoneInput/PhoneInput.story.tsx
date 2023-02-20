import React from "react"
import { States } from "storybook-states"
import { PhoneInput, PhoneInputProps } from "./PhoneInput"

export default {
  title: "Components/PhoneInput",
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

export const Default = () => {
  return (
    <States<Partial<PhoneInputProps>> states={[{}]}>
      <PhoneInput
        options={countriesExample}
        onSelect={(option) => console.log(option)}
      />
    </States>
  )
}

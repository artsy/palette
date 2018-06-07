import React from "react"
import { ThemeProvider as ThemeP } from "styled-components"

export const Theme = {
  // https://www.notion.so/artsy/Color-a0c24896daf8433d9409aee2146ac267
  colors: {
    text: "#000",
    black100: "#000",
    black80: "#333",
    black60: "#666",
    black30: "#C2C2C2",
    black10: "#E5E5E5",
    black5: "#F8F8F8",
    purple100: "#6E1EFF",
    purple30: "#D3BBFF",
    green100: "#0EDA83",
    red100: "#F7625A",
    yellow100: "#F1AF1B",
    yellow30: "#FAE7BA",
    yellow10: "#FDF7E8",
    white100: "#FFF",
  },

  // https://www.notion.so/artsy/Spacing-93eeaed9fdf9480099fec7094fd1b9f3
  space: [0, 3, 5, 10, 20, 30, 40, 60, 90, 120, 180],

  fontFamily: {
    unica: {
      regular: "Unica77LL-Regular",
      italic: "Unica77LL-Italic",
      medium: "Unica77LL-Medium",
      mediumItalic: "Unica77LL-MediumItalic",
    },
    avantgarde: {
      regular: "AvantGardeGothicITC",
    },
    garamond: {
      regular: "AGaramondPro-Regular",
      italic: "AGaramondPro-Italic",
      semibold: "AGaramondPro-Semibold",
    },
  },

  typeSizes: {
    sans1: {
      fontSize: 10,
      lineHeight: 14,
    },
    sans2: {
      fontSize: 12,
      lineHeight: 16,
    },
    sans3: {
      fontSize: 14,
      lineHeight: 24,
    },
    serif1: {
      fontSize: 12,
      lineHeight: 16,
    },
    serif2: {
      fontSize: 14,
      lineHeight: 18,
    },
    display2: {
      fontSize: 10,
      lineHeight: 12,
    },
    display3t: {
      fontSize: 12,
      lineHeight: 16,
    },
    display4t: {
      fontSize: 14,
      lineHeight: 18,
    },
    display5t: {
      fontSize: 16,
      lineHeight: 20,
    },
    display6: {
      fontSize: 18,
      lineHeight: 22,
    },
  },

  borders: [0, "1px #E5E5E5 solid"],
}

export const ThemeProvider = props => (
  <ThemeP theme={Theme}>{props.children}</ThemeP>
)

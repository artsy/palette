import { style } from "@vanilla-extract/css"
import { layers } from "../../styles/layers.css"

export const separator = style({
  "@layer": {
    [layers.components]: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderBottomWidth: 0,
      backgroundColor: "transparent",
      borderColor: "currentColor",
      margin: 0,
    },
  },
})

import { style } from "@vanilla-extract/css"
import { layers } from "./layers.css"

export const boxSizingReset = style({
  "@layer": {
    [layers.reset]: {
      boxSizing: "border-box",
    },
  },
})

import React from "react"
import { States } from "storybook-states"
import { Label, LabelProps, LabelVariant, LABEL_VARIANTS } from "./Label"
import { Box } from "../Box"

export default {
  title: "Components/Label",
}

export const Default = () => {
  return (
    <States<Partial<LabelProps>>
      states={Object.keys(LABEL_VARIANTS).map((variant) => ({
        variant: variant as LabelVariant,
      }))}
    >
      <Label>Example</Label>
    </States>
  )
}

export const OverflowEllipsis = () => {
  return (
    <States<Partial<LabelProps>>
      states={Object.keys(LABEL_VARIANTS).map((variant) => ({
        variant: variant as LabelVariant,
      }))}
    >
      {(props) => {
        return (
          <Box width={75} overflow="hidden">
            <Label {...props}>Longer Example</Label>
          </Box>
        )
      }}
    </States>
  )
}

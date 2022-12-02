import { THEME } from "@artsy/palette-tokens/dist/themes/v3"
import React from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { Spacer, SpacerProps } from "./Spacer"

export default {
  title: "Components/Spacer",
  component: Spacer,
}

const VALUES = Object.keys(THEME.space)
  .sort((a, b) => {
    return Number(a) - Number(b)
  })
  .map((value) => Number(value))

export const Default = () => {
  return (
    <States<SpacerProps>
      states={[
        ...VALUES.map((value) => ({ y: value })),
        ...VALUES.map((value) => ({ x: value })),
      ]}
    >
      {({ x, y }) => {
        if (y) {
          return (
            <_Spacer>
              <Box height={2} width={100} bg="black60" />

              <Spacer y={y} />

              <Box height={2} width={100} bg="black60" />
            </_Spacer>
          )
        }

        return (
          <_Spacer>
            <Box display="flex">
              <Box height={100} width={2} bg="black60" />

              <Spacer x={x} />

              <Box height={100} width={2} bg="black60" />
            </Box>
          </_Spacer>
        )
      }}
    </States>
  )
}

const _Spacer = Box
_Spacer.displayName = "Spacer"

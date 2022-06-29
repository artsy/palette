import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { ModalBase } from "../Modal"
import { Range, RangeProps } from "./Range"
import { LabeledInput } from "../LabeledInput"
import { Flex } from "../Flex"
import { Spacer } from "../.."
import { Text } from "../Text"

export default {
  title: "Components/Range",
}

export const Default = () => {
  return (
    <States<Partial<RangeProps>>
      states={[{}, { value: [1100, 3450] }, { step: 1, max: 10 }]}
    >
      <Range
        min={0}
        max={5000}
        step={10}
        onChange={action("onChange")}
        ariaLabels={["Min price", "Max price"]}
      />
    </States>
  )
}

export const WithinModal = () => {
  return (
    <ModalBase
      width="100%"
      height="100%"
      dialogProps={{ width: 400, height: 400, bg: "black5" }}
    >
      <Box width={400} height={400}>
        <Range min={0} max={5000} step={10} onChange={action("onChange")} />
      </Box>
    </ModalBase>
  )
}

export const InContext = () => {
  const [[min, max], setMinMax] = useState<number[]>([0, 50000])

  return (
    <Box p={2} border="1px solid" borderColor="black10" width={375}>
      <Flex>
        <LabeledInput title="Min" label="$USD" flex={1} value={min} />

        <Spacer ml={1} />

        <LabeledInput title="Max" label="$USD" flex={1} value={max} />
      </Flex>

      <Spacer mt={1} />

      <Range
        min={0}
        max={50000}
        step={100}
        value={[min, max]}
        onChange={setMinMax}
      />

      <Spacer mt={0.5} />

      <Flex justifyContent="space-between">
        <Text variant="xs">$0</Text>

        <Text variant="xs">$50000+</Text>
      </Flex>
    </Box>
  )
}

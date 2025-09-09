import { fn } from "@storybook/test"
import React, { useState } from "react"
import { Box } from "../Box"
import { ModalBase } from "../Modal"
import { Range } from "./Range"
import { LabeledInput } from "../LabeledInput"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { Drawer } from "../Drawer"
import { Button } from "../Button"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: Range,
  title: "Components/Range",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A dual-handle range slider component for selecting value ranges with customizable min/max/step values.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

export const Default = {
  args: {
    min: 0,
    max: 5000,
    step: 10,
    onChange: fn(),
    ariaLabels: ["Min price", "Max price"],
  },
  parameters: {
    docs: {
      description: {
        story: "Basic range slider with default settings.",
      },
    },
  },
}

export const WithInitialValue = {
  args: {
    min: 0,
    max: 5000,
    step: 10,
    value: [1100, 3450],
    onChange: fn(),
    ariaLabels: ["Min price", "Max price"],
  },
  parameters: {
    docs: {
      description: {
        story: "Range slider with pre-selected values.",
      },
    },
  },
}

export const SmallRange = {
  args: {
    min: 0,
    max: 10,
    step: 1,
    onChange: fn(),
    ariaLabels: ["Min value", "Max value"],
  },
  parameters: {
    docs: {
      description: {
        story: "Range slider with small numeric range and step of 1.",
      },
    },
  },
}

export const WithinModal = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        {open && (
          <ModalBase
            width="100%"
            height="100%"
            dialogProps={{ width: 400, height: 400, bg: "mono5" }}
            onClose={() => setOpen(false)}
          >
            <Box width={400} height={400}>
              <Range min={0} max={5000} step={10} onChange={fn()} />
            </Box>
          </ModalBase>
        )}
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Range slider displayed within a modal dialog.",
      },
    },
  },
}

export const WithinDrawer = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true)
          }}
        >
          Open
        </Button>
        <Drawer
          open={open}
          onClose={() => {
            setOpen(false)
          }}
        >
          <Box width={400} p={2}>
            <Range min={0} max={5000} step={10} onChange={fn()} />
          </Box>
        </Drawer>
      </>
    )
  },
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story: "Range slider displayed within a drawer component.",
      },
    },
  },
}

export const InContext = {
  render: () => {
    const [[min, max], setMinMax] = useState<number[]>([0, 50000])

    return (
      <Box p={2} border="1px solid" borderColor="mono10" width={375}>
        <Flex>
          <LabeledInput title="Min" label="$USD" flex={1} value={min} />
          <Spacer x={1} />
          <LabeledInput title="Max" label="$USD" flex={1} value={max} />
        </Flex>
        <Spacer y={1} />
        <Range
          min={0}
          max={50000}
          step={100}
          value={[min, max]}
          onChange={setMinMax}
        />
        <Spacer y={0.5} />
        <Flex justifyContent="space-between">
          <Text variant="xs">$0</Text>
          <Text variant="xs">$50000+</Text>
        </Flex>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Range slider integrated with input fields showing real-world price filtering usage.",
      },
    },
  },
}

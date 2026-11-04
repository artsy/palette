import React from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { Theme } from "../../Theme"
import { Separator } from "./Separator"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Separator,
  title: "Components/Separator",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal line separator component with customizable colors and styling.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLOCKLIST,
    },
  },
}

export const Default = {
  args: {
    as: "hr",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic horizontal line separator.",
      },
    },
  },
}

export const WithColor = {
  args: {
    as: "hr",
    color: "mono30",
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom color.",
      },
    },
  },
}

export const WithBorderColor = {
  args: {
    as: "hr",
    borderColor: "red100",
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom border color.",
      },
    },
  },
}

export const WithSpacing = {
  args: {
    as: "hr",
    borderWidth: 5,
    my: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom width and vertical spacing.",
      },
    },
  },
}

export const ResponsiveArray = {
  args: {
    as: "hr",
    my: [1, 2, 4],
    width: ["50%", "75%", "100%"],
  },
  render: (args) => {
    return (
      <Box>
        <Text variant="sm">Above</Text>
        <Separator {...args} />
        <Text variant="sm">Below</Text>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive array syntax for vertical margin and width. Values change at the sm and md breakpoints.",
      },
    },
  },
}

export const ObjectSyntax = {
  args: {
    as: "hr",
    my: { _: 1, sm: 2, md: 4 },
    width: { _: "50%", sm: "75%", md: "100%" },
  },
  render: (args) => {
    return (
      <Box>
        <Text variant="sm">Above</Text>
        <Separator {...args} />
        <Text variant="sm">Below</Text>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive object syntax for vertical margin and width, keyed by breakpoint name.",
      },
    },
  },
}

const ARBITRARY_MARGIN_CASES = [
  { label: "Margin 31px", margin: "31px" },
  { label: "Margin -1 (overlaps)", margin: -1 },
  { label: "Margin 0 (flush)", margin: 0 },
]

export const ArbitraryValues = {
  render: () => {
    return (
      <Box>
        {ARBITRARY_MARGIN_CASES.map(({ label, margin }) => {
          return (
            <Box key={label} mb={4}>
              <Box height={60} border="1px solid" borderColor="red100">
                <Text variant="sm">{label}</Text>
              </Box>
              <Separator my={margin} color="mono100" />
              <Box height={60} border="1px solid" borderColor="blue100" />
            </Box>
          )
        })}
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Vertical margins outside the usual scale on a black separator between a red and a blue outlined box: a pixel string (31px gap), a negative scale value (-1, which pulls both boxes over the line) and zero (flush).",
      },
    },
  },
}

export const AsHr = {
  args: {
    as: "hr",
  },
  render: (args) => {
    return (
      <Box>
        <Text variant="sm">Above</Text>
        <Separator {...args} my={2} />
        <Text variant="sm">Below</Text>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Rendered as an hr element. The browser's default hr height and margins must not show through.",
      },
    },
  },
}

export const CustomBorderColor = {
  args: {
    as: "hr",
    borderColor: "blue100",
  },
  render: (args) => {
    return (
      <Box>
        <Text variant="sm">Above</Text>
        <Separator {...args} my={2} />
        <Text variant="sm">Below</Text>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "The borderColor prop overrides the default color.",
      },
    },
  },
}

export const DarkTheme = {
  args: {
    as: "hr",
  },
  render: (args) => {
    return (
      <Theme theme="dark">
        <Box bg="mono0" color="mono100" p={2}>
          <Text variant="sm">Above</Text>
          <Separator {...args} my={2} />
          <Text variant="sm">Below</Text>
        </Box>
      </Theme>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Separator inside the dark theme.",
      },
    },
  },
}

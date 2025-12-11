import React, { useEffect, useState } from "react"
import { Position } from "../../utils"
import { Box } from "../Box"
import { Button } from "../Button"
import { Text } from "../Text"
import { Dropdown } from "./Dropdown"
import { Clickable } from "../Clickable"
import { Flex } from "../Flex"
import { Pill } from "../Pill"
import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"
import { Spacer } from "../Spacer"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Dropdown,
  title: "Components/Dropdown",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A dropdown component that renders content in a positioned overlay with various placement options and interaction modes.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLOCKLIST,
    },
  },
}

export const Default = {
  args: {
    placement: "bottom",
    dropdown: (
      <Box width={300} p={2}>
        <Text as="a" display="block" variant="sm" href="#">
          One
        </Text>
        <Text as="a" display="block" variant="sm" href="#">
          Two
        </Text>
        <Text as="a" display="block" variant="sm" href="#">
          Three
        </Text>
      </Box>
    ),
    children: ({ anchorRef, anchorProps }) => (
      <Box textAlign="center">
        <Button
          ref={anchorRef}
          variant="secondaryBlack"
          size="small"
          {...anchorProps}
        >
          Hover to display dropdown
        </Button>
      </Box>
    ),
  },
  parameters: { chromatic: { disable: true } },
}

export const KeepInDOM = {
  args: {
    placement: "bottom",
    keepInDOM: true,
    dropdown: (
      <Text p={2} variant="xs">
        Content remains in DOM
      </Text>
    ),
    children: ({ anchorRef, anchorProps }) => (
      <Button
        ref={anchorRef}
        variant="secondaryBlack"
        size="small"
        {...anchorProps}
      >
        Hover to display dropdown
      </Button>
    ),
  },
  parameters: { chromatic: { disable: true } },
}

export const ChangeDimensions = {
  render: () => {
    const [height, setHeight] = useState(10)

    useEffect(() => {
      setInterval(() => {
        setHeight(Math.floor(Math.random() * 100))
      }, 1000)
    }, [])

    return (
      <Dropdown
        placement="bottom"
        dropdown={<Box height={height} width={300} />}
      >
        {({ anchorRef, anchorProps }) => {
          return (
            <Button
              ref={anchorRef}
              variant="secondaryBlack"
              size="small"
              {...anchorProps}
            >
              Hover to display dropdown
            </Button>
          )
        }}
      </Dropdown>
    )
  },
}

export const FocusOrder = {
  render: () => {
    const dropdown = (
      <Text variant="sm-display">
        <Clickable display="block" width="100%" py={1} px={2}>
          First
        </Clickable>
        <Clickable display="block" width="100%" py={1} px={2}>
          Second
        </Clickable>
        <Clickable display="block" width="100%" py={1} px={2}>
          Third
        </Clickable>
      </Text>
    )

    return (
      <Flex>
        <Dropdown dropdown={dropdown} placement="bottom">
          {({ anchorRef, anchorProps }) => {
            return (
              <Button
                ref={anchorRef}
                variant="secondaryBlack"
                size="small"
                mr={1}
                {...anchorProps}
              >
                First Parent
              </Button>
            )
          }}
        </Dropdown>

        <Dropdown dropdown={dropdown} placement="bottom">
          {({ anchorRef, anchorProps }) => {
            return (
              <Button
                ref={anchorRef}
                variant="secondaryBlack"
                size="small"
                {...anchorProps}
              >
                Second Parent
              </Button>
            )
          }}
        </Dropdown>
      </Flex>
    )
  },
}

export const OpenDropdownByClick = {
  render: () => {
    const dropdown = (
      <Text variant="sm-display">
        <Clickable display="block" width="100%" py={1} px={2}>
          First
        </Clickable>
        <Clickable display="block" width="100%" py={1} px={2}>
          Second
        </Clickable>
        <Clickable display="block" width="100%" py={1} px={2}>
          Third
        </Clickable>
      </Text>
    )

    return (
      <Flex>
        <Dropdown dropdown={dropdown} openDropdownByClick>
          {({ anchorRef, anchorProps }) => {
            return (
              <Button
                ref={anchorRef}
                variant="secondaryBlack"
                size="small"
                mr={1}
                {...anchorProps}
              >
                Click to display dropdown
              </Button>
            )
          }}
        </Dropdown>
      </Flex>
    )
  },
}

export const FilterExample = {
  render: () => {
    return (
      <Dropdown
        dropdown={
          <Box p={1}>
            <Text variant="xs">Example content</Text>
          </Box>
        }
        placement="bottom-start"
        openDropdownByClick
      >
        {({ anchorRef, anchorProps }) => {
          return (
            <Pill
              ref={anchorRef as any}
              Icon={ChevronSmallDownIcon}
              iconPosition="right"
              {...anchorProps}
            >
              Example
            </Pill>
          )
        }}
      </Dropdown>
    )
  },
}

export const OverflowingContent = {
  render: () => {
    const dropdown = (
      <Text variant="sm-display">
        {new Array(100).fill(null).map((_, i) => (
          <Clickable key={i} display="block" width="100%" py={1} px={2}>
            Item {i}
          </Clickable>
        ))}
      </Text>
    )

    const [placement, setPlacement] = useState<Position>("bottom")

    return (
      <>
        <Box height={200} bg="mono10" />

        <Spacer y={2} />

        {["bottom", "top", "left", "right"].map((p) => {
          return (
            <Pill
              key={p}
              size="small"
              mr={1}
              mb={1}
              selected={placement === p}
              onClick={() => setPlacement(p as Position)}
            >
              {p}
            </Pill>
          )
        })}

        <Spacer y={2} />

        <Flex alignItems="center" justifyContent="center">
          <Dropdown
            dropdown={dropdown}
            openDropdownByClick
            placement={placement}
          >
            {({ anchorRef, anchorProps }) => {
              return (
                <Button
                  ref={anchorRef}
                  variant="secondaryBlack"
                  size="small"
                  {...anchorProps}
                >
                  Click to display dropdown
                </Button>
              )
            }}
          </Dropdown>
        </Flex>

        <Spacer y={2} />

        <Box height={5000} bg="mono10" />
      </>
    )
  },
}

export const DisabledTransition = {
  render: () => {
    return (
      <Flex>
        {[1, 2, 3].map((num) => {
          const dropdown = (
            <Text
              variant="sm-display"
              width="100vw"
              bg={`color-b${num}00`}
              p={2}
            >
              <Clickable display="block" width="100%" py={1} px={2}>
                Panel {num}: First Item
              </Clickable>
              <Clickable display="block" width="100%" py={1} px={2}>
                Panel {num}: Second Item
              </Clickable>
              <Clickable display="block" width="100%" py={1} px={2}>
                Panel {num}: Third Item
              </Clickable>
            </Text>
          )

          return (
            <Dropdown
              key={num}
              dropdown={dropdown}
              transition={false}
              placement="bottom"
            >
              {({ anchorRef, anchorProps }) => {
                return (
                  <Button
                    ref={anchorRef}
                    variant="secondaryBlack"
                    size="small"
                    mr={1}
                    {...anchorProps}
                  >
                    Hover for dropdown {num}
                  </Button>
                )
              }}
            </Dropdown>
          )
        })}
      </Flex>
    )
  },
}

export const ReturnFocusDefault = {
  args: {
    placement: "bottom",
    openDropdownByClick: true,
    dropdown: (
      <Box width={200} p={2}>
        <Text variant="sm" mb={1}>
          Try this:
        </Text>
        <Text variant="xs" color="mono60" mb={2}>
          1. Click button to open dropdown
        </Text>
        <Text variant="xs" color="mono60" mb={2}>
          2. Press Tab to focus on links
        </Text>
        <Text variant="xs" color="mono60" mb={2}>
          3. Press Escape to close
        </Text>
        <Text variant="xs" color="mono60" mb={2}>
          4. Notice focus returns to button
        </Text>
        <Text as="a" display="block" variant="sm" href="#" tabIndex={0} mb={1}>
          Focusable Link 1
        </Text>
        <Text as="a" display="block" variant="sm" href="#" tabIndex={0}>
          Focusable Link 2
        </Text>
      </Box>
    ),
    children: ({ anchorRef, anchorProps }) => (
      <Button
        ref={anchorRef}
        variant="secondaryBlack"
        size="small"
        {...anchorProps}
      >
        Click me (returnFocus=true)
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default behavior with `returnFocus=true`. When you close the dropdown (Escape key or click outside), focus returns to the trigger button for better accessibility.",
      },
    },
    chromatic: { disable: true },
  },
}

export const ReturnFocusDisabled = {
  args: {
    placement: "bottom",
    openDropdownByClick: true,
    returnFocus: false,
    dropdown: (
      <Box width={200} p={2}>
        <Text variant="sm" mb={1}>
          Try this:
        </Text>
        <Text variant="xs" color="mono60" mb={2}>
          1. Click button to open dropdown
        </Text>
        <Text variant="xs" color="mono60" mb={2}>
          2. Press Tab to focus on button
        </Text>
        <Text variant="xs" color="mono60" mb={2}>
          3. Press Escape to close
        </Text>
        <Text variant="xs" color="mono60" mb={2}>
          4. Focus stays where it was
        </Text>
        <Button
          variant="primaryBlack"
          size="small"
          onClick={() => {
            alert("Modal opened! Focus should not return to dropdown trigger.")
          }}
        >
          Open Modal
        </Button>
      </Box>
    ),
    children: ({ anchorRef, anchorProps }) => (
      <Button
        ref={anchorRef}
        variant="secondaryBlack"
        size="small"
        {...anchorProps}
      >
        Click me (returnFocus=false)
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `returnFocus=false`, focus does not return to the trigger when the dropdown closes. This is useful when the dropdown opens a modal or navigates to another page, where returning focus would be disruptive.",
      },
    },
    chromatic: { disable: true },
  },
}

export const CustomDelay = {
  render: () => {
    const dropdown = (
      <Box width={250} p={2}>
        <Text as="a" display="block" variant="sm" href="#">
          One
        </Text>
        <Text as="a" display="block" variant="sm" href="#">
          Two
        </Text>
        <Text as="a" display="block" variant="sm" href="#">
          Three
        </Text>
      </Box>
    )

    return (
      <Flex gap={2}>
        <Dropdown dropdown={dropdown} placement="bottom" delay={0}>
          {({ anchorRef, anchorProps }) => {
            return (
              <Button
                ref={anchorRef}
                variant="secondaryBlack"
                size="small"
                {...anchorProps}
              >
                No delay (default)
              </Button>
            )
          }}
        </Dropdown>

        <Dropdown dropdown={dropdown} placement="bottom" delay={500}>
          {({ anchorRef, anchorProps }) => {
            return (
              <Button
                ref={anchorRef}
                variant="primaryBlack"
                size="small"
                {...anchorProps}
              >
                500ms delay
              </Button>
            )
          }}
        </Dropdown>

        <Dropdown dropdown={dropdown} placement="bottom" delay={1000}>
          {({ anchorRef, anchorProps }) => {
            return (
              <Button
                ref={anchorRef}
                variant="tertiary"
                size="small"
                {...anchorProps}
              >
                1000ms delay
              </Button>
            )
          }}
        </Dropdown>
      </Flex>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `delay` prop allows you to configure how long to wait before showing the dropdown on hover. This is useful for preventing accidental triggers. The delay is ignored when `openDropdownByClick` is true.",
      },
    },
    chromatic: { disable: true },
  },
}

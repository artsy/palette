import React, { useEffect, useState } from "react"
import { States } from "storybook-states"
import { Position, POSITION } from "../../utils"
import { Box } from "../Box"
import { Button } from "../Button"
import { Text } from "../Text"
import { Dropdown, DropdownProps } from "./Dropdown"
import { Clickable } from "../Clickable"
import { Flex } from "../Flex"
import { Pill } from "../Pill"
import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"
import { Spacer } from "../Spacer"

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
      include: [
        "placement",
        "visible",
        "keepInDOM",
        "openDropdownByClick",
        "transition",
        "dropdown",
        "children",
      ],
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

export const AllPlacements = {
  render: () => {
    return (
      <States<Partial<DropdownProps>>
        states={Object.keys(POSITION).map((placement) => ({
          placement: placement as Position,
        }))}
      >
        <Dropdown
          placement="bottom"
          visible
          dropdown={
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
          }
        >
          {({ anchorRef, anchorProps }) => {
            return (
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
            )
          }}
        </Dropdown>
      </States>
    )
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

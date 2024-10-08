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

export default {
  title: "Components/Dropdown",
}

export const Default = () => {
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
}

Default.story = {
  parameters: { chromatic: { disable: true } },
}

export const KeepInDOM = () => {
  return (
    <Dropdown
      placement="bottom"
      keepInDOM
      dropdown={
        <Text p={2} variant="xs">
          Content remains in DOM
        </Text>
      }
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
}

KeepInDOM.story = {
  parameters: { chromatic: { disable: true } },
}

export const ChangeDimensions = () => {
  const [height, setHeight] = useState(10)

  useEffect(() => {
    setInterval(() => {
      setHeight(Math.floor(Math.random() * 100))
    }, 1000)
  }, [])

  return (
    <Dropdown placement="top" dropdown={<Box height={height} width={300} />}>
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
}

export const FocusOrder = () => {
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
      <Dropdown dropdown={dropdown}>
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

      <Dropdown dropdown={dropdown}>
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
}

export const OpenDropdownByClick = () => {
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
}

export const FilterExample = () => {
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
}

export const OverflowingContent = () => {
  const dropdown = (
    <Text variant="sm-display">
      {new Array(100).fill(null).map((_, i) => (
        <Clickable key={i} display="block" width="100%" py={1} px={2}>
          Item {i}
        </Clickable>
      ))}
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
}

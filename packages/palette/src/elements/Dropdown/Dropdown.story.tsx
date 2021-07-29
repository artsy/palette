import React from "react"
import { States } from "storybook-states"
import { Position, POSITION } from "../../utils"
import { Box } from "../Box"
import { Button } from "../Button"
import { Text } from "../Text"
import { Dropdown, DropdownProps } from "./Dropdown"

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
            <Text
              as="a"
              display="block"
              variant="sm"
              // @ts-ignore
              href="#"
            >
              One
            </Text>

            <Text
              as="a"
              display="block"
              variant="sm"
              // @ts-ignore
              href="#"
            >
              Two
            </Text>

            <Text
              as="a"
              display="block"
              variant="sm"
              // @ts-ignore
              href="#"
            >
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
                variant="secondaryOutline"
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
            variant="secondaryOutline"
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

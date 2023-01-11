import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { HelpIcon } from "../../svgs"
import { Position, POSITION } from "../../utils/usePosition"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import { Tooltip, TooltipProps } from "./Tooltip"

const CONTENT = "Lorem ipsum dolor sit amet consectetur adipisicing elit?"

export default {
  title: "Components/Tooltip",
}

export const Default = () => {
  return (
    <States<Partial<TooltipProps>>
      states={[
        { placement: "top-start" },
        { placement: "bottom", width: 600 },
        { placement: "bottom", visible: true },
        { variant: "defaultDark", placement: "bottom", visible: true },
      ]}
    >
      <Tooltip content={CONTENT}>
        <Text
          variant="xs"
          textAlign="center"
          p={1}
          bg="black100"
          color="white100"
        >
          This text has a tooltip
        </Text>
      </Tooltip>
    </States>
  )
}

export const _Clickable = () => {
  return (
    <States<Partial<TooltipProps>> states={[{}]}>
      <Tooltip content={CONTENT}>
        <Clickable onClick={action("onClick")}>
          <Text
            variant="xs"
            textAlign="center"
            p={1}
            bg="black100"
            color="white100"
          >
            This text has a tooltip and is clickable
          </Text>
        </Clickable>
      </Tooltip>
    </States>
  )
}

_Clickable.story = {
  parameters: { chromatic: { disable: true } },
}

export const Placement = () => {
  return (
    <States<Partial<TooltipProps>>
      states={Object.keys(POSITION).map((placement) => ({
        placement: placement as Position,
      }))}
    >
      {(props) => {
        return (
          <Tooltip content={JSON.stringify(props)} visible {...props}>
            <Text
              variant="xs"
              textAlign="center"
              p={1}
              maxWidth="50%"
              mx="auto"
              bg="black100"
              color="white100"
            >
              {JSON.stringify(props)}
            </Text>
          </Tooltip>
        )
      }}
    </States>
  )
}

export const IconExample = () => {
  return (
    <Text variant="xs" display="flex" alignItems="center" lineHeight={1}>
      Hover (or focus) the icon to display the tooltip.{" "}
      <Tooltip content={CONTENT} placement="bottom">
        {/* Icons don't forwardRefs so we have to wrap in a span */}
        <Box as="span" style={{ lineHeight: 0 }}>
          <HelpIcon ml={0.5} />
        </Box>
      </Tooltip>
    </Text>
  )
}

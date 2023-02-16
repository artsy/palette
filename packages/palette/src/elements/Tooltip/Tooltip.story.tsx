import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { HelpIcon } from "../../svgs"
import { Position, POSITION } from "../../utils/usePosition"
import { Box } from "../Box"
import { Button } from "../Button"
import { Clickable } from "../Clickable"
import { Input } from "../Input"
import { Spacer } from "../Spacer"
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
        { placement: "bottom", visible: true, pointer: true },
        {
          variant: "defaultDark",
          placement: "bottom",
          visible: true,
          pointer: true,
        },
        {
          visible: false,
          children: <>This text has a tooltip that never displays</>,
        },
        {
          visible: true,
          textAlign: "center",
        },
        {
          visible: true,
          pointer: true,
          offset: -10,
        },
      ]}
    >
      {({ children, ...rest }) => (
        <Tooltip content={CONTENT} {...rest}>
          <Text
            variant="xs"
            textAlign="center"
            p={1}
            bg="black100"
            color="white100"
          >
            {children ?? "This text has a tooltip"}
          </Text>
        </Tooltip>
      )}
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
          <Tooltip
            content={JSON.stringify(props)}
            variant="defaultDark"
            pointer
            visible
            {...props}
          >
            <Text
              variant="xs"
              textAlign="center"
              p={1}
              maxWidth="50%"
              mx="auto"
              bg="black10"
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

export const ExternalControl = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Tooltip
        content={CONTENT}
        visible={visible}
        pointer
        variant="defaultDark"
      >
        <Button
          variant="secondaryBlack"
          onClick={() => {
            setVisible((visible) => !visible)
          }}
        >
          {visible ? "Click to hide tooltip" : "Click to show tooltip"}
        </Button>
      </Tooltip>
    </>
  )
}

export const PointerCentering = () => {
  const [placement, setPlacement] = useState<Position>("top")
  const [size, setSize] = useState(50)

  return (
    <>
      {Object.keys(POSITION).map((placement) => {
        return (
          <Button
            key={placement}
            mr={1}
            mb={1}
            variant="secondaryBlack"
            size="small"
            onMouseOver={() => {
              setPlacement(placement as Position)
            }}
          >
            {placement}
          </Button>
        )
      })}

      <Input
        type="range"
        min={0}
        max={200}
        value={size}
        onChange={(e) => {
          setSize(parseInt(e.target.value))
        }}
      />

      <Spacer y={12} />

      <Tooltip
        content={CONTENT}
        pointer
        visible
        variant="defaultDark"
        placement={placement}
      >
        <Box
          bg="black10"
          width={size}
          height={size}
          mx="auto"
          position="relative"
        >
          <Box
            height="1px"
            bg="red100"
            width="100%"
            position="absolute"
            top="50%"
            mt="-0.5px"
          />

          <Box
            height="100%"
            width="1px"
            bg="red100"
            position="absolute"
            left="50%"
            ml="-0.5px"
          />
        </Box>
      </Tooltip>
    </>
  )
}

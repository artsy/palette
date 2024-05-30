import React, { useState } from "react"
import { Clickable, ClickableProps } from "../Clickable"
import { Box, splitBoxProps } from "../Box"
import { Text } from "../Text"
import { isText } from "../../helpers"
import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import styled from "styled-components"

export interface DisclosureProps extends ClickableProps {
  label?: string | JSX.Element
  expanded?: boolean
  children: React.ReactNode
  onToggle?: (isExpanded: boolean) => void
}

export const Disclosure: React.FC<DisclosureProps> = ({
  children,
  expanded: _expanded,
  label,
  onClick,
  onToggle,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(_expanded)
  const [boxProps, clickableProps] = splitBoxProps(rest)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setExpanded((prevExpanded) => {
      const isExpanded = !prevExpanded
      onToggle?.(isExpanded)
      return isExpanded
    })

    onClick?.(event)
  }

  return (
    <Box {...boxProps}>
      <Button
        alignItems="center"
        aria-expanded={expanded}
        display="flex"
        gap={1}
        onClick={handleClick}
        width="100%"
        {...clickableProps}
      >
        <Box>{isText(label) ? <Text variant="xs">{label}</Text> : label}</Box>

        {expanded ? (
          <ChevronUpIcon width={14} height={14} aria-hidden="true" />
        ) : (
          <ChevronDownIcon width={14} height={14} aria-hidden="true" />
        )}
      </Button>

      {expanded &&
        (typeof children === "function"
          ? children({ setExpanded, expanded })
          : children)}
    </Box>
  )
}

const Button = styled(Clickable)`
  &:hover > * {
    text-decoration: underline;
  }
`

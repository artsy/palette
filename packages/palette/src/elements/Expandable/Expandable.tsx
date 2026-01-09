import React, { useEffect, useState } from "react"
import { isText } from "../../helpers/isText"
import ChevronUpIcon from "@artsy/icons/ChevronUpIcon"
import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import { Box, splitBoxProps } from "../Box"
import { Clickable, ClickableProps } from "../Clickable"
import { Flex } from "../Flex"
import { Text } from "../Text"

type ChildrenFunction = (props: {
  setExpanded: React.Dispatch<React.SetStateAction<boolean | undefined>>
  expanded: boolean
}) => React.ReactNode

export interface ExpandableProps extends Omit<ClickableProps, "children"> {
  label?: string | JSX.Element
  expanded?: boolean
  children: React.ReactNode | ChildrenFunction
  onToggle?: (isExpanded: boolean) => void
}

/**
 * A toggleable component used to show / hide content
 */
export const Expandable = ({
  label,
  expanded: expandedProp,
  children,
  disabled,
  onClick,
  onToggle,
  borderColor = "mono60",
  ...rest
}: ExpandableProps) => {
  const [expanded, setExpanded] = useState(expandedProp)

  useEffect(() => {
    if (expandedProp !== undefined) {
      setExpanded(expandedProp)
    }
  }, [expandedProp])

  const [boxProps, clickableProps] = splitBoxProps(rest)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setExpanded((prevExpanded) => {
      const isExpanded = !prevExpanded
      onToggle && onToggle(isExpanded)
      return isExpanded
    })

    onClick && onClick(event)
  }

  return (
    <Box {...boxProps}>
      <Clickable
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderTop="1px solid"
        borderColor={borderColor}
        pt={2}
        pb={1}
        disabled={disabled}
        aria-expanded={expanded}
        onClick={handleClick}
        {...clickableProps}
      >
        <Flex flex={1} display="flex" alignItems="center">
          {isText(label) ? <Text variant="sm-display">{label}</Text> : label}
        </Flex>

        {!disabled && (
          <>
            {expanded ? (
              <ChevronUpIcon
                width={14}
                height={14}
                ml={1}
                mr={1}
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                width={14}
                height={14}
                ml={1}
                mr={1}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </Clickable>

      {expanded &&
        (typeof children === "function"
          ? (children as ChildrenFunction)({ setExpanded, expanded })
          : children)}
    </Box>
  )
}

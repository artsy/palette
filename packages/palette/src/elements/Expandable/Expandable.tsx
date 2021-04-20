import React, { useState } from "react"
import { isText } from "../../helpers/isText"
import { ChevronIcon } from "../../svgs"
import { useThemeConfig } from "../../Theme"
import { Box, splitBoxProps } from "../Box"
import { Clickable, ClickableProps } from "../Clickable"
import { Flex } from "../Flex"
import { Text, TextProps } from "../Text"

export interface ExpandableProps extends ClickableProps {
  label?: string | JSX.Element
  expanded?: boolean
  children: React.ReactNode
}

/**
 * A toggleable component used to show / hide content
 */
export const Expandable: React.FC<ExpandableProps> = ({
  label,
  expanded: defaultExpanded,
  children,
  disabled,
  onClick,
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: {
      borderColor: "black10",
      textProps: { variant: "small", fontWeight: "bold" } as TextProps,
      chevronSize: 12,
    },
    v3: {
      borderColor: "black60",
      textProps: { variant: "md" } as TextProps,
      chevronSize: 14,
    },
  })

  const [expanded, setExpanded] = useState(defaultExpanded)

  const [boxProps, clickableProps] = splitBoxProps(rest)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setExpanded((prevExpanded) => !prevExpanded)
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
        borderColor={tokens.borderColor}
        pt={1}
        disabled={disabled}
        aria-expanded={expanded}
        onClick={handleClick}
        {...clickableProps}
      >
        <Flex flex={1} minHeight={40} display="flex" alignItems="center">
          {isText(label) ? <Text {...tokens.textProps}>{label}</Text> : label}
        </Flex>

        {!disabled && (
          <ChevronIcon
            direction={expanded ? "up" : "down"}
            width={tokens.chevronSize}
            height={tokens.chevronSize}
            ml={1}
            aria-hidden="true"
          />
        )}
      </Clickable>

      {expanded && children}
    </Box>
  )
}

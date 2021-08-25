import React from "react"
import { PositionProps } from "styled-system"
import { color } from "../../helpers"
import { Color } from "../../Theme"
import { BorderBox } from "../BorderBox"
import { Text } from "../Text"

export interface CardTagProps extends PositionProps {
  text: string
  textColor: Color
  color: Color
  borderColor?: Color
}

/**
 * `CardTag` is used for the Cards, and is controlled by their `tag` prop.
 */
export const CardTag: React.FC<CardTagProps> = ({
  text,
  textColor,
  color: bgColor,
  borderColor,
  position,
  top,
  left,
}) => {
  return (
    <BorderBox
      borderRadius={2}
      backgroundColor={color(bgColor) || bgColor}
      borderColor={color(borderColor!) || borderColor}
      m={0}
      p={0}
      position={position}
      top={top}
      left={left}
    >
      <Text variant="caption" px={0.5} py={0.3} color={textColor}>
        {text}
      </Text>
    </BorderBox>
  )
}

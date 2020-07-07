import React from "react"
import { color } from "../../helpers"
import { BorderBox } from "../BorderBox"
import { Sans } from "../Typography"
import { CardTagProps } from "./CardTag.shared"

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
      borderRadius="2"
      overflow="hidden"
      backgroundColor={color(bgColor) || bgColor}
      borderColor={color(borderColor) || borderColor}
      m={0}
      p={0}
      position={position}
      top={top}
      left={left}
    >
      <Sans size="2" px={0.5} py={0.3} color={textColor}>
        {text}
      </Sans>
    </BorderBox>
  )
}

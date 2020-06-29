import React from "react"
import { View } from "react-native"
import { color } from "../../helpers"
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
  style,
}) => {
  return (
    <View
      style={[
        { borderRadius: 2, overflow: "hidden", borderWidth: 1 },
        style,
        {
          backgroundColor: color(bgColor) || bgColor,
          borderColor: color(borderColor) || borderColor,
        },
      ]}
    >
      <Sans size="2" px={0.5} py={0.3} color={textColor}>
        {text}
      </Sans>
    </View>
  )
}

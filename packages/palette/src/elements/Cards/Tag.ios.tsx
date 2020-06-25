import { Sans } from "@artsy/palette"
import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"

export interface TagProps {
  text: string
  textColor: string
  color: string
  borderColor?: string
  style: StyleProp<ViewStyle>
}

/**
 * `Tag` is used for the Cards, and is controlled by their `tag` prop.
 */
export const Tag: React.FC<TagProps> = ({
  text,
  textColor,
  color,
  borderColor,
  style,
}) => {
  return (
    <View
      style={[
        { borderRadius: 2, overflow: "hidden", borderWidth: 1 },
        style,
        { backgroundColor: color, borderColor },
      ]}
    >
      <Sans size="2" px={0.5} py={0.3} color={textColor}>
        {text}
      </Sans>
    </View>
  )
}

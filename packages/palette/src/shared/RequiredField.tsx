import React from "react"
import { Text, TextProps } from "../elements"

export const RequiredField: React.FC<TextProps & { disabled?: boolean }> = (
  props
) => {
  return (
    <Text
      variant="xs"
      color={props.disabled ? "black30" : "black60"}
      textAlign="left"
      {...props}
    >
      *Required
    </Text>
  )
}

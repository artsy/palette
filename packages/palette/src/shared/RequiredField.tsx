import React from "react"
import { Text, TextProps } from "../elements"

export const RequiredField: React.FC<TextProps> = (props) => {
  return (
    <Text variant="xs" color="black60" textAlign="left" {...props}>
      *Required
    </Text>
  )
}

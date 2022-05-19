import React from "react"
import { Text, TextProps } from "../Text"

export interface AutocompleteInputOptionLabelProps extends TextProps {
  text: string
}

export const AutocompleteInputOptionLabel: React.FC<AutocompleteInputOptionLabelProps> = ({
  text,
  ...rest
}) => {
  return (
    <Text variant="sm-display" lineHeight={1} p={2} overflowEllipsis {...rest}>
      {text}
    </Text>
  )
}

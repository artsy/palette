import { themeGet } from "@styled-system/theme-get"
import React, { useState } from "react"
import styled from "styled-components"
import { Box } from "../elements/Box"
import { Clickable } from "../elements/Clickable"
import { Input, InputProps } from "../elements/Input"
import { Text } from "../elements/Text"

export interface ArtnetAutocompleteInputProps
  extends Omit<InputProps, "onChange" | "value"> {
  value: string
  onChange: (value: string) => void
  /** Dummy options to filter against as the user types */
  options: string[]
  onSelectOption?: (value: string) => void
}

const Dropdown = styled(Box)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
  border: 1px solid ${themeGet("colors.mono15")};
  border-top: 0;
  background: ${themeGet("colors.mono0")};
  max-height: 200px;
  overflow-y: auto;
`

/**
 * An artnet-flavored variant of Input with a simple filtered dropdown,
 * loosely modeled on the real Price Database Artist field (type to
 * filter a list of matches, click one to select). Wraps the base Input
 * for the text field itself rather than re-styling it from scratch —
 * there's no real search here, `options` is a plain in-memory list.
 */
export const ArtnetAutocompleteInput: React.FC<ArtnetAutocompleteInputProps> = ({
  value,
  onChange,
  options,
  onSelectOption,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const matches =
    value.trim().length === 0
      ? []
      : options.filter((option) =>
          option.toLowerCase().includes(value.trim().toLowerCase())
        )

  return (
    <Box position="relative">
      <Input
        {...rest}
        value={value}
        onChange={(event) => {
          onChange(event.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        autoComplete="off"
      />

      {isOpen && matches.length > 0 && (
        <Dropdown>
          {matches.map((match) => (
            <Clickable
              key={match}
              width="100%"
              textAlign="left"
              px={1}
              py={0.5}
              // Fires before the input's onBlur closes the dropdown
              onMouseDown={(event) => {
                event.preventDefault()
                onChange(match)
                onSelectOption?.(match)
                setIsOpen(false)
              }}
            >
              <Text variant="sm" color="mono100">
                {match}
              </Text>
            </Clickable>
          ))}
        </Dropdown>
      )}
    </Box>
  )
}

import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import {
  AutocompleteInput as BaseAutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps as BaseAutocompleteInputProps,
} from "../elements/AutocompleteInput"
import { Box } from "../elements/Box"

/**
 * The real Price Database search fields are underline-only — no left,
 * right, or top border, no box — unlike the base Input's full bordered
 * box (confirmed via computed styles on the live site: border-bottom
 * only, focus darkens to black rather than the brand accent). A plain
 * `input` descendant selector reaches the nested native element
 * regardless of the base component's internal DOM structure or
 * generated class names.
 */
const Container = styled(Box)`
  input {
    border-width: 0 0 1px 0;
    border-color: ${themeGet("colors.mono30")};

    &:focus {
      border-color: ${themeGet("colors.mono100")};
    }
  }
`

export interface AutocompleteInputProps
  extends Omit<
    BaseAutocompleteInputProps<AutocompleteInputOptionType>,
    "options" | "onSelect" | "onChange" | "defaultValue"
  > {
  value: string
  onChange: (value: string) => void
  /** Dummy options to filter against as the user types */
  options: string[]
  onSelectOption?: (value: string) => void
}

/**
 * artnet's autocomplete search field: filters a plain in-memory string
 * list as the user types, instead of taking a pre-built {text,value}
 * option list from the caller. This is what gives it the real search
 * icon, dropdown positioning, and keyboard navigation — all inherited
 * from the base AutocompleteInput, not reimplemented. There's no real
 * search — `options` is a dummy list, loosely modeled on the real Price
 * Database Artist field.
 */
export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  options,
  onSelectOption,
  ...rest
}) => {
  const matches =
    value.trim().length === 0
      ? []
      : options
          .filter((option) =>
            option.toLowerCase().includes(value.trim().toLowerCase())
          )
          .map((option) => ({ text: option, value: option }))

  return (
    <Container>
      <BaseAutocompleteInput
        {...rest}
        defaultValue={value}
        options={matches}
        onChange={(event) => onChange(event.currentTarget.value)}
        onSelect={(option) => {
          onChange(option.text)
          onSelectOption?.(option.value)
        }}
      />
    </Container>
  )
}

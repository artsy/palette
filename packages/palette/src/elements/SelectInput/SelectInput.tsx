import composeRefs from "@seznam/compose-react-refs"
import { themeGet } from "@styled-system/theme-get"
import React, { useCallback, useMemo, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { height as systemHeight } from "styled-system"
import { useContainsFocus, usePosition, useWidthOf } from "../../utils"
import { Box, splitBoxProps } from "../Box"
import { InputProps } from "../Input"
import { Text, TextProps } from "../Text"
import { SELECT_INPUT_STATES } from "./tokens"
import { RequiredField } from "../../shared/RequiredField"
import { Option, SelectInputList } from "./SelectInputList"
import { caretMixin } from "../Select"
import { Clickable, ClickableProps } from "../Clickable"

export interface SelectInputProps extends Omit<InputProps, "onSelect"> {
  active?: boolean
  enableSearch?: boolean
  disabled?: boolean
  dropdownValue?: string
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  inputValue?: string
  label: string
  onSelect: (option: Option) => void
  options: Option[]
  required?: boolean
  /** Controls the width of the left hand select dropdown UI */
  selectWidth?: ClickableProps["width"]
  /** Controls the gap between the text and name labels in select options */
  optionTextMinWidth?: TextProps["minWidth"]
}

export const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      className,
      enableSearch,
      disabled,
      dropdownValue,
      error,
      focus,
      hover,
      label,
      inputValue,
      onSelect,
      options,
      required,
      selectWidth,
      optionTextMinWidth,
      ...rest
    },
    forwardedRef
  ) => {
    if (options.length === 0) {
      throw new Error(
        "Palette SelectInput requires at least 1 option in the options prop"
      )
    }

    const inputRef = useRef<HTMLInputElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const defaultOption = useMemo(
      () =>
        dropdownValue &&
        options.find((option) => option.value === dropdownValue),
      [dropdownValue, options]
    )

    const [boxProps, inputProps] = splitBoxProps(rest)

    const [open, setOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(
      defaultOption || options[0]
    )

    const { anchorRef, tooltipRef } = usePosition({
      position: "bottom",
      offset: 10,
      active: open,
      flip: false,
    })

    const { width } = useWidthOf({ ref: anchorRef })

    const inputName = inputProps.name || "palette-select-input"

    const handleSelect = (option: Option) => {
      setSelectedOption(option)
      setOpen(false)
      inputRef.current?.focus()
      onSelect?.(option)
    }

    const handleFocusChange = useCallback(
      (focused: boolean) => {
        if (focused || !open) return
        setOpen(false)
      },
      [open]
    )

    // Handle closing the dropdown when clicking outside of the input
    // or when focus leaves the input completely
    const { ref: containsFocusRef } = useContainsFocus({
      onChange: handleFocusChange,
    })

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <Box
        ref={composeRefs(containerRef, containsFocusRef) as any}
        width="100%"
        className={className}
        {...boxProps}
      >
        <SelectInputContainer
          ref={anchorRef as any}
          open={open}
          hover={hover}
          focus={focus}
          error={error}
          disabled={disabled}
          placeholder={inputProps.placeholder}
        >
          <SelectInputSelect
            data-testid="country-picker"
            disabled={disabled}
            onClick={() => {
              setOpen(!disabled && !open)
            }}
            width={selectWidth}
          >
            {selectedOption.text}
          </SelectInputSelect>

          <SelectInputInput
            disabled={disabled}
            ref={composeRefs(inputRef, forwardedRef)}
            required={required}
            name={inputName}
            maxLength={25}
            placeholder={inputProps.placeholder}
            value={inputValue}
            {...inputProps}
          />

          <SelectInputLabel htmlFor={inputName}>{label}</SelectInputLabel>
        </SelectInputContainer>

        {open && (
          <SelectInputDropdown
            ref={tooltipRef as any}
            role="listbox"
            width={width}
          >
            <SelectInputList
              options={options}
              onSelect={handleSelect}
              onClose={handleClose}
              enableSearch={enableSearch}
              optionTextMinWidth={optionTextMinWidth}
            />
          </SelectInputDropdown>
        )}

        {required && !(error && typeof error === "string") && (
          <RequiredField mt={0.5} ml={1} disabled={disabled} />
        )}

        {error && typeof error === "string" && (
          <Text variant="xs" mt={0.5} mr={1} color="red100" textAlign="right">
            {error}
          </Text>
        )}
      </Box>
    )
  }
)

SelectInput.displayName = "SelectInput"

type ContainerProps = Pick<
  SelectInputProps,
  "disabled" | "error" | "hover" | "focus" | "placeholder"
> & { open: boolean }

const SelectInputContainer = styled(Box)<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;

  ${(props) => {
    return css`
      ${SELECT_INPUT_STATES.default}
      ${props.hover && SELECT_INPUT_STATES.hover}
      ${(props.focus || props.open) && SELECT_INPUT_STATES.focus}
      ${props.disabled && SELECT_INPUT_STATES.disabled}
      ${props.error && SELECT_INPUT_STATES.error}

      &:hover {
        /* Applies hover style if the dropdown is not visible or the input is disabled */
        ${!props.open && !props.disabled && SELECT_INPUT_STATES.hover}
      }

      &:focus-within {
        ${!props.disabled && SELECT_INPUT_STATES.focus}

        &:has(input:not(:placeholder-shown)) {
          ${SELECT_INPUT_STATES.active}
          ${props.error && SELECT_INPUT_STATES.error};
        }
      }

      &:has(input:not(:placeholder-shown)) {
        ${!!props.placeholder && SELECT_INPUT_STATES.completed}
        ${props.error && SELECT_INPUT_STATES.error};
      }
    `
  }}
`

const SelectInputSelect = styled(Clickable)<{ disabled?: boolean }>`
  ${caretMixin}
  display: flex;
  align-items: center;
  position: relative;
  min-width: ${(p) => p.width ?? 120}px;
  border: 1px solid;
  border-right: 0;
  /* 24px = space.1 + 4px-wide caret + space.1 */
  padding: 0 24px 0 ${themeGet("space.1")};
  font-family: ${themeGet("fonts.sans")};
  border-radius: 3px 0 0 3px;
  border-color: ${themeGet("colors.mono30")};
  cursor: pointer;
  line-height: 1;
  transition: color 0.25s, border-color 0.25s;
  height: 50px;
  font-size: ${themeGet("textVariants.sm-display.fontSize")};
  color: ${themeGet("colors.mono100")};
  &:focus {
    outline: none;
    text-decoration: underline;
    color: ${themeGet("colors.blue100")};
  }
`

const SelectInputDropdown = styled(Box)`
  box-shadow: ${themeGet("effects.dropShadow")};
  background: ${themeGet("colors.mono0")};
  z-index: 1;
  padding: ${themeGet("space.1")};
`

const SelectInputInput = styled.input`
  width: 100%;
  background-color: ${themeGet("colors.mono0")};
  padding: 0 ${themeGet("space.1")};
  appearance: none;
  outline: none;
  line-height: 1;
  border: 1px solid;
  border-radius: 0 3px 3px 0;
  transition: color 0.25s, border-color 0.25s;
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("textVariants.sm-display.fontSize")};
  color: ${themeGet("colors.mono100")};
  border-color: ${themeGet("colors.mono30")};
  ${systemHeight}

  ::placeholder {
    color: ${themeGet("colors.mono60")};
    transition: color 0.25s;
  }
`

const SelectInputLabel = styled.label`
  position: absolute;
  top: 0;
  left: 5px;
  padding: 0 5px;
  background-color: transparent;
  transform: translateY(-50%);
  transition: color 0.25s;
  font-family: ${themeGet("fonts.sans")};
  pointer-events: none;
  font-size: ${themeGet("textVariants.xs.fontSize")};
  color: ${themeGet("colors.mono60")};

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: ${themeGet("colors.mono0")};
    z-index: -1;
  }
`

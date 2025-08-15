import composeRefs from "@seznam/compose-react-refs"
import { themeGet } from "@styled-system/theme-get"
import React, { useCallback, useMemo, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { height as systemHeight } from "styled-system"
import { useContainsFocus, usePosition, useWidthOf } from "../../utils"
import { Box, splitBoxProps } from "../Box"
import { InputProps } from "../Input"
import { Text } from "../Text"
import { PHONE_INPUT_STATES } from "./tokens"
import { RequiredField } from "../../shared/RequiredField"
import { Option, PhoneInputList } from "./PhoneInputList"
import { caretMixin } from "../Select"
import { Clickable } from "../Clickable"

export interface PhoneInputProps extends Omit<InputProps, "onSelect"> {
  options: Option[]
  onSelect: (option: Option) => void
  active?: boolean
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  required?: boolean
  dropdownValue?: string
  inputValue?: string
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      options,
      disabled,
      error,
      focus,
      hover,
      required,
      onSelect,
      dropdownValue,
      inputValue,
      ...rest
    },
    forwardedRef
  ) => {
    if (options.length === 0) {
      throw new Error(
        "Palette PhoneInput requires at least 1 option in the options prop"
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

    const inputName = inputProps.name || "palette-phone-input"

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
        <PhoneInputContainer
          ref={anchorRef as any}
          open={open}
          hover={hover}
          focus={focus}
          error={error}
          disabled={disabled}
          placeholder={inputProps.placeholder}
        >
          <PhoneInputSelect
            data-testid="country-picker"
            disabled={disabled}
            onClick={() => {
              setOpen(!disabled && !open)
            }}
          >
            {selectedOption.text}
          </PhoneInputSelect>

          <PhoneInputInput
            disabled={disabled}
            ref={composeRefs(inputRef, forwardedRef)}
            type="tel"
            autoComplete="tel-national"
            required={required}
            name={inputName}
            maxLength={25}
            placeholder={inputProps.placeholder}
            value={inputValue}
            {...inputProps}
          />

          <PhoneInputLabel htmlFor={inputName}>Phone number</PhoneInputLabel>
        </PhoneInputContainer>

        {open && (
          <PhoneInputDropdown
            ref={tooltipRef as any}
            role="listbox"
            width={width}
          >
            <PhoneInputList
              options={options}
              onSelect={handleSelect}
              onClose={handleClose}
            />
          </PhoneInputDropdown>
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

PhoneInput.displayName = "PhoneInput"

type ContainerProps = Pick<
  PhoneInputProps,
  "disabled" | "error" | "hover" | "focus" | "placeholder"
> & { open: boolean }

const PhoneInputContainer = styled(Box)<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;

  ${(props) => {
    return css`
      ${PHONE_INPUT_STATES.default}
      ${props.hover && PHONE_INPUT_STATES.hover}
      ${(props.focus || props.open) && PHONE_INPUT_STATES.focus}
      ${props.disabled && PHONE_INPUT_STATES.disabled}
      ${props.error && PHONE_INPUT_STATES.error}

      &:hover {
        /* Applies hover style if the dropdown is not visible or the input is disabled */
        ${!props.open && !props.disabled && PHONE_INPUT_STATES.hover}
      }

      &:focus-within {
        ${!props.disabled && PHONE_INPUT_STATES.focus}

        &:has(input:not(:placeholder-shown)) {
          ${PHONE_INPUT_STATES.active}
          ${props.error && PHONE_INPUT_STATES.error};
        }
      }

      &:has(input:not(:placeholder-shown)) {
        ${!!props.placeholder && PHONE_INPUT_STATES.completed}
        ${props.error && PHONE_INPUT_STATES.error};
      }
    `
  }}
`

const PhoneInputSelect = styled(Clickable)<{ disabled?: boolean }>`
  ${caretMixin}
  display: flex;
  align-items: center;
  position: relative;
  min-width: 120px;
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

const PhoneInputDropdown = styled(Box)`
  box-shadow: ${themeGet("effects.dropShadow")};
  background: ${themeGet("colors.mono0")};
  z-index: 1;
  padding: ${themeGet("space.1")};
`

const PhoneInputInput = styled.input`
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

const PhoneInputLabel = styled.label`
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

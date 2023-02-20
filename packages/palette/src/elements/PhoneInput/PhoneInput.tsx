import composeRefs from "@seznam/compose-react-refs"
import { themeGet } from "@styled-system/theme-get"
import React, { useRef, useState } from "react"
import styled, { css } from "styled-components"
import { height as systemHeight } from "styled-system"
import { DROP_SHADOW } from "../../helpers"
import { usePosition, useWidthOf } from "../../utils"
import { Box, splitBoxProps } from "../Box"
import { Input, InputProps } from "../Input"
import { Text } from "../Text"
import { PHONE_INPUT_STATES } from "./tokens"

type Option = {
  text: string
  name: string
  value: string
  countryCode?: string
  flag?: string
}

export interface PhoneInputProps extends Omit<InputProps, "onSelect"> {
  options: Option[]
  onSelect: (option: Option) => void
  onInputChange?: ({
    inputValue,
    countryCodeValue,
  }: {
    inputValue: string
    countryCodeValue: string
  }) => void
  active?: boolean
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  required?: boolean
}

export const PhoneInput: React.ForwardRefExoticComponent<
  PhoneInputProps & { ref?: React.Ref<HTMLInputElement> }
> = React.forwardRef(
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
      onInputChange,
      ...rest
    },
    ref
  ) => {
    if (options.length === 0) {
      throw new Error(
        "Palette PhoneInput requires at least 1 option in the options prop"
      )
    }

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [boxProps, inputProps] = splitBoxProps(rest)
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(options[0])

    const { anchorRef, tooltipRef } = usePosition({
      position: "bottom",
      offset: 10,
      active: isDropdownVisible,
    })

    const { width } = useWidthOf({ ref: anchorRef })

    const inputName = inputProps.name || "palette-phone-input"

    const filteredOptions = options.filter((option) => {
      if (searchQuery !== "") {
        const filteredCountry =
          option.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.name.toLowerCase().includes(searchQuery.toLowerCase())
        return filteredCountry
      }
      return true
    })

    /**
     * TODO:
     * - [ ] Close dropdown when clicking outside the dropdown
     * - [ ] Keyboard navigation - check AutocompleteInput.tsx for reference
     */

    const handleSelect = (option: Option) => {
      inputRef.current?.focus()
      setSelectedOption(option)
      setDropdownVisible(false)
      onSelect?.(option)
    }

    return (
      <Box width="100%" className={className} {...boxProps}>
        <ContainerBox
          ref={anchorRef as any}
          hover={hover}
          focus={focus}
          isDropdownVisible={isDropdownVisible}
          error={error}
          disabled={disabled}
        >
          <SelectContainer
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                setDropdownVisible(true)
              }
            }}
          >
            {selectedOption.text}
          </SelectContainer>

          <StyledInput
            disabled={disabled}
            ref={composeRefs(inputRef, ref) as any}
            type="tel"
            autoComplete="tel-national"
            name={inputName}
            maxLength={25}
            placeholder={inputProps.placeholder}
            onChange={(e) => {
              const inputValue = e.target.value
              const countryCodeValue = selectedOption.value
              inputProps.onChange?.(e)

              onInputChange?.({ inputValue, countryCodeValue })
            }}
            {...inputProps}
          />

          <StyledLabel htmlFor={inputName}>Phone Number</StyledLabel>
        </ContainerBox>

        {isDropdownVisible && (
          <SelectDropdown ref={tooltipRef as any} role="listbox" width={width}>
            <Input
              placeholder="Search"
              mb={1}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SelectOptions>
              {/* {optionsWithRefs.map(({ option, ref }, i) => {
              return (
                <AutocompleteInputOption
                  key={i}
                  ref={ref}
                  role="option"
                  aria-selected={i === index}
                  aria-posinset={i + 1}
                  aria-setsize={options.length}
                  onMouseDown={handleMouseDown(option, i)}
                  onMouseEnter={handleMouseEnter(i)}
                  selected={i === index}
                  tabIndex={-1}
                >
                  {renderOption(option, i)}
                </AutocompleteInputOption>
              )
            })} */}

              {filteredOptions.map((option, i) => {
                return (
                  <SelectOption
                    key={i}
                    selected={option.value === selectedOption.value}
                    onClick={() => handleSelect(option)}
                  >
                    <Text minWidth={80}>{option.text}</Text>
                    <Text>{option.name}</Text>
                  </SelectOption>
                )
              })}
            </SelectOptions>

            {/* {footer} */}
          </SelectDropdown>
        )}

        {required && !(error && typeof error === "string") && (
          <Text mt={0.5} ml={1} variant="xs" color="black60" textAlign="left">
            *Required
          </Text>
        )}

        {error && typeof error === "string" && (
          <Text variant="xs" mt={0.5} ml={1} color="red100" textAlign="right">
            {error}
          </Text>
        )}
      </Box>
    )
  }
)

PhoneInput.displayName = "PhoneInput"

const caretMixin = css`
  &::after {
    content: "";
    cursor: inherit;
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${themeGet("space.1")};
    pointer-events: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid
      ${({ disabled }) => {
        return disabled
          ? themeGet("colors.black10")
          : themeGet("colors.black60")
      }};
  }
`

type ContainerProps = Pick<
  PhoneInputProps,
  "disabled" | "error" | "hover" | "focus"
> & { isDropdownVisible: boolean }

const ContainerBox = styled(Box)<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;

  ${(props) => {
    return css`
      ${props.hover && PHONE_INPUT_STATES.hover}
      ${props.focus && PHONE_INPUT_STATES.focus}
      ${props.isDropdownVisible && PHONE_INPUT_STATES.focus}
      ${props.disabled && PHONE_INPUT_STATES.disabled}
      ${props.error && PHONE_INPUT_STATES.error}

      &:hover {
        /* Applies hover style if the dropdown is not visible or the input is disabled */
        ${!props.isDropdownVisible &&
        !props.disabled &&
        PHONE_INPUT_STATES.hover}
      }

      &:focus-within {
        ${PHONE_INPUT_STATES.focus}
      }

      > input:not(:placeholder-shown) {
        ${!props.placeholder && PHONE_INPUT_STATES.completed}
        ${!!props.error && PHONE_INPUT_STATES.error}
      }
    `
  }}
`

const SelectContainer = styled(Box)<{ disabled?: boolean }>`
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
  border-color: ${themeGet("colors.black30")};
  cursor: pointer;
  line-height: 1;
  transition: color 0.25s, border-color 0.25s;
  height: 50px;
  font-size: ${themeGet("textVariants.sm-display.fontSize")};
  color: ${themeGet("colors.black100")};

  ${caretMixin}
`

const SelectDropdown = styled(Box)`
  box-shadow: ${DROP_SHADOW};
  z-index: 1;
  background: ${themeGet("colors.white100")};
  padding: ${themeGet("space.1")};
`

const SelectOptions = styled(Box)`
  /* 308 = Roughly, 5.5 default sized options  */
  max-height: 308px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const SelectOption = styled(Box)<{ selected?: boolean }>`
  padding: ${themeGet("space.1")} 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: ${themeGet("colors.black60")};
  transition: color 0.25s, text-decoration 0.25s;

  &:hover {
    color: ${themeGet("colors.blue100")};
    text-decoration: underline;
  }

  &:active {
    color: ${themeGet("colors.black100")};
    text-decoration: none;
  }

  ${(props) =>
    props.selected &&
    css`
      color: ${themeGet("colors.black100")};
      text-decoration: none;
    `}
`

const StyledInput = styled.input`
  width: 100%;
  padding: 0 ${themeGet("space.1")};
  appearance: none;
  outline: none;
  line-height: 1;
  border: 1px solid;
  border-radius: 0 3px 3px 0;
  transition: color 0.25s, border-color 0.25s;
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("textVariants.sm-display.fontSize")};
  color: ${themeGet("colors.black100")};
  border-color: ${themeGet("colors.black30")};
  ${systemHeight}

  ::placeholder {
    color: ${themeGet("colors.black60")};
    trasition: color 0.25s;
  }
`

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 5px;
  padding: 0 5px;
  background-color: ${themeGet("colors.white100")};
  transform: translateY(-50%);
  transition: color 0.25s;
  font-family: ${themeGet("fonts.sans")};
  pointer-events: none;
  font-size: ${themeGet("textVariants.xs.fontSize")};
  color: ${themeGet("colors.black60")};
`

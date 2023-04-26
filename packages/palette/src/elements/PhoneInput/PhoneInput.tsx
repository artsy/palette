import composeRefs from "@seznam/compose-react-refs"
import { themeGet } from "@styled-system/theme-get"
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { height as systemHeight } from "styled-system"
import { DROP_SHADOW } from "../../helpers"
import { useContainsFocus, usePosition, useWidthOf } from "../../utils"
import { Box, splitBoxProps } from "../Box"
import { Input, InputProps } from "../Input"
import { Text } from "../Text"
import { PHONE_INPUT_STATES } from "./tokens"
import { useKeyboardListNavigation } from "use-keyboard-list-navigation"
import { RequiredField } from "../../shared/RequiredField"

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
    forwardedRef
  ) => {
    if (options.length === 0) {
      throw new Error(
        "Palette PhoneInput requires at least 1 option in the options prop"
      )
    }

    const inputRef = useRef<HTMLInputElement | null>(null)
    const searchInputRef = useRef<HTMLInputElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const countryPickerRef = useRef<HTMLDivElement | null>(null)

    const [boxProps, inputProps] = splitBoxProps(rest)
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(options[0])

    const { anchorRef, tooltipRef } = usePosition({
      position: "bottom",
      offset: 10,
      active: isDropdownVisible,
    })

    const filteredOptions = options.filter((option) => {
      if (searchQuery !== "") {
        const filteredCountry =
          option.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.name.toLowerCase().includes(searchQuery.toLowerCase())
        return filteredCountry
      }
      return true
    })

    const { index, reset, set } = useKeyboardListNavigation({
      ref: containerRef,
      list: filteredOptions,
      waitForInteractive: true,
      onEnter: ({ element: option, event }) => {
        event.preventDefault()
        event.stopPropagation()
        if (option) {
          handleSelect(option)
        }
        resetUI()
      },
    })

    const { width } = useWidthOf({ ref: anchorRef })

    const inputName = inputProps.name || "palette-phone-input"

    const optionsWithRefs = useMemo(() => {
      return filteredOptions.map((option) => ({
        option,
        ref: createRef<HTMLDivElement>(),
      }))
    }, [filteredOptions])

    const resetUI = () => {
      setTimeout(() => {
        inputRef.current?.focus()
        reset()
        setDropdownVisible(false)
      }, 100)
    }

    const handleSelect = (option: Option) => {
      inputRef.current?.focus()
      setSelectedOption(option)
      setDropdownVisible(false)
      onSelect?.(option)
    }

    useEffect(() => {
      const option = optionsWithRefs[index]
      option?.ref?.current?.focus()
    }, [index, optionsWithRefs])

    const handleFocusChange = useCallback(
      (focused: boolean) => {
        if (focused || !isDropdownVisible) return

        setDropdownVisible(false)
      },
      [isDropdownVisible]
    )

    // Handle closing the dropdown when clicking outside of the input
    // or when focus leaves the input completely
    const { ref: containsFocusRef } = useContainsFocus({
      onChange: handleFocusChange,
    })

    // Moves focus back to input when typing
    const handleContainerKeydown = (
      event: React.KeyboardEvent<HTMLDivElement>
    ) => {
      switch (event.key) {
        case "Alt":
        case "ArrowDown":
        case "ArrowUp":
        case "Control":
        case "Enter":
        case "Meta":
        case "Shift":
        case "Tab":
          // Ignore
          return

        case "Escape":
          event.preventDefault()
          event.stopPropagation()

          setDropdownVisible(false)
          inputRef.current?.blur()
          reset()

          return
      }
    }

    const handleCountryPickerKeydown = (
      event: React.KeyboardEvent<HTMLDivElement>
    ) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault()
          event.stopPropagation()

          setDropdownVisible(false)
          countryPickerRef.current?.blur()
          reset()

          return

        case "Enter":
        case " ":
          event.preventDefault()
          event.stopPropagation()

          if (!disabled) {
            setDropdownVisible(true)
          }
          return
      }
    }

    const handleSearchInputKeydown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      switch (event.key) {
        case "Tab":
          if (event.shiftKey) {
            // ignore
          } else {
            // move down to the list
            event.preventDefault()
            event.stopPropagation()
            reset()

            set({ cursor: 0, interactive: true })
          }
          return

        default:
          searchInputRef.current?.focus()
      }
    }

    return (
      <Box
        onKeyDown={handleContainerKeydown}
        ref={composeRefs(containerRef, containsFocusRef) as any}
        width="100%"
        className={className}
        {...boxProps}
      >
        <ContainerBox
          ref={anchorRef as any}
          isDropdownVisible={isDropdownVisible}
          hover={hover}
          focus={focus}
          error={error}
          disabled={disabled}
          placeholder={inputProps.placeholder}
        >
          <SelectContainer
            data-testid="country-picker"
            ref={countryPickerRef as any}
            disabled={disabled}
            onClick={() => {
              setDropdownVisible(!disabled && !isDropdownVisible)
            }}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleCountryPickerKeydown}
          >
            {selectedOption.text}
          </SelectContainer>

          <StyledInput
            disabled={disabled}
            ref={composeRefs(inputRef, forwardedRef) as any}
            type="tel"
            autoComplete="tel-national"
            required={required}
            name={inputName}
            maxLength={25}
            placeholder={inputProps.placeholder}
            onChange={(e) => {
              const inputValue = e.target.value
              const countryCodeValue = selectedOption.value
              onInputChange?.({ inputValue, countryCodeValue })

              inputProps.onChange?.(e)
            }}
            {...inputProps}
          />

          <StyledLabel htmlFor={inputName}>Phone Number</StyledLabel>
        </ContainerBox>

        {isDropdownVisible && (
          <SelectDropdown ref={tooltipRef as any} role="listbox" width={width}>
            <Input
              ref={searchInputRef}
              mb={1}
              autoFocus
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchInputKeydown}
            />

            <SelectOptions>
              {optionsWithRefs.map(({ option, ref }, i) => {
                return (
                  <SelectOption
                    key={i}
                    ref={ref as any}
                    role="option"
                    aria-selected={option.value === selectedOption.value}
                    aria-posinset={i + 1}
                    aria-setsize={options.length}
                    selected={option.value === selectedOption.value}
                    onClick={() => handleSelect(option)}
                    tabIndex={-1}
                  >
                    <Text minWidth={80}>{option.text}</Text>
                    <Text>{option.name}</Text>
                  </SelectOption>
                )
              })}
            </SelectOptions>
          </SelectDropdown>
        )}

        {required && !(error && typeof error === "string") && (
          <RequiredField mt={0.5} ml={1} />
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
  "disabled" | "error" | "hover" | "focus" | "placeholder"
> & { isDropdownVisible: boolean }

const ContainerBox = styled(Box)<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;

  ${(props) => {
    return css`
      ${PHONE_INPUT_STATES.default}
      ${props.hover && PHONE_INPUT_STATES.hover}
      ${(props.focus || props.isDropdownVisible) && PHONE_INPUT_STATES.focus}
      ${props.disabled && PHONE_INPUT_STATES.disabled}
      ${props.error && PHONE_INPUT_STATES.error}

      &:hover {
        /* Applies hover style if the dropdown is not visible or the input is disabled */
        ${!props.isDropdownVisible &&
        !props.disabled &&
        PHONE_INPUT_STATES.hover}
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

  &:focus,
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
    transition: color 0.25s;
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

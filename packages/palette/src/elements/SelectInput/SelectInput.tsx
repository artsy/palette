import composeRefs from "@seznam/compose-react-refs"
import { themeGet } from "@styled-system/theme-get"
import React, { createRef, useCallback, useMemo, useRef, useState } from "react"
import styled, { css, ExecutionContext } from "styled-components"
import { height as systemHeight } from "styled-system"
import { useKeyboardListNavigation } from "use-keyboard-list-navigation"
import { RequiredField } from "../../shared/RequiredField"
import { useContainsFocus, usePosition, useWidthOf } from "../../utils"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Input, InputProps } from "../Input"
import { Text } from "../Text"
import { SELECT_INPUT_STATES } from "./tokens"

/**
 * The option structure for the list in the dropdown menu
 *
 * @interface SelectOption
 * @property {string} `text` is the content that will be displayed as selected option
 * @property {string} `name` is the content that will be displayed in the dropdown list
 * @property {string} `value` is the value that will be passed to onSelect
 */
export interface SelectOption {
  text: string
  name: string
  value: string
}

export interface SelectInputProps extends Omit<InputProps, "onSelect"> {
  options: SelectOption[]
  onSelect: (option: SelectOption) => void
  active?: boolean
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  required?: boolean
  dropdownValue?: string
  inputValue?: string
  label?: string
  dropdownPlaceholder?: string
  selectWidth?: number | string
  dropdownProps?: Partial<BoxProps>
  hideSearch?: boolean
}

export const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
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
      label,
      dropdownPlaceholder = "Search",
      selectWidth = 70,
      dropdownProps,
      hideSearch = false,
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
    const searchInputRef = useRef<HTMLInputElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const selectPickerRef = useRef<HTMLDivElement | null>(null)

    const defaultOption = useMemo(
      () =>
        dropdownValue &&
        options.find((option) => option.value === dropdownValue),
      [dropdownValue, options]
    )

    const [boxProps, inputProps] = splitBoxProps(rest)
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(
      defaultOption || options[0]
    )

    const filteredOptions = options.filter((option) => {
      if (searchQuery !== "") {
        const filteredOption =
          option.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.name.toLowerCase().includes(searchQuery.toLowerCase())
        return filteredOption
      }
      return true
    })

    const { anchorRef, tooltipRef } = usePosition({
      key: filteredOptions.length,
      position: "bottom",
      offset: 10,
      active: isDropdownVisible,
      flip: false,
    })

    const { reset, set } = useKeyboardListNavigation({
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

    const inputName = inputProps.name || "palette-select-input"

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

    const handleSelect = (option: SelectOption) => {
      inputRef.current?.focus()
      setSearchQuery("")
      setSelectedOption(option)
      setDropdownVisible(false)
      onSelect?.(option)
    }

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

    const handleSelectPickerKeydown = (
      event: React.KeyboardEvent<HTMLDivElement>
    ) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault()
          event.stopPropagation()

          setDropdownVisible(false)
          selectPickerRef.current?.blur()
          reset()

          return

        case "Enter":
        case " ":
          event.preventDefault()
          event.stopPropagation()

          if (!disabled) {
            setDropdownVisible(true)
            if (hideSearch) {
              // When search is hidden, immediately enable keyboard navigation
              setTimeout(() => {
                set({ cursor: 0, interactive: true })
              }, 0)
            }
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

        case "Enter":
          event.preventDefault()
          event.stopPropagation()
          if (filteredOptions.length) {
            handleSelect(filteredOptions[0])
          }
          return

        default:
          searchInputRef.current?.focus()
      }
    }

    return (
      <Box
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
            data-testid="select-picker"
            ref={selectPickerRef as any}
            disabled={disabled}
            onClick={() => {
              if (!disabled && !isDropdownVisible) {
                setDropdownVisible(true)
                if (hideSearch) {
                  // When search is hidden, immediately enable keyboard navigation
                  setTimeout(() => {
                    set({ cursor: 0, interactive: true })
                  }, 0)
                }
              } else {
                setDropdownVisible(false)
              }
            }}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleSelectPickerKeydown}
          >
            {selectedOption.text}
          </SelectContainer>

          <StyledInput
            disabled={disabled}
            ref={composeRefs(inputRef, forwardedRef) as any}
            type="text"
            required={required}
            name={inputName}
            placeholder={inputProps.placeholder}
            value={inputValue}
            {...inputProps}
          />

          {!!label && (
            <StyledLabel htmlFor={inputName}>
              {label}
              <span />
            </StyledLabel>
          )}
        </ContainerBox>

        {isDropdownVisible && (
          <SelectDropdown
            ref={tooltipRef as any}
            role="listbox"
            width={width}
            {...dropdownProps}
          >
            {!hideSearch && (
              <Input
                ref={searchInputRef}
                p={1}
                pb={0}
                autoFocus
                placeholder={dropdownPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchInputKeydown}
              />
            )}

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
                    <Text minWidth={selectWidth}>{option.text}</Text>

                    <Text>{option.name}</Text>
                  </SelectOption>
                )
              })}
            </SelectOptions>
          </SelectDropdown>
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

interface CaretProps extends ExecutionContext {
  disabled?: boolean
}

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
      ${({ disabled }: CaretProps) => {
        return disabled ? themeGet("colors.mono10") : themeGet("colors.mono60")
      }};
  }
`

type ContainerProps = Pick<
  SelectInputProps,
  "disabled" | "error" | "hover" | "focus" | "placeholder"
> & { isDropdownVisible: boolean }

const ContainerBox = styled(Box)<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;

  ${(props) => {
    return css`
      ${SELECT_INPUT_STATES.default}
      ${props.hover && SELECT_INPUT_STATES.hover}
      ${(props.focus || props.isDropdownVisible) && SELECT_INPUT_STATES.focus}
      ${props.disabled && SELECT_INPUT_STATES.disabled}
      ${props.error && SELECT_INPUT_STATES.error}

      &:hover {
        /* Applies hover style if the dropdown is not visible or the input is disabled */
        ${!props.isDropdownVisible &&
        !props.disabled &&
        SELECT_INPUT_STATES.hover}
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

const SelectContainer = styled(Box)<{
  disabled?: boolean
  width?: number | string
}>`
  display: flex;
  align-items: center;
  position: relative;
  min-width: ${(props) =>
    typeof props.width === "number" ? `${props.width}px` : props.width};
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

  ${caretMixin}
`

const SelectDropdown = styled(Box)`
  box-shadow: ${themeGet("effects.dropShadow")};
  z-index: 1;
  background: ${themeGet("colors.mono0")};
`

const SelectOptions = styled(Box)<{ maxHeight?: number | string }>`
  /* 308 = Roughly, 5.5 default sized options  */
  max-height: ${(props) => props.maxHeight || "308px"};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${themeGet("space.1")};
`

const SelectOption = styled(Box)<{ selected?: boolean }>`
  padding: ${themeGet("space.1")} 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: ${themeGet("colors.mono60")};
  transition: color 0.25s, text-decoration 0.25s;

  &:hover {
    color: ${themeGet("colors.blue100")};
    text-decoration: underline;
  }

  &:focus,
  &:active {
    color: ${themeGet("colors.mono100")};
    text-decoration: none;
  }

  ${(props) =>
    props.selected &&
    css`
      color: ${themeGet("colors.mono100")};
      text-decoration: none;
    `}
`

const StyledInput = styled.input`
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

const StyledLabel = styled.label`
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

  & > span {
    background-color: ${themeGet("colors.mono0")};
    height: 2px;
    width: 100%;
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    z-index: -1;
  }
`

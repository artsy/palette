import composeRefs from "@seznam/compose-react-refs"
import React, { createRef, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { useKeyboardListNavigation } from "use-keyboard-list-navigation"
import { Spinner } from ".."
import { DROP_SHADOW } from "../../helpers"
import { CloseIcon, MagnifyingGlassIcon } from "../../svgs"
import { useClickOutside, usePosition } from "../../utils"
import { useWidthOf } from "../../utils/useWidthOf"
import { Box, splitBoxProps } from "../Box"
import { Clickable } from "../Clickable"
import { InputProps } from "../Input"
import { LabeledInput } from "../LabeledInput"
import { VisuallyHidden } from "../VisuallyHidden"
import { AutocompleteInputOption } from "./AutocompleteInputOption"
import { AutocompleteInputOptionLabel } from "./AutocompleteInputOptionLabel"

/** Base option type — can be expanded */
export interface AutocompleteInputOptionType {
  text: string
  value: string
}

export interface AutocompleteInputProps<T extends AutocompleteInputOptionType>
  extends Omit<InputProps, "onSelect" | "onSubmit"> {
  defaultValue?: string
  loading?: boolean
  /** on <enter> when no option is selected */
  onSubmit?(query: string): void
  /** on <click> or <enter> when an option is selected */
  onSelect?(option: T, index: number): void
  /** on <click> of the 'x' (clear) button */
  onClear?(): void
  renderOption?(
    option: T,
    i: number
  ): React.ReactElement<any, string | React.JSXElementConstructor<any>>
  options: T[]
}

/** AutocompleteInput */
export const AutocompleteInput = <T extends AutocompleteInputOptionType>({
  defaultValue = "",
  id,
  loading,
  onSubmit,
  onSelect,
  onChange,
  onClear,
  onKeyDown,
  height,
  renderOption = (option) => <AutocompleteInputOptionLabel {...option} />,
  options,
  ...rest
}: AutocompleteInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [boxProps, inputProps] = splitBoxProps(rest)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(defaultValue)

  const optionsWithRefs = useMemo(() => {
    return options.map((option) => ({
      option,
      ref: createRef<HTMLButtonElement>(),
    }))
  }, [options])

  const resetUI = () => {
    setTimeout(() => {
      inputRef.current?.focus()
      reset()
      setOpen(false)
    }, 100)
  }

  const handleSelect = (option: T, index: number) => {
    setQuery(option.text)
    inputRef.current?.focus()
    onSelect?.(option, index)
  }

  const { index, reset, set } = useKeyboardListNavigation({
    ref: containerRef,
    list: options,
    waitForInteractive: true,
    onEnter: ({ element: option, index: i }) => {
      handleSelect(option, i)
      resetUI()
    },
  })

  const isDropdownVisible = open && options.length > 0

  // Reset keyboard navigation when options change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reset, [options])

  // Reset keyboard navigation when query is empty
  useEffect(() => {
    if (query === "") {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const { anchorRef, tooltipRef } = usePosition({
    position: "bottom",
    offset: 10,
    active: isDropdownVisible,
  })

  const { width } = useWidthOf({ ref: anchorRef })

  const handleFocus = () => {
    reset()
    setOpen(true)
  }

  const handleMouseDown = (option: T, i: number) => () => {
    handleSelect(option, i)
    resetUI()
  }

  const handleMouseEnter = (i: number) => () => {
    set({ cursor: i, interactive: true })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event

    setOpen(true)
    setQuery(value)
    onChange?.(event)
  }

  const handleClearOrSubmit = () => {
    if (query === "") {
      onSubmit?.(query)
      return
    }

    setQuery("")
    inputRef.current?.focus()
    onClear?.()
  }

  // Moves focus to different options when keyboard navigating using up/down
  useEffect(() => {
    const option = optionsWithRefs[index]
    option?.ref?.current?.focus()
  }, [index, optionsWithRefs])

  // Handle closing the dropdown
  useClickOutside({
    ref: containerRef,
    when: isDropdownVisible,
    onClickOutside: () => setOpen(false),
  })

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      // Handle <Enter> when nothing is selected
      case "Enter":
        if (query !== "" && index === -1) {
          onSubmit?.(query)
          resetUI()
        }
        return

      // <Esc> to close dropdown
      case "Escape":
        setOpen(false)
        inputRef.current?.blur()
        return

      default:
        break
    }

    onKeyDown?.(event)
  }

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
        setOpen(false)
        inputRef.current?.blur()
        reset()
        return

      default:
        inputRef.current?.focus()
    }
  }

  // Option that is being hovered or keyed into
  const staged = options[index]

  return (
    <Box
      ref={containerRef as any}
      onKeyDown={handleContainerKeydown}
      {...boxProps}
    >
      <LabeledInput
        ref={composeRefs(inputRef, anchorRef) as any}
        role="combobox"
        aria-expanded={isDropdownVisible}
        aria-autocomplete="list"
        {...(id ? { id, "aria-describedby": `${id}__assistiveHint` } : {})}
        label={
          loading ? (
            <Box width={18}>
              <Spinner size="small" />
            </Box>
          ) : query ? (
            <Clickable
              onClick={handleClearOrSubmit}
              height="100%"
              display="flex"
              alignItems="center"
              aria-label="Clear input"
            >
              <CloseIcon fill="black60" aria-hidden />
            </Clickable>
          ) : (
            <MagnifyingGlassIcon fill="black60" aria-hidden />
          )
        }
        value={staged?.text ?? query}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleInputKeydown}
        autoComplete="off"
        height={height}
        {...inputProps}
      />

      {isDropdownVisible && (
        <>
          <AutocompleteInputDropdown
            ref={tooltipRef as any}
            role="listbox"
            width={width}
          >
            {optionsWithRefs.map(({ option, ref }, i) => {
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
                >
                  {renderOption(option, i)}
                </AutocompleteInputOption>
              )
            })}
          </AutocompleteInputDropdown>
        </>
      )}

      <VisuallyHidden {...(id ? { id: `${id}__assistiveHint` } : {})}>
        When autocomplete results are available use up and down arrows to review
        and enter to select. Touch device users, explore by touch or with swipe
        gestures.
      </VisuallyHidden>

      {isDropdownVisible && (
        <VisuallyHidden role="status" aria-atomic="true" aria-live="polite">
          {options.length === 1
            ? `1 result is available`
            : `${options.length} results are available`}
        </VisuallyHidden>
      )}
    </Box>
  )
}

const AutocompleteInputDropdown = styled(Box)`
  box-shadow: ${DROP_SHADOW};
  max-height: 300px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
`

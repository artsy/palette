import composeRefs from "@seznam/compose-react-refs"
import React, { createRef, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { useKeyboardListNavigation } from "use-keyboard-list-navigation"
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
export interface AutoCompleteInputOption {
  text: string
  value: string
}

export interface AutocompleteInputProps<T extends AutoCompleteInputOption>
  extends Omit<InputProps, "onSelect" | "onSubmit"> {
  defaultValue?: string
  /** on <enter> when no option is selected */
  onSubmit?(query: string): void
  /** on <click> or <enter> when an option is selected */
  onSelect?(option: T, index: number): void
  renderOption?(
    option: T,
    i: number
  ): React.ReactElement<any, string | React.JSXElementConstructor<any>>
  options: T[]
}

/** AutocompleteInput */
export const AutocompleteInput = <T extends AutoCompleteInputOption>({
  defaultValue = "",
  id,
  onSubmit,
  onSelect,
  onChange,
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

  const { index, reset, set } = useKeyboardListNavigation({
    ref: containerRef,
    list: options,
    waitForInteractive: true,
    onEnter: ({ element: option, index: i }) => {
      onSelect?.(option, i)
      resetUI()
    },
  })

  const isDropdownVisible = open && query !== "" && options.length > 0

  // Reset keyboard navigation when options change
  useEffect(reset, [options])

  // Reset keyboard navigation when query is empty
  useEffect(() => {
    if (query === "") {
      reset()
    }
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
    onSelect?.(option, i)
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
  }

  // Moves focus to different options when keyboard navigating using up/down
  useEffect(() => {
    const option = optionsWithRefs[index]
    option?.ref?.current?.focus()
  }, [index])

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
        inputRef.current?.blur()
        setOpen(false)
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
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
        return

      default:
        inputRef.current?.focus()
    }
  }

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
        {...(!!id ? { id, "aria-describedby": `${id}__assistiveHint` } : {})}
        label={
          query ? (
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
        value={query}
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

      <VisuallyHidden {...(!!id ? { id: `${id}__assistiveHint` } : {})}>
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

import composeRefs from "@seznam/compose-react-refs"
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react"
import styled from "styled-components"
import { useKeyboardListNavigation } from "use-keyboard-list-navigation"
import { Spinner } from "../Spinner"
import SearchIcon from "@artsy/icons/SearchIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { usePosition, useContainsFocus, useClickOutside } from "../../utils"
import { useWidthOf } from "../../utils/useWidthOf"
import { Box, splitBoxProps } from "../Box"
import { Clickable } from "../Clickable"
import { InputProps } from "../Input"
import { LabeledInput } from "../LabeledInput"
import { VisuallyHidden } from "../VisuallyHidden"
import { AutocompleteInputOption } from "./AutocompleteInputOption"
import { AutocompleteInputOptionLabel } from "./AutocompleteInputOptionLabel"
import { ResponsiveValue } from "styled-system"
import { themeGet } from "@styled-system/theme-get"

export interface AutocompleteFooterActions {
  /** Call to close dropdown */
  onClose(): void
}

/** Base option type — can be expanded */
export interface AutocompleteInputOptionType {
  text: string
  value: string
}

interface State {
  open: boolean
  query: string
}

type Action =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "CLEAR" }
  | { type: "CHANGE"; payload: { query: string } }
  | { type: "SELECT"; payload: { query: string } }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN":
      return { ...state, open: true }
    case "CLOSE":
      return { ...state, open: false }
    case "CLEAR":
      return { ...state, query: "" }
    case "CHANGE":
      return { ...state, query: action.payload.query, open: true }
    case "SELECT":
      return { ...state, query: action.payload.query, open: false }
  }
}

export interface AutocompleteInputProps<T extends AutocompleteInputOptionType>
  extends Omit<InputProps, "onSelect" | "onSubmit"> {
  /** Optionally enable clamping (default: `false`) */
  clamp?: boolean
  defaultValue?: string
  dropdownMaxHeight?: ResponsiveValue<string | number>
  loading?: boolean
  header?: React.ReactNode
  /** Optionally disable flipping (default: `true`) */
  flip?: boolean
  footer?:
    | React.ReactNode
    | ((dropdownActions: AutocompleteFooterActions) => void)
  /** Ref to the input; workaround generics */
  forwardRef?: React.Ref<HTMLInputElement>
  /** on <enter> when no option is selected */
  onSubmit?(query: string): void
  /** on <click> or <enter> when an option is selected */
  onSelect?(option: T, index: number): void
  /** on <click> of the 'x' (clear) button */
  onClear?(): void
  /** Callback that runs when options are hidden */
  onClose?(): void
  options: T[]
  renderOption?(
    option: T,
    i: number
  ): React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

/** AutocompleteInput */
export const AutocompleteInput = <T extends AutocompleteInputOptionType>({
  clamp = false,
  defaultValue = "",
  dropdownMaxHeight = 308, // 308 = roughly 5.5 options
  flip = true,
  footer,
  forwardRef: forwardedRef,
  header,
  height,
  id,
  loading,
  onChange,
  onClear,
  onClose,
  onKeyDown,
  onSelect,
  onSubmit,
  options,
  renderOption = (option) => <AutocompleteInputOptionLabel {...option} />,
  ...rest
}: AutocompleteInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)

  const [boxProps, inputProps] = splitBoxProps(rest)

  const [state, dispatch] = useReducer(reducer, {
    open: false,
    query: defaultValue,
  })

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
      dispatch({ type: "CLOSE" })
    }, 100)
  }

  const handleSelect = (option: T, index: number) => {
    dispatch({ type: "SELECT", payload: { query: option.text } })
    inputRef.current?.focus()
    onSelect?.(option, index)
  }

  const { index, reset, set } = useKeyboardListNavigation({
    ref: containerRef,
    list: options,
    waitForInteractive: true,
    onEnter: ({ element: option, index: i, event }) => {
      event.preventDefault()
      event.stopPropagation()
      handleSelect(option, i)
      resetUI()
    },
  })

  const isDropdownVisible = state.open && options.length > 0

  // Reset keyboard navigation when options change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reset, [options])

  // Reset keyboard navigation when query is empty
  useEffect(() => {
    if (state.query === "") reset()
  }, [reset, state.query])

  const { anchorRef, tooltipRef } = usePosition({
    active: isDropdownVisible,
    clamp,
    flip,
    key: options.length,
    offset: 10,
    position: "bottom",
  })

  const { width } = useWidthOf({ ref: anchorRef })

  const handleFocus = () => {
    reset()
    dispatch({ type: "OPEN" })
  }

  const handleMouseDown = (option: T, i: number) => () => {
    handleSelect(option, i)
    resetUI()
  }

  const handleClick = () => {
    dispatch({ type: "OPEN" })
  }

  const handleMouseEnter = (i: number) => () => {
    set({ cursor: i, interactive: true })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event

    dispatch({ type: "CHANGE", payload: { query: value } })
    onChange?.(event)
  }

  const handleClearOrSubmit = () => {
    if (state.query === "") {
      onSubmit?.(state.query)
      return
    }

    dispatch({ type: "CLEAR" })
    inputRef.current?.focus()
    onClear?.()
  }

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE" })
    reset()
    onClose?.()
  }, [onClose, reset])

  const ignoreFocusChangeRef = useRef<boolean>(false)
  const ignoreFocusChange = {
    onMouseDown: () => (ignoreFocusChangeRef.current = true),
    onMouseUp: () => (ignoreFocusChangeRef.current = false),
  }

  // Moves focus to different options when keyboard navigating using up/down
  useEffect(() => {
    const option = optionsWithRefs[index]
    option?.ref?.current?.focus()
  }, [index, optionsWithRefs])

  const handleFocusChange = useCallback(
    (focused: boolean) => {
      if (ignoreFocusChangeRef.current || focused || !isDropdownVisible) return

      handleClose()
    },

    [isDropdownVisible, handleClose]
  )

  // Handle closing the dropdown when clicking outside of the input
  // or when focus leaves the input completely
  const { ref: containsFocusRef } = useContainsFocus({
    onChange: handleFocusChange,
  })

  useClickOutside({
    ref: containsFocusRef,
    onClickOutside: handleClose,
    when: isDropdownVisible,
    type: "click",
  })

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      // Handle <Enter> when nothing is selected
      case "Enter":
        if (state.query !== "" && index === -1) {
          onSubmit?.(state.query)
          resetUI()
        }
        return

      // <Esc> to close dropdown
      case "Escape":
        event.preventDefault()
        event.stopPropagation()

        dispatch({ type: "CLOSE" })
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
        event.preventDefault()
        event.stopPropagation()

        dispatch({ type: "CLOSE" })
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
      ref={composeRefs(containerRef, containsFocusRef) as any}
      onKeyDown={handleContainerKeydown}
      {...boxProps}
    >
      <LabeledInput
        ref={composeRefs(inputRef, anchorRef, forwardedRef) as any}
        role="combobox"
        aria-expanded={isDropdownVisible}
        aria-autocomplete="list"
        {...(id ? { id, "aria-describedby": `${id}__assistiveHint` } : {})}
        label={
          loading ? (
            <Box width={18}>
              <Spinner size="small" />
            </Box>
          ) : state.query ? (
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
            <SearchIcon fill="black60" aria-hidden />
          )
        }
        value={staged?.text ?? state.query}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleInputKeydown}
        onClick={handleClick}
        autoComplete="off"
        height={height}
        {...inputProps}
      />

      {isDropdownVisible && (
        <AutocompleteInputDropdown
          ref={tooltipRef as any}
          role="listbox"
          width={width}
        >
          <div ref={headerRef} {...ignoreFocusChange}>
            {header}
          </div>

          <AutocompleteInputOptions maxHeight={dropdownMaxHeight}>
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
                  tabIndex={-1}
                >
                  {renderOption(option, i)}
                </AutocompleteInputOption>
              )
            })}
          </AutocompleteInputOptions>

          <div ref={footerRef} {...ignoreFocusChange}>
            {typeof footer === "function"
              ? footer({ onClose: handleClose })
              : footer}
          </div>
        </AutocompleteInputDropdown>
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
  box-shadow: ${themeGet("colors.dropShadow")};
  z-index: 1;
`

const AutocompleteInputOptions = styled(Box)`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { FORM_ELEMENT_TRANSITION } from "../../helpers"
import { RequiredField } from "../../shared/RequiredField"
import { useClickOutside, usePosition } from "../../utils"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { useWidthOf } from "../../utils/useWidthOf"
import { Box, BoxProps } from "../Box"
import { Checkbox } from "../Checkbox"
import { Clickable } from "../Clickable"
import { caretMixin, Option } from "../Select"
import { Text } from "../Text"
import { Tooltip } from "../Tooltip"
import { MULTISELECT_STATES } from "./tokens"

export interface MultiSelectProps extends BoxProps {
  /** Whether to open the dropdown automatically on mount or render (default: false) */
  autoOpen?: boolean
  complete?: boolean
  description?: string
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  /** Initial values to be selected */
  selected?: Option["value"][]
  name?: string
  options: Option[]
  required?: boolean
  title?: string
  onBlur?: () => void
  onFocus?: () => void
  onSelect?: (selection: Option[]) => void

  visible?: boolean
}

/** A drop-down multi-select menu */
export const MultiSelect: React.FC<
  React.PropsWithChildren<MultiSelectProps>
> = ({
  autoOpen = false,
  complete,
  description,
  disabled,
  error,
  focus,
  hover,
  selected = [],
  name = "Select",
  options,
  required,
  title,
  onBlur,
  onFocus,
  onSelect,
  ...rest
}) => {
  const selectedOptions = valuesToOptions(selected, options)

  const [visible, setVisible] = useState(autoOpen)
  const [selection, setSelection] = useState<Option[]>(selectedOptions || [])

  // Yields focus back and forth between popover and anchor
  useUpdateEffect(() => {
    if (visible && tooltipRef.current) {
      tooltipRef.current.focus()
      return
    }

    if (!anchorRef.current) return
    anchorRef.current.focus()
  }, [visible])

  const handleVisible = () => {
    setVisible(true)
    onFocus?.()
  }

  const handleHide = () => {
    setVisible(false)
    onBlur?.()
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleHide()
      }
    }

    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [])
  const { anchorRef, tooltipRef } = usePosition({
    position: "bottom",
    offset: 10,
    active: visible,
  })

  const { width } = useWidthOf({ ref: anchorRef })

  useClickOutside({
    ref: tooltipRef,
    onClickOutside: handleHide,
    when: visible,
    type: "click",
  })

  const handleSelect = (option: Option) => {
    return (selected: boolean) => {
      const prevSelection = selection
      const nextSelection = selected
        ? [...prevSelection, option]
        : prevSelection.filter(({ value }) => option.value !== value)

      setSelection(nextSelection)
      onSelect?.(nextSelection)
    }
  }

  return (
    <Box width="100%" {...rest}>
      {!!description && (
        <Tooltip pointer content={description} placement="top-end">
          <Text variant="xs" color="mono60" textAlign="right">
            <u>What is this?</u>
          </Text>
        </Tooltip>
      )}

      <Container
        mt={!!title && !description ? 1 : 0}
        ref={anchorRef as any}
        onClick={handleVisible}
        complete={complete || selection.length > 0}
        disabled={!!disabled}
        error={error}
        focus={!!focus}
        hover={!!hover}
        title={title}
        visible={visible}
        {...rest}
      >
        <Text variant="sm" lineHeight={1} overflowEllipsis>
          {selection.length > 0
            ? [...selection]
                .reverse()
                .map((s) => s.text)
                .join(", ")
            : name}
        </Text>

        {!!title && <StyledLabel htmlFor={name}>{title}</StyledLabel>}
      </Container>

      {visible && (
        <Options
          tabIndex={0}
          ref={tooltipRef as any}
          zIndex={1}
          bg="mono0"
          width={width}
        >
          {options.map((option) => {
            return (
              <Checkbox
                key={option.value}
                height={50}
                px={1}
                selected={selection.includes(option)}
                onSelect={handleSelect(option)}
              >
                {option.text}
              </Checkbox>
            )
          })}
        </Options>
      )}

      {required && !(error && typeof error === "string") && (
        <RequiredField mt={0.5} ml={1} disabled={disabled} />
      )}

      {error && typeof error === "string" && (
        <Text variant="xs" mt={0.5} ml={1} color="red100">
          {error}
        </Text>
      )}
    </Box>
  )
}

const valuesToOptions = (
  values: Option["value"][],
  options: Option[]
): Option[] => {
  return options.filter((option) => values.includes(option.value))
}

const Options = styled(Box)`
  position: fixed;
  z-index: 1;
  max-height: 300px;
  text-align: left;
  box-shadow: ${themeGet("effects.dropShadow")};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

type ContainerProps = Pick<
  MultiSelectProps,
  "complete" | "disabled" | "error" | "hover" | "focus" | "visible"
>

const Container = styled(Clickable)<ContainerProps>`
  position: relative;
  width: 100%;
  /* 24px = space.1 + 4px-wide caret + space.1 */
  padding: 16px 24px 16px ${themeGet("space.1")};
  font-family: ${themeGet("fonts.sans")};
  border: 1px solid;
  border-radius: 3px;
  border-color: ${themeGet("colors.mono30")};
  cursor: pointer;
  line-height: 1;
  transition: color 0.25s, background-color 0.25s, border-color 0.25s;
  background-color: ${themeGet("colors.mono0")};

  ${(props) => {
    return css`
      ${MULTISELECT_STATES.default}
      ${props.complete && MULTISELECT_STATES.completed}
      ${props.hover && MULTISELECT_STATES.hover}
      ${props.focus && MULTISELECT_STATES.focus}
      ${props.disabled && MULTISELECT_STATES.disabled}
      ${props.error && MULTISELECT_STATES.error}

      &:hover {
        ${MULTISELECT_STATES.hover}
      }

      ${props.visible && MULTISELECT_STATES.focus}

      &:disabled {
        cursor: default;
        ${MULTISELECT_STATES.disabled}
      }

      // Hide text behind title when it's visible
      ${props.title &&
      !props.complete &&
      !props.visible &&
      css`
        color: transparent !important;
      `}
    `
  }}

  ${caretMixin}
`

const StyledLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  padding: 0 5px;
  pointer-events: none;
  transform: translateY(-50%);
  transition: ${FORM_ELEMENT_TRANSITION};
  transition-property: color, transform, padding, font-size;
  background-color: ${themeGet("colors.mono0")};
  font-family: ${themeGet("fonts.sans")};
`

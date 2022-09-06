import React from "react"
import styled, { css } from "styled-components"
import { Flex, FlexProps } from "../../elements/Flex"
import { isText } from "../../helpers/isText"
import { Text } from "../Text"
import { RadioDot } from "./RadioDot"
import { RADIO_DOT_STATES, RADIO_STATES, RADIO_SIZES } from "./tokens"

export interface RadioProps
  extends FlexProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Disable interactions */
  disabled?: boolean
  /** Select the button on render. If the Radio is inside a RadioGroup, use RadioGroup.defaultValue instead. */
  selected?: boolean
  /** Show an error indicator */
  error?: boolean
  /** Show hover state on render */
  hover?: boolean
  /** Forces focus state */
  focus?: boolean
  /** Value of radio button */
  value?: string
  /** Name of the radio button */
  name?: string
  /** The label content, if not specified the children will be used  */
  label?: React.ReactNode
  /** The radio size, if not specified, "sm" will be used  */
  size?: keyof typeof RADIO_SIZES
  /** Callback when selected */
  onSelect?: (selected: { selected: boolean; value: string }) => void
}

/** A Radio button */
export const Radio: React.FC<RadioProps> = ({
  children,
  disabled,
  hover,
  focus,
  error,
  label,
  selected,
  value,
  size = "sm",
  onSelect,
  ...rest
}) => {
  const handleClick = () => {
    onSelect && onSelect({ selected: !selected, value: value! })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") {
      event.preventDefault()
      onSelect && onSelect({ selected: !selected, value: value! })
    }
  }

  // TODO: Re-name props to match <Input />
  const title = label ? label : children
  const description = label ? children : null

  return (
    <Container
      as="label"
      alignItems="center"
      role="radio"
      aria-checked={selected}
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      onKeyPress={handleKeyPress}
      disabled={disabled}
      hover={hover}
      focus={focus}
      selected={selected}
      error={error}
      {...rest}
    >
      <Flex
        height={RADIO_SIZES[size].dotSize}
        width={RADIO_SIZES[size].dotSize}
        alignSelf="start"
        mr={1}
      >
        <RadioDot
          disabled={disabled}
          hover={hover}
          focus={focus}
          selected={selected}
          error={error}
        />
      </Flex>

      <Flex flexDirection="column" flex={1}>
        <Flex alignItems="center" flex={1}>
          {isText(title) ? (
            <Text
              variant={RADIO_SIZES[size].labelFontSize}
              lineHeight={description ? undefined : 1}
            >
              {title}
            </Text>
          ) : (
            title
          )}
        </Flex>

        {isText(description) ? (
          <Text variant={RADIO_SIZES[size].descriptionFontSize} color="black60">
            {description}
          </Text>
        ) : (
          description
        )}
      </Flex>
    </Container>
  )
}

const Container = styled(Flex)<{
  disabled?: boolean
  error?: boolean
  hover?: boolean
  focus?: boolean
  selected?: boolean
}>`
  ${(props) => {
    return css`
      ${props.selected ? RADIO_STATES.selected : RADIO_STATES.default}
      ${props.focus && RADIO_STATES.focus}
      ${props.hover && RADIO_STATES.hover}
      ${props.disabled && RADIO_STATES.disabled}
      ${props.error && RADIO_STATES.error}

      &:hover {
        ${!props.error &&
        !props.disabled &&
        css`
          ${RADIO_STATES.hover}

          // Radio
          > ${RadioDot} {
            ${props.selected
              ? RADIO_DOT_STATES.hover.selected
              : RADIO_DOT_STATES.hover.resting}
          }
        `}
      }

      &:focus {
        ${RADIO_STATES.focus}

        // Radio
        > ${RadioDot} {
          ${props.selected
            ? RADIO_DOT_STATES.focus.selected
            : RADIO_DOT_STATES.focus.resting}
        }
      }

      &:disabled {
        pointer-events: none;
        ${RADIO_STATES.disabled}
      }
    `
  }}
`

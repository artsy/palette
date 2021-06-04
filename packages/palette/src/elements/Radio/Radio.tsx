import React from "react"
import styled, { css } from "styled-components"
import { Flex, FlexProps } from "../../elements/Flex"
import { isText } from "../../helpers/isText"
import { getThemeConfig, useThemeConfig } from "../../Theme"
import { Text } from "../Text"
import { TextVariant } from "../Text/tokens/v2"
import { RadioDot } from "./RadioDot"
import {
  RADIO_DOT_STATES as V2_RADIO_DOT_STATES,
  RADIO_STATES as V2_RADIO_STATES,
} from "./tokens/v2"
import {
  RADIO_DOT_STATES as V3_RADIO_DOT_STATES,
  RADIO_STATES as V3_RADIO_STATES,
} from "./tokens/v3"

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
  /** Value of radio button */
  value?: string
  /** Name of the radio button */
  name?: string
  /** The label content, if not specified the children will be used  */
  label?: React.ReactNode
  /** Callback when selected */
  onSelect?: (selected: { selected: boolean; value: string }) => void
}

/** A Radio button */
export const Radio: React.FC<RadioProps> = ({
  children,
  disabled,
  hover,
  error,
  name,
  label,
  selected,
  value,
  onSelect,
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: {
      titleVariant: "text" as TextVariant,
      descriptionVariant: "small" as TextVariant,
    },
    v3: {
      titleVariant: "md" as TextVariant,
      descriptionVariant: "xs" as TextVariant,
    },
  })

  const handleClick = () => {
    onSelect && onSelect({ selected: !selected, value })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") {
      event.preventDefault()
      onSelect({ selected: !selected, value })
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
      selected={selected}
      error={error}
      {...rest}
    >
      <RadioDot
        disabled={disabled}
        hover={hover}
        selected={selected}
        error={error}
        mr={1}
      />

      <Flex flexDirection="column" flex={1}>
        <Flex alignItems="center" flex={1}>
          {isText(title) ? (
            <Text
              variant={tokens.titleVariant}
              lineHeight={description ? undefined : 1}
            >
              {title}
            </Text>
          ) : (
            title
          )}
        </Flex>

        {isText(description) ? (
          <Text variant={tokens.descriptionVariant} color="black60">
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
  selected?: boolean
}>`
  ${(props) => {
    const states = getThemeConfig(props, {
      v2: { radio: V2_RADIO_STATES, dot: V2_RADIO_DOT_STATES },
      v3: { radio: V3_RADIO_STATES, dot: V3_RADIO_DOT_STATES },
    })

    return css`
      ${states.radio.default}
      ${props.hover && states.radio.hover}
      ${props.disabled && states.radio.disabled}
      ${props.error && states.radio.error}

      &:hover {
        ${!props.error &&
        !props.disabled &&
        css`
          ${states.radio.hover}

          // Radio
          > div:first-of-type {
            ${props.selected
              ? states.dot.hover.selected
              : states.dot.hover.resting}
          }
        `}
      }

      &:disabled {
        pointer-events: none;
        ${states.radio.disabled}
      }
    `
  }}
`

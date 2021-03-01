import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import { ResponsiveValue, variant } from "styled-system"
import { useTheme } from "../../Theme"
import { boxMixin, BoxProps } from "../Box"
import { Spinner } from "../Spinner"
import { Text } from "../Text"
import { Sans } from "../Typography"
import {
  BUTTON_SIZES,
  BUTTON_TEXT_SIZES,
  BUTTON_VARIANTS,
  ButtonSize,
  ButtonVariant,
} from "./tokens"
import {
  V3_BUTTON_SIZES,
  V3_BUTTON_TEXT_SIZES,
  V3_BUTTON_VARIANTS,
} from "./tokens/v3"

export interface ButtonProps
  extends BoxProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The theme of the button */
  variant?: ResponsiveValue<ButtonVariant>
  /** Size of the button */
  size?: ButtonSize
  /** Displays a loader in the button */
  loading?: boolean
  /** Uses inline style for button */
  inline?: boolean
  /** Forces hover state */
  hover?: boolean
  /** Forces focus state */
  focus?: boolean
}

/** A button with various size and color settings */
export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  color,
  size,
  onClick,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!loading && onClick) {
      onClick(event)
    }
  }

  useEffect(() => {
    if (loading && ref.current !== null) {
      ref.current.blur()
    }
  }, [loading])

  const {
    theme: { id },
  } = useTheme()

  return (
    <Container
      ref={ref as any}
      onClick={handleClick}
      size={size}
      loading={loading}
      tabIndex={loading ? -1 : 0}
      {...rest}
    >
      {loading && <Spinner size={size} color="currentColor" />}

      {id === "v2" ? (
        <Sans
          pt="1px"
          weight="medium"
          size={BUTTON_TEXT_SIZES[size]}
          opacity={loading ? 0 : 1}
        >
          {children}
        </Sans>
      ) : (
        <Text
          pt="1px"
          variant={V3_BUTTON_TEXT_SIZES[size]}
          opacity={loading ? 0 : 1}
        >
          {children}
        </Text>
      )}
    </Container>
  )
}

Button.defaultProps = {
  size: "medium",
  variant: "primaryBlack",
}

type ContainerProps = Pick<
  ButtonProps,
  "size" | "inline" | "loading" | "hover" | "focus" | "disabled"
>

const Container = styled.button<ContainerProps>`
  display: inline-block;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  text-decoration: none;
  align-items: center;
  transition: color 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;

  ${boxMixin};

  /* Any version specific styles */
  ${(props) => {
    if (props.theme.id === "v2") {
      return css`
        border: 2px solid;
        border-radius: 3px;
      `
    }

    return css`
      border: 1px solid;
    `
  }}

  ${(props) => {
    // Handle sizing
    const tokens = { v2: BUTTON_SIZES, v3: V3_BUTTON_SIZES }[props.theme.id]

    return variant({
      prop: "size",
      variants: tokens[props.inline ? "inline" : "block"],
    })(props)
  }};

  /* Handle props driven states */
  ${(props) => {
    const tokens = { v2: BUTTON_VARIANTS, v3: V3_BUTTON_VARIANTS }[
      props.theme.id
    ]

    if (props.hover) {
      return variant({ variants: tokens.hover })(props)
    }

    if (props.focus) {
      return css`
        outline: 0;
        ${variant({ variants: tokens.focus })(props)}
      `
    }

    if (props.loading) {
      return css`
        cursor: auto;
        transition: none;
        pointer-events: none;
        ${variant({ variants: tokens.loading })(props)}
      `
    }

    if (props.disabled) {
      return css`
        pointer-events: none;
        ${variant({ variants: tokens.disabled })(props)}
      `
    }

    return variant({ variants: tokens.default })(props)
  }}

  ${(props) => {
    // Handle pseudo classes
    const tokens = { v2: BUTTON_VARIANTS, v3: V3_BUTTON_VARIANTS }[
      props.theme.id
    ]
    return css`
      @media ${props.theme.mediaQueries.hover} {
        &:hover {
          ${variant({ variants: tokens.hover })(props)}
        }
      }

      &:focus {
        outline: 0;
        ${variant({ variants: tokens.focus })(props)}
      }

      &:disabled {
        pointer-events: none;
        ${variant({ variants: tokens.disabled })(props)}
      }
    `
  }};
`

import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled, { css } from "styled-components"
import { ResponsiveValue, variant } from "styled-system"
import { boxMixin, BoxProps } from "../Box"
import { Spinner } from "../Spinner"
import { Sans, SansProps } from "../Typography"
import {
  BUTTON_SIZES,
  BUTTON_TEXT_SIZES,
  BUTTON_VARIANTS,
  ButtonSize,
  ButtonVariant,
} from "./tokens"

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
}

/** A button with various size and color settings */
export const Button: React.FC<ButtonProps & Omit<SansProps, "size">> = ({
  children,
  loading,
  color,
  size,
  weight,
  onClick,
  ...rest
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!loading && onClick) {
      onClick(event)
    }
  }

  return (
    <Container onClick={handleClick} size={size} loading={loading} {...rest}>
      {loading && <Spinner size={size} />}

      <Sans pt="1px" weight={weight || "medium"} size={BUTTON_TEXT_SIZES[size]}>
        {children}
      </Sans>
    </Container>
  )
}

Button.defaultProps = {
  size: "medium",
  variant: "primaryBlack",
  border: 1,
  borderRadius: 3,
}

type ContainerProps = Pick<ButtonProps, "size" | "inline" | "loading">

const Container = styled.button<ContainerProps>`
  display: inline-block;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  text-decoration: none;
  align-items: center;

  ${boxMixin};

  ${variant({ variants: BUTTON_VARIANTS })};

  ${props => {
    return variant({
      prop: "size",
      variants: BUTTON_SIZES[props.inline ? "inline" : "block"],
    })(props)
  }};

  ${({ loading }) =>
    loading
      ? css`
          transition: none;
          background-color: transparent !important;
          color: transparent !important;
          border-color: transparent !important;
          cursor: auto;
        `
      : css`
          transition: color 0.25s ease, border-color 0.25s ease,
            background-color 0.25s ease;
        `}

  &:disabled {
    background-color: ${themeGet("colors.black10")};
    border-color: ${themeGet("colors.black10")};
    color: ${themeGet("colors.white100")};
    pointer-events: none;
  }
`

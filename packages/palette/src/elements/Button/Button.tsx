import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import {
  borderRadius,
  borders,
  compose,
  height,
  ResponsiveValue,
  space,
  textAlign,
  variant,
  width,
} from "styled-system"
import { BoxProps } from "../Box"
import { Spinner } from "../Spinner"
import { Sans, SansProps } from "../Typography"
import { BUTTON_VARIANTS, ButtonVariant } from "./tokens"

/** Default button color variant */
export const defaultVariant: ButtonVariant = "primaryBlack"

/** The size of the button */
export type ButtonSize = "small" | "medium" | "large"

/** Default button size */
export const defaultSize: ButtonSize = "medium"

export interface ButtonProps extends ButtonBaseProps {
  /** The size of the button */
  size?: ButtonSize
  /** The theme of the button */
  variant?: ButtonVariant
}

export interface ButtonBaseProps
  extends BoxProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Size of the button */
  buttonSize?: ButtonSize
  /** Displays a loader in the button */
  loading?: boolean
  /** Disabled interactions */
  disabled?: boolean
  /** Uses inline style for button */
  inline?: boolean
  /** Makes button full width */
  block?: boolean
}

const getSize = ({
  inline,
  size,
}: Pick<ButtonProps, "inline" | "size">): {
  height: string
  size: "2" | "3t"
  px: number
} => {
  switch (size) {
    case "small":
      return {
        height: inline ? "17px" : "26px",
        size: "2",
        px: inline ? 0 : 1.5,
      }
    case "medium":
      return {
        height: inline ? "21px" : "41px",
        size: "3t",
        px: inline ? 0 : 2,
      }
    case "large":
      return {
        height: inline ? "21px" : "50px",
        size: "3t",
        px: inline ? 0 : 3,
      }
  }
}

/** A button with various size and color settings */
export const Button: React.FC<ButtonProps> = ({
  size = defaultSize,
  children,
  ...rest
}) => {
  return (
    <ButtonBase
      buttonSize={size}
      {...getSize({ inline: rest.inline, size })}
      {...rest}
    >
      {children}
    </ButtonBase>
  )
}

Button.defaultProps = {
  size: defaultSize,
  variant: defaultVariant,
}

/** A base from which various button implementations can compose from */
export const ButtonBase: React.FC<
  ButtonBaseProps & SansProps & { variant?: ResponsiveValue<ButtonVariant> }
> = ({
  children,
  loading,
  disabled,
  color,
  size,
  weight,
  className,
  onClick,
  ...rest
}) => {
  const loadingClass = loading ? "loading" : ""
  const disabledClass = disabled ? "disabled" : ""
  const classNames = [loadingClass, disabledClass, className]
    .filter(Boolean)
    .join(" ")

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!loading && onClick) {
      onClick(event)
    }
  }

  return (
    <Container
      className={classNames}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {loading && <Spinner size={rest.buttonSize} />}

      <Sans pt="1px" weight={weight || "medium"} size={size}>
        {children}
      </Sans>
    </Container>
  )
}

ButtonBase.defaultProps = {
  border: 1,
  borderColor: "inherit",
  borderRadius: 3,
}

const Container = styled.button<
  ButtonBaseProps & { variant?: ResponsiveValue<ButtonVariant> }
>`
  cursor: pointer;
  position: relative;
  white-space: nowrap;

  ${compose(
    borders,
    borderRadius,
    space,
    textAlign,
    width,
    height
  )};

  ${variant({ variants: BUTTON_VARIANTS })};

  ${props => {
    if (!props.loading) {
      return `
        transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
      `
    }
  }};

  &.loading {
    transition: none;
    background-color: transparent;
    color: transparent;
    border: 0;
    cursor: auto;
  }

  &.disabled {
    background-color: ${themeGet("colors.black10")};
    border-color: ${themeGet("colors.black10")};
    color: ${themeGet("colors.white100")};
    pointer-events: none;
  }
`

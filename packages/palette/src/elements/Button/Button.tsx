import React from "react"
import styled, { css } from "styled-components"
import {
  borderRadius,
  borders,
  compose,
  height,
  space,
  textAlign,
  width,
} from "styled-system"
import { themeProps } from "../../Theme"
import { BoxProps } from "../Box"
import { Spinner } from "../Spinner"
import { Sans, SansProps } from "../Typography"

/**
 * Spec: zpl.io/2j8Knq6
 */

/** Different theme variations */
export type ButtonVariant =
  | "primaryBlack"
  | "primaryWhite"
  | "secondaryGray"
  | "secondaryOutline"
  | "noOutline"

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
  /** The underlying type of button */
  type?: string
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
  /** Additional styles to apply to the variant */
  variantStyles?: any // FIXME
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

const getVariant = ({ variant }: Pick<ButtonProps, "variant">) => {
  switch (variant) {
    case "primaryBlack":
      return css`
        ${props => {
          const { colors } = props.theme

          return `
              background-color: ${colors.black100};
              border-color: ${colors.black100};
              color: ${colors.white100};

              @media ${themeProps.mediaQueries.hover} {
                &:hover {
                  background-color: ${colors.purple100};
                  border-color: ${colors.purple100};
                  color: ${colors.white100};
                }
              }
            `
        }};
      `
    case "primaryWhite":
      return css`
        ${props => {
          const { colors } = props.theme

          return `
              background-color: ${colors.white100};
              border-color: ${colors.white100};
              color: ${colors.black100};

              @media ${themeProps.mediaQueries.hover} {
                &:hover {
                  background-color: ${colors.purple100};
                  border-color: ${colors.purple100};
                  color: ${colors.white100};
                }
              }
            `
        }};
      `
    case "secondaryGray":
      return css`
        ${props => {
          const { colors } = props.theme

          return `
              background-color: ${colors.black10};
              border-color: ${colors.black10};
              color: ${colors.black100};

              @media ${themeProps.mediaQueries.hover} {
                &:hover {
                  background-color: ${colors.black30};
                  border-color: ${colors.black30};
                  color: ${colors.black100};
                }
              }
            `
        }};
      `
    case "secondaryOutline":
      return css`
        ${props => {
          const { colors } = props.theme
          return `
              background-color: ${colors.white100};
              border-color: ${colors.black10};
              color: ${colors.black100};

              @media ${themeProps.mediaQueries.hover} {
                &:hover {
                  background-color: ${colors.white100};
                  border-color: ${colors.black100};
                  color: ${colors.black100};
                }
              }
            `
        }};
      `
    case "noOutline":
      return css`
        ${props => {
          const { colors } = props.theme
          return `
              background-color: transparent;
              border-color: transparent;
              color: ${colors.black100};
            `
        }};
      `
    default:
  }
}

/** A button with various size and color settings */
export const Button: React.FC<ButtonProps> = ({
  size = defaultSize,
  variant = defaultVariant,
  children,
  ...rest
}) => {
  return (
    <ButtonBase
      {...rest}
      {...getSize({ inline: rest.inline, size })}
      buttonSize={size}
      variantStyles={getVariant({ variant })}
    >
      {children}
    </ButtonBase>
  )
}

/** A base from which various button implementations can compose from */
export const ButtonBase: React.FC<ButtonBaseProps & SansProps> = ({
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
  borderRadius: 3,
}

const Container = styled.button<ButtonBaseProps>`
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

  ${props => {
    if (!props.loading) {
      return `
        transition: 0.25s ease;
      `
    }
  }};

  ${props => props.variantStyles};

  &.loading {
    transition: none;
    background-color: transparent;
    color: transparent;
    border: 0;
    cursor: auto;
  }

  &.disabled {
    ${props => {
      const { colors } = props.theme

      return `
        background-color: ${colors.black10};
        border-color: ${colors.black10};
        color: ${colors.white100};
        pointer-events: none;
      `
    }};
  }
`

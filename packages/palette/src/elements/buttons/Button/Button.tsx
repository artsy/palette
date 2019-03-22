import React, { Component, ReactNode } from "react"
import styled, { css } from "styled-components"
import { themeProps } from "../../../Theme"
import { Spinner } from "../../loaders"
import { Sans, SansProps } from "../../Typography"

import {
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  borders,
  height,
  HeightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from "styled-system"

/**
 * Spec: zpl.io/2j8Knq6
 */

/** The size of the button */
export type ButtonSize = "small" | "medium" | "large"
const defaultSize: ButtonSize = "medium"

/** Different theme variations */
export type ButtonVariant =
  | "primaryBlack"
  | "primaryWhite"
  | "secondaryGray"
  | "secondaryOutline"
  | "noOutline"
const defaultVariant: ButtonVariant = "primaryBlack"

export interface ButtonProps extends ButtonBaseProps {
  children: ReactNode
  /** The size of the button */
  size?: ButtonSize
  /** The theme of the button */
  variant?: ButtonVariant
}

/** A button with various size and color settings */
export class Button extends Component<ButtonProps> {
  static defaultProps = {
    size: defaultSize,
    variant: defaultVariant,
    theme: themeProps,
  }

  getSize(): { height: string; size: "2" | "3t"; px: number } {
    switch (this.props.size) {
      case "small":
        return { height: "26px", size: "2", px: 1 }
      case "medium":
        return { height: "41px", size: "3t", px: 2 }
      case "large":
        return { height: "50px", size: "3t", px: 3 }
    }
  }

  getVariant() {
    switch (this.props.variant) {
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
                color: ${colors.black60};
              `
          }};
        `
      default:
    }
  }

  render() {
    const buttonProps = {
      ...this.props,
      ...this.getSize(),
      buttonSize: this.props.size,
      variantStyles: this.getVariant(),
    }

    return <ButtonBase {...buttonProps}>{this.props.children}</ButtonBase>
  }
}

/** Base props that construct button */
export interface ButtonBaseProps
  extends BorderProps,
    BorderRadiusProps,
    SpaceProps,
    TextAlignProps,
    WidthProps,
    HeightProps {
  /** Size of the button */
  buttonSize?: ButtonSize
  /** Displays a loader in the button */
  loading?: boolean
  /** Disabled interactions */
  disabled?: boolean
  /** Callback on click */
  onClick?: (e) => void
  /** Additional styles to apply to the variant */
  variantStyles?: any // FIXME
}

/** A base from which various button implementations can compose from */
export class ButtonBase extends Component<ButtonBaseProps & SansProps> {
  static defaultProps = {
    border: 1,
    borderRadius: 3,
  }

  onClick = event => {
    if (!this.props.loading && this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render() {
    const {
      children,
      loading,
      disabled,
      color,
      size,
      weight,
      onClick,
      ...rest
    } = this.props

    const loadingClass = loading ? "loading" : ""
    const disabledClass = disabled ? "disabled" : ""

    return (
      <Container
        {...rest}
        className={[loadingClass, disabledClass].join(" ")}
        onClick={this.onClick}
      >
        {loading && <Spinner size={this.props.buttonSize} />}

        <Sans pt="1px" weight={weight || "medium"} color={color} size={size}>
          {children}
        </Sans>
      </Container>
    )
  }
}

const Container = styled.button<ButtonBaseProps>`
  cursor: pointer;
  position: relative;
  white-space: nowrap;

  ${borders};
  ${borderRadius};
  ${space};
  ${textAlign};
  ${width};
  ${height};

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

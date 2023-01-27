import composeRefs from "@seznam/compose-react-refs"
import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import { ResponsiveValue, variant } from "styled-system"
import { CheckIcon, IconProps } from "../../svgs"
import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import { THEME_V3 } from "../../themes"
import { boxMixin, BoxProps } from "../Box"
import { Spinner } from "../Spinner"
import { Text, TextProps } from "../Text"
import { BUTTON_SIZES, BUTTON_TEXT_SIZES, BUTTON_VARIANTS } from "./tokens"
import { ButtonSize, ButtonVariant } from "./types"

export interface ButtonProps
  extends BoxProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @description
   * The theme of the button. It's possible to pass an array that
   * behaves accordingly to the media breakpoints ["sm", "md", "lg", "xl"]
   * @example
   * "primaryBlack"
   * "primaryWhite"
   * ["primaryGray", "secondaryBlack"]
   * @see {@link ButtonVariant}
   */
  variant?: ResponsiveValue<ButtonVariant>
  /** Size of the button */
  size?: ResponsiveValue<ButtonSize>
  /** Displays a loader in the button */
  loading?: boolean
  /** Forces hover state */
  hover?: boolean
  /** Forces focus state */
  focus?: boolean
  /** Forces active state */
  active?: boolean
  /** Forces success state */
  success?: boolean
  /** Optional icon slot */
  Icon?: React.FunctionComponent<IconProps>
}

export const Button: React.ForwardRefExoticComponent<
  ButtonProps & { ref?: React.Ref<HTMLElement> }
> = React.forwardRef(
  (
    {
      children,
      loading,
      success,
      size = "large",
      onClick,
      alignItems = "center",
      justifyContent = "center",
      Icon,
      ...rest
    },
    forwardedRef
  ) => {
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
        ref.current?.blur()
      }
    }, [loading])

    return (
      <Container
        ref={composeRefs(ref, forwardedRef) as any}
        onClick={handleClick}
        size={size}
        // @ts-ignore typings here is not supporting transient props yet
        $loading={loading}
        success={success}
        tabIndex={loading ? -1 : 0}
        display="inline-flex"
        alignItems={alignItems}
        justifyContent={justifyContent}
        {...rest}
      >
        {loading && <Spinner size={size} color="currentColor" />}

        <Text
          lineHeight={1}
          variant={getTextVariant(size)}
          opacity={loading ? 0 : 1}
          display="flex"
          alignItems={alignItems}
          justifyContent={justifyContent}
          width="100%"
        >
          {!success && Icon && (
            <Icon fill="currentColor" mr={0.5} aria-hidden="true" />
          )}

          {success && (
            <CheckIcon fill="currentColor" mr={0.5} aria-hidden="true" />
          )}

          {children}
        </Text>
      </Container>
    )
  }
)

Button.displayName = "Button"

Button.defaultProps = {
  size: "large",
  variant: "primaryBlack",
}

type ContainerProps = Pick<
  ButtonProps,
  "active" | "disabled" | "focus" | "hover" | "loading" | "size" | "success"
>

export const buttonMixin = css`
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  font-weight: normal;
  text-align: center;
  border: 1px solid;
  text-decoration: none;
  transition: color 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;
`

const Container = styled.button<ContainerProps & ButtonProps>`
  ${buttonMixin};

  /* Handle sizing */
  ${variant({ prop: "size", variants: BUTTON_SIZES })}

  ${(props) => {
    // Handle props driven states
    if (props.hover) {
      return variant({ variants: BUTTON_VARIANTS.hover })
    }

    if (props.active) {
      return variant({ variants: BUTTON_VARIANTS.active })
    }

    if (props.success) {
      return variant({ variants: BUTTON_VARIANTS.success })
    }

    if (props.focus) {
      return css`
        outline: 0;
        ${variant({ variants: BUTTON_VARIANTS.focus })}
      `
    }

    if (props.loading) {
      return css`
        cursor: auto;
        transition: none;
        pointer-events: none;
        ${variant({ variants: BUTTON_VARIANTS.loading })}
      `
    }

    if (props.disabled) {
      return css`
        pointer-events: none;
        ${variant({ variants: BUTTON_VARIANTS.disabled })}
      `
    }

    return variant({ variants: BUTTON_VARIANTS.default })
  }}

  ${() => {
    // Handle pseudo classes
    return css`
      @media ${THEME_V3.mediaQueries.hover} {
        &:hover {
          ${variant({ variants: BUTTON_VARIANTS.hover })}
        }
      }

      &:focus {
        outline: 0;
        ${variant({ variants: BUTTON_VARIANTS.focus })}
      }

      &:active {
        ${variant({ variants: BUTTON_VARIANTS.active })}
      }

      &:disabled {
        pointer-events: none;
        ${variant({ variants: BUTTON_VARIANTS.disabled })}
      }
    `
  }};

  ${boxMixin};
`

const getTextVariant = (
  size: ResponsiveValue<ButtonSize>
): TextProps["variant"] => {
  if (typeof size === "string") {
    return BUTTON_TEXT_SIZES[size]
  }

  if (Array.isArray(size)) {
    return size.map((s) => BUTTON_TEXT_SIZES[s!] as TextVariant)
  }

  return BUTTON_TEXT_SIZES.large
}

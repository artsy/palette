import composeRefs from "@seznam/compose-react-refs"
import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import { variant } from "styled-system"
import { CheckIcon } from "../../../svgs"
import { THEME_V3 } from "../../../themes"
import { boxMixin } from "../../Box"
import { Spinner } from "../../Spinner"
import { Text } from "../../Text"
import { ButtonProps } from "../Button"
import { BUTTON_SIZES, BUTTON_TEXT_SIZES, BUTTON_VARIANTS } from "./tokens"

export const ButtonV3: React.ForwardRefExoticComponent<
  ButtonProps & { ref?: React.Ref<HTMLElement> }
> = React.forwardRef(
  (
    {
      children,
      loading,
      success,
      size = "medium",
      onClick,
      alignItems = "center",
      justifyContent = "center",
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
        loading={loading}
        success={success}
        tabIndex={loading ? -1 : 0}
        display="inline-flex"
        alignItems={alignItems}
        justifyContent={justifyContent}
        {...rest}
      >
        {loading && <Spinner size={size} color="currentColor" />}

        {success && <CheckIcon fill="currentColor" mr={0.5} />}

        <Text
          lineHeight={1}
          variant={BUTTON_TEXT_SIZES[size]}
          opacity={loading ? 0 : 1}
          display="flex"
          alignItems={alignItems}
          justifyContent={justifyContent}
          width="100%"
        >
          {children}
        </Text>
      </Container>
    )
  }
)

ButtonV3.displayName = "Button"

ButtonV3.defaultProps = {
  size: "medium",
  variant: "primaryBlack",
}

type ContainerProps = Pick<
  ButtonProps,
  | "active"
  | "disabled"
  | "focus"
  | "hover"
  | "inline"
  | "loading"
  | "size"
  | "success"
>

export const buttonMixin = css`
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  font-weight: normal;
  text-align: center;
  border: 1px solid;
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

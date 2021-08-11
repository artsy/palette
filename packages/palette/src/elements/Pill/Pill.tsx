import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { css } from "styled-components"
import { variant } from "styled-system"
import { DROP_SHADOW, INNER_SHADOW } from "../../helpers/shadow"
import { CheckIcon } from "../../svgs"
import { BoxProps } from "../Box"
import { Clickable, ClickableProps } from "../Clickable"
import { Text } from "../Text"

export const PILL_VARIANT_NAMES = [
  "textRound",
  "textSquare",
  "filter",
  "artist",
] as const

type PillVariant = typeof PILL_VARIANT_NAMES[number]
type PillState = "focus" | "hover" | "active"

const STATES: Record<PillState, any> = {
  hover: css`
    background-color: transparent;
    border-color: transparent;
    box-shadow: ${DROP_SHADOW};
  `,
  focus: css`
    background-color: ${themeGet("colors.black10")};
    border-color: transparent;
    box-shadow: ${INNER_SHADOW};
  `,
  active: css`
    background-color: transparent;
    border-color: ${themeGet("colors.black60")};
  `,
}

const PILL_VARIANTS: Record<PillVariant, BoxProps> = {
  textRound: {
    borderRadius: "15px",
    height: "30px",
    px: 1,
  },
  textSquare: {
    height: "30px",
    px: 1,
  },
  filter: {
    borderRadius: "20px",
    height: "40px",
    px: 2,
  },
  artist: {
    borderRadius: "25px",
    height: "50px",
    pr: 2,
    pl: 1,
  },
}

/** PillProps */
export type PillProps = ClickableProps & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  /** Forces focus state */
  focus?: boolean
  /** Forces hover state */
  hover?: boolean
  /** Swich off focus, hover  */
  disabled?: boolean
} & (
    | {
        variant?: Extract<PillVariant, "textRound" | "textSquare" | "filter">
        /** Forces active state */
        active?: boolean
      }
    | {
        /** `"artist"` pills do not have an `active` state */
        variant?: Extract<PillVariant, "artist">
        /**
         * Optional avatar; 1x or [1x, 2x]
         * Should target 30x30 @1x, 60x60 @2x
         */
        src?: string | [string, string]
      }
  )

const Container = styled(Clickable)<PillProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  border: 1px solid ${themeGet("colors.black15")};
  transition: color 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;

  ${variant({ variants: PILL_VARIANTS })}

  ${(props) => {
    return css`
      ${!props.disabled && props.hover && STATES.hover}
      ${!props.disabled && props.focus && STATES.focus}
      ${"active" in props && props.active && STATES.active}

      &:hover {
        ${!props.disabled && STATES.hover}
      }

      &:focus {
        outline: 0;
        ${!props.disabled && STATES.focus}
      }
    `
  }}
`

const Thumbnail = styled.img`
  display: block;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: ${themeGet("space.1")};
  background-color: ${themeGet("colors.black30")};
`

/**
 * A Pill is a non-CTA button.
 * It may be used for things like active filters, search states,
 * or to denote an artist entity (possibly in the context of a card).
 */
export const Pill: React.FC<PillProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {"active" in rest && rest.active && rest.variant === "filter" && (
        <CheckIcon mr={0.5} />
      )}

      {rest.variant === "artist" && (
        <>
          <Thumbnail
            {...(rest.src
              ? { src: typeof rest.src === "string" ? rest.src : rest.src[0] }
              : {})}
            {...(rest.src && typeof rest.src !== "string" && rest.src[1]
              ? { srcSet: `${rest.src[0]} 1x, ${rest.src[1]} 2x` }
              : {})}
            // Intentionally empty string
            alt=""
          />
        </>
      )}

      <Text variant="xs" lineHeight={1}>
        {children}
      </Text>
    </Container>
  )
}

Pill.defaultProps = {
  variant: "textRound",
}

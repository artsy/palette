import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { css } from "styled-components"
import { CloseIcon, IconProps } from "../../svgs"
import { Clickable, ClickableProps } from "../Clickable"
import { Sup } from "../Sup"
import { Text } from "../Text"
import { PILL_VARIANTS } from "./tokens"

export const PILL_VARIANT_NAMES = [
  "default",
  "search",
  "filter",
  "artist",
  "badge",
] as const

export type PillVariant = typeof PILL_VARIANT_NAMES[number]

export type PillState =
  | "default"
  | "hover"
  | "focus"
  | "active"
  | "selected"
  | "disabled"

/** PillProps */
export type PillProps = ClickableProps & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  /** Forces focus state */
  focus?: boolean
  /** Forces hover state */
  hover?: boolean
  /** Forces active state. This is for working with :active; not denoting a selected state */
  active?: boolean
  /** Forces selected state. Use this state to denote the selected state */
  selected?: boolean
  /** Optional icon slot */
  Icon?: React.FunctionComponent<IconProps>
} & (
    | {
        variant?: Extract<
          PillVariant,
          "default" | "search" | "badge" | "filter"
        >
      }
    | {
        /** `"artist"` pills have an optional `src` */
        variant?: Extract<PillVariant, "artist">
        /**
         * Optional avatar; 1x or [1x, 2x]
         * Should target 30x30 @1x, 60x60 @2x
         */
        src?: string | [string, string]
      }
    | {
        /** `search` pills have an optional `count` */
        variant?: Extract<PillVariant, "search">
        /** Optional count */
        count?: number
      }
  )

/**
 * A Pill is a non-CTA button.
 * It may be used for things like active filters, search states,
 * or to denote an artist entity (possibly in the context of a card).
 */
export const Pill: React.FC<PillProps> = ({ children, Icon, ...rest }) => {
  return (
    <Container {...rest}>
      {rest.variant === "artist" && (
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
      )}

      {Icon && <Icon fill="currentColor" ml={-0.5} mr={0.5} />}

      <Text
        variant={rest.variant === "search" ? ["xs", "sm-display"] : "xs"}
        overflowEllipsis
      >
        <span>{children}</span>

        {rest.variant === "search" && "count" in rest && (
          <>
            {" "}
            <Sup>{rest.count}</Sup>
          </>
        )}
      </Text>

      {((rest.variant === "filter" && !rest.disabled) ||
        (rest.variant === "artist" && rest.selected)) && (
        <CloseIcon fill="currentColor" ml={0.5} width={15} height={15} />
      )}
    </Container>
  )
}

Pill.defaultProps = {
  variant: "default",
}

const Container = styled(Clickable)<PillProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  border: 1px solid ${themeGet("colors.black15")};
  transition: color 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;

  ${(props) => {
    const states = PILL_VARIANTS[props.variant ?? "search"]

    return css`
      ${states.default}
      ${props.focus && states.focus}
      ${props.hover && states.hover}
      ${props.selected && states.selected}
      ${props.active && states.active}
      ${props.disabled && states.disabled}

      &:hover {
        ${states.hover}
      }

      &:focus {
        outline: 0;
        ${states.focus}
        ${props.selected && states.selected}
      }

      &:active {
        ${states.active}
        ${props.selected && states.selected}
      }

      &:disabled {
        pointer-events: none;
        ${states.disabled}
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

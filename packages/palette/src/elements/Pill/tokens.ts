import { themeGet } from "@styled-system/theme-get"
import { css, Interpolation } from "styled-components"
import { Sup } from "../Sup"
import { PillState, PillVariant } from "./Pill"

const DEFAULT_STATES = {
  default: css`
    border-radius: 15px;
    height: 30px;
    padding: 0 ${themeGet("space.2")};
  `,
  focus: css`
    background-color: ${themeGet("colors.mono5")};
    border-color: ${themeGet("colors.mono5")};
    color: ${themeGet("colors.blue100")};
    text-decoration: underline;
  `,
  hover: css`
    background-color: ${themeGet("colors.mono5")};
    border-color: ${themeGet("colors.mono5")};
    color: ${themeGet("colors.blue100")};
    text-decoration: underline;
  `,
  active: css`
    border-color: ${themeGet("colors.blue150")};
    background-color: ${themeGet("colors.blue150")};
    color: ${themeGet("colors.mono0")};
    text-decoration: underline;
  `,
  selected: css`
    border-color: ${themeGet("colors.blue100")};
    background-color: ${themeGet("colors.blue100")};
    color: ${themeGet("colors.mono0")};
  `,
  disabled: css`
    background-color: ${themeGet("colors.mono5")};
    border-color: ${themeGet("colors.mono5")};
    color: ${themeGet("colors.mono60")};
    text-decoration: none;
  `,
}

export const PILL_VARIANTS: Record<
  PillVariant,
  Record<PillState, Interpolation<any>[]>
> = {
  dotted: {
    ...DEFAULT_STATES,
    default: css`
      ${DEFAULT_STATES.default}
      border-style: dashed;
    `,
  },

  default: DEFAULT_STATES,

  search: {
    ...DEFAULT_STATES,
    default: css`
      ${DEFAULT_STATES.default}

      ${Sup} {
        color: ${themeGet("colors.blue100")};
        transition: color 0.25s ease;
        display: none;
      }

      @media (min-width: ${themeGet("breakpoints.0")}) {
        height: 40px;
        border-radius: 20px;

        ${Sup} {
          display: inline;
        }
      }
    `,
    focus: css`
      ${DEFAULT_STATES.focus}
      text-decoration: none;

      span {
        text-decoration: underline;
      }
    `,
    hover: css`
      ${DEFAULT_STATES.hover}
      text-decoration: none;

      span {
        text-decoration: underline;
      }

      ${Sup} {
        color: ${themeGet("colors.blue100")};
      }
    `,
    active: css`
      ${DEFAULT_STATES.active}
      text-decoration: none;

      span {
        text-decoration: underline;
      }

      ${Sup} {
        color: ${themeGet("colors.mono0")};
      }
    `,
    selected: css`
      ${DEFAULT_STATES.selected}

      ${Sup} {
        color: ${themeGet("colors.mono0")};
      }
    `,
    disabled: css`
      ${DEFAULT_STATES.disabled}

      ${Sup} {
        color: ${themeGet("colors.mono60")};
      }
    `,
  },

  filter: {
    default: css`
      height: 30px;
      padding: 0 ${themeGet("space.1")};
    `,
    focus: css`
      text-decoration: underline;
    `,
    hover: css`
      color: ${themeGet("colors.blue100")};
      border-color: ${themeGet("colors.blue100")};
      text-decoration: underline;
    `,
    active: css`
      color: ${themeGet("colors.blue150")};
      border-color: ${themeGet("colors.blue150")};
      text-decoration: underline;
    `,
    selected: css`
      /* Same as default state */
    `,
    disabled: css`
      border-color: ${themeGet("colors.mono60")};
    `,
  },

  badge: {
    default: css`
      border-radius: 15px;
      height: 30px;
      padding: 0 15px;
      background-color: ${themeGet("colors.blue10")};
      border-color: ${themeGet("colors.blue10")};
      color: ${themeGet("colors.blue100")};
    `,
    hover: css`
      background-color: ${themeGet("colors.blue100")};
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.mono0")};
      text-decoration: underline;
    `,
    focus: css`
      background-color: ${themeGet("colors.blue100")};
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.mono0")};
      text-decoration: underline;
    `,
    active: css`
      background-color: ${themeGet("colors.blue150")};
      border-color: ${themeGet("colors.blue150")};
      color: ${themeGet("colors.mono0")};
      text-decoration: underline;
    `,
    selected: css`
      background-color: ${themeGet("colors.blue150")};
      border-color: ${themeGet("colors.blue150")};
      color: ${themeGet("colors.mono0")};
      text-decoration: underline;
    `,
    disabled: css`
      background-color: ${themeGet("colors.blue10")};
      border-color: ${themeGet("colors.blue10")};
      color: ${themeGet("colors.blue100")};
    `,
  },

  profile: {
    ...DEFAULT_STATES,
    default: css`
      border-radius: 25px;
      height: 50px;
      padding: 0 ${themeGet("space.2")} 0 ${themeGet("space.2")};
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
    `,
    active: css`
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
      color: ${themeGet("colors.mono100")};
      text-decoration: underline;
    `,
    selected: css`
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.mono100")};
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
    `,
    disabled: css`
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
      color: ${themeGet("colors.mono60")};
    `,
  },

  gray: {
    default: css`
      border-radius: 15px;
      height: 30px;
      padding: 0 15px;
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
      color: ${themeGet("colors.mono100")};
    `,
    hover: css`
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
      color: ${themeGet("colors.blue100")};
      text-decoration: underline;
    `,
    focus: css`
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
      color: ${themeGet("colors.blue100")};
      text-decoration: underline;
    `,
    active: css`
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
      color: ${themeGet("colors.mono100")};
      text-decoration: underline;
    `,
    selected: css`
      border-color: ${themeGet("colors.blue100")};
      color: ${themeGet("colors.mono100")};
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
    `,
    disabled: css`
      background-color: ${themeGet("colors.mono5")};
      border-color: ${themeGet("colors.mono5")};
      color: ${themeGet("colors.mono60")};
    `,
  },
}

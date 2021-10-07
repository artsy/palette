import React from "react"
import { ResponsiveValue } from "styled-system"
import { useThemeConfig } from "../../Theme"
import { BoxProps } from "../Box"
import { ButtonSize, ButtonVariant } from "./types"
import { ButtonV2 } from "./v2/Button"
import { ButtonV3 } from "./v3/Button"

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
   * ["secondaryGray", "secondaryOutline"]
   * @see {@link ButtonVariant}
   */
  variant?: ResponsiveValue<ButtonVariant>
  /** Size of the button */
  size?: ButtonSize
  /** Displays a loader in the button */
  loading?: boolean
  /** Forces hover state */
  hover?: boolean
  /** Forces focus state */
  focus?: boolean
  /** @deprecated Uses inline style for button (only applicable to v2) */
  inline?: boolean
}

/** A button with various size and color settings */
export const Button: React.ForwardRefExoticComponent<
  ButtonProps & { ref?: React.Ref<HTMLElement> }
> = React.forwardRef((props, forwardedRef) => {
  const Component = useThemeConfig({ v2: ButtonV2, v3: ButtonV3 })
  return <Component ref={forwardedRef} {...props} />
})

Button.displayName = "Button"

Button.defaultProps = {
  size: "medium",
  variant: "primaryBlack",
}

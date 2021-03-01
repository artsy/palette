import React from "react"
import { ResponsiveValue } from "styled-system"
import { useTheme } from "../../Theme"
import { BoxProps } from "../Box"
import { ButtonSize, ButtonVariant } from "./types"
import { ButtonV2 } from "./v2/Button"
import { ButtonV3 } from "./v3/Button"

export interface ButtonProps
  extends BoxProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The theme of the button */
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
export const Button: React.FC<ButtonProps> = (props) => {
  const { theme } = useTheme()

  return theme.id === "v2" ? <ButtonV2 {...props} /> : <ButtonV3 {...props} />
}

Button.defaultProps = {
  size: "medium",
  variant: "primaryBlack",
}

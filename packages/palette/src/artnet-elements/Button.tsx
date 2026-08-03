import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { Button as BaseButton } from "../elements/Button"

/**
 * artnet's sharp-cornered Button, inheriting everything else (variants,
 * sizes, states) from the base Button.
 *
 * Button's own pill-shaped corner radius (15px/25px, baked into its size
 * tokens) is a deliberate shape choice for Artsy, not exposed via
 * theme.radii — this overrides it directly for artnet's sharp-cornered
 * aesthetic rather than changing the shared Button.
 */
export const Button = styled(BaseButton)`
  border-radius: ${themeGet("radii.0")};
`

import {
  Breakpoint as BreakpointV2,
  Color as ColorV2,
  SpacingUnit as SpacingUnitV2,
} from "@artsy/palette-tokens/dist/themes/v2"
import {
  Breakpoint as BreakpointV3,
  Color as ColorV3,
  SpacingUnit as SpacingUnitV3,
} from "@artsy/palette-tokens/dist/themes/v3"

export type Color = ColorV2 | ColorV3
export type SpacingUnit = SpacingUnitV2 | SpacingUnitV3
export type Breakpoint = BreakpointV2 | BreakpointV3

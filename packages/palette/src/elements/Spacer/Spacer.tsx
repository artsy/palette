import React from "react"
import type { BoxProps } from "../../elements/Box"
import { resolveStyleProps } from "../../styles/resolveStyleProps"

export type SpacerProps = {
  x?: BoxProps["ml"]
  y?: BoxProps["mt"]
} & React.HTMLAttributes<HTMLDivElement>

/**
 * Used to inject space where it's needed.
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ x, y, className, style, ...restProps }, ref) => {
    const resolved = resolveStyleProps({
      props: { ml: x, mt: y },
      names: ["ml", "mt"],
    })

    return (
      <div
        {...restProps}
        ref={ref}
        className={[resolved.className, className].filter(Boolean).join(" ")}
        style={{ ...resolved.style, ...style }}
      />
    )
  }
)

Spacer.displayName = "Spacer"

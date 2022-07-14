import React, { forwardRef, useMemo } from "react"
import { flattenChildren } from "../../helpers/flattenChildren"
import { Box, BoxProps } from "../Box"
import { HorizontalOverflow } from "../HorizontalOverflow/HorizontalOverflow"
import { Join } from "../Join"

/** Extends `Box` */
export type BaseTabsProps = BoxProps & {
  /**
   * Enable if tabs should fill the width of the container
   * (as opposed to left-align)
   */
  fill?: boolean
  children: React.ReactNode
}

/** Extends `Box`, provides configurable gutter */
export const BaseTabs: React.ForwardRefExoticComponent<
  BaseTabsProps & React.RefAttributes<HTMLDivElement>
> = forwardRef(({ fill, children, ...rest }, forwardedRef) => {
  const cells = useMemo(() => flattenChildren(children), [children])

  return (
    <HorizontalOverflow
      ref={forwardedRef}
      borderBottom="1px solid"
      borderBottomColor="black10"
      {...rest}
    >
      <Join separator={<></>}>
        {cells.map((child, i) => {
          return (
            <Box
              key={i}
              display="inline-flex"
              textAlign="center"
              flex={fill ? 1 : undefined}
            >
              {child}
            </Box>
          )
        })}
      </Join>
    </HorizontalOverflow>
  )
})

BaseTabs.displayName = "BaseTabs"

import React from "react"
import { splitBoxProps } from "../Box"
import { LazyImage, LazyImageProps } from "../LazyImage"
import { ResponsiveBox, ResponsiveBoxProps } from "../ResponsiveBox"

/** ResponsiveImageProps */
export type ResponsiveImageProps = ResponsiveBoxProps &
  LazyImageProps & {
    lazyLoad?: boolean
  }

/**
 * ResponsiveImage is a LazyImage wrapped in a ResponsiveBox.
 * It scales proportionally when resized below its maxWidth/Height.
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  aspectWidth,
  aspectHeight,
  maxWidth,
  maxHeight,
  lazyLoad = false,
  ...rest
}) => {
  const [responsiveBoxProps, lazyImageProps] = splitBoxProps(rest)

  return (
    <ResponsiveBox
      {...responsiveBoxProps}
      aspectWidth={aspectWidth}
      aspectHeight={aspectHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    >
      <LazyImage
        width="100%"
        height="100%"
        preload={!lazyLoad}
        {...lazyImageProps}
      />
    </ResponsiveBox>
  )
}

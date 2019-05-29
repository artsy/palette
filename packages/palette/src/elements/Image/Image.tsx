import React from "react"
import {
  BaseImage,
  BaseResponsiveImage,
  ImageProps,
  ResponsiveImageProps,
} from "./Image.shared"
import { LazyImage } from "./LazyImage"

/** Props for a web-only Image component. */
interface WebImageProps extends ImageProps {
  preventRightClick?: boolean
}

/** A web-only Image component. */
export const Image = ({
  lazyLoad = false,
  preventRightClick = false,
  ...props
}: WebImageProps) => {
  return (
    <LazyImage
      preload={!lazyLoad}
      imageComponent={BaseImage}
      {...props}
      onContextMenu={e => preventRightClick && e.preventDefault()}
    />
  )
}

/** A web-only ResponsiveImage component. */
export const ResponsiveImage = ({
  lazyLoad = false,
  ...props
}: ResponsiveImageProps) => (
  <LazyImage
    preload={!lazyLoad}
    imageComponent={BaseResponsiveImage}
    {...props}
  />
)

export { LazyImage }

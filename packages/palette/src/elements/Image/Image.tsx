import React from "react"
import {
  BaseImage,
  BaseResponsiveImage,
  ImageProps,
  ResponsiveImageProps,
} from "./Image.shared"
import { LazyImage } from "./LazyImage"

interface WebImageProps extends ImageProps {
  preventRightClick?: boolean
}

/** Image */
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

/** ResponsiveImage */
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

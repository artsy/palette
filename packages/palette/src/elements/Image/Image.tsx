import React from "react"
import {
  BaseImage,
  BaseResponsiveImage,
  ImageProps,
  ResponsiveImageProps,
} from "./Image.shared"
import { LazyImage } from "./LazyImage"

/** Image */
export const Image = ({ lazyLoad = false, ...props }: ImageProps) => (
  <LazyImage preload={!lazyLoad} imageComponent={BaseImage} {...props} />
)

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

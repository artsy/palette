import React from "react"
import {
  BaseImage,
  BaseResponsiveImage,
  ImageProps,
  ResponsiveImageProps,
} from "./Image.shared"
import { LazyImage } from "./LazyImage"

export const Image = ({ lazyLoad, ...props }: ImageProps) => (
  <LazyImage preload={!lazyLoad} imageComponent={BaseImage} {...props} />
)

export const ResponsiveImage = ({
  lazyLoad,
  ...props
}: ResponsiveImageProps) => (
  <LazyImage
    preload={!lazyLoad}
    imageComponent={BaseResponsiveImage}
    {...props}
  />
)

import React from "react"
import styled from "styled-components"
import {
  borderRadius,
  BorderRadiusProps,
  compose,
  maxHeight,
  MaxHeightProps,
  space,
  SpaceProps,
} from "styled-system"
import { LazyImage } from "./LazyImage"

type NativeImgProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "width" | "height"
> & {
  width?: string | number | null
  height?: string | number | null
}

export interface ImageProps
  extends NativeImgProps,
    SpaceProps,
    MaxHeightProps,
    BorderRadiusProps {
  /** Flag for if image should be lazy loaded */
  lazyLoad?: boolean
  /** Flag indicating that right clicks should be prevented */
  preventRightClick?: boolean
}

export const BaseImage = styled.img<ImageProps>`
  ${compose(space, maxHeight, borderRadius)}
`

/** A web-only Image component. */
export const Image = ({
  lazyLoad = false,
  preventRightClick = false,
  ...rest
}: ImageProps) => {
  return (
    <LazyImage
      preload={!lazyLoad}
      imageComponent={BaseImage}
      onContextMenu={(e) => preventRightClick && e.preventDefault()}
      {...rest}
    />
  )
}

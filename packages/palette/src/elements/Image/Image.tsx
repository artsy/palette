import React from "react"
import styled from "styled-components"
import {
  borderRadius,
  BorderRadiusProps,
  compose,
  height,
  HeightProps,
  maxHeight,
  MaxHeightProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system"
import { CleanTag } from "../CleanTag"
import { LazyImage } from "./LazyImage"

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height">,
    SpaceProps,
    WidthProps,
    HeightProps,
    MaxHeightProps,
    BorderRadiusProps {
  /** Flag for if image should be lazy loaded */
  lazyLoad?: boolean
  /** Flag indicating that right clicks should be prevented */
  preventRightClick?: boolean
}

// @ts-expect-error  MIGRATE_STRICT_MODE
export const BaseImage = styled(CleanTag.as("img"))<ImageProps>`
  ${compose(space, width, height, maxHeight, borderRadius)}
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

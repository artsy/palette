import React from "react"
import { useThemeConfig } from "../../../Theme"
import { ImageProps } from "../../Image"
import { TriptychCard as TriptychCardV2 } from "./v2"
import { TriptychCard as TriptychCardV3 } from "./v3"
import { BoxProps } from "../../Box"

type ImageAttributes =
  | [ImageProps]
  | [ImageProps, ImageProps]
  | [ImageProps, ImageProps, ImageProps]
type ImageStrings = [string] | [string, string] | [string, string, string]
type Images = ImageAttributes | ImageStrings

export interface TriptychCardProps extends BoxProps {
  /** 1, 2, or 3 images */
  images: Images
  title?: string
  subtitle?: string
  status?: string
}

export const isArrayOfStrings = (images: Images): images is ImageStrings =>
  [...images].every((src) => typeof src === "string")

/**
 * `TriptychCard` is a card with a layout one square image on the left,
 * one tall or two square images on the right, and text for title and subtitle
 * at the bottom.
 */
export const TriptychCard: React.FC<TriptychCardProps> = (props) => {
  const Component = useThemeConfig({ v2: TriptychCardV2, v3: TriptychCardV3 })
  return <Component {...props} />
}

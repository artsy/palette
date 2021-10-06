import React from "react"
import { useThemeConfig } from "../../../Theme"
import { ImageProps } from "../../Image"
import { Card as CardV2 } from "./v2"
import { Card as CardV3 } from "./v3"
import { BoxProps } from "../../Box"

export interface CardProps extends BoxProps {
  image: string | ImageProps
  title?: string | null
  subtitle?: string | null
  status?: string | null
}

/**
 * `Card` is a card with one image one tall image, and text for title and subtitle
 * at the bottom.
 */
export const Card: React.FC<CardProps> = (props) => {
  const Component = useThemeConfig({ v2: CardV2, v3: CardV3 })
  return <Component {...props} />
}

import React from "react"
import { useThemeConfig } from "../../../Theme"
import { ImageProps } from "../../Image"
import { MediumCard as MediumCardV2 } from "./v2"
import { MediumCard as MediumCardV3 } from "./v3"
import { BoxProps } from "../../Box"

export interface MediumCardProps extends BoxProps {
  image: string | ImageProps
  title?: string
  subtitle?: string
  status?: string
}

/**
 * `MediumCard` is a card with one image one tall image, and text for title and subtitle
 * at the bottom.
 */
export const MediumCard: React.FC<MediumCardProps> = (props) => {
  const Component = useThemeConfig({ v2: MediumCardV2, v3: MediumCardV3 })
  return <Component {...props} />
}

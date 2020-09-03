import React from "react"
import { CardTagProps } from "./CardTag"

export interface LargeCardProps {
  image: string
  title: string
  subtitle?: string
  tag?: CardTagProps
}

/**
 * `Large` is a card with one image one tall image, and text for title and subtitle
 * at the bottom.
 */
export const LargeCard: React.FC<LargeCardProps> = ({}) => {
  return null
}

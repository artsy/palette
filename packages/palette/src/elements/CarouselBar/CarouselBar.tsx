import React from "react"
import { ProgressBar, ProgressBarProps } from "../ProgressBar"

export type CarouselBarProps = ProgressBarProps

export const CarouselBar: React.FC<CarouselBarProps> = (props) => {
  return (
    <ProgressBar
      height="1px"
      highlight="black100"
      mt={0}
      mb={0}
      transition="transform 250ms"
      {...props}
    />
  )
}

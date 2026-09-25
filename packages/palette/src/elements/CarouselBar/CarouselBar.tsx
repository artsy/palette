import React from "react"
import { ProgressBar, ProgressBarProps } from "../ProgressBar"

export type CarouselBarProps = ProgressBarProps

export const CarouselBar: React.FC<
  React.PropsWithChildren<CarouselBarProps>
> = (props) => {
  return (
    <ProgressBar
      aria-label="Carousel progress"
      height="1px"
      highlight="mono100"
      mt={0}
      mb={0}
      transition="transform 250ms"
      {...props}
    />
  )
}

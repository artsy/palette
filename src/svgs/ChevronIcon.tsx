import React from "react"
import { Flex } from "../elements"
import { color } from "../helpers"

type Direction = "left" | "right" | "up" | "down"

// TODO: This is for backwards compat with Volt; need to update there
export enum Rotation {
  LEFT = "rotate(0)",
  RIGHT = "rotate(180deg)",
  UP = "rotate(90deg)",
  DOWN = "rotate(270deg)",
}

interface IconProps {
  direction?: Direction | Rotation
  fill?: string
  height?: number
  width?: number
}

/** Icon */
export const ChevronIcon = ({
  direction = "right",
  fill = color("black100"),
  height = 10,
  width = 10,
}: IconProps) => {
  const Left = <path d="M27.3 34.7L17.6 25l9.7-9.7 1.4 1.4-8.3 8.3 8.3 8.3z" />
  const Right = <path d="M22.7 34.7l-1.4-1.4 8.3-8.3-8.3-8.3 1.4-1.4 9.7 9.7z" /> // prettier-ignore
  const Up = <path d="M33.3 28.7L25 20.4l-8.3 8.3-1.4-1.4 9.7-9.7 9.7 9.7z" />
  const Down = <path d="M25 32.4l-9.7-9.7 1.4-1.4 8.3 8.3 8.3-8.3 1.4 1.4z" />

  return (
    <Flex
      style={{ transform: "scale(2)" }}
      justifyContent="center"
      alignItems="center"
      width={width}
      height={height}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        fill={fill}
        width={width}
        height={height}
      >
        {(() => {
          switch (direction) {
            case Rotation.LEFT:
              return Left
            case Rotation.RIGHT:
              return Right
            case Rotation.UP:
              return Up
            case Rotation.DOWN:
              return Down
            case "left":
              return Left
            case "right":
              return Right
            case "up":
              return Up
            case "down":
              return Down
            default:
              return Right
          }
        })()}
      </svg>
    </Flex>
  )
}

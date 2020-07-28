import React from "react"

import { ArrowDownIcon } from "./ArrowDownIcon"
import { ArrowLeftIcon } from "./ArrowLeftIcon"
import { ArrowRightIcon } from "./ArrowRightIcon"
import { ArrowUpIcon } from "./ArrowUpIcon"
import { IconProps } from "./Icon"

type Direction = "left" | "right" | "up" | "down"

// TODO: This is for backwards compat with Volt; need to update there
export enum Rotation {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

const ROTATION_MAP = {
  [Rotation.LEFT]: ArrowLeftIcon,
  [Rotation.RIGHT]: ArrowRightIcon,
  [Rotation.UP]: ArrowUpIcon,
  [Rotation.DOWN]: ArrowDownIcon,
} as const

const DIRECTION_MAP = {
  left: ArrowLeftIcon,
  right: ArrowRightIcon,
  up: ArrowUpIcon,
  down: ArrowDownIcon,
} as const

interface ChevronProps extends IconProps {
  direction?: Direction | Rotation
}

/** ChevronIcon */
export const ChevronIcon: React.FC<ChevronProps> = ({
  direction = "right",
  ...props
}) => {
  const Arrow =
    ROTATION_MAP[direction as Rotation] || DIRECTION_MAP[direction as Direction]
  return <Arrow {...props} />
}

import React, { FC } from "react"
import { IconProps } from "./Icon"
import { IncreaseIcon } from "./IncreaseIcon"

export const DecreaseIcon: FC<IconProps> = ({
  title = "Decrease",
  ...props
}) => <IncreaseIcon {...props} title="Decrease" transform="rotate(180, 5, 5)" />

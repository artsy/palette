import { Sup } from "@artsy/palette"
import React from "react"

interface Props {
  status: "wip" | "tk"
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const color = status === "wip" ? "brand" : "black60"

  return (
    <Sup color={color} textTransform="uppercase">
      {status}
    </Sup>
  )
}

import { Box, Sans } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface Props {
  status: "wip" | "tk"
}

const getStatus = status => {
  switch (status) {
    case "wip": {
      return {
        bg: "purple5",
        color: "purple100",
      }
    }
    default: {
      return {
        bg: "black5",
        color: "black60",
      }
    }
  }
}

export const StatusBadge: React.SFC<Props> = ({ status }) => {
  const { bg, color } = getStatus(status)

  return (
    <RoundedBorder px={0.3} display="inline-block" bg={bg}>
      <Sans size="1" color={color}>
        {status.toUpperCase()}
      </Sans>
    </RoundedBorder>
  )
}

const RoundedBorder = styled(Box)`
  border-radius: 2px;
`

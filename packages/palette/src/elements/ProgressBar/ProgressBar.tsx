import React from "react"
import styled from "styled-components"

import { color, space } from "../../helpers"

const ProgressBarBackground = styled.div`
  height: 3px;
  background-color: ${color("black10")};
  margin: ${space(0.5)}px 0 ${space(1)}px;
  display: flex;
  justify-content: flex-start;
`

/** ProgressBar */
export const ProgressBar: React.SFC<{
  percentComplete: number
  highlight: Parameters<typeof color>[0]
}> = ({ percentComplete, highlight = "purple100" }) => {
  return (
    <ProgressBarBackground>
      <div
        style={{
          transition: "width 0.34s ease",
          backgroundColor: color(highlight as any),
          width: Math.round(percentComplete) + "%",
        }}
      />
    </ProgressBarBackground>
  )
}

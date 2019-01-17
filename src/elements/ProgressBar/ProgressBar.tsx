import moment from "moment"
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

export const ProgressBar: React.SFC<{
  currentTime: string
  countdownStart: string
  countdownEnd: string
  highlight: Parameters<typeof color>[0]
}> = ({
  currentTime,
  countdownStart,
  countdownEnd,
  highlight = "purple100",
}) => {
  const secondsRemaining = moment(countdownEnd).diff(
    moment(currentTime),
    "seconds"
  )
  const totalSeconds = moment(countdownEnd).diff(
    moment(countdownStart),
    "seconds"
  )
  const progress = Math.max(0, (secondsRemaining * 100) / totalSeconds)

  return (
    <ProgressBarBackground>
      <div
        style={{
          transition: "width 0.34s ease",
          backgroundColor: color(highlight as any),
          width: progress + "%",
        }}
      />
    </ProgressBarBackground>
  )
}

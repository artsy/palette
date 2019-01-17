import moment from "moment"
import React from "react"

import { ProgressBar } from "../"
import { color } from "../../helpers"

export const ProgressBarTimer: React.SFC<{
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

  return <ProgressBar percentComplete={progress} highlight={highlight as any} />
}

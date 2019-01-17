import { DateTime } from "luxon"
import React from "react"

import { Sans } from "../"
import { color } from "../../helpers"

const pad = (n: number) => n.toString().padStart(2, "0")

export const TimeRemaining: React.SFC<{
  currentTime: string
  countdownEnd: string
  highlight: Parameters<typeof color>[0]
}> = ({ currentTime, countdownEnd, highlight = "purple100" }) => {
  const timeRemaining = DateTime.fromISO(countdownEnd).diff(
    DateTime.fromISO(currentTime)
  )
  const shiftedTimeRemaining = timeRemaining.shiftTo(
    "days",
    "hours",
    "minutes",
    "seconds"
  )

  return (
    <Sans size="3" color={highlight} weight="medium">
      {Math.floor(timeRemaining.milliseconds) <= 0 ? (
        "0 days"
      ) : (
        <>
          {shiftedTimeRemaining.days > 0 &&
            pad(shiftedTimeRemaining.days) + "d "}
          {shiftedTimeRemaining.hours > 0 &&
            pad(shiftedTimeRemaining.hours) + "h "}
          {shiftedTimeRemaining.minutes > 0 &&
            pad(shiftedTimeRemaining.minutes) + "m "}
          {pad(shiftedTimeRemaining.seconds) + "s"}
        </>
      )}
      <span> left</span>
    </Sans>
  )
}

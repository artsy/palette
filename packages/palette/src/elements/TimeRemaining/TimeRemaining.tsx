import { DateTime, Duration } from "luxon"
import React from "react"
import { Sans } from "../"
import { color } from "../../helpers"

const pad = (n: number) => n.toString().padStart(2, "0")

/** TimeRemaining */
export const TimeRemaining: React.SFC<{
  currentTime: string
  countdownEnd: string
  highlight: Parameters<typeof color>[0]
}> = ({ currentTime, countdownEnd, highlight = "purple100" }) => {
  const timeRemaining = Duration.fromISO(
    DateTime.fromISO(countdownEnd)
      .diff(DateTime.fromISO(currentTime))
      .toString()
  )

  return (
    <Sans size="3" color={highlight} weight="medium">
      {Math.floor(timeRemaining.seconds) <= 0 ? (
        "0 days"
      ) : (
        <>
          {Math.floor(timeRemaining.as("days")) > 0 &&
            pad(Math.floor(timeRemaining.as("days"))) + "d "}
          {Math.floor(timeRemaining.as("hours")) > 0 &&
            pad(Math.floor(timeRemaining.as("hours") % 24)) + "h "}
          {Math.floor(timeRemaining.as("minutes")) > 0 &&
            pad(Math.floor(timeRemaining.as("minutes") % 60)) + "m "}
          {pad(Math.floor(timeRemaining.as("seconds") % 60)) + "s"}
        </>
      )}
      <span> left</span>
    </Sans>
  )
}

import moment from "moment"
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
  const timeRemaining = moment.duration(
    moment(countdownEnd).diff(moment(currentTime))
  )

  return (
    <Sans size="3" color={highlight} weight="medium">
      {Math.floor(timeRemaining.asSeconds()) <= 0 ? (
        "0 days"
      ) : (
        <>
          {timeRemaining.days() > 0 && pad(timeRemaining.days()) + "d "}
          {timeRemaining.hours() > 0 && pad(timeRemaining.hours()) + "h "}
          {timeRemaining.minutes() > 0 && pad(timeRemaining.minutes()) + "m "}
          {pad(timeRemaining.seconds()) + "s"}
        </>
      )}
      <span> left</span>
    </Sans>
  )
}

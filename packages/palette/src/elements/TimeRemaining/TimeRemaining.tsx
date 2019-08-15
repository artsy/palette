import { DateTime, Duration } from "luxon"
import React from "react"
import { Flex, Sans } from "../"
import { color } from "../../helpers"
import { useCurrentTime } from "../../utils/useCurrentTime"

function padWithZero(num: number) {
  return num.toString().padStart(2, "0")
}

/** TimeRemaining */
export const TimeRemaining: React.SFC<{
  countdownEnd: string
  labelWithTimeRemaining?: string
  labelWithoutTimeRemaining?: string
  timeEndedDisplayText?: string
  trailingText?: string
  currentTime?: string | DateTime
  highlight: Parameters<typeof color>[0]
}> = ({
  countdownEnd,
  highlight = "purple100",
  labelWithTimeRemaining,
  labelWithoutTimeRemaining,
  timeEndedDisplayText,
  trailingText,
  currentTime,
}) => {
  const duration = Duration.fromISO(
    DateTime.fromISO(countdownEnd)
      .diff(useCurrentTime(currentTime))
      .toString()
  )

  const hasEnded = Math.floor(duration.seconds) <= 0

  const days = `${padWithZero(Math.max(0, Math.floor(duration.as("days"))))}d `
  const hours = `${padWithZero(
    Math.max(0, Math.floor(duration.as("hours") % 24))
  )}h `
  const minutes = `${padWithZero(
    Math.max(0, Math.floor(duration.as("minutes") % 60))
  )}m `
  const seconds = `${padWithZero(
    Math.max(0, Math.floor(duration.as("seconds") % 60))
  )}s`

  return (
    <Flex flexDirection="column" alignItems="center">
      <Sans size="3" color={highlight} weight="medium">
        {hasEnded && timeEndedDisplayText ? (
          timeEndedDisplayText
        ) : (
          <>
            {days}
            {hours}
            {minutes}
            {seconds}
            {trailingText && ` ${trailingText}`}
          </>
        )}
      </Sans>
      {(labelWithTimeRemaining || labelWithoutTimeRemaining) && (
        <Sans size="3" weight="medium">
          {hasEnded ? labelWithoutTimeRemaining : labelWithTimeRemaining}
        </Sans>
      )}
    </Flex>
  )
}

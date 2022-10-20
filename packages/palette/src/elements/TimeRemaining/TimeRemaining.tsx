import { DateTime, Duration } from "luxon"
import React from "react"
import { useCurrentTime } from "../../utils/useCurrentTime"
import { Flex } from "../Flex"
import { Text } from "../Text"

function padWithZero(num: number) {
  return num.toString().padStart(2, "0")
}

/**
 * TimeRemaining
 * @deprecated
 */
export const TimeRemaining: React.FC<{
  countdownEnd: string
  currentTime?: string | DateTime
  highlight: string
  labelWithoutTimeRemaining?: string
  labelWithTimeRemaining?: string
  timeEndedDisplayText?: string
  trailingText?: string
}> = ({
  countdownEnd,
  currentTime,
  highlight = "brand",
  labelWithoutTimeRemaining,
  labelWithTimeRemaining,
  timeEndedDisplayText,
  trailingText,
}) => {
  const duration = Duration.fromISO(
    DateTime.fromISO(countdownEnd).diff(useCurrentTime(currentTime)).toString()
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
      <Text variant="sm" color={highlight} fontWeight="bold">
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
      </Text>

      {(labelWithTimeRemaining || labelWithoutTimeRemaining) && (
        <Text variant="sm" fontWeight="bold">
          {hasEnded ? labelWithoutTimeRemaining : labelWithTimeRemaining}
        </Text>
      )}
    </Flex>
  )
}

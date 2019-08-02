import { DateTime, Duration } from "luxon"
import React, { useState } from "react"
import { Flex, Sans } from "../"
import { color } from "../../helpers"
import { useInterval } from "../../utils/useInterval"

function padWithZero(num: number) {
  return num.toString().padStart(2, "0")
}

const SEPARATOR = <>&nbsp;&nbsp;</>

/** TimeRemaining */
export const TimeRemaining: React.SFC<{
  endDate: string
  labelWithTimeRemaining?: string
  labelWithoutTimeRemaining?: string
  timeEndedDisplayText?: string
  trailingText?: string
  highlight: Parameters<typeof color>[0]
}> = ({
  endDate,
  highlight = "purple100",
  labelWithTimeRemaining,
  labelWithoutTimeRemaining,
  timeEndedDisplayText,
  trailingText,
}) => {
  const [duration, setDuration] = useState(
    Duration.fromISO(
      DateTime.fromISO(endDate)
        .diff(DateTime.local())
        .toString()
    )
  )

  useInterval(() => {
    setDuration(
      Duration.fromISO(
        DateTime.fromISO(endDate)
          .diff(DateTime.local())
          .toString()
      )
    )
  }, 1000)

  const hasEnded = Math.floor(duration.seconds) <= 0

  return (
    <Flex flexDirection="column" alignItems="center">
      <Sans size="3" color={highlight} weight="medium">
        {hasEnded && timeEndedDisplayText ? (
          timeEndedDisplayText
        ) : (
          <>
            {padWithZero(Math.max(0, Math.floor(duration.as("days"))))}d
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("hours") % 24)))}h
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("minutes") % 60)))}m
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("seconds") % 60)))}s
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

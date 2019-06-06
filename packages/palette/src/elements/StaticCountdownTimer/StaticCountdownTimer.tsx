import { DateTime } from "luxon"
import React from "react"
import {
  Flex,
  ProgressBarTimer,
  Sans,
  Spacer,
  StackableBorderBox,
  TimeRemaining,
} from "../"

import { TimerIcon } from "../../svgs"

const FIVE_HOURS_IN_SECONDS = 60 * 60 * 5

/** StaticCountdownTimer */
export const StaticCountdownTimer: React.SFC<{
  action: string
  note: string
  countdownStart: string
  countdownEnd: string
  currentTime: string
}> = ({ action, note, countdownEnd, countdownStart, currentTime }) => {
  const dateTime = DateTime.fromISO(countdownEnd).toLocal()
  const minutes = dateTime.minute < 10 ? "0" + dateTime.minute : dateTime.minute
  const amPm = dateTime.hour >= 12 ? "pm" : "am"
  let hour
  if (dateTime.hour > 12) {
    hour = dateTime.hour - 12
  } else if (dateTime.hour === 0) {
    hour = 12
  } else {
    hour = dateTime.hour
  }
  const time = `${hour}:${minutes}${amPm}`
  const actionDeadline = `${dateTime.monthShort} ${dateTime.day}, ${time} ${
    dateTime.offsetNameShort
  }`

  const highlight =
    DateTime.fromISO(countdownEnd).diff(
      DateTime.fromISO(currentTime),
      "seconds"
    ).seconds < FIVE_HOURS_IN_SECONDS
      ? "red100"
      : "purple100"

  return (
    <StackableBorderBox flexDirection="column">
      <Flex justifyContent="flex-start">
        <TimerIcon
          width="14"
          height="17"
          fill={highlight}
          style={{ marginTop: "1.5px" }}
        />
        <Spacer mr="7px" />
        <TimeRemaining
          countdownEnd={countdownEnd}
          currentTime={currentTime}
          highlight={highlight}
        />
      </Flex>
      <ProgressBarTimer
        countdownStart={countdownStart}
        countdownEnd={countdownEnd}
        currentTime={currentTime}
        highlight={highlight}
      />
      <Sans size="2" weight="medium" color="black100">
        {action} by {actionDeadline}
      </Sans>
      <Sans size="2" color="black60">
        {note}
      </Sans>
    </StackableBorderBox>
  )
}

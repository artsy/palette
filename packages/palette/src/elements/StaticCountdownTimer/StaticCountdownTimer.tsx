import { DateTime } from "luxon"
import React from "react"
import { TimerIcon } from "../../svgs/TimerIcon"
import { useCurrentTime } from "../../utils/useCurrentTime"
import { Flex } from "../Flex"
import { ProgressBarTimer } from "../ProgressBarTimer"
import { Spacer } from "../Spacer"
import { StackableBorderBox } from "../StackableBorderBox"
import { Text } from "../Text"
import { TimeRemaining } from "../TimeRemaining"

const FIVE_HOURS_IN_SECONDS = 60 * 60 * 5

/**
 * StaticCountdownTimer
 * @deprecated
 */
export const StaticCountdownTimer: React.FC<{
  action: string
  note: string
  countdownStart: string
  countdownEnd: string
  currentTime?: string
}> = ({ action, note, countdownEnd, countdownStart, currentTime }) => {
  const endDateTime = DateTime.fromISO(countdownEnd).toLocal()
  const minutes =
    endDateTime.minute < 10 ? "0" + endDateTime.minute : endDateTime.minute
  const amPm = endDateTime.hour >= 12 ? "pm" : "am"
  let hour
  if (endDateTime.hour > 12) {
    hour = endDateTime.hour - 12
  } else if (endDateTime.hour === 0) {
    hour = 12
  } else {
    hour = endDateTime.hour
  }

  const time = `${hour}:${minutes}${amPm}`
  const actionDeadline = `${endDateTime.monthShort} ${endDateTime.day}, ${time} ${endDateTime.offsetNameShort}`

  const highlight =
    endDateTime.diff(
      DateTime.fromISO(useCurrentTime(currentTime).toString()),
      "seconds"
    ).seconds < FIVE_HOURS_IN_SECONDS
      ? "red100"
      : "brand"

  return (
    <StackableBorderBox flexDirection="column">
      <Flex justifyContent="flex-start">
        <TimerIcon
          width="14"
          height="17"
          fill={highlight}
          style={{ marginTop: "1.5px" }}
        />
        <Spacer x="7px" />
        <TimeRemaining
          countdownEnd={countdownEnd}
          highlight={highlight}
          currentTime={useCurrentTime(currentTime)}
          timeEndedDisplayText="0 days left"
          trailingText="left"
        />
      </Flex>
      <ProgressBarTimer
        countdownStart={countdownStart}
        countdownEnd={countdownEnd}
        currentTime={useCurrentTime(currentTime)}
        highlight={highlight}
      />
      <Text variant="xs" fontWeight="bold" color="black100">
        {action} by {actionDeadline}
      </Text>
      <Text variant="xs" color="black60">
        {note}
      </Text>
    </StackableBorderBox>
  )
}

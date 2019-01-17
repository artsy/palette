// FIXME: Consider switching from Moment.js to a lighter library like Luxon
// https://moment.github.io/luxon
import moment from "moment-timezone"
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

export const StaticCountdownTimer: React.SFC<{
  action: string
  note: string
  countdownStart: string
  countdownEnd: string
  currentTime: string
}> = ({ action, note, countdownEnd, countdownStart, currentTime }) => {
  const actionDeadline = moment(countdownEnd)
    .tz(moment.tz.guess())
    .format("MMM DD, h:mm A z")

  const highlight =
    moment(countdownEnd).diff(moment(currentTime), "seconds") <
    FIVE_HOURS_IN_SECONDS
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

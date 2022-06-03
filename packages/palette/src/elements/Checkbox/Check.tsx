import React from "react"
import styled from "styled-components"
import { CheckIcon } from "../../svgs"
import { getThemeConfig, useThemeConfig } from "../../Theme"
import { Box } from "../Box"
import { CHECK_STATES as V2_STATES } from "./tokens/v2"
import { CHECK_STATES as V3_STATES } from "./tokens/v3"

export interface CheckProps {
  disabled?: boolean
  error?: boolean
  hover?: boolean
  focus?: boolean
  selected?: boolean
}

/** Toggeable check mark */
export const Check: React.FC<CheckProps> = ({
  disabled,
  selected,
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: { border: 1 },
    v3: { border: "1px solid" },
  })

  return (
    <Container
      mr={1}
      border={tokens.border}
      disabled={disabled}
      selected={selected}
      {...rest}
    >
      <CheckIcon aria-hidden fill={"currentColor" as any} />
    </Container>
  )
}

const Container = styled(Box)<CheckProps>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.25s, border-color 0.25s, color 0.25s;

  ${(props) => {
    const modes = getThemeConfig(props, {
      v2: V2_STATES,
      v3: V3_STATES,
    })

    const mode = (() => {
      switch (true) {
        case props.focus:
          return modes.focus
        case props.hover:
          return modes.hover
        case props.error:
          return modes.error
        case props.disabled:
          return modes.disabled
        default:
          return modes.default
      }
    })()

    return props.selected ? mode.selected : mode.resting
  }};
`

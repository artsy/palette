import React from "react"
import styled from "styled-components"
import { Icon } from "./Icon"

/** Icon */
export const ClosedEyeIcon = ({
  width = 20,
  height = 20,
  className = "",
  ...props
}) => (
  <StyledClosedEye
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    className={className}
    {...props}
  >
    <path
      fill="#c2c2c2"
      d="M4.5,6s0,0,0,.08L6.07,4.51H6A1.5,1.5,0,0,0,4.5,6Z"
    />
    <path
      fill="#c2c2c2"
      d="M3.68,6.91A2.54,2.54,0,0,1,3.5,6,2.5,2.5,0,0,1,6,3.5a2.54,2.54,0,0,1,.91.18L8.19,2.4A6.14,6.14,0,0,0,6,2,6.75,6.75,0,0,0,0,6,7.9,7.9,0,0,0,2,8.56Z"
    />
    <path
      fill="#c2c2c2"
      d="M9.57,3.14l.78-.79-.7-.7-8,8,.7.7,1-1A6.08,6.08,0,0,0,6,10a6.75,6.75,0,0,0,6-4A7.67,7.67,0,0,0,9.57,3.14ZM6,8.5a2.46,2.46,0,0,1-1.37-.42l.73-.73a1.49,1.49,0,0,0,2-2l.73-.73A2.46,2.46,0,0,1,8.5,6,2.5,2.5,0,0,1,6,8.5Z"
    />
  </StyledClosedEye>
)

const StyledClosedEye = styled(Icon)`
  vertical-align: middle;
`

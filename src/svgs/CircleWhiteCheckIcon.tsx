import React, { Component } from "react"
import { Icon, IconProps } from "./Icon"

interface CircleWhiteCheckIconProps extends IconProps {
  width: number | string
  height: number | string
}

/** Icon */
export class CircleWhiteCheckIcon extends Component<CircleWhiteCheckIconProps> {
  render() {
    const { width, height, ...rest } = this.props

    return (
      <Icon
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 26 27"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <g stroke="#000" fill="none" fillRule="evenodd">
          <ellipse cx="13" cy="13.5" rx="12.5" ry="13" />
          <path
            strokeWidth="2"
            strokeLinecap="square"
            d="M8 14.3l3.21 3.34 6-6.22"
          />
        </g>
      </Icon>
    )
  }
}

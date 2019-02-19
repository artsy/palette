import React, { Component } from "react"
import { Icon } from "./Icon"

/** Icon */
export class CircleBlackCheckIcon extends Component<any> {
  render() {
    const { width, height, ...rest } = this.props

    return (
      <Icon
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 26 26"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <g fill="none" fillRule="evenodd">
          <circle cx="13" cy="13" r="13" fill="#000" />
          <path
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="square"
            d="M8 13.77L11.21 17l6-5.99"
          />
        </g>
      </Icon>
    )
  }
}

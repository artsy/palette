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
        <g fill="none" fill-rule="evenodd">
          <circle cx="13" cy="13" r="13" fill="#000" />
          <path
            stroke="#FFF"
            stroke-width="2"
            stroke-linecap="square"
            d="M8 13.77L11.21 17l6-5.99"
          />
        </g>
      </Icon>
    )
  }
}

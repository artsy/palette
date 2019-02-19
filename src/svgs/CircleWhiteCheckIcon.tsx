import React, { Component } from "react"
import { Icon } from "./Icon"

/** Icon */
export class CircleWhiteCheckIcon extends Component<any> {
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
        <g id="QA" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="following-" stroke="#000000">
            <g id="Group-Copy">
              <g id="Group-3">
                <ellipse id="Oval-73" cx="13" cy="13.5" rx="12.5" ry="13" />
              </g>
              <polyline
                id="Path-245"
                strokeWidth="2"
                strokeLinecap="square"
                points="8 14.3047524 11.2145042 17.6428914 17.2039552 11.4230769"
              />
            </g>
          </g>
        </g>
      </Icon>
    )
  }
}

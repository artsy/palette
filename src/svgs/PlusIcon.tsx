import React, { Component } from "react"
import { Icon } from "./Icon"

/** Icon */
export class PlusIcon extends Component<any> {
  render() {
    const { width, height, ...rest } = this.props
    return (
      <Icon
        width={width}
        height={height}
        viewBox="0 0 26 27"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <g transform="translate(0 .38)" fill="none" fillRule="evenodd">
          <circle fill="#000" cx="13" cy="13" r="13" />
          <g fill="#FFF">
            <path d="M12 7h2v12h-2z" />
            <path d="M19 12v2H7v-2z" />
          </g>
        </g>
      </Icon>
    )
  }
}

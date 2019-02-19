import React, { Component } from "react"
import { Icon } from "./Icon"

/** Icon */
export class HelpIcon extends Component {
  render() {
    return (
      <Icon
        className="icon__help"
        height="17px"
        width="17px"
        viewBox="0 0 17 17"
        xmlns="http://www.w3.org/2000/svg"
        {...this.props}
      >
        <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
          <circle stroke="#666" fill="#FFF" cx="7.5" cy="7.5" r="7.5" />
          <path
            d="M7.92 11.13V9.94H6.73v1.19h1.19zM7.8 9.04v-.18c0-1.74 2.2-2.03 2.2-3.8C10 3.68 8.8 3 7.61 3 6.33 3 5.01 3.82 5 5.47h1.05c0-1.18.76-1.65 1.5-1.65.7 0 1.33.4 1.33 1.25 0 .45-.25.9-.71 1.29-1.13.98-1.32 1.34-1.35 2.48v.2h.98z"
            fill="#666"
          />
        </g>
      </Icon>
    )
  }
}

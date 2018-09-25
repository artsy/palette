import React from "react"
import styled from "styled-components"

import { BorderBox } from "./BorderBox"
import { Sans } from "./Typography"

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`

const Tip = styled(BorderBox)`
  background: white;
  bottom: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  left: 50%;
  margin-bottom: 5px;
  opacity: 0;
  position: absolute;
  text-align: left;
  transform: translate(-50%);
  transition: opacity 250ms ease-out;
  width: 230px;

  &:hover {
    cursor: default;
  }

  &.active {
    opacity: 1;

    &:hover {
      opacity: 0;
    }
  }
`

export interface TooltipProps {
  content: string
  small: boolean
}

/**
 * A tooltip
 */
export class Tooltip extends React.Component<TooltipProps> {
  state = { active: false }

  handleClick = () => {
    this.setState({ active: !this.state.active })
  }

  handleMouseOver = () => {
    this.setState({ active: true })
  }

  handleMouseOut = () => {
    this.setState({ active: false })
  }

  render() {
    const content = formattedTip(this.props.content)
    return (
      <Wrapper
        onClick={this.handleClick}
        onMouseOut={this.handleMouseOut}
        onMouseOver={this.handleMouseOver}
      >
        <Tip
          className={this.state.active && "active"}
          p={this.props.small ? 0.5 : 2}
        >
          <Sans size={"2"}>{content}</Sans>
        </Tip>
        {this.props.children}
      </Wrapper>
    )
  }
}

const formattedTip = tip => {
  let substring = tip.substring(0, 300)

  if (substring !== tip) {
    substring += "..."
  }

  return substring
}

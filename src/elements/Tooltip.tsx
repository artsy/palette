import React from "react"
import styled from "styled-components"

import { BorderBox } from "./BorderBox"
import { Sans } from "./Typography"

const Wrapper = styled.div`
  position: relative;

  &:hover {
    .tooltip-content {
      opacity: 1;

      &:hover {
        cursor: default;
        opacity: 0;
      }
    }
  }
`

const Tip = styled(BorderBox)`
  bottom: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  opacity: 0;
  position: absolute;
  transition: opacity 250ms ease-out;
  max-width: 230px;
`

export interface TooltipProps {
  content: string
}

export class Tooltip extends React.Component<TooltipProps> {
  render() {
    return (
      <Wrapper>
        <Tip className="tooltip-content">
          <Sans size={"2"}>{this.props.content}</Sans>
        </Tip>
        {this.props.children}
      </Wrapper>
    )
  }
}

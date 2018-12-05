import React from "react"
import styled from "styled-components"

import { Box } from "../Box"
import { Sans } from "../Typography"

import { CloseIcon } from "../../svgs"

const Target = styled.div`
  height: 30px;
  padding: 9px;
  position: absolute;
  top: 11px;
  right: 11px;
  width: 30px;

  &:hover {
    cursor: pointer;
  }

  svg {
    display: block;
  }
`

const Wrapper = styled(Box)`
  transition: background-color 250ms linear;
`

const CloseButton = ({ onClick }) => {
  return (
    <Target onClick={onClick}>
      <CloseIcon fill="white100" />
    </Target>
  )
}

export interface BannerProps {
  dismissable: boolean
  message: string
  backgroundColor: string
}

/**
 * A banner
 */
export class Banner extends React.Component<BannerProps> {
  static defaultProps = {
    dismissable: false,
    backgroundColor: "red100",
  }

  state = {
    dismissed: false,
  }

  handleCloseClick = () => {
    this.setState({ dismissed: true })
  }

  render() {
    if (this.state.dismissed) return null
    const showCloseButton = this.props.dismissable
    const textAlignment = showCloseButton ? "left" : "center"
    const paddingRight = showCloseButton ? 6 : 2

    return (
      <Wrapper
        bg={this.props.backgroundColor}
        color="white100"
        p={2}
        position="relative"
        pr={paddingRight}
        textAlign={textAlignment}
      >
        <Sans size="2">{this.props.message}</Sans>
        {showCloseButton && <CloseButton onClick={this.handleCloseClick} />}
      </Wrapper>
    )
  }
}

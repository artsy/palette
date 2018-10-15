import React from "react"
import styled from "styled-components"

import { space } from "../../helpers"
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
}

/**
 * A banner
 */
export class Banner extends React.Component<BannerProps> {
  static defaultProps = {
    dismissable: false,
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

    return (
      <Box
        bg="red100"
        color="white100"
        p={space(2)}
        pr={space(6)}
        position="relative"
        textAlign={showCloseButton ? "left" : "center"}
      >
        <Sans size="2">{this.props.message}</Sans>
        {showCloseButton && <CloseButton onClick={this.handleCloseClick} />}
      </Box>
    )
  }
}

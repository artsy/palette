import React from "react"
import styled from "styled-components"

import { space } from "../../helpers"
import { Box } from "../Box"
import { Sans } from "../Typography"

import { CloseIcon } from "../../svgs"

const Target = styled.div`
  height: 30px;
  margin: 0 auto ${space(1)}px;
  padding: 9px;
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
        position="relative"
        textAlign="center"
      >
        {showCloseButton && <CloseButton onClick={this.handleCloseClick} />}
        <Sans size="2">{this.props.message}</Sans>
      </Box>
    )
  }
}

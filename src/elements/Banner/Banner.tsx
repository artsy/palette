import React from "react"
import styled from "styled-components"

import { space } from "../../helpers"
import { Box } from "../Box"
import { Sans } from "../Typography"

const Target = styled.div`
  height: 30px;
  position: absolute;
  right: 11px;
  top: 11px;
  width: 30px;

  &:hover {
    cursor: pointer;
  }
`

const CloseButton = ({ onClick }) => {
  return <Target onClick={onClick}>X</Target>
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
        <Sans size="2">{this.props.message}</Sans>
        {showCloseButton && <CloseButton onClick={this.handleCloseClick} />}
      </Box>
    )
  }
}

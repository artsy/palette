import React from "react"
import styled from "styled-components"
import { CloseIcon } from "../../svgs"
import { Box } from "../Box"
import { Sans } from "../Typography"

const Target = styled.div`
  padding-left: 10px;
  cursor: pointer;

  svg {
    display: block;
  }
`

const Wrapper = styled(Box)`
  transition: background-color 250ms linear;
  display: flex;
`

const TextWrapper = styled(Box)`
  width: 100%;
  text-align: center;
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

    return (
      <Wrapper bg={this.props.backgroundColor} color="white100" p={1}>
        <TextWrapper>
          <Sans size="2">{this.props.message}</Sans>
        </TextWrapper>
        {showCloseButton && <CloseButton onClick={this.handleCloseClick} />}
      </Wrapper>
    )
  }
}

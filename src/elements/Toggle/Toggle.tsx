import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { ChevronIcon, Flex, Sans, Separator } from "../../"
import { SansSize } from "../../Theme"

export interface ToggleProps {
  disabled?: boolean
  expanded?: boolean
  label?: string
  textSize?: SansSize
}

export interface ToggleState {
  disabled: boolean
  expanded: boolean
}

/** A toggle component used to show / hide / expand content  */
export class Toggle extends React.Component<ToggleProps> {
  static defaultProps = {
    textSize: "2",
  }

  state = {
    expanded: false,
    disabled: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...props,
    }
  }

  toggleExpand = () => {
    if (!this.props.disabled) {
      this.setState({
        expanded: !this.state.expanded,
      })
    }
  }

  render() {
    const { disabled, expanded } = this.state

    return (
      <Flex width="100%" flexDirection="column">
        <Separator mb={2} />
        <Header mt="-6px" onClick={this.toggleExpand} disabled={disabled}>
          <Flex justifyContent="space-between" alignItems="center">
            <Sans
              size={this.props.textSize as SansSize}
              weight="medium"
              color="black100"
              mt={0.3}
            >
              {this.props.label}
            </Sans>
            {!disabled && (
              <Flex justifyContent="right">
                <ChevronIcon direction={expanded ? "up" : "down"} right={-5} />
              </Flex>
            )}
          </Flex>
        </Header>
        {expanded && (
          <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
            {this.props.children}
          </Flex>
        )}
      </Flex>
    )
  }
}

const Header = styled.div.attrs<ToggleProps & SpaceProps>({})`
  cursor: pointer;
  padding-bottom: 16px;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  user-select: none;
  ${space};
`

Header.displayName = "Header"

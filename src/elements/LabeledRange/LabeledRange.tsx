import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { Flex, Sans, Separator, Serif, Slider, SliderProps } from "../"

interface LabeledRangeProps extends SliderProps {
  label: string
  disabled?: boolean
  formatter?: (min, max, maxIndicator) => string
}

interface LabeledRangeState {
  min: number
  max: number
}

export class LabeledRange extends React.Component<
  LabeledRangeProps,
  LabeledRangeState
> {
  static defaultProps = {
    disabled: false,
  }

  state = {
    min: this.props.defaultValue[0],
    max: this.props.defaultValue[1],
  }

  componentWillReceiveProps(newProps: LabeledRangeProps) {
    const [min, max] = newProps.defaultValue
    this.setState({
      min,
      max,
    })
  }

  updateMinMax = ([min, max]) => {
    this.setState({ min, max })
  }

  maxIndicator() {
    return this.props.max === this.state.max ? "+" : ""
  }

  toString() {
    const { min, max } = this.state

    return `${min} - ${max}${this.maxIndicator()}`
  }

  render() {
    const { formatter, label } = this.props
    const { min, max } = this.state

    return (
      <Flex width="100%" flexDirection="column">
        <Separator mb={2} />
        <Header mt="-6px">
          <Flex justifyContent="space-between">
            <Sans size="2" weight="medium" color="black100" mt={0.3}>
              {label}
            </Sans>
            <Serif size="2" color="black60" mt={0.3}>
              {formatter
                ? formatter(min, max, this.maxIndicator())
                : this.toString()}
            </Serif>
          </Flex>
        </Header>

        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          <SliderContainer>
            <Slider
              disabled={this.props.disabled}
              my={1}
              mx={1}
              {...this.props}
              onChange={minMax => {
                this.updateMinMax(minMax)
              }}
            />
          </SliderContainer>
        </Flex>
      </Flex>
    )
  }
}

const Header = styled.div.attrs<SpaceProps>({})`
  cursor: pointer;
  padding-bottom: 16px;
  user-select: none;
  ${space};
`

const SliderContainer = styled.div`
  width: 100%;
`

Header.displayName = "Header"

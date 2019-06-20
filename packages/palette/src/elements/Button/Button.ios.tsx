import React, { Component } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { animated, Spring } from "react-spring/renderprops-native.cjs"
import styled from "styled-components/native"
import { themeProps } from "../../Theme"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spinner } from "../Spinner"
import { Sans } from "../Typography"
import {
  ButtonProps,
  defaultSize,
  defaultVariant,
  getColorsForVariant,
} from "./Button.shared"

enum DisplayState {
  Enabled = "default",
  Highlighted = "hover",
  Disabled = "default",
}

interface ButtonState {
  previous: DisplayState
  current: DisplayState
}

/** A button with various size and color settings */
export class Button extends Component<ButtonProps, ButtonState> {
  static defaultProps = {
    size: defaultSize,
    variant: defaultVariant,
    theme: themeProps,
  }

  state = {
    previous: DisplayState.Enabled,
    current: DisplayState.Enabled,
  }

  getSize(): { height: number; size: "2" | "3t"; px: number } {
    switch (this.props.size) {
      case "small":
        return { height: 26, size: "2", px: 1 }
      case "medium":
        return { height: 41, size: "3t", px: 2 }
      case "large":
        return { height: 50, size: "3t", px: 3 }
    }
  }

  get loadingStyles() {
    const { inline, loading } = this.props

    if (!loading) {
      return {}
    }

    if (inline) {
      return {
        backgroundColor: "transparent",
        color: "transparent",
        borderWidth: 0,
      }
    }

    const { purple100 } = themeProps.colors

    return {
      backgroundColor: purple100,
      borderColor: purple100,
      color: "transparent",
    }
  }

  get spinnerColor() {
    const { inline, variant } = this.props

    if (inline) {
      return variant === "primaryWhite" ? "white100" : "black100"
    }

    return "white100"
  }

  onPress = args => {
    if (this.props.onPress) {
      // Did someone tap really fast? Flick the highlighted state
      const { current } = this.state

      if (this.state.current === DisplayState.Enabled) {
        this.setState({
          previous: current,
          current: DisplayState.Highlighted,
        })
        setTimeout(
          () =>
            this.setState({
              previous: current,
              current: DisplayState.Enabled,
            }),
          0.3
        )
      } else {
        // Was already selected
        this.setState({ current: DisplayState.Enabled })
      }

      this.props.onPress(args)
    }
  }

  render() {
    const { children, loading, disabled, inline, ...rest } = this.props
    const { px, size, height } = this.getSize()
    const variantColors = getColorsForVariant(this.props.variant)
    const opacity = this.props.disabled ? 0.1 : 1.0

    const { current, previous } = this.state

    const from = variantColors[previous]
    const to = variantColors[current]

    return (
      <Spring native from={from} to={to}>
        {props => (
          <TouchableWithoutFeedback
            onPress={this.onPress}
            onPressIn={() => {
              this.setState({
                previous: DisplayState.Enabled,
                current: DisplayState.Highlighted,
              })
            }}
            onPressOut={() => {
              this.setState({
                previous: DisplayState.Highlighted,
                current: DisplayState.Enabled,
              })
            }}
            disabled={disabled}
          >
            <Flex flexDirection="row">
              <AnimatedContainer
                {...rest}
                loading={loading}
                disabled={disabled}
                style={{ ...props, ...this.loadingStyles, height, opacity }}
                px={px}
              >
                <Sans
                  weight="medium"
                  size={size}
                  color={this.loadingStyles.color || to.color}
                >
                  {children}
                </Sans>

                {loading && (
                  <Spinner size={this.props.size} color={this.spinnerColor} />
                )}
              </AnimatedContainer>
            </Flex>
          </TouchableWithoutFeedback>
        )}
      </Spring>
    )
  }
}

/** Base props that construct button */

const Container = styled(Box)<ButtonProps>`
  align-items: center;
  justify-content: center;
  border-width: 1;
  border-radius: 3;
  width: ${p => (p.block ? "100%" : "auto")};
`

const AnimatedContainer = animated(Container)

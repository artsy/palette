import { isString } from "lodash"
import React, { Component } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { Text, TouchableWithoutFeedback } from "react-native"
import { DisplayProps } from "styled-system"
import truncate from "trunc-html"
import { Box } from "../Box"

export interface ReadMoreProps extends DisplayProps {
  isExpanded?: boolean
  maxChars?: number
  onReadMoreClicked?: () => void
  content: string | JSX.Element
  renderer?: React.ComponentType
}

export interface ReadMoreState {
  isExpanded: boolean
}

/** ReadMore */
export class ReadMore extends Component<ReadMoreProps, ReadMoreState> {
  private html: string

  state = {
    isExpanded: true,
  }

  static defaultProps = {
    isExpanded: false,
    maxChars: Infinity,
  }

  constructor(props) {
    super(props)

    this.html = isString(props.content)
      ? props.content
      : renderToStaticMarkup(<>{props.content}</>)

    const RE = /(<([^>]+)>)/gi // Strip HTML tags to get innerText char count
    const { length } = this.html.replace(RE, "") //

    const isExpanded = props.isExpanded || length < props.maxChars

    this.state = {
      isExpanded,
    }
  }

  expandText() {
    this.setState(
      {
        isExpanded: true,
      },
      () => {
        this.props.onReadMoreClicked && this.props.onReadMoreClicked()
      }
    )
  }

  getContent() {
    if (this.state.isExpanded) {
      return this.html
    } else {
      return truncate(this.html, this.props.maxChars).html
    }
  }

  render() {
    const content = this.getContent()

    const isExpanded = this.state.isExpanded || this.props.isExpanded

    const InnerRenderer = this.props.renderer
      ? (this.props.renderer as any)
      : Box

    return (
      <>
        <InnerRenderer>{content}</InnerRenderer>
        {!isExpanded && (
          <TouchableWithoutFeedback onPress={this.expandText.bind(this)}>
            <Text>Read more</Text>
          </TouchableWithoutFeedback>
        )}
      </>
    )
  }
}

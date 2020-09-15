import React, { Component } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import styled from "styled-components"
import { DisplayProps } from "styled-system"
import truncate from "trunc-html"
import { Clickable, ClickableProps } from "../Clickable"
import { Text } from "../Text"

export interface ReadMoreProps extends DisplayProps {
  content: string | JSX.Element
  disabled?: boolean
  isExpanded?: boolean
  maxChars?: number
  onReadMoreClicked?: () => void
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

    this.html =
      typeof props.content === "string"
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
    if (this.props.disabled) {
      return
    }

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

    return (
      <Container onClick={this.expandText.bind(this)} isExpanded={isExpanded}>
        <span
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />

        {!this.state.isExpanded && <ReadMoreLink>Read more</ReadMoreLink>}
      </Container>
    )
  }
}

const ReadMoreLink: React.FC<ClickableProps> = ({ children, ...rest }) => {
  return (
    <>
      {" "}
      <Clickable
        aria-expanded="false"
        cursor="pointer"
        textDecoration="underline"
        {...rest}
      >
        <Text variant="mediumText">{children}</Text>
      </Clickable>
    </>
  )
}

const Container = styled.div<ReadMoreState>`
  cursor: ${p => (p.isExpanded ? "auto" : "pointer")};

  > span > *:last-child {
    display: inline;
  }
`

Container.displayName = "Container"

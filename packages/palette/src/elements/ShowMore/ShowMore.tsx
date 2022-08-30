import React, { Children, isValidElement, useState } from "react"
import { Clickable, ClickableProps, splitClickableProps } from "../Clickable"
import { Text, TextProps } from "../Text"

export interface ShowMoreProps
  extends ClickableProps,
    Pick<TextProps, "variant"> {
  children: React.ReactNode
  initial?: number
  expanded?: boolean
  hideText?: string
  showMoreText?: string
}

export const INITIAL_ITEMS_TO_SHOW = 6

export const ShowMore: React.FC<ShowMoreProps> = ({
  initial = INITIAL_ITEMS_TO_SHOW,
  children,
  expanded = false,
  hideText = "Hide",
  showMoreText = "Show more",
  ...rest
}) => {
  const [isExpanded, setExpanded] = useState(expanded)
  const nodes = Children.toArray(children).filter(isValidElement)
  const hasMore = nodes.length > initial

  const [clickableProps, { variant }] = splitClickableProps(rest)

  return (
    <>
      {isExpanded ? nodes : nodes.slice(0, initial)}

      {hasMore && (
        <Clickable
          onClick={() => setExpanded((visibility) => !visibility)}
          {...clickableProps}
        >
          <Text variant={variant}>{isExpanded ? hideText : showMoreText}</Text>
        </Clickable>
      )}
    </>
  )
}

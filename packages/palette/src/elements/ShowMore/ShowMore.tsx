import React, { Children, isValidElement, useState } from "react"
import { Clickable } from "../Clickable"
import { Text } from "../Text"

export interface ShowMoreProps {
  children: React.ReactNode
  initial?: number
  expanded?: boolean
}

export const INITIAL_ITEMS_TO_SHOW = 6

export const ShowMore: React.FC<ShowMoreProps> = ({
  initial = INITIAL_ITEMS_TO_SHOW,
  children,
  expanded = false,
}) => {
  const [isExpanded, setExpanded] = useState(expanded)
  const nodes = Children.toArray(children).filter(isValidElement)
  const hasMore = nodes.length > initial

  return (
    <>
      {isExpanded ? nodes : nodes.slice(0, initial)}

      {hasMore && (
        <Clickable
          mt={1}
          textDecoration="underline"
          textAlign="left"
          onClick={() => setExpanded((visibility) => !visibility)}
        >
          <Text variant="xs">{isExpanded ? "Hide" : "Show more"}</Text>
        </Clickable>
      )}
    </>
  )
}

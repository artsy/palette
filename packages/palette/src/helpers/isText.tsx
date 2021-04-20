import React, { ReactNode } from "react"

const REACT_FRAGMENT_TYPE = (<></>).type

/**
 * Check whether a `children` prop is text — e.g. just a string (or interpolated string)
 */
export const isText = (children: ReactNode) => {
  // If children is an object, it may be simple, just wrapped in a fragment(s)
  // `><>Example</><`
  if (
    !!children &&
    typeof children === "object" &&
    "type" in children &&
    children.type === REACT_FRAGMENT_TYPE
  ) {
    return isText(children.props.children)
  }

  // Non-fragment interpolated children is an array:
  // `>Exmaple ({2 + 2})<` => ["Example (", 4, ")"]
  if (Array.isArray(children)) {
    return children.every(isText)
  }

  return typeof children === "string" || typeof children === "number"
}

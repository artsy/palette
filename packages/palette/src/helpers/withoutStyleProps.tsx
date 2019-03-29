import React from "react"

/**
 * A wrapper that removes style related props so that they don't get rendered
 * as attributes in the dom
 */
export const withoutStyleProps = Component => ({
  borderRadius,
  ariaLabel,
  color,
  fontFamily,
  ...props
}) => <Component {...props} />

import React from "react"

/**
 * Convert a fragment or nested fragment into an array of elements
 */
export const flattenChildren = <T extends React.ReactElement>(
  children: React.ReactNode
): T[] => {
  const xs = React.Children.toArray(children).filter(React.isValidElement)

  // @ts-expect-error  MIGRATE_STRICT_MODE
  return xs.reduce((acc, child: T) => {
    if (child.type === React.Fragment) {
      return acc.concat(flattenChildren(child.props.children))
    }

    return [...acc, child]
  }, [] as T[])
}

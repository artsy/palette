import React from "react"
import { flattenChildren } from "../../helpers/flattenChildren"

interface JoinProps {
  separator: React.ReactElement<any>
}

/**
 * `Join` is a higher order component that renders a separator component
 * between each of `Join`'s direct children.
 *
 * @example
 *
 *  <Join separator={<SomeComponent/>}>
 *    <child1/>
 *    <child2/>
 *    <child3/>
 *  </Join>
 *
 * which renders
 *
 * <child1/>
 * <SomeComponent/>
 * <child2/>
 * <SomeComponent/>
 * <child3/>
 */
export const Join: React.FC<JoinProps> = ({ separator, children }) => {
  const elements = flattenChildren(children)

  return (
    <>
      {elements.reduce((acc, element, index) => {
        // Prefer provided child key, fallback to index
        const key = typeof element.key !== "undefined" ? element.key : index

        acc.push(React.cloneElement(element, { key }))

        if (index !== elements.length - 1) {
          acc.push(separator && React.cloneElement(separator, { key }))
        }

        return acc
      }, [] as typeof elements)}
    </>
  )
}

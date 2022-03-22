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
      {elements.reduce((acc, element, currentIndex) => {
        acc.push(
          // @ts-expect-error  MIGRATE_STRICT_MODE
          React.cloneElement(element, {
            key: `join-${currentIndex}`,
          })
        )

        if (currentIndex !== elements.length - 1) {
          acc.push(
            // @ts-expect-error  MIGRATE_STRICT_MODE
            separator &&
              React.cloneElement(separator, {
                key: `join-sep-${currentIndex}`,
              })
          )
        }

        return acc
      }, [])}
    </>
  )
}

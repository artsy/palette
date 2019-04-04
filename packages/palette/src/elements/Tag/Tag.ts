/**
 * Derived from @jxnblk's clean-tag
 */
import React, { ComponentClass, FunctionComponent } from "react"
import { styles, StylesProps } from "styled-system"
import { View } from "../../platform/primitives"

const allPropTypes: Partial<StylesProps> = Object.keys(styles)
  .filter(key => typeof styles[key] === "function")
  .reduce(
    (a: Partial<StylesProps>, key) => Object.assign(a, styles[key].propTypes),
    {}
  )

/**
 * The default set of props to remove from components rendered by styled-components
 */
export const omitProps = [...Object.keys(allPropTypes), "theme"]

/**
 * Removes entries from an object based on a list of keys
 */
export const omit = (obj: object, keys: string[]) => {
  const next = {}
  for (const key in obj) {
    if (keys.indexOf(key) > -1) continue
    next[key] = obj[key]
  }
  return next
}

type ComponentSpecifier = string | FunctionComponent<any> | ComponentClass<any>

export interface TagProps {
  omitFromProps?: string[]
  is?: ComponentSpecifier
}

const tagName = tag =>
  typeof tag === "string" ? tag : tag.displayName || tag.name || tag.toString()

function tagBuilder(tag: ComponentSpecifier = View) {
  const TagComponent = React.forwardRef<any, TagProps>(
    ({ is: BaseTag = tag, omitFromProps = omitProps, ...props }, ref) =>
      React.createElement(BaseTag, {
        ref,
        ...omit(props, omitProps),
      })
  )
  TagComponent.displayName = `Clean.${tagName(tag)}`
  return TagComponent
}

const DefaultTag = tagBuilder()

/**
 * An element to be used to prevent unwanted props from passing through
 * styled-components to the DOM
 *
 * @example
 *
 * const Component = styled(Tag)`
 *   ${borderRadius};
 * `
 *
 * const Component2 = styled(Tag.as('span'))`
 *  ${background};
 * `
 */
export const Tag: typeof DefaultTag & {
  as?: typeof tagBuilder
} = DefaultTag

Tag.as = tagBuilder

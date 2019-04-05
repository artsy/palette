/**
 * Derived from @jxnblk's clean-tag
 * https://github.com/styled-system/extras/tree/master/packages/clean-tag
 *
 * The MIT License (MIT)
 * Copyright (c) 2017-2019 Brent Jackson
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React, { ComponentClass, FunctionComponent } from "react"
import { styles, StylesProps } from "styled-system"
import { View } from "../../platform/primitives"

const allPropTypes: Partial<StylesProps> = Object.keys(styles)
  .filter(key => typeof styles[key] === "function")
  .reduce(
    (styleProps: Partial<StylesProps>, key) => ({
      ...styleProps,
      ...styles[key].propTypes,
    }),
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
        ...omit(props, omitFromProps),
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

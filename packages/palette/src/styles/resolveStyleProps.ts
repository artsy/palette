import type { CSSProperties } from "react"
import { dynamicClasses } from "./dynamic.css"
import {
  Declaration,
  resolveDeclarations,
  STYLE_PROP_NAMES,
  StylePropName,
} from "./resolveDeclarations"
import { tokenClasses } from "./sprinkles.css"
import { dynamicVarName, STYLE_PROPERTIES, TokenScale } from "./styleProperties"
import { vars } from "./vars.css"

const STYLE_PROP_NAME_SET = new Set<string>(STYLE_PROP_NAMES)

// styled-system lets a later shorthand reset an earlier longhand, but class
// order cannot follow prop order, so the reset longhand is dropped instead.
const isResetLater = ({
  declaration,
  index,
  declarations,
}: {
  declaration: Declaration
  index: number
  declarations: Declaration[]
}) => {
  return declarations.slice(index + 1).some((later) => {
    return (
      later.breakpoint === declaration.breakpoint &&
      STYLE_PROPERTIES[later.property].covers.includes(declaration.property)
    )
  })
}

const TOKEN_VARS: Record<TokenScale, Record<string, string>> = {
  space: vars.space,
  colors: vars.color,
}

const tokenClassFor = ({ breakpoint, property, token }: Declaration) => {
  if (!token) return undefined
  return tokenClasses[breakpoint][property]?.[token.key]
}

// A token without a class still reads its theme variable, so dark mode works.
const dynamicValueFor = ({ value, token }: Declaration) => {
  if (!token) return value
  return TOKEN_VARS[token.scale][token.key]
}

export interface ResolvedStyleProps<P> {
  className: string
  style: CSSProperties
  rest: Omit<P, StylePropName>
}

/**
 * Turns the style props listed in `names` into utility class names plus the
 * inline variables the dynamic classes read. Every style prop name is removed
 * from `rest`. Pure: the same props always give the same output.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const resolveStyleProps = <P extends object>({
  props,
  names,
}: {
  props: P
  names: readonly StylePropName[]
}): ResolvedStyleProps<P> => {
  const entries = Object.entries(props)
  const styleProps = Object.fromEntries(
    entries.filter(([name]) => names.includes(name as StylePropName))
  )
  const rest = Object.fromEntries(
    entries.filter(([name]) => !STYLE_PROP_NAME_SET.has(name))
  ) as Omit<P, StylePropName>

  const declarations = resolveDeclarations(styleProps).filter(
    (declaration, index, all) => {
      return !isResetLater({ declaration, index, declarations: all })
    }
  )

  const classNames: string[] = []
  const style: Record<string, string> = {}

  declarations.forEach((declaration) => {
    const tokenClass = tokenClassFor(declaration)
    if (tokenClass) {
      classNames.push(tokenClass)
      return
    }

    const { breakpoint, property } = declaration
    classNames.push(dynamicClasses[breakpoint][property])
    style[dynamicVarName({ property, breakpoint })] = dynamicValueFor(
      declaration
    )
  })

  return { className: classNames.join(" "), style, rest }
}

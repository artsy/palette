import { styleFn } from "styled-system"

/**
 * Allows you to pass in a styled-system function and split out
 * in a typesafe manner, the props that match and do not match
 * the styled function.
 */
export const splitProps = <T>(mixin: styleFn) => {
  const propNames = mixin.propNames || []
  const re = new RegExp(`^(${propNames.join("|")})$`)

  return <U extends Record<string, unknown>>(
    props: U
  ): [T, Omit<U, keyof T>] => {
    const leftProps = {} as T
    const rightProps = {} as Omit<U, keyof T>

    for (const key of Object.keys(props)) {
      if (propNames.length === 0 || re.test(key)) {
        leftProps[key] = props[key]
      } else {
        rightProps[key] = props[key]
      }
    }

    return [leftProps, rightProps]
  }
}

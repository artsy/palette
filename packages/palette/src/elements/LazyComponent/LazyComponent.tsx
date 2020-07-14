import React from "react"
import { IntersectionOptions, useInView } from "react-intersection-observer"
import styled from "styled-components"

const Placeholder = styled.span`
  display: inline-block;
`

/** LazyComponentProps */
export type LazyComponentProps = {
  children: React.ReactNode
} & IntersectionOptions

/** LazyComponent */
export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  ...rest
}) => {
  const [sentinelRef, inView] = useInView({ triggerOnce: true, ...rest })
  return <>{inView ? children : <Placeholder ref={sentinelRef as any} />}</>
}

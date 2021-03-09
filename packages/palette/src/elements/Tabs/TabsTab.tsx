import React from "react"
import styled from "styled-components"
import { BaseTab } from "../BaseTabs"
import { Clickable, ClickableProps } from "../Clickable"
import { Sans } from "../Typography"

export interface TabsTabProps extends ClickableProps {
  active: boolean
  index: number
}

/**
 * Visual tab button
 */
export const TabsTab: React.FC<TabsTabProps> = ({
  active,
  children,
  index: _index, // Passed but ignored unless needed in custom component
  ...rest
}) => {
  return (
    <Clickable {...rest}>
      <BaseTab active={active}>{children}</BaseTab>
    </Clickable>
  )
}

// TODO: Support count directly
const SupWrapper = styled.sup`
  margin-left: 2px;
`

/** Embeddable sup container */
export const Sup: React.FC = ({ children }) => (
  <SupWrapper>
    <Sans size="1" weight="medium" display="inline">
      {children}
    </Sans>
  </SupWrapper>
)

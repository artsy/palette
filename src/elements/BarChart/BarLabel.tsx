import React from "react"
import styled from "styled-components"
import { space } from "../../helpers"
import { Flex, FlexProps } from "../Flex"
import { Sans } from "../Typography"

const BarLabelWrapper = styled(Flex)`
  padding: ${space(0.5)}px ${space(1)}px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  white-space: nowrap;
`

export interface BarLabelProps extends FlexProps {
  title: React.ReactNode
  description: React.ReactNode
}

// tslint:disable-next-line:completed-docs
export function isBarLabelProps(obj: any): obj is BarLabelProps {
  const result =
    obj &&
    typeof obj === "object" &&
    obj.hasOwnProperty("title") &&
    obj.hasOwnProperty("description")
  return result
}

/**
 * BarLabel is the default content format for a label on a BarChart.
 * @param props
 */
export const BarLabel = ({ title, description, ...others }: BarLabelProps) => (
  <BarLabelWrapper {...others}>
    <Sans weight="medium" size="2">
      {title}
    </Sans>
    <Sans color={"black60"} size="2">
      {description}
    </Sans>
  </BarLabelWrapper>
)

import React, { useState } from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { SansSize } from "../../Theme"
import { Flex } from "../Flex"
import { Separator } from "../Separator"
import { Sans } from "../Typography"

export interface ToggleProps {
  chevronSize?: number
  disabled?: boolean
  expanded?: boolean
  label?: string | JSX.Element
  textSize?: SansSize
  /**
   * Adds the ability to render a set of components by the chevron for
   * secondary actions such as clearing filters
   */
  renderSecondaryAction?: (
    toggleProps: Pick<ToggleProps, "disabled" | "expanded" | "textSize">
  ) => JSX.Element
}

export interface ToggleState {
  disabled: boolean
  expanded: boolean
}

/** A toggle component used to show / hide / expand content  */
export const Toggle: React.FC<ToggleProps> = ({
  label,
  textSize = "2",
  chevronSize = 12,
  expanded: defaultExpanded,
  disabled,
  children,
  renderSecondaryAction,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const toggleExpand = () => {
    if (!disabled) {
      setExpanded((prevExpanded) => !prevExpanded)
    }
  }

  return (
    <Flex width="100%" flexDirection="column" pb={2}>
      <Separator mb={2} />
      <Header onClick={toggleExpand} disabled={disabled}>
        <Flex justifyContent="space-between" alignItems="center">
          {typeof label === "string" ? (
            <Sans
              size={textSize as SansSize}
              weight="medium"
              color="black100"
              my={0.5}
            >
              {label}
            </Sans>
          ) : (
            label
          )}

          <Flex justifyContent="right" alignItems="center">
            {renderSecondaryAction &&
              renderSecondaryAction({ disabled, expanded, textSize })}

            <ChevronIcon
              style={{ visibility: disabled ? "hidden" : "visible" }}
              direction={expanded ? "up" : "down"}
              width={chevronSize}
              height={chevronSize}
              ml={1}
            />
          </Flex>
        </Flex>
      </Header>

      {expanded && children && (
        <Flex flexDirection="column" alignItems="left">
          {children}
        </Flex>
      )}
    </Flex>
  )
}

const Header = styled.div<ToggleProps & SpaceProps>`
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  user-select: none;
  ${space};
`

Header.displayName = "Header"

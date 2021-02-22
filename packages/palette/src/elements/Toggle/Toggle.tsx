import React, { useState } from "react"
import styled from "styled-components"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { SansSize } from "../../Theme"
import { Clickable } from "../Clickable"
import { Flex, FlexProps } from "../Flex"
import { Sans } from "../Typography"

export interface ToggleProps extends FlexProps {
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
  ...rest
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const toggleExpand = () => {
    if (!disabled) {
      setExpanded((prevExpanded) => !prevExpanded)
    }
  }

  return (
    <Flex width="100%" flexDirection="column" pb={2} {...rest}>
      <Header
        onClick={toggleExpand}
        disabled={disabled}
        borderTop="1px solid"
        borderColor="black10"
        pt={2}
        aria-expanded={expanded}
      >
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
              aria-hidden="true"
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

const Header = styled(Clickable)`
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  user-select: none;
`

Header.displayName = "Header"

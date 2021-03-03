import debounce from "debounce"
import React from "react"
import styled, { css } from "styled-components"
import {
  BorderProps,
  borders,
  SizeProps,
  space as styledSpace,
  SpaceProps,
} from "styled-system"
import { Flex } from "../../elements/Flex"
import { color, space } from "../../helpers"
import { Clickable, ClickableProps } from "../Clickable"

export interface RadioProps extends Omit<ClickableProps, "onSelect"> {
  /** Disable interactions */
  disabled?: boolean
  /** Select the button on render. If the Radio is inside a RadioGroup, use RadioGroup.defaultValue instead. */
  selected?: boolean
  /** Show hover state on render */
  hover?: boolean
  /** Callback when selected */
  onSelect?: (selected: { selected: boolean; value: string }) => void
  /** Value of radio button */
  value?: string
  /** Name of the radio button */
  name?: string
  /** The label content, if not specified the children will be used  */
  label?: React.ReactNode
}

export interface RadioToggleProps
  extends RadioProps,
    BorderProps,
    SizeProps,
    SpaceProps {}

/**
 * A Radio button
 */
export const Radio: React.ForwardRefExoticComponent<
  RadioProps & { ref?: React.Ref<HTMLButtonElement> }
> = React.forwardRef(
  (
    {
      children,
      disabled,
      hover,
      name,
      onSelect: _onSelect,
      selected,
      value,
      label,
      ...rest
    },
    forwardedRef
  ) => {
    // Ensures that only one call to `onSelect` occurs, regardless of whether the
    // user clicks the radio element or the label.
    const onSelect = _onSelect && debounce(_onSelect, 0)

    return (
      <Container
        ref={forwardedRef as any}
        disabled={disabled}
        alignItems="center"
        selected={selected}
        aria-checked={selected}
        role="radio"
        hover={hover}
        onClick={() =>
          !disabled && onSelect && onSelect({ selected: !selected, value })
        }
        {...rest}
      >
        <RadioButton
          role="presentation"
          border={1}
          mr={1}
          mt="2px"
          mb="-2px"
          selected={selected}
          disabled={disabled}
        >
          <InnerCircle />
        </RadioButton>

        <Flex flexDirection="column">
          <Label disabled={disabled}>
            <HiddenInput
              tabIndex={-1}
              type="radio"
              name={name}
              checked={selected}
              disabled={disabled}
              onChange={() =>
                !disabled &&
                onSelect &&
                onSelect({ selected: !selected, value })
              }
            />
            {label ? label : children}
          </Label>
          {label ? children : null}
        </Flex>
      </Container>
    )
  }
)

Radio.displayName = "Radio"

/**
 * A radio button with a border
 */
export const BorderedRadio = styled(Radio)<RadioProps>`
  padding: ${space(2)}px;
  border-radius: 2px;
  border: 1px solid ${color("black10")};
  transition: background-color 0.14s ease-in-out;

  :hover:not(:disabled) {
    background-color: ${color("black5")};
  }

  :not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  :not(:last-child) {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const hoverStyles = ({ selected, hover }) => {
  const styles = `background-color: ${color("black10")};`
  if (hover && !selected) {
    return css`
      ${RadioButton} {
        ${styles};
      }
    `
  }
  if (!selected) {
    return css`
      &:hover ${RadioButton} {
        ${styles};
      }
    `
  }
}

interface ContainerProps extends ClickableProps {
  disabled: boolean
  hover: boolean
  selected: boolean
}

const Container = styled(Clickable)<ContainerProps>`
  display: flex;
  align-items: flex-start;
  text-align: left;
  user-select: none;
  cursor: ${({ disabled }) => !disabled && "pointer"};
  ${hoverStyles};
`

const Label = styled.label`
  display: block;
  flex-grow: 1;
  cursor: pointer;
  ${({ disabled }: { disabled: boolean }) =>
    disabled &&
    css`
      cursor: inherit;
      color: ${color("black10")};
    `};
`

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`

const InnerCircle = styled.div`
  width: ${space(1)}px;
  height: ${space(1)}px;
  border-radius: 50%;
  position: relative;
  left: 3px;
  top: 3px;
  background-color: ${color("white100")};
`

interface RadioFeedbackState {
  disabled?: boolean
  selected?: boolean
}

const radioBackgroundColor = ({ disabled, selected }: RadioFeedbackState) => {
  switch (true) {
    case disabled:
      return color("black10")
    case selected:
      return color("black100")
    default:
      return color("white100")
  }
}

const radioBorderColor = ({ disabled, selected }: RadioFeedbackState) =>
  selected && !disabled ? color("black100") : color("black10")

const disabledInnerCircleBackgroundColor = ({
  disabled,
  selected,
}: RadioFeedbackState) => disabled && !selected && color("black10")

const RadioButton = styled.div<RadioToggleProps>`
  ${borders};
  ${styledSpace};
  background-color: ${radioBackgroundColor};
  border-color: ${radioBorderColor};
  width: ${space(2)}px;
  height: ${space(2)}px;
  min-width: ${space(2)}px;
  min-height: ${space(2)}px;
  border-radius: 50%;
  transition: background-color 0.25s, border-color 0.25s;
  ${InnerCircle} {
    background-color: ${disabledInnerCircleBackgroundColor};
  }
`

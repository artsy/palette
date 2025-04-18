import React from "react"
import { Flex, FlexProps } from "../Flex"
import { RadioProps } from "../Radio"
import { Text } from "../Text"

export interface RadioGroupProps<T> extends FlexProps {
  /** Ability to deselect the selection */
  deselectable?: boolean
  /** Disable interactions */
  disabled?: boolean
  /** Text to display when disabled */
  disabledText?: string
  /** Callback when selected */
  onSelect?: (selectedOption: T) => void
  /** Default value of radio button */
  defaultValue?: T
  /** Child <Radio /> elements */
  children:
    | Array<React.ReactElement<RadioProps<T>>>
    | React.ReactElement<RadioProps<T>>
}

interface RadioGroupState<T> {
  selectedOption: T | null
}

/**
 * A stateful collection of Radio buttons
 */
export class RadioGroup<T> extends React.Component<
  RadioGroupProps<T>,
  RadioGroupState<T>
> {
  state = {
    selectedOption: this.props.defaultValue ?? null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        selectedOption: this.props.defaultValue!,
      })
    }
  }

  onSelect = ({ value }) => {
    // After state update, call back up the tree with the latest state
    const update = () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.state.selectedOption!)
      }
    }

    if (this.props.deselectable) {
      if (this.state.selectedOption === value) {
        this.setState(
          {
            selectedOption: null,
          },
          update
        )
        return
      }
    }

    this.setState({ selectedOption: value }, update)
  }

  renderRadioButtons() {
    return React.Children.map(
      this.props.children,
      (child: React.ReactElement<RadioProps<T>>) => {
        return React.cloneElement(child, {
          disabled:
            child.props.disabled !== undefined
              ? child.props.disabled
              : this.props.disabled,
          onSelect: child.props.onSelect
            ? (selected) => {
                this.onSelect(selected)
                child.props.onSelect?.(selected)
              }
            : this.onSelect,
          // FIXME: Throw an error `child.props.selected' is set once we enable the dev code elimination.
          selected: this.state.selectedOption === child.props.value,
        })
      }
    )
  }

  render() {
    const {
      disabled,
      disabledText,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSelect: _onSelect,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      defaultValue: _defaultValue,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children: _children,
      ...rest
    } = this.props
    return (
      <Flex flexDirection="column" {...rest}>
        {disabled && disabledText && (
          <Text variant="xs" mb={1} color="mono60">
            {disabledText}
          </Text>
        )}

        {this.renderRadioButtons()}
      </Flex>
    )
  }
}

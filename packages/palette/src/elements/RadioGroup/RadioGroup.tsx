import React from "react"
import { Flex, FlexProps } from "../Flex"
import { RadioProps } from "../Radio"

/**
 * Spec: zpl.io/bAvnwlB
 */

export interface RadioGroupProps extends FlexProps {
  /** Disable interactions */
  disabled?: boolean
  /** Callback when selected */
  onSelect?: (selectedOption: string) => void
  /** Default value of radio button */
  defaultValue?: string
  /** Child <Radio /> elements */
  children: Array<React.ReactElement<RadioProps>>
}

interface RadioGroupState {
  selectedOption: string | null
}

/**
 * A stateful collection of Radio buttons
 *
 * Spec: zpl.io/bAvnwlB
 */
export class RadioGroup extends React.Component<
  RadioGroupProps,
  RadioGroupState
> {
  state = {
    selectedOption: this.props.defaultValue || null,
  }

  onSelect = ({ value }) => {
    if (this.props.onSelect) {
      this.props.onSelect(value)
    }

    this.setState({ selectedOption: value })
  }

  renderRadioButtons() {
    return React.Children.map(
      this.props.children,
      (child: React.ReactElement<RadioProps>) => {
        return React.cloneElement(child, {
          disabled:
            child.props.disabled !== undefined
              ? child.props.disabled
              : this.props.disabled,
          onSelect: child.props.onSelect
            ? selected => {
                this.onSelect(selected)
                child.props.onSelect(selected)
              }
            : this.onSelect,
          // FIXME: Throw an error `child.props.selected' is set once we enable the dev code elimination.
          selected: this.state.selectedOption === child.props.value,
        })
      }
    )
  }

  render() {
    const { disabled, onSelect, defaultValue, children, ...others } = this.props
    return (
      <Flex flexDirection="column" {...others}>
        {this.renderRadioButtons()}
      </Flex>
    )
  }
}

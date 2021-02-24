import React, {
  Children,
  createRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react"
import { useCursor } from "use-cursor"
import { Flex, FlexProps } from "../Flex"
import { RadioProps } from "../Radio"
import { Text } from "../Text"

export interface RadioGroupProps extends FlexProps {
  /** Ability to deselect the selection */
  deselectable?: boolean
  /** Disable interactions */
  disabled?: boolean
  /** Text to display when disabled */
  disabledText?: string
  /** Callback when selected */
  onSelect?: (selectedOption: string) => void
  /** Default value of radio button */
  defaultValue?: string
  /** Child <Radio /> elements */
  children: Array<React.ReactElement<RadioProps>>
}

/**
 * A stateful collection of Radio buttons
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  disabled,
  disabledText,
  defaultValue,
  deselectable,
  children,
  onSelect,
  ...rest
}) => {
  const nodes = Children.toArray(children)
    .filter(isValidElement)
    .map(
      (
        child: React.ReactElement<
          RadioProps & {
            ref?: React.Ref<HTMLButtonElement>
          }
        >
      ) => ({
        child,
        ref: createRef<HTMLButtonElement>(),
      })
    )

  const [selectedOption, setSelectedOption] = useState(defaultValue)

  const options = nodes.map((node) => node.child.props.value)
  const selectedIndex = options.indexOf(selectedOption)

  const inputModality = useRef<"mouse" | "keyboard">("mouse")

  const { index: focusIndex, handleNext, handlePrev } = useCursor({
    max: options.length,
    initialCursor: selectedIndex === -1 ? 0 : selectedIndex,
  })

  const handleSelect = ({ value }) => {
    if (deselectable) {
      if (selectedOption === value) {
        setSelectedOption(null)
        return
      }
    }

    setSelectedOption(value)
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    inputModality.current = "keyboard"

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        handleNext()
        break
      case "ArrowUp":
      case "ArrowLeft":
        handlePrev()
        break
    }
  }

  useEffect(() => {
    setSelectedOption(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (onSelect) {
      onSelect(selectedOption)
    }
  }, [selectedOption])

  useEffect(() => {
    if (inputModality.current === "mouse") return

    const timeout = setTimeout(() => {
      nodes[focusIndex].ref.current?.focus()
    }, 0)

    return () => {
      clearTimeout(timeout)
    }
  }, [nodes, focusIndex])

  return (
    <Flex flexDirection="column" role="radiogroup" {...rest}>
      {disabled && disabledText && (
        <Text variant="small" mb={0.3} color="black60">
          {disabledText}
        </Text>
      )}

      {nodes.map(({ child, ref }) => {
        return React.cloneElement(child, {
          ref,
          selected: selectedOption === child.props.value,
          tabIndex: selectedOption === child.props.value ? 0 : -1,
          onKeyDown: handleKeydown,
          disabled:
            child.props.disabled !== undefined
              ? child.props.disabled
              : disabled,
          onSelect: child.props.onSelect
            ? (selected: { selected: boolean; value: string }) => {
                handleSelect(selected)
                child.props.onSelect(selected)
              }
            : handleSelect,
        })
      })}
    </Flex>
  )
}

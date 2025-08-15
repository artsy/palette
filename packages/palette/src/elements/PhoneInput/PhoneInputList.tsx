import React, { createRef, useEffect, useMemo, useRef, useState } from "react"
import { Input } from "../Input"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { Box } from "../Box"
import { useKeyboardListNavigation } from "use-keyboard-list-navigation"
import { useMouseActivity } from "../../utils/useMouseActivity"

/**
 * The option structure for the list in the dropdown menu
 *
 * @interface Option
 * @property {string} `text` is the content that will be displayed as selected option
 * @property {string} `name` is the content that will be displayed in the dropdown list
 * @property {string} `value` is the value that will be passed to onSelect
 */
export interface Option {
  text: string
  name: string
  value: string
  countryCode?: string
  flag?: string
}

export interface PhoneInputListProps {
  options: Option[]
  onSelect: (option: Option) => void
  onClose: () => void
}

export const PhoneInputList = ({
  options,
  onSelect,
  onClose,
}: PhoneInputListProps) => {
  const [query, setQuery] = useState("")

  const optionsWithRefs = useMemo(() => {
    return options.map((option) => ({
      option,
      ref: createRef<HTMLButtonElement>(),
    }))
  }, [options])

  const filteredOptionsWithRefs = useMemo(() => {
    return optionsWithRefs.filter((option) =>
      `${option.option.name.toLowerCase()} ${
        option.option.countryCode
      }`.includes(query.toLowerCase())
    )
  }, [optionsWithRefs, query])

  const containerRef = useRef<HTMLDivElement>(null)

  const { reset, set, index } = useKeyboardListNavigation({
    ref: containerRef,
    list: filteredOptionsWithRefs,
    waitForInteractive: true,
    onEnter: ({ element, event }) => {
      event.preventDefault()
      event.stopPropagation()

      onSelect(element.option)
      reset()
    },
  })

  const { lastMouseMoveTimestamp } = useMouseActivity()

  const handleMouseEnter = (i: number) => () => {
    const now = performance.now()

    // 50ms mouse move window
    if (now - lastMouseMoveTimestamp.current < 50) {
      set({ cursor: i, interactive: true })
    }
  }

  // Moves focus to different options when keyboard navigating using up/down
  useEffect(() => {
    const option = filteredOptionsWithRefs[index]
    option?.ref?.current?.focus()
  }, [index, filteredOptionsWithRefs])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Escape":
        reset()
        onClose()
        break
    }
  }

  return (
    <Box ref={containerRef}>
      <Input
        autoFocus
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          reset()
        }}
        onKeyDown={handleKeyDown}
      />

      <PhoneInputListOptions>
        {filteredOptionsWithRefs.map(({ option, ref }, i) => (
          <PhoneInputListOption
            key={option.value}
            ref={ref}
            role="option"
            onMouseEnter={handleMouseEnter(i)}
            onClick={() => {
              onSelect(option)
            }}
            tabIndex={-1}
          >
            <Text variant="sm" minWidth="8ch">
              {option.text}
            </Text>

            <Text variant="sm">{option.name}</Text>
          </PhoneInputListOption>
        ))}
      </PhoneInputListOptions>
    </Box>
  )
}

const PhoneInputListOption = styled(Clickable)`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: ${themeGet("space.0.5")};
  padding: ${themeGet("space.1")} 0;
  color: ${themeGet("colors.mono60")};
  &:focus {
    color: ${themeGet("colors.blue100")};
    text-decoration: underline;
    outline: none;
  }
`

const PhoneInputListOptions = styled(Box)`
  max-height: 250px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

import React, { useEffect, useRef, useState } from "react"
import { isText as _isText } from "../../helpers/isText"
import { Box, splitBoxProps } from "../Box"
import { Input, InputProps } from "../Input"
import { Text } from "../Text"

export interface LabeledInputProps extends InputProps {
  label: React.ReactNode
  variant?: "suffix" | "prefix"
}

/** Input with a right-aligned or left-aligned label */
export const LabeledInput = React.forwardRef<
  HTMLInputElement,
  LabeledInputProps
>(({ label, height, variant = "suffix", ...rest }, forwardedRef) => {
  const labelRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (labelRef.current === null) return
    setOffset(labelRef.current.offsetWidth)
  }, [])

  const [boxProps, inputProps] = splitBoxProps(rest)

  const isText = _isText(label)

  const isPrefix = variant === "prefix"

  return (
    <Box position="relative" {...boxProps}>
      <Input
        ref={forwardedRef}
        height={height}
        labelOffset={isPrefix ? offset + 15 : undefined}
        style={{ [isPrefix ? "paddingLeft" : "paddingRight"]: offset + 15 }}
        {...inputProps}
      >
        <Box
          ref={labelRef as any}
          position="absolute"
          display="flex"
          alignItems="center"
          top={0}
          bottom={0}
          style={{ pointerEvents: isText ? "none" : undefined }}
          {...{ [isPrefix ? "left" : "right"]: 1 }}
        >
          {isText ? (
            <Text variant="sm-display" color="mono60" lineHeight={1}>
              {label}
            </Text>
          ) : (
            label
          )}
        </Box>
      </Input>
    </Box>
  )
})

LabeledInput.displayName = "LabeledInput"

import React, { useEffect, useRef, useState } from "react"
import { isText as _isText } from "../../helpers/isText"
import { Box, splitBoxProps } from "../Box"
import { Input, InputProps } from "../Input"
import { Text } from "../Text"

export interface LabeledInputProps extends InputProps {
  label: React.ReactNode
}

/** Input with a right-aligned label */
export const LabeledInput: React.ForwardRefExoticComponent<
  LabeledInputProps & { ref?: React.Ref<HTMLInputElement> }
> = React.forwardRef(({ label, height, ...rest }, forwardedRef) => {
  const labelRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (labelRef.current === null) return
    setOffset(labelRef.current.offsetWidth)
  }, [])

  const [boxProps, inputProps] = splitBoxProps(rest)

  const isText = _isText(label)

  return (
    <Box position="relative" {...boxProps}>
      <Input
        ref={forwardedRef}
        height={height}
        style={{ paddingRight: `${offset + 10}px` }}
        {...inputProps}
      >
        <Box
          ref={labelRef as any}
          position="absolute"
          display="flex"
          alignItems="center"
          right={1}
          top={0}
          bottom={0}
          style={{
            pointerEvents: isText ? "none" : undefined,
          }}
        >
          {isText ? (
            <Text variant="xs" color="black60" lineHeight={1}>
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

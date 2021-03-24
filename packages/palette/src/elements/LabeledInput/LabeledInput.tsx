import React, { useEffect, useRef, useState } from "react"
import { useThemeConfig } from "../../Theme"
import { Box, splitBoxProps } from "../Box"
import { Input, InputProps } from "../Input"
import { Text, TextVariant } from "../Text"

export interface LabeledInputProps extends InputProps {
  label: React.ReactNode
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  ...rest
}) => {
  const labelRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (labelRef.current === null) return
    setOffset(labelRef.current.offsetWidth)
  }, [])

  const [boxProps, inputProps] = splitBoxProps(rest)

  const variant: TextVariant = useThemeConfig({ v2: "small", v3: "xs" })

  const isText = typeof label === "string" || typeof label === "number"

  return (
    <Box position="relative" {...boxProps}>
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
          <Text variant={variant} color="black60" lineHeight={1}>
            {label}
          </Text>
        ) : (
          label
        )}
      </Box>

      <Input style={{ paddingRight: `${offset + 10}px` }} {...inputProps} />
    </Box>
  )
}

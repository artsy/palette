import React, { useEffect, useRef, useState } from "react"
import { isSimpleChildren } from "../../helpers/isSimpleChildren"
import { useThemeConfig } from "../../Theme"
import { Box, splitBoxProps } from "../Box"
import { Input, InputProps } from "../Input"
import { Text, TextVariant } from "../Text"

export interface LabeledInputProps extends InputProps {
  label: React.ReactNode
}

/** Input with a right-aligned label */
export const LabeledInput: React.ForwardRefExoticComponent<
  LabeledInputProps & { ref?: React.Ref<HTMLInputElement> }
> = React.forwardRef(({ label, ...rest }, forwardedRef) => {
  const labelRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (labelRef.current === null) return
    setOffset(labelRef.current.offsetWidth)
  }, [])

  const [boxProps, inputProps] = splitBoxProps(rest)

  const variant: TextVariant = useThemeConfig({ v2: "small", v3: "xs" })

  const isText = isSimpleChildren(label)

  return (
    <Box position="relative" {...boxProps}>
      <Input
        ref={forwardedRef}
        style={{ paddingRight: `${offset + 10}px` }}
        {...inputProps}
      />

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
    </Box>
  )
})

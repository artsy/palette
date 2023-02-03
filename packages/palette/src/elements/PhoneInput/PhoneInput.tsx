import React from "react"
import { Box, splitBoxProps } from "../Box"
import { InputProps } from "../Input"
import { SelectProps } from "../Select"

interface PhoneInputProps extends InputProps {
  options?: any[]
  onSelect?: (option: any) => void
  selectOptions?: Omit<SelectProps, "onSelect" | "">
}

const PhoneInput: React.ForwardRefExoticComponent<
  PhoneInputProps & { ref?: React.Ref<HTMLInputElement> }
> = React.forwardRef(({ className, options, onSelect, ...rest }, ref) => {
  const [boxProps, inputProps] = splitBoxProps(rest)

  /** TODO:
   * - [ ] Show selected country flag and code
   * - [ ] add a number input
   * - [ ] add a select list of countries
   * - [ ] add a search input to filter countries
   */

  return (
    <Box width="100%" className={className} {...boxProps}>
      {/* select array with search */}
    </Box>
  )
})

PhoneInput.displayName = "PhoneInput"

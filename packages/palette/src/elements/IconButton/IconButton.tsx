import React from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { ButtonProps, Button, BUTTON_SIZES } from "../Button"

export interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode
}

/**
 * A button with a slot for an icon. V3-only.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  size = "medium",
  ...rest
}) => {
  const buttonSize = BUTTON_SIZES[size]

  return (
    <Button
      justifyContent="space-between"
      px={0}
      pl={buttonSize.px / 2}
      pr={buttonSize.px}
      size={size}
      {...rest}
    >
      <Icon mr={buttonSize.px / 2} aria-hidden="true">
        {icon}
      </Icon>

      {children}

      <Box />
    </Button>
  )
}

const Icon = styled(Box)`
  > svg {
    display: block;
  }
`

import React from "react"
import styled from "styled-components"
import { ModalBase, ModalBaseProps } from "../Modal"
import { useDidMount } from "../../utils"

export type ModalDialogBackdropProps = ModalBaseProps

export const ModalDialogBackdrop: React.FC<ModalBaseProps> = (props) => {
  const isMounted = useDidMount()

  return (
    <Modal
      // TODO: A function to convert themed black colors into opacity values
      bg={isMounted ? "rgba(229, 229, 229, 0.5)" : "transparent"}
      {...props}
    />
  )
}

const Modal = styled(ModalBase)`
  transition: background-color 250ms;
`

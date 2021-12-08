import React from "react"
import { ModalBase, ModalBaseProps } from "../Modal"
import { ModalDialogDialog, ModalDialogDialogProps } from "./ModalDialogDialog"
import { splitBoxProps } from "../Box"
import { useDidMount } from "../../utils/useDidMount"

export type ModalDialogProps = ModalBaseProps & ModalDialogDialogProps

export const ModalDialog: React.FC<ModalDialogProps> = ({
  children,
  footer,
  hasLogo,
  onClose,
  title,
  ...rest
}) => {
  const isMounted = useDidMount()
  const [boxProps, modalProps] = splitBoxProps(rest)

  return (
    <ModalBase
      onClose={onClose}
      style={
        isMounted
          ? {
              backgroundColor: "rgba(229, 229, 229, 0.5)",
              transition: "background-color 250ms",
            }
          : { backgroundColor: "transparent" }
      }
      {...modalProps}
    >
      <ModalDialogDialog
        footer={footer}
        hasLogo={hasLogo}
        onClose={onClose}
        title={title}
        style={
          isMounted
            ? {
                opacity: 1,
                transition: "opacity 250ms, transform 250ms",
              }
            : { opacity: 0, transform: "translateY(10px)" }
        }
        {...boxProps}
      >
        {children}
      </ModalDialogDialog>
    </ModalBase>
  )
}

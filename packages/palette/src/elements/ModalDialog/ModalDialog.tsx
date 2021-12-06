import React from "react"
import {
  ModalDialogBackdrop,
  ModalDialogBackdropProps,
} from "./ModalDialogBackdrop"
import { ModalDialogDialog, ModalDialogDialogProps } from "./ModalDialogDialog"
import { splitBoxProps } from "../Box"

export type ModalDialogProps = ModalDialogBackdropProps & ModalDialogDialogProps

export const ModalDialog: React.FC<ModalDialogProps> = ({
  children,
  footer,
  hasLogo,
  onClose,
  title,
  ...rest
}) => {
  const [boxProps, modalProps] = splitBoxProps(rest)

  return (
    <ModalDialogBackdrop onClose={onClose} {...modalProps}>
      <ModalDialogDialog
        footer={footer}
        hasLogo={hasLogo}
        onClose={onClose}
        title={title}
        {...boxProps}
      >
        {children}
      </ModalDialogDialog>
    </ModalDialogBackdrop>
  )
}

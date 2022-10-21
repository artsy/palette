import React from "react"
import { ModalBase, ModalBaseProps } from "../Modal"
import {
  ModalDialogContent,
  ModalDialogContentProps,
} from "./ModalDialogContent"
import { splitBoxProps } from "../Box"
import { useDidMount } from "../../utils/useDidMount"

export type ModalDialogProps = ModalBaseProps & ModalDialogContentProps

export const ModalDialog: React.FC<ModalDialogProps> = ({
  children,
  footer,
  hasLogo,
  onClose,
  title,
  ...rest
}) => {
  const isMounted = useDidMount({ clearCallStack: true })

  const [{ width, ...boxProps }, modalProps] = splitBoxProps(rest)

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
      dialogProps={{ width: width ?? 480 }}
      {...modalProps}
    >
      <ModalDialogContent
        footer={footer}
        hasLogo={hasLogo}
        onClose={onClose}
        title={title}
        width="100%"
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
      </ModalDialogContent>
    </ModalBase>
  )
}

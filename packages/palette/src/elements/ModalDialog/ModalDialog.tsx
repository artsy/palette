import React from "react"
import { ModalBase, ModalBaseProps } from "../Modal"
import {
  ModalDialogContent,
  ModalDialogContentProps,
  splitModalDialogContentProps,
} from "./ModalDialogContent"
import { useDidMount } from "../../utils/useDidMount"

export type ModalDialogProps = ModalBaseProps &
  ModalDialogContentProps & {
    leftPanel?: React.ReactNode
    rightPanel?: React.ReactNode
  }

export const ModalDialog: React.FC<ModalDialogProps> = ({
  children,
  footer,
  hasLogo,
  leftPanel,
  onClose,
  rightPanel,
  title,
  header,
  ...rest
}) => {
  const isMounted = useDidMount({ clearCallStack: true })

  const [{ width, ...boxProps }, modalProps] = splitModalDialogContentProps(
    rest
  )

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
        leftPanel={leftPanel}
        onClose={onClose}
        rightPanel={rightPanel}
        title={title}
        header={header}
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

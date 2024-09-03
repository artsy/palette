import React from "react"
import { ModalBase, ModalBaseProps } from "../Modal"
import {
  ModalDialogContent,
  ModalDialogContentProps,
} from "./ModalDialogContent"
import { splitBoxProps } from "../Box"
import { useDidMount } from "../../utils/useDidMount"
import { useTheme } from "../../Theme"

export type ModalDialogProps = Omit<ModalBaseProps, "title"> &
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
  zIndex,
  ...rest
}) => {
  const isMounted = useDidMount({ clearCallStack: true })

  const [{ width, ...boxProps }, modalProps] = splitBoxProps(rest)

  const { theme } = useTheme()

  return (
    <ModalBase
      onClose={onClose}
      style={
        isMounted
          ? {
              backgroundColor: theme.effects.backdrop,
              transition: "background-color 250ms",
            }
          : { backgroundColor: "transparent" }
      }
      dialogProps={{ width: width ?? 480 }}
      zIndex={zIndex}
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

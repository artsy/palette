import React from "react"
import { States } from "storybook-states"
import { Flex } from "../Flex"
import { Button } from "../Button"
import { ToastVariant, TOAST_VARIANTS } from "./Toast"
import { Toasts } from "./Toasts"
import { ToastsProvider, useToasts } from "./useToasts"

export default {
  title: "Components/Toasts",
}

export const Demo = () => {
  const { sendToast } = useToasts()

  return (
    <>
      <Flex mb={1}>
        {(Object.keys(TOAST_VARIANTS) as ToastVariant[]).map((variant) => {
          const captialized = variant.charAt(0).toUpperCase() + variant.slice(1)

          return (
            <Button
              key={variant}
              variant="secondaryOutline"
              size="small"
              mr={1}
              onClick={() => {
                sendToast({
                  variant,
                  message: `${captialized} Title`,
                  description: "This is example text.",
                })
              }}
            >
              {captialized}
            </Button>
          )
        })}
      </Flex>

      <States>
        <Toasts limit={7} />
      </States>
    </>
  )
}

Demo.decorators = [
  (Story) => (
    <ToastsProvider>
      <Story />
    </ToastsProvider>
  ),
]

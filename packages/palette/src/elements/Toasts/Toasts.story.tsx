import React, { useState } from "react"
import { States } from "storybook-states"
import { Flex } from "../Flex"
import { Button } from "../Button"
import { Text } from "../Text"
import { ToastVariant, TOAST_VARIANTS } from "./Toast"
import { Toasts } from "./Toasts"
import { ToastsProvider, useToasts } from "./useToasts"
import { Clickable, Separator } from "../index"

export default {
  title: "Components/Toasts",
}

export const Demo = () => {
  const { sendToast, retractToast } = useToasts()

  const [activeToasts, setActiveToasts] = useState<string[]>([])

  return (
    <>
      <Flex mb={1}>
        {(Object.keys(TOAST_VARIANTS) as ToastVariant[]).map((variant) => {
          const captialized = variant.charAt(0).toUpperCase() + variant.slice(1)

          return (
            <Button
              key={variant}
              variant="secondaryBlack"
              size="small"
              mr={1}
              onClick={() => {
                const { id } = sendToast({
                  variant,
                  message: `${captialized} Title`,
                  description: "This is example text.",
                  onClose: (closedID) => {
                    setActiveToasts((activeToasts) => {
                      return activeToasts.filter((id) => id !== closedID)
                    })
                  },
                })

                setActiveToasts((activeToasts) => [...activeToasts, id])
              }}
            >
              {captialized}
            </Button>
          )
        })}

        <Button
          size="small"
          variant="primaryGray"
          onClick={() => {
            const { id } = sendToast({
              variant: "message",
              message: "Until manually dismissed",
              description:
                "This toast will hang around until it's manually dismissed.",
              ttl: Infinity,
              onClose: (closedID) => {
                setActiveToasts((activeToasts) => {
                  return activeToasts.filter((id) => id !== closedID)
                })
              },
            })

            setActiveToasts((activeToasts) => [...activeToasts, id])
          }}
        >
          Until manually dismissed
        </Button>
      </Flex>

      <States>
        <Toasts limit={7} />
      </States>

      {activeToasts.length > 0 && (
        <>
          <Separator my={1} />

          <Text variant="xs">
            <u>Active toasts:</u>

            {activeToasts.map((id) => {
              return (
                <Clickable
                  key={id}
                  display="block"
                  onClick={() => retractToast(id)}
                >
                  Remove {id}
                </Clickable>
              )
            })}
          </Text>
        </>
      )}
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

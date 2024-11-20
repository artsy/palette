import React from "react"
import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { BaseTab, BaseTabs } from "../BaseTabs"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { Flex } from "../Flex"
import { TabProps, TabsProps, useTabs } from "../Tabs"

export interface StepperProps extends TabsProps {
  /** The step user currently is at (e.g. previous steps completed) */
  currentStepIndex: number
  /** Prevents the tabs from being directly clickable */
  disableNavigation?: boolean
}

/** Stepper */
export const Stepper: React.FC<React.PropsWithChildren<StepperProps>> = ({
  currentStepIndex,
  disableNavigation,
  initialTabIndex = 0,
  children,
  mb = 2,
  ...rest
}) => {
  const { tabs, activeTab, activeTabIndex, handleClick, ref } = useTabs({
    children,
    initialTabIndex,
  })

  return (
    <>
      <BaseTabs ref={ref} fill mb={mb} {...rest}>
        {tabs.map((tab, i) => {
          return (
            <BaseTab
              key={i}
              as={Clickable}
              ref={tab.ref as any}
              aria-selected={i === activeTabIndex}
              disabled={disableNavigation || i > currentStepIndex}
              onClick={handleClick(i)}
              active={i === activeTabIndex}
              variant="sm"
              justifyContent="flex-start"
            >
              <Flex alignItems="center" justifyContent="space-between" flex={1}>
                <Flex alignItems="center">
                  <Box color={i > currentStepIndex ? "black30" : undefined}>
                    {tab.child.props.name}
                  </Box>

                  {currentStepIndex > i && (
                    <CheckmarkIcon
                      width={16}
                      height={16}
                      color="green100"
                      ml={1}
                    />
                  )}
                </Flex>

                <ChevronRightIcon fill="black60" height={10} ml={1} />
              </Flex>
            </BaseTab>
          )
        })}
      </BaseTabs>

      {activeTab.current.child}
    </>
  )
}

/** StepProps */
export type StepProps = TabProps

/**
 * An individual step.
 * Does nothing on its own; props are dealt with inside of Steps.
 */
export const Step: React.FC<React.PropsWithChildren<StepProps>> = ({
  children,
}) => <>{children}</>

import React from "react"
import { CheckIcon } from "../../svgs/CheckIcon"
import { ChevronIcon } from "../../svgs/ChevronIcon"
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
export const Stepper: React.FC<StepperProps> = ({
  currentStepIndex,
  disableNavigation,
  initialTabIndex = 0,
  children,
  ...rest
}) => {
  const { tabs, activeTab, activeTabIndex, handleClick } = useTabs({
    children,
    initialTabIndex,
  })

  return (
    <>
      <BaseTabs
        separator={<ChevronIcon mx={2} fill="black30" width="12px" />}
        {...rest}
      >
        {tabs.map((cell, i) => {
          return (
            <Clickable
              key={i}
              aria-selected={i === activeTabIndex}
              disabled={disableNavigation || i > currentStepIndex}
              onClick={handleClick(i)}
            >
              <BaseTab active={i === activeTabIndex}>
                <Flex>
                  {currentStepIndex > i && <CheckIcon fill="green100" mr={1} />}

                  <Box color={i > currentStepIndex ? "black30" : undefined}>
                    {cell.props.name}
                  </Box>
                </Flex>
              </BaseTab>
            </Clickable>
          )
        })}
      </BaseTabs>

      {activeTab}
    </>
  )
}

/** StepProps */
export type StepProps = TabProps

/**
 * An individual step.
 * Does nothing on its own; props are dealt with inside of Steps.
 */
export const Step: React.FC<StepProps> = ({ children }) => <>{children}</>

Stepper.defaultProps = {
  mb: 2,
}

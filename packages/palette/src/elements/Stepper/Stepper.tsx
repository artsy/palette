import React from "react"
import { CheckIcon } from "../../svgs/CheckIcon"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Tab, Tabs, TabsProps } from "../Tabs"
import { TabsTab, TabsTabProps } from "../Tabs/TabsTab"

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
  ...rest
}) => {
  return (
    <Tabs
      separator={<ChevronIcon mx={2} fill="black30" width="12px" />}
      Tab={({ children, ...tab }) => {
        return (
          <StepperTab
            currentStepIndex={currentStepIndex}
            disableNavigation={disableNavigation}
            {...tab}
          >
            {children}
          </StepperTab>
        )
      }}
      {...rest}
    />
  )
}

/** Step */
export const Step = Tab

const StepperTab: React.FC<
  Pick<StepperProps, "currentStepIndex" | "disableNavigation"> & TabsTabProps
> = ({
  children,
  active,
  currentStepIndex,
  disableNavigation,
  index,
  ...rest
}) => {
  return (
    <TabsTab
      active={active}
      disabled={disableNavigation || index > currentStepIndex}
      index={index}
      {...rest}
    >
      <Flex>
        {currentStepIndex > index && <CheckIcon fill="green100" mr={1} />}

        <Box color={index > currentStepIndex ? "black30" : undefined}>
          {children}
        </Box>
      </Flex>
    </TabsTab>
  )
}

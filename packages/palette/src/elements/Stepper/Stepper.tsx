import { TextVariant } from "@artsy/palette-tokens/dist/typography/types"
import React from "react"
import { CheckIcon } from "../../svgs/CheckIcon"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { useThemeConfig } from "../../Theme"
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
  fill,
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: {
      fill,
      joinSeparator: <ChevronIcon fill="black30" width={12} mx={2} />,
      inlineSeparator: null,
      verticalAlignment: "center",
      horizontalAlignment: "center",
      checkAlignment: "left",
      textVariant: "mediumText" as TextVariant,
    },
    v3: {
      fill: true,
      joinSeparator: null,
      inlineSeparator: <ChevronIcon fill="black60" height={10} ml={1} />,
      verticalAlignment: "center",
      horizontalAlignment: "flex-start",
      checkAlignment: "right",
      textVariant: "sm" as TextVariant,
    },
  })

  const { tabs, activeTab, activeTabIndex, handleClick } = useTabs({
    children,
    initialTabIndex,
  })

  return (
    <>
      <BaseTabs separator={tokens.joinSeparator} fill={tokens.fill} {...rest}>
        {tabs.map((cell, i) => {
          return (
            <BaseTab
              key={i}
              as={Clickable}
              aria-selected={i === activeTabIndex}
              disabled={disableNavigation || i > currentStepIndex}
              onClick={handleClick(i)}
              active={i === activeTabIndex}
              variant={tokens.textVariant}
              justifyContent={tokens.horizontalAlignment}
            >
              <Flex
                alignItems={tokens.verticalAlignment}
                justifyContent="space-between"
                flex={1}
              >
                <Flex alignItems={tokens.verticalAlignment}>
                  {currentStepIndex > i && tokens.checkAlignment === "left" && (
                    <CheckIcon fill="green100" mr={1} />
                  )}

                  <Box color={i > currentStepIndex ? "black30" : undefined}>
                    {cell.props.name}
                  </Box>

                  {currentStepIndex > i &&
                    tokens.checkAlignment === "right" && (
                      <CheckIcon
                        width={16}
                        height={16}
                        fill="green100"
                        ml={1}
                      />
                    )}
                </Flex>

                {tokens.inlineSeparator}
              </Flex>
            </BaseTab>
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

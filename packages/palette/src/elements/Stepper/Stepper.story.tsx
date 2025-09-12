import { fn } from "@storybook/test"
import React, { useEffect, useState } from "react"
import { Step, Stepper } from "./"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Stepper,
  title: "Components/Stepper",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A multi-step navigation component with tabbed interface for step-based workflows.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    initialTabIndex: 0,
    currentStepIndex: 0,
    onChange: fn(),
    children: [
      <Step key="review" name="Review">
        Review panel
      </Step>,
      <Step key="confirm" name="Confirm">
        Confirm panel
      </Step>,
      <Step key="pay" name="Pay">
        Pay panel
      </Step>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Basic stepper with three steps starting at the first step.",
      },
    },
  },
}

export const SecondStep = {
  args: {
    initialTabIndex: 1,
    currentStepIndex: 1,
    onChange: fn(),
    children: [
      <Step key="review" name="Review">
        Review panel
      </Step>,
      <Step key="confirm" name="Confirm">
        Confirm panel
      </Step>,
      <Step key="pay" name="Pay">
        Pay panel
      </Step>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Stepper starting at the second step.",
      },
    },
  },
}

export const FinalStep = {
  args: {
    initialTabIndex: 2,
    currentStepIndex: 2,
    onChange: fn(),
    children: [
      <Step key="review" name="Review">
        Review panel
      </Step>,
      <Step key="confirm" name="Confirm">
        Confirm panel
      </Step>,
      <Step key="pay" name="Pay">
        Pay panel
      </Step>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Stepper at the final step.",
      },
    },
  },
}

export const DisabledNavigation = {
  args: {
    initialTabIndex: 2,
    currentStepIndex: 2,
    disableNavigation: true,
    onChange: fn(),
    children: [
      <Step key="review" name="Review">
        Review panel
      </Step>,
      <Step key="confirm" name="Confirm">
        Confirm panel
      </Step>,
      <Step key="pay" name="Pay">
        Pay panel
      </Step>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Stepper with navigation disabled - steps are not clickable.",
      },
    },
  },
}

export const FullWidth = {
  args: {
    initialTabIndex: 2,
    currentStepIndex: 2,
    fill: true,
    onChange: fn(),
    children: [
      <Step key="review" name="Review">
        Review panel
      </Step>,
      <Step key="confirm" name="Confirm">
        Confirm panel
      </Step>,
      <Step key="pay" name="Pay">
        Pay panel
      </Step>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Stepper that fills the available width.",
      },
    },
  },
}

export const AnimatedDemo = {
  render: () => {
    const [cursor, setCursor] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setCursor((prevCursor) => prevCursor + 1)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }, [])

    const index = cursor % 3

    return (
      <Stepper
        initialTabIndex={index}
        currentStepIndex={index}
        disableNavigation
      >
        <Step name="Review">Review panel</Step>
        <Step name="Confirm">Confirm panel</Step>
        <Step name="Pay">Pay panel</Step>
      </Stepper>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Animated stepper that cycles through steps automatically.",
      },
    },
  },
}

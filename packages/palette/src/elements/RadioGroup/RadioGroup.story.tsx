import { fn } from "@storybook/test"
import React, { useState } from "react"
import { Spacer } from "../Spacer"
import { Button } from "../Button"
import { Radio } from "../Radio/Radio"
import { RadioGroup } from "./RadioGroup"
import { Join } from "../Join"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: RadioGroup,
  title: "Components/RadioGroup",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A group of radio button inputs with support for default values and deselection.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    onSelect: fn(),
    children: (
      <Join separator={<Spacer y={0.5} />}>
        {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
          (value) => {
            return <Radio key={value} value={value} label={value} />
          }
        )}
      </Join>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic radio group with multiple options.",
      },
    },
  },
}

export const WithDefaultValue = {
  args: {
    defaultValue: "Aural",
    onSelect: fn(),
    children: (
      <Join separator={<Spacer y={0.5} />}>
        {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
          (value) => {
            return <Radio key={value} value={value} label={value} />
          }
        )}
      </Join>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Radio group with a pre-selected default value.",
      },
    },
  },
}

export const Deselectable = {
  args: {
    deselectable: true,
    onSelect: fn(),
    children: (
      <Join separator={<Spacer y={0.5} />}>
        {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
          (value) => {
            return <Radio key={value} value={value} label={value} />
          }
        )}
      </Join>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Radio group that allows deselecting the current selection.",
      },
    },
  },
}

export const Disabled = {
  args: {
    disabled: true,
    onSelect: fn(),
    children: (
      <Join separator={<Spacer y={0.5} />}>
        {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
          (value) => {
            return <Radio key={value} value={value} label={value} />
          }
        )}
      </Join>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled radio group that cannot be interacted with.",
      },
    },
  },
}

export const DisabledWithText = {
  args: {
    disabled: true,
    disabledText: "Reason for disabled",
    onSelect: fn(),
    children: (
      <Join separator={<Spacer y={0.5} />}>
        {["Visual", "Linguistic", "Spatial", "Aural", "Gestural"].map(
          (value) => {
            return <Radio key={value} value={value} label={value} />
          }
        )}
      </Join>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled radio group with explanatory text.",
      },
    },
  },
}

export const InteractiveDefault = {
  render: () => {
    const [defaultValue, setValue] = useState("PICKUP")

    return (
      <>
        <Button
          mb={2}
          onClick={() => {
            setValue(defaultValue === "PICKUP" ? "SHIP" : "PICKUP")
          }}
        >
          Toggle default value: {defaultValue}
        </Button>
        <RadioGroup defaultValue={defaultValue} onSelect={fn()}>
          <Radio value="SHIP" label="Provide shipping address" />
          <Spacer y={0.5} />
          <Radio value="PICKUP" label="Arrange for pickup" />
        </RadioGroup>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example with dynamically changing default value.",
      },
    },
  },
}

export const BooleanValues = {
  args: {
    defaultValue: false,
    onSelect: fn(),
    children: (
      <>
        <Radio value={true} label="Yes" />
        <Spacer y={0.5} />
        <Radio value={false} label="No" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Radio group with boolean values instead of strings.",
      },
    },
  },
}

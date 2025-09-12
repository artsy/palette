import { fn } from "@storybook/test"
import React from "react"
import { Button } from "../Button"
import { TextArea } from "./TextArea"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: TextArea,
  title: "Components/TextArea",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A multi-line text input component with character limits, validation, and form states.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    placeholder: "Start typing...",
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic text area with placeholder text.",
      },
    },
  },
}

export const AllStates = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextArea placeholder="Default state" onChange={fn()} />
      <TextArea
        error="Something went wrong."
        placeholder="Error state"
        onChange={fn()}
      />
      <TextArea disabled placeholder="Disabled state" onChange={fn()} />
      <TextArea title="Note" placeholder="With title" onChange={fn()} />
      <TextArea
        title="Note"
        required
        placeholder="Required field"
        onChange={fn()}
      />
      <TextArea
        characterLimit={10}
        placeholder="Character limit"
        onChange={fn()}
      />
      <TextArea
        characterLimit={10}
        characterLimitHelper
        required
        placeholder="With helper text"
        onChange={fn()}
      />
      <TextArea
        characterLimit={10}
        defaultValue="hello"
        placeholder="Under limit"
        onChange={fn()}
      />
      <TextArea
        characterLimit={10}
        defaultValue="hello world"
        placeholder="Over limit"
        onChange={fn()}
      />
      <TextArea
        name="my-text-area"
        title="Note"
        description="This is my description"
        placeholder="With description"
        onChange={fn()}
      />
      <TextArea
        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nam iste beatae reiciendis ea harum, aspernatur, eius, omnis eveniet corporis consequatur minima assumenda ipsum dolor dolorum perferendis animi distinctio eligendi?"
        placeholder="With long content"
        onChange={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available states and configurations of the TextArea component.",
      },
    },
  },
}

export const InForm = {
  render: () => (
    <form>
      <TextArea
        mt={1}
        title="Example"
        required
        placeholder="Submission should be blocked unless this has a value"
      />
      <Button mt={1}>Submit</Button>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: "TextArea used within a form with required validation.",
      },
    },
  },
}

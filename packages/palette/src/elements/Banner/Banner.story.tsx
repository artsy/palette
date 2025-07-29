import { Banner } from "./Banner"
import { STYLED_SYSTEM_PROPS_BLACKLIST } from "../../shared/PropsBlacklist"

export default {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Banner component for displaying important messages to users with various styles and dismissible options.",
      },
      controls: {
        exclude: STYLED_SYSTEM_PROPS_BLACKLIST,
      },
    },
  },
  argTypes: {
    children: {
      description: "The content to display inside the banner",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        category: "Content",
      },
    },
    dismissable: {
      description: "Whether the banner can be dismissed by the user",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
    variant: {
      description: "The visual style variant of the banner",
      control: { type: "select" },
      options: ["defaultLight", "defaultDark", "success", "error", "brand"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "defaultLight" },
        category: "Appearance",
      },
    },
  },
}

export const DefaultLight = {
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quae natus assumenda distinctio, voluptatum magni.",
    dismissable: true,
    variant: "defaultLight",
  },
}

export const DefaultDark = {
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quae natus assumenda distinctio, voluptatum magni.",
    dismissable: true,
    variant: "defaultDark",
  },
}

export const Success = {
  args: {
    children: "Operation completed successfully!",
    dismissable: true,
    variant: "success",
  },
}

export const Error = {
  args: {
    children: "An error occurred. Please try again.",
    dismissable: true,
    variant: "error",
  },
}

export const Brand = {
  args: {
    children: "Welcome to our brand new feature!",
    dismissable: true,
    variant: "brand",
  },
}

export const NonDismissable = {
  args: {
    children: "This banner cannot be dismissed.",
    dismissable: false,
  },
}

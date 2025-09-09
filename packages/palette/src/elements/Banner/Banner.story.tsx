import { Banner } from "./Banner"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

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
        exclude: STORYBOOK_PROPS_BLACKLIST,
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

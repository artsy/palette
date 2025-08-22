import { Spinner } from "./Spinner"

export default {
  component: Spinner,
  title: "Components/Spinner",
  tags: ["autodocs"],
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        component:
          "A loading spinner component with different sizes and colors, optionally with a delay before showing.",
      },
    },
    controls: {
      include: ["size", "color", "delay", "position"],
    },
  },
}

export const Default = {
  args: {
    position: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic spinner with default styling.",
      },
    },
  },
}

export const Small = {
  args: {
    size: "small",
    color: "brand",
    position: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Small spinner with brand color.",
      },
    },
  },
}

export const WithDelay = {
  args: {
    delay: 1000,
    position: "static",
  },
  parameters: {
    docs: {
      description: {
        story: "Spinner that shows after a 1 second delay.",
      },
    },
  },
}

import { Avatar } from "./Avatar"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Avatar component displays user profile images or initials in various sizes. Supports lazy loading, fallback to initials when image fails to load, and responsive sizing.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
    },
  },
}

export const Default = {
  args: {
    initials: "JD",
    size: "md",
  },
}

export const WithImageBasic = {
  args: {
    src: "https://picsum.photos/seed/example/110/110",
    srcSet:
      "https://picsum.photos/seed/example/110/110 1x, https://picsum.photos/seed/example/220/220 2x",
    initials: "JD",
    size: "md",
    lazyLoad: true,
  },
}

export const Small = {
  args: {
    initials: "SM",
    size: "sm",
  },
}

export const Large = {
  args: {
    initials: "LG",
    size: "lg",
  },
}

export const ExtraSmall = {
  args: {
    initials: "XS",
    size: "xs",
  },
}

export const ExtraExtraSmall = {
  args: {
    initials: "XX",
    size: "xxs",
  },
}

export const WithBrokenImage = {
  args: {
    src: "https://example.com/broken.jpg",
    srcSet:
      "https://example.com/broken.jpg 1x, https://example.com/broken.jpg 2x",
    initials: "TK",
    size: "md",
  },
}

export const WithLazyLoadBrokenImage = {
  args: {
    src: "https://example.com/broken.jpg",
    srcSet:
      "https://example.com/broken.jpg 1x, https://example.com/broken.jpg 2x",
    initials: "TK",
    size: "md",
    lazyLoad: true,
  },
}

export const LongInitials = {
  args: {
    initials: "LONGER",
    size: "md",
  },
}

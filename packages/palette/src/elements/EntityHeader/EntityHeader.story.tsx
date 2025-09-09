import React from "react"
import { Button } from "../Button"
import { EntityHeader } from "./EntityHeader"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: EntityHeader,
  title: "Components/EntityHeader",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A header component for displaying entity information including name, image, metadata, and action buttons.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLOCKLIST,
    },
  },
}

const FollowButton = () => {
  return (
    <Button
      size="small"
      variant="secondaryBlack"
      onClick={() => alert("Follow")}
    >
      Follow
    </Button>
  )
}

const imageProps = {
  src: "https://picsum.photos/seed/example/110/110",
  srcSet:
    "https://picsum.photos/seed/example/110/110 1x, https://picsum.photos/seed/example/220/220 2x",
  lazyLoad: true,
}

export const Default = {
  args: {
    name: "Francesca DiMattio",
    initials: "FD",
    image: imageProps,
    meta: "American, b. 1979",
    href: "http://www.artsy.net/artist/francesca-dimattio",
    FollowButton: <FollowButton />,
    maxWidth: 350,
  },
}

export const NameOnly = {
  args: {
    name: "Francesca DiMattio",
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "EntityHeader with only a name.",
      },
    },
  },
}

export const SmallVariantWithInitials = {
  args: {
    smallVariant: true,
    name: "Francesca DiMattio",
    initials: "FD",
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "Small variant EntityHeader with initials.",
      },
    },
  },
}

export const WithInitials = {
  args: {
    name: "Francesca DiMattio",
    initials: "FD",
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "EntityHeader with initials displayed.",
      },
    },
  },
}

export const SmallVariantWithImage = {
  args: {
    smallVariant: true,
    name: "Francesca DiMattio",
    image: imageProps,
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "Small variant EntityHeader with image.",
      },
    },
  },
}

export const WithImage = {
  args: {
    name: "Francesca DiMattio",
    image: imageProps,
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "EntityHeader with image.",
      },
    },
  },
}

export const WithMetaAndHref = {
  args: {
    initials: "FD",
    name: "Francesca DiMattio",
    image: imageProps,
    meta: "American, b. 1979",
    href: "http://www.artsy.net/artist/francesca-dimattio",
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "EntityHeader with metadata and link.",
      },
    },
  },
}

export const SmallVariantWithButton = {
  args: {
    smallVariant: true,
    name: "Francesca DiMattio",
    image: imageProps,
    FollowButton: <FollowButton />,
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "Small variant EntityHeader with action button.",
      },
    },
  },
}

export const Complete = {
  args: {
    initials: "FD",
    name: "Francesca DiMattio",
    image: imageProps,
    meta: "American, b. 1979",
    href: "http://www.artsy.net/artist/francesca-dimattio",
    FollowButton: <FollowButton />,
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "Complete EntityHeader with all features.",
      },
    },
  },
}

export const LongerName = {
  args: {
    initials: "FLD",
    name: "Francesca Longer DiMattio",
    image: imageProps,
    meta: "American, b. Founded 1979",
    href: "http://www.artsy.net/artist/francesca-dimattio",
    FollowButton: <FollowButton />,
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "EntityHeader with longer name to test text wrapping.",
      },
    },
  },
}

export const WithSingleLabel = {
  args: {
    initials: "FLD",
    name: "Francesca Much Longer DiMattio",
    image: imageProps,
    meta: "American, b. Founded 1979",
    href: "http://www.artsy.net/artist/francesca-dimattio",
    FollowButton: <FollowButton />,
    labels: [{ children: "Black Owned" }],
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "EntityHeader with a single label.",
      },
    },
  },
}

export const WithMultipleLabels = {
  args: {
    initials: "FLD",
    name: "Francesca Much Longer DiMattio",
    image: imageProps,
    meta: "American, b. Founded 1979",
    href: "http://www.artsy.net/artist/francesca-dimattio",
    FollowButton: <FollowButton />,
    labels: [
      { children: "Black Owned" },
      { children: "Women Owned", variant: "brand" },
    ],
    maxWidth: 350,
  },
  parameters: {
    docs: {
      description: {
        story: "EntityHeader with multiple labels in different variants.",
      },
    },
  },
}

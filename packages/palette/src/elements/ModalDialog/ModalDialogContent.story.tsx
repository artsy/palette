import { fn } from "@storybook/test"
import React from "react"
import { ModalDialogContent } from "./ModalDialogContent"
import { Text } from "../Text"
import { Button } from "../Button"
import { Input } from "../Input"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { Box } from "../Box"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: ModalDialogContent,
  title: "Components/ModalDialogContent",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Content component for modal dialogs with title, body, and action sections.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

const modalContent = (
  <Join separator={<Spacer y={1} />}>
    <Text variant="sm">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, neque
      voluptates! Sapiente, sint magnam. Assumenda, hic eius asperiores iure
      explicabo itaque accusantium, consectetur aut sit maxime culpa ab aliquid
      consequatur?
    </Text>
    <Input placeholder="Enter your name" autoComplete="name" />
    <Input placeholder="Enter your email" type="email" autoComplete="email" />
  </Join>
)

export const Default = {
  render: () => (
    <ModalDialogContent onClose={fn()} maxHeight={400}>
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic modal dialog content without title or footer.",
      },
    },
  },
}

export const ShortContent = {
  render: () => (
    <ModalDialogContent onClose={fn()} maxHeight={400}>
      <Text variant="sm" bg="mono10">
        Content shorter than width
      </Text>
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Modal with short content.",
      },
    },
  },
}

export const WithTitle = {
  render: () => (
    <ModalDialogContent title="Modal Title" onClose={fn()} maxHeight={400}>
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Modal dialog with a title.",
      },
    },
  },
}

export const WithLongTitle = {
  render: () => (
    <ModalDialogContent
      title="Modal Title with a longer title or headline text that runs on for multiple lines"
      onClose={fn()}
      maxHeight={400}
    >
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Modal dialog with a long title that wraps to multiple lines.",
      },
    },
  },
}

export const WithLogo = {
  render: () => (
    <ModalDialogContent hasLogo onClose={fn()} maxHeight={400}>
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Modal dialog with logo displayed.",
      },
    },
  },
}

export const WithTitleAndLogo = {
  render: () => (
    <ModalDialogContent
      title="Modal Title"
      hasLogo
      onClose={fn()}
      maxHeight={400}
    >
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Modal dialog with both title and logo.",
      },
    },
  },
}

export const WithFooter = {
  render: () => (
    <ModalDialogContent
      footer={<Button width="100%">Confirm</Button>}
      onClose={fn()}
      maxHeight={400}
    >
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Modal dialog with footer action button.",
      },
    },
  },
}

export const WithTitleAndFooter = {
  render: () => (
    <ModalDialogContent
      title="Modal Title"
      footer={<Button width="100%">Confirm</Button>}
      onClose={fn()}
      maxHeight={400}
    >
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Modal dialog with title and footer button.",
      },
    },
  },
}

export const Complete = {
  render: () => (
    <ModalDialogContent
      title="Modal Title with a longer title or headline text that runs on for multiple lines"
      hasLogo
      footer={<Button width="100%">Confirm</Button>}
      onClose={fn()}
      maxHeight={400}
    >
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete modal dialog with title, logo, content, and footer.",
      },
    },
  },
}

export const CustomHeader = {
  render: () => (
    <ModalDialogContent
      title={
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <ChevronLeftIcon />
          <ArtsyLogoIcon height={30} />
          <CloseIcon />
        </Box>
      }
      onClose={fn()}
      maxHeight={400}
    >
      {modalContent}
    </ModalDialogContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Modal dialog with custom header containing navigation icons.",
      },
    },
  },
}

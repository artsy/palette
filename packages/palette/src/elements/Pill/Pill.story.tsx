import React, { useState } from "react"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Pill, PillVariant, PILL_VARIANT_NAMES } from "./Pill"
import { Box } from "../Box"
import { Join } from "../Join"
import GraphIcon from "@artsy/icons/GraphIcon"
import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"
import styled from "styled-components"
import { Popover } from "../Popover"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: Pill,
  title: "Components/Pill",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A pill-shaped button component with various visual variants for different use cases.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

const Display = styled(Box)``
Display.displayName = "Pill"

export const Default = {
  args: {
    children: "Default Pill",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic pill component with default styling.",
      },
    },
  },
}

export const Variants = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2}>
      {PILL_VARIANT_NAMES.map((variant) => (
        <Display
          key={variant}
          p={1}
          overflowX="auto"
          {...(["primaryWhite", "secondaryWhite"].includes(variant)
            ? { bg: "mono100", color: "mono0" }
            : { bg: "mono0", color: "mono100" })}
        >
          <Flex>
            <Join separator={<Spacer x={2} />}>
              <Pill variant={variant as PillVariant}>Default</Pill>
              <Pill variant={variant as PillVariant} focus>
                Focus
              </Pill>
              <Pill variant={variant as PillVariant} hover>
                Hover
              </Pill>
              <Pill variant={variant as PillVariant} active>
                Active
              </Pill>
              <Pill variant={variant as PillVariant} selected>
                Selected
              </Pill>
              <Pill variant={variant as PillVariant} disabled>
                Disabled
              </Pill>
            </Join>
          </Flex>
        </Display>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available pill variants with different interaction states.",
      },
    },
  },
}

export const LinkExample = {
  render: () => (
    <Pill
      variant="profile"
      as="a"
      // TODO: Need a decent way of typing the threaded polymorphic `as` prop
      // @ts-expect-error MIGRATE_STRICT_MODE
      href="#example"
    >
      Artist Name
    </Pill>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pill rendered as a clickable link element.",
      },
    },
  },
}

export const LongExampleWithTruncation = {
  render: () => (
    <Pill maxWidth={300}>
      Studio Museum in Harlem Artist-in-Residence (AIR) Program
    </Pill>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pill with long text that gets truncated with ellipsis.",
      },
    },
  },
}

export const SearchWithCount = {
  render: () => (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Pill variant="search" count={123}>
        Default
      </Pill>
      <Pill variant="search" count={123} focus>
        Focus
      </Pill>
      <Pill variant="search" count={123} hover>
        Hover
      </Pill>
      <Pill variant="search" count={123} active>
        Active
      </Pill>
      <Pill variant="search" count={123} selected>
        Selected
      </Pill>
      <Pill variant="search" count={123} disabled>
        Disabled
      </Pill>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Search variant pill with count indicator in different states.",
      },
    },
  },
}

export const ArtistWithImage = {
  render: () => (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Pill
        variant="profile"
        src={[
          "https://picsum.photos/seed/isa/30/30",
          "https://picsum.photos/seed/isa/60/60",
        ]}
      >
        Default
      </Pill>
      <Pill
        variant="profile"
        src={[
          "https://picsum.photos/seed/isa/30/30",
          "https://picsum.photos/seed/isa/60/60",
        ]}
        focus
      >
        Focus
      </Pill>
      <Pill
        variant="profile"
        src={[
          "https://picsum.photos/seed/isa/30/30",
          "https://picsum.photos/seed/isa/60/60",
        ]}
        hover
      >
        Hover
      </Pill>
      <Pill
        variant="profile"
        src={[
          "https://picsum.photos/seed/isa/30/30",
          "https://picsum.photos/seed/isa/60/60",
        ]}
        selected
      >
        Selected
      </Pill>
      <Pill
        variant="profile"
        src={[
          "https://picsum.photos/seed/isa/30/30",
          "https://picsum.photos/seed/isa/60/60",
        ]}
        disabled
      >
        Disabled
      </Pill>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Profile variant pill with artist image in different states.",
      },
    },
  },
}

export const PillWithIcon = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={2} flexWrap="wrap">
        <Pill variant="badge" Icon={GraphIcon}>
          Badge with Icon
        </Pill>
        <Pill variant="badge" Icon={GraphIcon} focus>
          Focus
        </Pill>
        <Pill variant="badge" Icon={GraphIcon} hover>
          Hover
        </Pill>
        <Pill variant="badge" Icon={GraphIcon} selected>
          Selected
        </Pill>
        <Pill variant="badge" Icon={GraphIcon} disabled>
          Disabled
        </Pill>
      </Box>
      <Box display="flex" gap={2} flexWrap="wrap">
        <Pill
          variant="default"
          Icon={ChevronSmallDownIcon}
          iconPosition="right"
        >
          With Right Icon
        </Pill>
        <Pill variant="search" Icon={GraphIcon}>
          Search with Icon
        </Pill>
        <Pill variant="filter" Icon={GraphIcon}>
          Filter with Icon
        </Pill>
        <Pill variant="dotted" Icon={GraphIcon}>
          Dotted with Icon
        </Pill>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pills with various icons and icon positions.",
      },
    },
  },
}

export const Interactive = {
  render: () => {
    const [selected, setSelected] = useState(false)
    return (
      <Pill
        selected={selected}
        onClick={() => setSelected((prevActive) => !prevActive)}
      >
        Click to Toggle
      </Pill>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive pill that toggles selected state when clicked.",
      },
    },
  },
}

export const ProfileVariant = {
  render: () => (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Pill variant="profile" src="https://picsum.photos/seed/isa/60/60">
        Standard Profile
      </Pill>
      <Pill
        variant="profile"
        compact
        src="https://picsum.photos/seed/isa/60/60"
      >
        Compact Profile
      </Pill>
      <Pill variant="profile">Profile without Image</Pill>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Profile variant pills with different configurations.",
      },
    },
  },
}

export const PillWithPopover = {
  render: () => (
    <Popover placement="bottom" popover={<>Popover Content</>}>
      {({ anchorRef, onVisible }) => (
        <Pill ref={anchorRef as any} onClick={() => onVisible()}>
          Click for Popover
        </Pill>
      )}
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pill that triggers a popover when clicked.",
      },
    },
  },
}

# How to Create a Storybook Story File for Palette Components

This guide describes the conventions for writing Storybook stories for Palette components. Follow these steps to ensure consistency, discoverability, and best practices across the codebase.

## 1. File Location and Naming

- Place the story file in the same directory as the component, e.g. `src/elements/Button/Button.story.tsx`.
- Use PascalCase for the filename, matching the component name.

## 2. Basic File Structure

Each story file should:

- Import the component and any required types.
- Import the `STORYBOOK_PROPS_BLACKLIST` from `../../utils/storybookBlacklist`.
- Use the `arg` story format (CSF 3.0) for all stories.
- Add autodocs and a component description in the default export.
- Use **separate stories** for each state/variant (do not use the `States` helper).

## 3. Example Template

```tsx
import React from "react"
import { MyComponent } from "./MyComponent"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: MyComponent,
  title: "Components/MyComponent",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A short description of what this component does.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLACKLIST,
    },
  },
}

export const Default = {
  args: {
    /* default props */
  },
  parameters: {
    docs: {
      description: {
        story: "A short description of this story variant.",
      },
    },
  },
}

export const Variant = {
  args: {
    /* variant props */
  },
  parameters: {
    docs: {
      description: {
        story: "Description of this variant.",
      },
    },
  },
}
```

## 4. Key Conventions

- **Autodocs**: Always add `tags: ["autodocs"]` and a `component` description in the default export.
- **Blacklist**: Always add `controls: { exclude: STORYBOOK_PROPS_BLACKLIST }` in the default export's `parameters`.
- **Arg Stories**: Use the `args` property for each story to define its props. Avoid inline render functions unless necessary for custom rendering.
- **No States Helper**: Do **not** use `<States>` from `storybook-states`. Instead, create a separate export for each state/variant you want to demonstrate.
- **Story Descriptions**: Add a `docs.description.story` for each story to clarify its purpose.
- **Minimal Custom Render**: Only use a custom `render` function if you need to wrap the component or provide custom children.

## 5. Example: Dropdown

```tsx
import React from "react"
import { Dropdown } from "./Dropdown"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

const dropdownContent = <div>Example content</div>

export default {
  component: Dropdown,
  title: "Components/Dropdown",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A dropdown component that renders content in a positioned overlay.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLACKLIST,
    },
  },
}

export const Default = {
  args: {
    placement: "bottom",
    dropdown: dropdownContent,
    children: ({ anchorRef, anchorProps }) => (
      <button ref={anchorRef} {...anchorProps}>
        Open Dropdown
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Default dropdown placement.",
      },
    },
  },
}

export const PlacementTop = {
  args: {
    placement: "top",
    dropdown: dropdownContent,
    children: ({ anchorRef, anchorProps }) => (
      <button ref={anchorRef} {...anchorProps}>
        Top Placement
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Dropdown positioned above the anchor element.",
      },
    },
  },
}
```

## 6. Checklist

- [ ] File is named and located correctly
- [ ] Default export includes autodocs, blacklist, and description
- [ ] Each state/variant is a separate export (no States helper)
- [ ] Each story uses the `args` format
- [ ] Each story has a `docs.description.story`
- [ ] Only use custom `render` if necessary

---

Following these conventions ensures Palette stories are clear, discoverable, and consistent for all contributors.

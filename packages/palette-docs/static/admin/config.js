const defaultFields = {
  extension: "mdx",
  format: "frontmatter",
  widget: "mdx",
  create: true,
  identifier_field: "name",
  fields: [
    {
      label: "Name",
      name: "name",
      widget: "string",
      tagname: "h1",
      required: true,
    },
    {
      label: "Last point of contact",
      name: "lastPointOfContact",
      widget: "string",
      required: false,
    },
    {
      label: "Body",
      name: "body",
      widget: "mdx",
    },
    {
      label: "Hide in nav",
      name: "hideInNav",
      widget: "boolean",
      required: false,
    },
    {
      label: "Status",
      name: "status",
      widget: "string",
      required: false,
    },
    {
      label: "Order",
      name: "order",
      widget: "number",
      valueType: "int",
      required: false,
    },
    {
      label: "Subnav Order",
      name: "subnavOrder",
      widget: "number",
      valueType: "int",
      required: false,
    },
    {
      label: "Auto-expand Subnav",
      name: "expandSubNav",
      widget: "boolean",
      required: false,
    },
  ],
}

const collections = [
  // Home
  {
    name: "home",
    label: "Home",
    description: "Home",
    folder: "content/docs/home",
  },

  // Tokens
  {
    name: "tokens",
    label: "Tokens",
    description: "Tokens",
    folder: "content/docs/tokens",
  },

  // Elements
  {
    name: "components",
    label: "Components",
    description: "Components",
    folder: "content/docs/components",
  },
  {
    name: "animation",
    label: "Animation",
    description: "Animation",
    folder: "content/docs/elements/animation",
  },
  {
    name: "buttons",
    label: "Buttons",
    description: "Buttons",
    folder: "content/docs/elements/buttons",
  },
  {
    name: "dialogs",
    label: "Dialogs",
    description: "Dialogs",
    folder: "content/docs/elements/dialogs",
  },
  {
    name: "images",
    label: "Images",
    description: "Images",
    folder: "content/docs/elements/images",
  },
  {
    name: "inputs",
    label: "Inputs",
    description: "Inputs",
    folder: "content/docs/elements/inputs",
  },
  {
    name: "layout",
    label: "Layout",
    description: "Layout",
    folder: "content/docs/elements/layout",
  },
  {
    name: "loaders",
    label: "Loaders",
    description: "Loaders",
    folder: "content/docs/elements/loaders",
  },
  {
    name: "navigation",
    label: "Navigation",
    description: "Navigtion",
    folder: "content/docs/elements/navigation",
  },
  {
    name: "data-visualization",
    label: "Data visualization",
    description: "Data visualization",
    folder: "content/docs/elements/data-visualization",
  },

  // Utilities
  {
    name: "utilities",
    label: "Utilities",
    description: "Utilities",
    folder: "content/docs/utilities",
  },
]
  .map(field => ({
    ...defaultFields,
    ...field,
  }))
  .map(({ folder, ...collection }) => ({
    ...collection,
    folder:
      process.env.NODE_ENV === "development"
        ? folder
        : `packages/palette-docs/${folder}`,
  }))

export const config = {
  collections,
  // publish_mode:
  //   process.env.NODE_ENV === "development" ? undefined : "editorial_workflow",
}

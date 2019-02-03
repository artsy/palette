const defaultFields = {
  extension: "mdx",
  format: "frontmatter",
  widget: "mdx",
  create: true,
  fields: [
    {
      label: "Name",
      name: "name",
      widget: "string",
      tagname: "h1",
      required: true,
    },
    {
      label: "Subnav Order",
      name: "subnavOrder",
      required: false,
    },
    {
      label: "WIP",
      name: "wip",
      widget: "boolean",
      required: false,
    },
    {
      label: "Body",
      name: "body",
      widget: "mdx",
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
    folder: process.env.NODE_ENV === "development" ? folder : `www/${folder}`,
  }))

export const config = {
  collections,
  publish_mode:
    process.env.NODE_ENV === "development" ? undefined : "editorial_workflow",
}

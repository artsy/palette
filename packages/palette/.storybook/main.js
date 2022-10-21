module.exports = {
  stories: ["../src/**/*.story.(tsx|mdx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-viewport",
  ],
  babel: async (options) => ({
    ...options,
    plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
  }),
  core: {
    builder: "webpack5",
  },
  features: {
    storyStoreV7: true,
  },
  framework: "@storybook/react",
}

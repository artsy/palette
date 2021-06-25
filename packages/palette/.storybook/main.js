module.exports = {
  stories: ["../src/**/*.story.(tsx|mdx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-viewport",
    "@storybook/addon-docs",
  ],
  babel: async (options) => ({
    ...options,
    plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
  }),
}

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.story.@(tsx|mdx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-viewport",
    "@storybook/addon-actions",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  core: {
    disableTelemetry: true,
    builder: {
      name: "webpack5",
    },
  },

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },

  babel: (config) => {
    return { ...config, rootMode: "upward" }
  },

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            [
              "@babel/plugin-transform-private-property-in-object",
              { loose: true },
            ],
            ["@babel/plugin-transform-private-methods", { loose: true }],
          ],
        },
      },
    })

    config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx")

    return config
  },
}

export default config

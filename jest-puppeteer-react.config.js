const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const debug = require("debug")("jest-puppeteer-react")
const isCI = typeof process.env.CI !== "undefined"
const isMac = process.platform === "darwin"

function getIPAddress() {
  const interfaces = require("os").networkInterfaces()
  for (let devName in interfaces) {
    const iface = interfaces[devName]

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      )
        return alias.address
    }
  }

  return "0.0.0.0"
}

debug(`get ip address: ${getIPAddress()}`)

module.exports = {
  generateWebpackConfig: function generateWebpackConfig(
    entryFiles,
    aliasObject
  ) {
    return {
      mode: "development",
      entry: { test: entryFiles },
      devtool: "eval-source-map",
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
      },
      devServer: {
        contentBase: "./",
      },
      resolve: {
        alias: aliasObject,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "tests", "index.html"),
        }),
      ],
      module: {
        rules: [
          {
            test: /\.m?ts$/,
            exclude: /(node_modules)/,
            use: {
              loader: "babel-loader",
            },
          },
        ],
      },
    }
  },
  port: 1111,
  renderOptions: {
    viewport: { deviceScaleFactor: 2 },
  },
  useDocker: true,
  dockerHost: isMac
    ? "docker.for.mac.host.internal"
    : isCI
      ? getIPAddress()
      : "192.168.65.1", // or try common default
}

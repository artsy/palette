import path from "path"

export default {
  files: "./docs/**/*.{md,markdown,mdx}",
  hashRouter: true,
  indexHtml: "docs/index.html",
  protocol: "http",
  typescript: true,
  themeConfig: {
    colors: {
      primary: "#6E1EFF",
      sidebarBg: "#F8F8F8",
    },
  },
  wrapper: "docs/utils/components/Wrapper.tsx",
}

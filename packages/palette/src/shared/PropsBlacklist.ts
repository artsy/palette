/**
 * Blacklist of styled-system props that should be excluded from Storybook controls
 * for components that extend BoxProps or FlexProps to keep autodocs focused on
 * component-specific props rather than low-level styling props.
 */
export const STYLED_SYSTEM_PROPS_BLACKLIST = [
  // Background props
  "background",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "backgroundRepeat",
  "backgroundColor",
  "bg",
  // Border props
  "border",
  "borderWidth",
  "borderStyle",
  "borderColor",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderLeft",
  "borderX",
  "borderY",
  "borderTopWidth",
  "borderTopStyle",
  "borderTopColor",
  "borderRightWidth",
  "borderRightStyle",
  "borderRightColor",
  "borderBottomWidth",
  "borderBottomStyle",
  "borderBottomColor",
  "borderLeftWidth",
  "borderLeftStyle",
  "borderLeftColor",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius",
  // Box shadow props
  "boxShadow",
  // Color props
  "color",
  "textColor",
  "opacity",
  // Flexbox props
  "alignItems",
  "alignContent",
  "justifyItems",
  "justifyContent",
  "flexWrap",
  "flexDirection",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "justifySelf",
  "alignSelf",
  "order",
  // Grid area props
  "gridArea",
  // Layout props
  "width",
  "height",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "size",
  "display",
  "verticalAlign",
  "overflow",
  "overflowX",
  "overflowY",
  // Position props
  "position",
  "zIndex",
  "top",
  "right",
  "bottom",
  "left",
  // Space props (margin and padding)
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginX",
  "marginY",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingX",
  "paddingY",
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  // Text align props
  "textAlign",
  // Additional Box props
  "gap",
  "pointerEvents",
] as const

/**
 * Helper function to create an exclude list by combining the styled-system blacklist
 * with additional component-specific props that should be hidden from controls.
 *
 * @param additionalExcludes - Additional props to exclude beyond styled-system props
 * @returns Combined array of props to exclude from Storybook controls
 */
export const createExcludeList = (additionalExcludes: string[] = []) => [
  ...STYLED_SYSTEM_PROPS_BLACKLIST,
  ...additionalExcludes,
]

import React from "react"
import {
  Box,
  Button,
  BUTTON_VARIANT_NAMES,
  Column,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
  TextVariant,
} from "../elements"
import { useTheme } from "../Theme"

export default {
  title: "Theme",
}

export const Theme = () => {
  const { theme } = useTheme()

  return (
    <>
      <Text variant="xxl" mb={4}>
        Theme
      </Text>

      <Separator color="black30" my={12} />

      <Box as="pre" my={0}>
        {JSON.stringify(theme, null, 2)}
      </Box>
    </>
  )
}

export const Colors = () => {
  const { theme } = useTheme()
  const colors = Object.entries(theme.colors)

  return (
    <>
      <Text variant="xxl" mb={4}>
        Color Palette
      </Text>

      <Text variant="sm">
        The Artsy color palette has been updated to improve the accessibility.
        Each color has been adjusted to ensure sufficient contrast and has
        specific roles as to which colors can be used in conjunction with each
        other.
      </Text>

      <Separator color="black30" my={12} />

      <Text variant="sm" color="black60">
        <GridColumns>
          <Column span={6}>Color Value</Column>
          <Column span={6}>Hex Value</Column>
        </GridColumns>
      </Text>

      <Separator color="black30" my={6} />

      {colors.map(([name, value]) => {
        return (
          <GridColumns key={name} justifyContent="space-between" my={4}>
            <Column span={6} display="flex" alignItems="center">
              <Box width={60} height={60} bg={name} borderRadius="50%" />
              <Text variant="xl" ml={2}>
                {name}
              </Text>
            </Column>

            <Column span={6} display="flex" alignItems="center">
              <Text variant="sm" color="black60">
                color:&nbsp;
              </Text>
              <Text variant="sm">{value}</Text>
            </Column>
          </GridColumns>
        )
      })}
    </>
  )
}

export const Spacing = () => {
  const { theme } = useTheme()

  const spacing = Object.keys(theme.space).sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  )

  return (
    <>
      <Text variant="xxl" mb={4}>
        Spacing
      </Text>

      <Separator color="black30" my={12} />

      <Join separator={<Spacer my={2} />}>
        {spacing.map((key) => {
          const px = parseFloat(key) * 10

          return (
            <Box key={key}>
              <Text variant="lg">{key}</Text>
              <Text variant="xs">{px}px</Text>
              <Box width={px} height={1} bg="black60" />
            </Box>
          )
        })}
      </Join>
    </>
  )
}

export const Grid = () => {
  const { theme } = useTheme()

  return (
    <>
      <Text variant="xxl">Desktop</Text>

      <Separator color="black30" my={12} />

      <GridColumns my={12} width="100%" height={800}>
        {[...new Array(12)].map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>

      <Separator my={12} color="black30" />

      <Text variant="xxl">Tablet</Text>

      <GridColumns my={12} width={theme.breakpoints.sm} height={800} mx="auto">
        {[...new Array(12)].map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>

      <Separator my={12} color="black30" />

      <Text variant="xxl">Mobile</Text>

      <GridColumns my={12} width={480} gridColumnGap={1} height={800} mx="auto">
        {[...new Array(12)].map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>
    </>
  )
}

export const Typography = () => {
  const { theme } = useTheme()

  const variants =
    theme.id === "v2" ? theme.textVariants.large : theme.textVariants

  const treatments = Object.keys(variants) as TextVariant[]

  return (
    <>
      <Text variant="xxl" mb={4}>
        Type Scale
      </Text>

      <Separator color="black30" my={12} />

      <Text variant="sm" color="black60">
        <GridColumns>
          <Column span={6}>Size</Column>
          <Column span={6}>Details</Column>
        </GridColumns>
      </Text>

      <Separator my={4} color="black30" />

      <Join separator={<Separator my={4} color="black30" />}>
        {treatments.map((name) => {
          return (
            <GridColumns key={name}>
              <Column span={6}>
                <Text variant={name}>
                  {name}
                  <br />
                  {[
                    variants[name].fontSize,
                    variants[name].lineHeight,
                    variants[name].letterSpacing,
                  ]
                    .filter(Boolean)
                    .join("/")}
                </Text>
              </Column>

              <Column span={6}>
                {Object.entries(variants[name]).map(([key, value]) => {
                  return (
                    <Text key={key} variant="sm">
                      <Box as="span" color="black60">
                        {key}:
                      </Box>{" "}
                      {value}
                    </Text>
                  )
                })}
              </Column>
            </GridColumns>
          )
        })}
      </Join>
    </>
  )
}

export const Buttons = () => {
  return (
    <>
      <Text variant="xxl" mb={4}>
        Buttons
      </Text>

      <Separator my={12} color="black30" />

      <Text variant="sm" color="black60">
        <GridColumns>
          <Column span={2}>Default</Column>
          <Column span={2}>Focus</Column>
          <Column span={2}>Hover</Column>
          <Column span={2}>Loading</Column>
          <Column span={2}>Disabled</Column>
        </GridColumns>
      </Text>

      <Separator my={4} color="black30" />

      <Text variant="lg" my={6}>
        Large - 50px
      </Text>

      <GridColumns gridRowGap={6}>
        {BUTTON_VARIANT_NAMES.map((variant) => {
          return (
            <React.Fragment key={variant}>
              <Column span={2}>
                <Button variant={variant} width={150}>
                  Default
                </Button>
              </Column>

              <Column span={2}>
                <Button variant={variant} width={150} focus>
                  Focus
                </Button>
              </Column>

              <Column span={2}>
                <Button variant={variant} width={150} hover>
                  Hover
                </Button>
              </Column>

              <Column span={2}>
                <Button variant={variant} width={150} loading>
                  Loading
                </Button>
              </Column>

              <Column span={2} wrap>
                <Button variant={variant} width={150} disabled>
                  Disabled
                </Button>
              </Column>
            </React.Fragment>
          )
        })}
      </GridColumns>

      <Text variant="lg" my={6}>
        Small - 30px
      </Text>

      <GridColumns gridColumnGap={12} gridRowGap={6}>
        {BUTTON_VARIANT_NAMES.map((variant) => {
          return (
            <React.Fragment key={variant}>
              <Column span={1}>
                <Button variant={variant} size="small" width={100}>
                  Default
                </Button>
              </Column>

              <Column span={1}>
                <Button variant={variant} size="small" width={100} focus>
                  Focus
                </Button>
              </Column>

              <Column span={1}>
                <Button variant={variant} size="small" width={100} hover>
                  Hover
                </Button>
              </Column>

              <Column span={1}>
                <Button variant={variant} size="small" width={100} loading>
                  Loading
                </Button>
              </Column>

              <Column span={1} wrap>
                <Button variant={variant} size="small" width={100} disabled>
                  Disabled
                </Button>
              </Column>
            </React.Fragment>
          )
        })}
      </GridColumns>
    </>
  )
}

import React from "react"
import {
  Box,
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
    <Box>
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

      <GridColumns>
        <Column span={6}>
          <Text variant="sm" color="black60">
            Color Value
          </Text>
        </Column>

        <Column span={6}>
          <Text variant="sm" color="black60">
            Hex Value
          </Text>
        </Column>
      </GridColumns>

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
    </Box>
  )
}

export const Spacing = () => {
  const { theme } = useTheme()

  const spacing = Object.keys(theme.space).sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  )

  return (
    <Box>
      <Text variant="xxl" mb={4}>
        Spacing
      </Text>

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
    </Box>
  )
}

export const Grid = () => {
  const { theme } = useTheme()

  return (
    <Join separator={<Spacer my={2} />}>
      <Text variant="xxl">Desktop</Text>

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
    </Join>
  )
}

export const Typography = () => {
  const { theme } = useTheme()

  const variants =
    theme.id === "v2" ? theme.textVariants.large : theme.textVariants

  const treatments = Object.keys(variants) as TextVariant[]

  return (
    <Box>
      <Text variant="xxl" mb={4}>
        Type Scale
      </Text>

      <GridColumns>
        <Column span={6}>
          <Text variant="sm" color="black60">
            Size
          </Text>
        </Column>

        <Column span={6}>
          <Text variant="sm" color="black60">
            Details
          </Text>
        </Column>
      </GridColumns>

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
    </Box>
  )
}

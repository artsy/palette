import React, { FC, useMemo, useState } from "react"
import {
  Banner,
  Box,
  Breadcrumbs,
  Button,
  BUTTON_VARIANT_NAMES,
  Clickable,
  Column,
  GridColumns,
  Input,
  Join,
  Message,
  Pill,
  PILL_VARIANT_NAMES,
  Select,
  Separator,
  Spacer,
  Stack,
  Step,
  Stepper,
  Tab,
  Tabs,
  Text,
} from "../elements"
import { THEME, useTheme } from "../Theme"
import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"
import { THEME_DARK } from "@artsy/palette-tokens/dist/themes/v3Dark"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import { debounce } from "lodash"

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

      <Join separator={<Spacer y={2} />}>
        {spacing.map((key) => {
          const px = parseFloat(key) * 10

          return (
            <Box key={key}>
              <Text variant="lg-display">{key}</Text>
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
        {Array.from(Array(12)).map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>

      <Separator my={12} color="black30" />

      <Text variant="xxl">Tablet</Text>

      <GridColumns my={12} width={theme.breakpoints.sm} height={800} mx="auto">
        {Array.from(Array(12)).map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>

      <Separator my={12} color="black30" />

      <Text variant="xxl">Mobile</Text>

      <GridColumns my={12} width={480} gridColumnGap={1} height={800} mx="auto">
        {Array.from(Array(12)).map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>
    </>
  )
}

export const Typography = () => {
  const { theme } = useTheme()

  const treatments = Object.keys(theme.textVariants) as TextVariant[]

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
                    theme.textVariants[name].fontSize,
                    theme.textVariants[name].lineHeight,
                    theme.textVariants[name].letterSpacing,
                  ]
                    .filter(Boolean)
                    .join("/")}
                </Text>
              </Column>

              <Column span={6}>
                {Object.entries(theme.textVariants[name]).map(
                  ([key, value]) => {
                    return (
                      <Text key={key} variant="sm">
                        <Box as="span" color="black60">
                          {key}:
                        </Box>{" "}
                        {value}
                      </Text>
                    )
                  }
                )}
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

      <Text variant="lg-display" my={6}>
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

      <Text variant="lg-display" my={6}>
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

export const Components = () => {
  return (
    <>
      <Text variant="xxl">Components</Text>

      <Separator color="black30" my={12} />

      <Text variant="xxl" my={6}>
        Messages
      </Text>

      <Text variant="lg-display" my={6}>
        Default
      </Text>

      <Message title="Message Title" variant="default">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Message>

      <Text variant="lg-display" my={6}>
        Info
      </Text>

      <Message title="Message Title" variant="info">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Message>

      <Text variant="lg-display" my={6}>
        Warning
      </Text>

      <Message title="Message Title" variant="warning">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Message>

      <Text variant="lg-display" my={6}>
        Error
      </Text>

      <Message title="Message Title" variant="error">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Message>

      <Separator color="black30" my={12} />

      <Text variant="xxl" my={6}>
        Banners
      </Text>

      <Text variant="lg-display" my={6}>
        Default Light
      </Text>

      <Banner dismissable variant="defaultLight">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Banner>

      <Text variant="lg-display" my={6}>
        Default Dark
      </Text>

      <Banner dismissable variant="defaultDark">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Banner>

      <Text variant="lg-display" my={6}>
        Success
      </Text>

      <Banner dismissable variant="success">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Banner>

      <Text variant="lg-display" my={6}>
        Error
      </Text>

      <Banner dismissable variant="error">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Banner>

      <Text variant="lg-display" my={6}>
        Brand
      </Text>

      <Banner dismissable variant="brand">
        This is placeholder text. Ut sodales nunc vitae est lacinia, nec tempus
        risus aliquam. Vestibulum sollicitudin eget tellus ac venenatis.
      </Banner>

      <Separator color="black30" my={12} />

      <Text variant="xxl" my={4}>
        Pills
      </Text>

      <Text variant="sm" color="black60">
        <GridColumns>
          <Column span={3}>Default</Column>
          <Column span={3}>Focus</Column>
          <Column span={3}>Hover</Column>
          <Column span={3}>Active</Column>
        </GridColumns>
      </Text>

      <Separator color="black30" my={6} />

      <GridColumns gridRowGap={6}>
        {PILL_VARIANT_NAMES.map((variant) => {
          return (
            <React.Fragment key={variant}>
              <Column span={3}>
                <Pill variant={variant}>Default</Pill>
              </Column>

              <Column span={3}>
                <Pill variant={variant} focus>
                  Focus
                </Pill>
              </Column>

              <Column span={3}>
                <Pill variant={variant} hover>
                  Hover
                </Pill>
              </Column>

              {variant !== "profile" && (
                <Column span={3}>
                  <Pill variant={variant} active>
                    Active
                  </Pill>
                </Column>
              )}
            </React.Fragment>
          )
        })}
      </GridColumns>

      <Separator color="black30" my={12} />

      <Text variant="xxl" my={6}>
        Navigational Tabs
      </Text>

      <Text variant="lg-display" my={4}>
        2 Tabs
      </Text>

      <Tabs fill>
        <Tab name="Active" />
        <Tab name="Default" />
      </Tabs>

      <Text variant="lg-display" my={4}>
        3 Tabs
      </Text>

      <Tabs fill>
        <Tab name="Active" />
        <Tab name="Default 02" />
        <Tab name="Default 03" />
      </Tabs>

      <Text variant="lg-display" my={4}>
        4 Tabs
      </Text>

      <Tabs fill>
        <Tab name="Active" />
        <Tab name="Default 02" />
        <Tab name="Default 03" />
        <Tab name="Default 04" />
      </Tabs>

      <Text variant="lg-display" my={4}>
        5 Tabs
      </Text>

      <Tabs fill>
        <Tab name="Active" />
        <Tab name="Default 02" />
        <Tab name="Default 03" />
        <Tab name="Default 04" />
        <Tab name="Default 05" />
      </Tabs>

      <Separator color="black30" my={12} />

      <Text variant="xxl" my={6}>
        Content Tabs
      </Text>

      <Text variant="lg-display" my={4}>
        2 Tabs
      </Text>

      <Tabs>
        <Tab name="Active" />
        <Tab name="Default" />
      </Tabs>

      <Text variant="lg-display" my={4}>
        3 Tabs
      </Text>

      <Tabs>
        <Tab name="Active" />
        <Tab name="Default 02" />
        <Tab name="Default 03" />
      </Tabs>

      <Text variant="lg-display" my={4}>
        4 Tabs
      </Text>

      <Tabs>
        <Tab name="Active" />
        <Tab name="Default 02" />
        <Tab name="Default 03" />
        <Tab name="Default 04" />
      </Tabs>

      <Text variant="lg-display" my={4}>
        5 Tabs
      </Text>

      <Tabs>
        <Tab name="Active" />
        <Tab name="Default 02" />
        <Tab name="Default 03" />
        <Tab name="Default 04" />
        <Tab name="Default 05" />
      </Tabs>

      <Separator color="black30" my={12} />

      <Text variant="xxl" my={6}>
        Steps
      </Text>

      <Text variant="lg-display" my={4}>
        3 Steps
      </Text>

      <Stepper currentStepIndex={0}>
        <Step name="Active" />
        <Step name="Default 02" />
        <Step name="Default 03" />
      </Stepper>

      <Text variant="lg-display" my={4}>
        4 Steps
      </Text>

      <Stepper currentStepIndex={0}>
        <Step name="Active" />
        <Step name="Default 02" />
        <Step name="Default 03" />
        <Step name="Default 04" />
      </Stepper>

      <Text variant="lg-display" my={4}>
        5 Steps
      </Text>

      <Stepper currentStepIndex={0}>
        <Step name="Active" />
        <Step name="Default 02" />
        <Step name="Default 03" />
        <Step name="Default 04" />
        <Step name="Default 05" />
      </Stepper>

      <Separator color="black30" my={12} />

      <Text variant="xxl" my={6}>
        Breadcrumbs
      </Text>

      <Breadcrumbs>
        <a href="#example">Level 01</a>
        <a href="#example">Level 02</a>
        <a href="#example">Level 03</a>
        <a href="#example">Level 04 (Active)</a>
      </Breadcrumbs>
    </>
  )
}

const OPTIONS = [
  { text: "First", value: "firstValue" },
  { text: "Middle", value: "middleValue" },
  { text: "Last", value: "lastValue" },
]

export const Inputs = () => {
  return (
    <>
      <Text variant="xxl">Inputs & Selections</Text>

      <Separator color="black30" my={12} />

      <Text variant="xxl" my={6}>
        Inputs
      </Text>

      <Text variant="sm" color="black60">
        <GridColumns>
          <Column span={2}>Default</Column>

          <Column span={2}>Focus</Column>

          <Column span={2}>Hover</Column>

          <Column span={2}>Active</Column>

          <Column span={2}>Error</Column>

          <Column span={2} wrap>
            Disabled
          </Column>
        </GridColumns>
      </Text>

      <Separator color="black30" my={6} />

      <Text my={6} variant="lg-display">
        No Title
      </Text>

      <GridColumns>
        <Column span={2}>
          <Input placeholder="Default" />
        </Column>

        <Column span={2}>
          <Input focus placeholder="Focus" />
        </Column>

        <Column span={2}>
          <Input hover placeholder="Hover" />
        </Column>

        <Column span={2}>
          <Input focus placeholder="Active" defaultValue="Active" />
        </Column>

        <Column span={2}>
          <Input error="Input Value Error Message/Reason" placeholder="Error" />
        </Column>

        <Column span={2}>
          <Input disabled placeholder="Disabled" />
        </Column>
      </GridColumns>

      <Text my={6} variant="lg-display">
        Title
      </Text>

      <GridColumns>
        <Column span={2}>
          <Input title="Title" placeholder="Default" />
        </Column>

        <Column span={2}>
          <Input title="Title" focus placeholder="Focus" />
        </Column>

        <Column span={2}>
          <Input title="Title" hover placeholder="Hover" />
        </Column>

        <Column span={2}>
          <Input
            title="Title"
            focus
            placeholder="Active"
            defaultValue="Active"
          />
        </Column>

        <Column span={2}>
          <Input
            title="Title"
            error="Input Value Error Message/Reason"
            placeholder="Error"
          />
        </Column>

        <Column span={2}>
          <Input title="Title" disabled placeholder="Disabled" />
        </Column>
      </GridColumns>

      <Text my={6} variant="lg-display">
        Title & Subtitle
      </Text>

      <GridColumns>
        <Column span={2}>
          <Input title="Title" description="Subtitle" placeholder="Default" />
        </Column>

        <Column span={2}>
          <Input
            title="Title"
            description="Subtitle"
            focus
            placeholder="Focus"
          />
        </Column>

        <Column span={2}>
          <Input
            title="Title"
            description="Subtitle"
            hover
            placeholder="Hover"
          />
        </Column>

        <Column span={2}>
          <Input
            title="Title"
            description="Subtitle"
            focus
            placeholder="Active"
            defaultValue="Active"
          />
        </Column>

        <Column span={2}>
          <Input
            title="Title"
            description="Subtitle"
            error="Input Value Error Message/Reason"
            placeholder="Error"
          />
        </Column>

        <Column span={2}>
          <Input
            title="Title"
            description="Subtitle"
            disabled
            placeholder="Disabled"
          />
        </Column>
      </GridColumns>

      <Text variant="xxl" my={6}>
        Selects
      </Text>

      <Text variant="sm" color="black60">
        <GridColumns>
          <Column span={2}>Default</Column>

          <Column span={2}>Focus</Column>

          <Column span={2}>Hover</Column>

          <Column span={2}>Error</Column>

          <Column span={2} wrap>
            Disabled
          </Column>
        </GridColumns>
      </Text>

      <Separator color="black30" my={6} />

      <Text my={6} variant="lg-display">
        No Title
      </Text>

      <GridColumns>
        <Column span={2}>
          <Select options={OPTIONS} />
        </Column>

        <Column span={2}>
          <Select options={OPTIONS} focus />
        </Column>

        <Column span={2}>
          <Select options={OPTIONS} hover />
        </Column>

        <Column span={2}>
          <Select options={OPTIONS} error="Input Value Error Message/Reason" />
        </Column>

        <Column span={2} wrap>
          <Select options={OPTIONS} disabled />
        </Column>
      </GridColumns>

      <Text my={6} variant="lg-display">
        Title
      </Text>

      <GridColumns>
        <Column span={2}>
          <Select title="Title" options={OPTIONS} />
        </Column>

        <Column span={2}>
          <Select title="Title" options={OPTIONS} focus />
        </Column>

        <Column span={2}>
          <Select title="Title" options={OPTIONS} hover />
        </Column>

        <Column span={2}>
          <Select
            title="Title"
            options={OPTIONS}
            error="Input Value Error Message/Reason"
          />
        </Column>

        <Column span={2} wrap>
          <Select title="Title" options={OPTIONS} disabled />
        </Column>
      </GridColumns>

      <Text my={6} variant="lg-display">
        Title & Subtitle
      </Text>

      <GridColumns>
        <Column span={2}>
          <Select title="Title" description="Subtitle" options={OPTIONS} />
        </Column>

        <Column span={2}>
          <Select
            title="Title"
            description="Subtitle"
            options={OPTIONS}
            focus
          />
        </Column>

        <Column span={2}>
          <Select
            title="Title"
            description="Subtitle"
            options={OPTIONS}
            hover
          />
        </Column>

        <Column span={2}>
          <Select
            title="Title"
            description="Subtitle"
            options={OPTIONS}
            error="Input Value Error Message/Reason"
          />
        </Column>

        <Column span={2} wrap>
          <Select
            title="Title"
            description="Subtitle"
            options={OPTIONS}
            disabled
          />
        </Column>
      </GridColumns>
    </>
  )
}

const contrastRatio = (hexColor1: string, hexColor2: string): number => {
  // Convert hex color to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
  }

  // Calculate relative luminance
  const getLuminance = (rgb: number[]) => {
    const a = rgb.map(function (v) {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const rgb1 = hexToRgb(hexColor1)
  const rgb2 = hexToRgb(hexColor2)
  const luminance1 = getLuminance(rgb1)
  const luminance2 = getLuminance(rgb2)

  // Calculate contrast ratio
  const ratio =
    (Math.max(luminance1, luminance2) + 0.05) /
    (Math.min(luminance1, luminance2) + 0.05)
  return parseFloat(ratio.toFixed(2)) // Round to two decimal places for readability
}

export const ContrastRatios = () => {
  return (
    <>
      <Text variant="xxl">Contrast Ratios</Text>

      <Separator color="black30" my={12} />

      <GridColumns>
        {[THEME, THEME_DARK].map((theme) => {
          return (
            <Column key={theme.name} span={6}>
              <Stack gap={6}>
                <Text variant="lg-display">{theme.name}</Text>

                <Stack gap={1}>
                  {Object.entries(theme.colors).map(([name, value]) => {
                    return (
                      <ContrastRatioSwatch
                        key={name}
                        name={name}
                        value={value}
                        theme={theme}
                      />
                    )
                  })}
                </Stack>
              </Stack>
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

const ContrastRatioSwatch: FC<{
  name: string
  value: string
  theme: typeof THEME
}> = ({ name, value: _value, theme }) => {
  const [value, setValue] = useState(_value)
  const debouncedSetValue = useMemo(() => {
    return debounce(setValue, 500)
  }, [])

  const numerator = contrastRatio(value, theme.colors.white100)

  return (
    <Stack
      key={value}
      gap={1}
      flexDirection="row"
      flex={1}
      bg={theme.colors.white100}
      color={value}
      alignItems="center"
      justifyContent="space-between"
      px={2}
      py={1}
      borderRadius={5}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => {
            debouncedSetValue(e.target.value)
            navigator.clipboard.writeText(e.target.value)
          }}
        />

        <Clickable
          onClick={() => {
            setValue(_value)
          }}
        >
          <Text key={value} variant="lg-display">
            {name} = {numerator}:1
          </Text>
        </Clickable>
      </Stack>

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={0.5}
      >
        {numerator > 4.5 ? (
          <CheckmarkFillIcon
            fill="green100"
            bg="white100"
            style={{
              borderRadius: "50%",
            }}
          />
        ) : (
          <CloseFillIcon
            fill="red100"
            bg="white100"
            style={{
              borderRadius: "50%",
            }}
          />
        )}

        {numerator > 3 ? (
          <CheckmarkFillIcon
            fill="green100"
            bg="white100"
            style={{
              borderRadius: "50%",
            }}
          />
        ) : (
          <CloseFillIcon
            fill="red100"
            bg="white100"
            style={{
              borderRadius: "50%",
            }}
          />
        )}
      </Stack>
    </Stack>
  )
}

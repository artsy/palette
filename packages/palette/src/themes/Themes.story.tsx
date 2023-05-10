import React from "react"
import {
  Banner,
  Box,
  Breadcrumbs,
  Button,
  BUTTON_VARIANT_NAMES,
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
  Step,
  Stepper,
  Tab,
  Tabs,
  Text,
} from "../elements"
import { isThemeV2, useTheme } from "../Theme"
import { TextVariant } from "@artsy/palette-tokens/dist/typography/v3"

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

  const variants = isThemeV2(theme)
    ? theme.textVariants.large
    : theme.textVariants

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

              {variant !== "artist" && (
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

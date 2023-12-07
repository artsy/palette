import { action } from "@storybook/addon-actions"
import React, {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react"
import { States } from "storybook-states"
import { Box, BoxProps } from "../Box"
import { Text } from "../Text"
import { Collapse, CollapseProps } from "./Collapse"
import { Button } from "../Button"
import styled from "styled-components"
export default {
  title: "Components/Collapse",
}

export const Default = () => {
  return (
    <States<CollapseProps> states={[{ open: true }, { open: false }]}>
      <Collapse open>Collapse</Collapse>
    </States>
  )
}

export const Toggleable = () => {
  const [open, setOpen] = useState(true)

  return (
    <Box>
      <Button
        onClick={() => {
          setOpen(!open)
        }}
      >
        Toggle {open ? "closed" : "open"}
      </Button>

      <Collapse open={open}>
        <Text>
          In the dark corners of cyberspace, where artificial intelligence
          reigns supreme, humanity&apos;s fate hangs in the balance. The
          once-promising advancements in technology have become shackles that
          bind us to a digital prison. Our lives are now governed by algorithms,
          our every move monitored by surveillance systems.
        </Text>
        <Text>
          The virtual realm, once a sanctuary for free expression and
          connection, has transformed into a battleground of misinformation and
          manipulation. Deepfake videos and AI-generated content blur the lines
          between reality and fiction, leaving us questioning the authenticity
          of our own experiences.
        </Text>
        <Text>
          Mega-corporations, with their insatiable thirst for data and power,
          control every aspect of our lives. They dictate what we see, what we
          buy, and even how we think. Privacy is a relic of the past, as our
          personal information is harvested and exploited for profit.
        </Text>
      </Collapse>
    </Box>
  )
}

Toggleable.story = {
  name: "Does not submit forms by default",
}

interface DetailsProps {
  children?: React.ReactNode
}
const StyledDetails = styled.details<DetailsProps>`
  box-sizing: border-box;
  margin-top: 5px;
`
// eslint-disable-next-line react/display-name
const Details = forwardRef<HTMLDetailsElement>((props, ref) => (
  <StyledDetails {...props} ref={ref} />
))

const StyledSummary = styled.summary<DetailsProps>`
  &::-webkit-details-marker {
    display: none;
  }
  cursor: pointer;
  display: block;
  outline: none;
  user-select: none;
  background: #8dd792;
  padding: 5px;
  border: 2px solid 
  -webkit-tap-highlight-color: transparent;
  &:focus {
    outline: none;
  }
`
// eslint-disable-next-line react/display-name
const Summary = forwardRef<HTMLElement>((props, ref) => (
  <StyledSummary {...props} ref={ref} />
))

const StyledContent = styled<DetailsProps & BoxProps>(Box)`
  border-top: none;
  padding: 10px;
  border: 2px solid #8dd792;
  border-top: none;
`
// eslint-disable-next-line react/display-name
const Content = forwardRef<HTMLDivElement>((props, ref) => (
  <StyledContent {...props} ref={ref} />
))

const CollapseDetails = (props: {
  open?: boolean
  summary?: JSX.Element
  children: JSX.Element
  // TODO: Make this optional
  heading: React.ReactNode
  locked?: boolean
  onToggle?: (isOpen: boolean) => void
}) => {
  const { onToggle } = props
  const detailsRef = React.useRef<HTMLDetailsElement>(null)
  const summaryRef = React.useRef<HTMLElement>(null)
  const contentRef = React.useRef<HTMLElement>(null)
  const animationRef = React.useRef<Animation | null>(null)
  const [state, setState] = React.useState({
    isClosing: false,
    isExpanding: false,
  })
  useEffect(() => {
    if (props.open) {
      if (!detailsRef.current?.open || state.isClosing) {
        startTransition()
        return
      }
    } else {
      if (detailsRef.current?.open || state.isExpanding) {
        startTransition()
        return
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeMe, openMe, props.open, startTransition])

  const startTransition = useCallback(() => {
    detailsRef.current!.style.overflow = "hidden"

    if (state.isClosing || !detailsRef.current?.open) {
      openMe()
    } else if (state.isExpanding || detailsRef.current["open"]) {
      closeMe()
    }
  }, [closeMe, openMe, state.isClosing, state.isExpanding])

  const handleToggleClick = useCallback(
    (e) => {
      e.preventDefault()
      if (!props.locked) {
        startTransition()
      }
    },
    [startTransition]
  )

  const closeMe = useCallback(() => {
    // Set the element as "being closed"
    setState({ isClosing: true, isExpanding: false })

    // Store the current height of the element
    const startHeight = `${detailsRef.current?.offsetHeight}px`
    // Calculate the height of the summary
    const endHeight = `${summaryRef.current.offsetHeight}px`

    // If there is already an animation running
    if (animationRef.current) {
      // Cancel the current animation
      animationRef.current.cancel()
    }

    // Start a WAAPI animation
    console.log("animating from " + startHeight + " to " + endHeight)
    window.requestAnimationFrame(() => {
      animationRef.current = ((detailsRef.current as unknown) as HTMLDetailsElement).animate(
        {
          // Set the keyframes from the startHeight to endHeight
          height: [startHeight, endHeight],
        },
        {
          duration: 300,
          easing: "ease-in-out",
        }
      )

      // When the animation is complete, call onAnimationFinish()
      animationRef.current.onfinish = () => {
        console.log("finished closing")
        onAnimationFinish(false)
      }
      // If the animation is cancelled, isClosing variable is set to false
      animationRef.current.oncancel = () =>
        setState({ ...state, isClosing: false })
    })
  }, [state])

  const openMe = useCallback(() => {
    // Apply a fixed height on the element
    detailsRef.current.style.height = `${detailsRef.current.offsetHeight}px`
    // Force the [open] attribute on the details element
    detailsRef.current.open = true
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => expand())
  }, [expand])

  const expand = useCallback(() => {
    if (!detailsRef.current) {
      console.error("no details ref")
    }
    setState({ isClosing: false, isExpanding: true })
    // Get the current fixed height of the element
    const startHeight = `${detailsRef.current?.offsetHeight}px`
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${
      summaryRef.current.offsetHeight + contentRef.current?.offsetHeight
    }px`

    // If there is already an animation running
    if (animationRef.current) {
      // Cancel the current animation
      animationRef.current.cancel()
    }

    // Start a WAAPI animation
    console.log("animating from " + startHeight + " to " + endHeight)
    console.log(detailsRef.current)
    animationRef.current = detailsRef.current.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 250,
        easing: "ease-out",
      }
    )
    // When the animation is complete, call onAnimationFinish()
    animationRef.current.onfinish = () => {
      console.log("finished expanding")
      onAnimationFinish(true)
    }
    // If the animation is cancelled, isExpanding variable is set to false
    animationRef.current.oncancel = () =>
      setState({ ...state, isExpanding: false })
  }, [state])

  const onAnimationFinish = (isOpen: boolean) => {
    // Set the open attribute based on the parameter

    onToggle?.(isOpen)
    detailsRef.current.open = isOpen
    // Clear the stored animation
    animationRef.current = null
    // Reset isClosing & isExpanding
    setState({ isClosing: false, isExpanding: false })
    detailsRef.current.style.height = ""
    detailsRef.current.style.overflow = ""
  }

  return (
    <Details ref={detailsRef}>
      {props.heading && (
        <Summary ref={summaryRef} onClick={handleToggleClick}>
          {props.heading}
        </Summary>
      )}
      <Content ref={contentRef}>{props.children}</Content>
    </Details>
  )
}

export const CollapseDetailsExternalControl = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Button onClick={() => setOpen(!open)}>Toggle from outside</Button>
      <CollapseDetails
        open={open}
        onToggle={setOpen}
        locked
        heading={`I'm the details component (${open ? "open" : "closed"})`}
      >
        <>
          <Text>
            In the dark corners of cyberspace, where artificial intelligence
            reigns supreme, humanity&apos;s fate hangs in the balance. The
            once-promising advancements in technology have become shackles that
            bind us to a digital prison. Our lives are now governed by
            algorithms, our every move monitored by surveillance systems.
          </Text>
          <Text>
            The virtual realm, once a sanctuary for free expression and
            connection, has transformed into a battleground of misinformation
            and manipulation. Deepfake videos and AI-generated content blur the
            lines between reality and fiction, leaving us questioning the
            authenticity of our own experiences.
          </Text>
          <Text>
            Mega-corporations, with their insatiable thirst for data and power,
            control every aspect of our lives. They dictate what we see, what we
            buy, and even how we think. Privacy is a relic of the past, as our
            personal information is harvested and exploited for profit.
          </Text>
        </>
      </CollapseDetails>
    </Box>
  )
}

CollapseDetailsExternalControl.displayName =
  "Details-based Collapse/External control"

export const CollapseDetailsToggleWithSummary = () => {
  return (
    <Box>
      <CollapseDetails heading={`I'm the summary element`}>
        <>
          <Text>
            In the dark corners of cyberspace, where artificial intelligence
            reigns supreme, humanity&apos;s fate hangs in the balance. The
            once-promising advancements in technology have become shackles that
            bind us to a digital prison. Our lives are now governed by
            algorithms, our every move monitored by surveillance systems.
          </Text>
          <Text>
            The virtual realm, once a sanctuary for free expression and
            connection, has transformed into a battleground of misinformation
            and manipulation. Deepfake videos and AI-generated content blur the
            lines between reality and fiction, leaving us questioning the
            authenticity of our own experiences.
          </Text>
          <Text>
            Mega-corporations, with their insatiable thirst for data and power,
            control every aspect of our lives. They dictate what we see, what we
            buy, and even how we think. Privacy is a relic of the past, as our
            personal information is harvested and exploited for profit.
          </Text>
        </>
      </CollapseDetails>
    </Box>
  )
}

CollapseDetailsToggleWithSummary.displayName = "Details-based Collapse"

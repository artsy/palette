import { action } from "@storybook/addon-actions"
import React, { Children, useCallback, useEffect, useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
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

const StyledDetails = styled.details`
  box-sizing: border-box;
  transition: height 0.3s ease-in-out;

  summary::-webkit-details-marker {
    display: none;
  }
  summary {
    cursor: pointer;
    display: block;
    margin-bottom: 10px;
    outline: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    &:focus {
      outline: none;
    }
  }
  height: 0px;
  &[open] > summary {
    color: red;
    height: auto;
  }
`
const Content = styled(Box)`
  border-top: none;
  padding: 10px;
  border: 2px solid #8dd792;
  border-top: none;
`
const CollapseDetails = (props: {
  open?: boolean
  summary?: JSX.Element
  children: JSX.Element
  heading: React.ReactNode
  onToggle: (isOpen: boolean) => void
}) => {
  const { onToggle } = props
  const ref = React.useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const detailsElement = ref.current

    const handleToggle: (
      this: HTMLDetailsElement,
      event: HTMLElementEventMap["toggle"]
    ) => void = (e) => {
      console.log(e.target)
      console.log("toggling to " + e.target?.["open"])
      onToggle(e.target?.["open"] || false)
    }

    detailsElement?.addEventListener("toggle", handleToggle)

    return () => {
      detailsElement?.removeEventListener("toggle", handleToggle)
    }
  }, [onToggle])

  useEffect(() => {
    if (ref.current?.open !== props.open) {
      console.log(`setting current ref (${ref.current?.open}) to ${props.open}`)
      if (props.open) {
        ref.current?.setAttribute("open", props.open ? "open" : "")
      } else {
        ref.current?.removeAttribute("open")
      }
    }
  }, [props.open])

  const handleToggleClick = useCallback(
    (e) => {
      e.preventDefault()
      console.log(`is open: ${props.open}. toggling to ${!props.open}`)
      onToggle(!props.open)
    },
    [onToggle, props.open]
  )

  return (
    <StyledDetails ref={ref}>
      {props.heading && (
        <summary onClick={handleToggleClick}>{props.heading}</summary>
      )}
      {props.children}
    </StyledDetails>
  )
}

export const CollapseDetailsExample = (props: {
  open?: boolean
  summary?: JSX.Element
  children: JSX.Element
  onToggle?: () => void
}) => {
  const [open, setOpen] = useState(props.open || false)

  return (
    <Box>
      <Button onClick={() => setOpen(!open)}>
        Toggle {open ? "closed" : "open"}
      </Button>
      <CollapseDetails
        open={open}
        onToggle={setOpen}
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

CollapseDetailsExample.displayName = "Details-based Collapse"

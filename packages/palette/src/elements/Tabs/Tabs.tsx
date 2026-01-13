import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { flattenChildren } from "../../helpers/flattenChildren"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { BaseTabs, BaseTabsProps } from "../BaseTabs"
import { BaseTab } from "../BaseTabs"
import { Clickable } from "../Clickable"
import { usePrevious } from "../../utils/usePrevious"

export interface TabLike extends JSX.Element {
  props: TabProps
}

export interface TabInfo extends TabProps {
  /** Index of the newly selected Tab */
  tabIndex: number
  /**
   * Arbitrary data that can be associated with a Tab.
   * Will be passed to the parent <Tabs>'s onChange handler.
   */
  data: any
}

export interface TabsProps extends BaseTabsProps {
  /** Index of the Tab that should be pre-selected */
  initialTabIndex?: number
  /** @deprecated */
  autoScroll?: boolean
  /** Function that will be called when a new Tab is selected */
  onChange?: (tabInfo?: TabInfo) => void
}

/** Tabs functionality */
export const useTabs = ({
  children,
  initialTabIndex = 0,
  onChange,
}: TabsProps) => {
  const tabs = useMemo(
    () =>
      flattenChildren<TabLike>(children).map((child) => ({
        child,
        ref: createRef<HTMLButtonElement | null>(),
      })),
    [children]
  )

  const previousInitialTabIndex = usePrevious(initialTabIndex)
  const [activeTabIndex, setActiveTabIndex] = useState<number>(initialTabIndex)

  // If the `initialTabIndex` changes; update the active one
  useUpdateEffect(() => {
    // Only update if the `initialTabIndex` has changed externally
    if (initialTabIndex === previousInitialTabIndex) return
    setActiveTabIndex(initialTabIndex)
  }, [initialTabIndex, tabs])

  // Ref of the tabs viewport
  const ref = useRef<HTMLDivElement | null>(null)

  // Scroll to active tab when `activeTabIndex` changes
  useEffect(() => {
    if (!ref.current) return
    const tab = tabs[activeTabIndex].ref.current
    if (!tab) return
    const position = tab.offsetLeft
    ref.current.scrollTo?.({ left: position, behavior: "smooth" })
  }, [activeTabIndex])

  const handleClick = useCallback(
    (index: number) => {
      return () => {
        if (index === activeTabIndex) return

        setActiveTabIndex(index)

        if (!onChange) return

        onChange({
          tabIndex: index,
          name: tabs[index].child.props.name,
          data: tabs[index].child.props.data ?? {},
        })
      }
    },
    [activeTabIndex, onChange, tabs]
  )

  return {
    activeTabIndex,
    handleClick,
    ref,
    tabs,
  }
}

const Container = styled(Clickable)`
  &:focus-visible {
    outline: none;
    z-index: 2;
    border: 1px solid ${themeGet("colors.blue100")};
  }
`

/** A tab bar navigation component */
export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = ({
  children,
  initialTabIndex = 0,
  mb = 2,
  onChange,
  ...rest
}) => {
  const { tabs, activeTabIndex, handleClick, ref } = useTabs({
    children,
    initialTabIndex,
    onChange,
  })

  return (
    <>
      <BaseTabs ref={ref} mb={mb} {...rest}>
        {tabs.map((tab, i) => {
          return (
            <Container
              key={i}
              ref={tab.ref as any}
              aria-selected={i === activeTabIndex}
              onClick={handleClick(i)}
              flex={1}
            >
              <BaseTab active={i === activeTabIndex} variant="sm">
                <span>{tab.child.props.name}</span>
              </BaseTab>
            </Container>
          )
        })}
      </BaseTabs>

      {tabs[activeTabIndex].child}
    </>
  )
}

export interface TabProps {
  /** Display name of the Tab */
  name: string | JSX.Element
  /**
   * Arbitrary data that can be associated with a Tab.
   * Will be passed to the parent <Tabs>'s onChange handler.
   */
  data?: any
}

/**
 * An individual tab.
 * Does nothing on its own; props are dealt with inside of Tabs.
 */
export const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  children,
}) => <>{children}</>

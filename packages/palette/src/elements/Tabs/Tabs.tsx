import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { flattenChildren } from "../../helpers/flattenChildren"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { BaseTabs, BaseTabsProps } from "../BaseTabs"
import { BaseTab } from "../BaseTabs"
import { Clickable } from "../Clickable"

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

  const [activeTabIndex, setActiveTabIndex] = useState<number>(initialTabIndex)

  // Wraps active tab in a ref to prevent re-rendering.
  // This means that we need to update the active tab before the index state change
  // to catch the re-render.
  const activeTab = useRef(tabs[activeTabIndex])

  // If the `initialTabIndex` changes; update the active one
  useUpdateEffect(() => {
    activeTab.current = tabs[initialTabIndex]
    setActiveTabIndex(initialTabIndex)
  }, [initialTabIndex, tabs])

  // Ref of the tabs viewport
  const ref = useRef<HTMLDivElement | null>(null)

  // Scroll to active tab when `activeTabIndex` changes
  useEffect(() => {
    if (!ref.current) return
    const tab = activeTab.current.ref.current
    if (!tab) return
    const position = tab.offsetLeft
    ref.current.scrollTo?.({ left: position, behavior: "smooth" })
  }, [activeTabIndex])

  const handleClick = useCallback(
    (index: number) => {
      return () => {
        if (index === activeTabIndex) return

        activeTab.current = tabs[index]
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
    activeTab,
    activeTabIndex,
    handleClick,
    ref,
    tabs,
  }
}

/** A tab bar navigation component */
export const Tabs: React.FC<TabsProps> = ({
  children,
  initialTabIndex = 0,
  onChange,
  ...rest
}) => {
  const { tabs, activeTab, activeTabIndex, handleClick, ref } = useTabs({
    children,
    initialTabIndex,
    onChange,
  })

  return (
    <>
      <BaseTabs ref={ref} {...rest}>
        {tabs.map((tab, i) => {
          return (
            <Clickable
              key={i}
              ref={tab.ref as any}
              aria-selected={i === activeTabIndex}
              onClick={handleClick(i)}
              flex={1}
            >
              <BaseTab active={i === activeTabIndex} variant="sm">
                <span>{tab.child.props.name}</span>
              </BaseTab>
            </Clickable>
          )
        })}
      </BaseTabs>

      {activeTab.current.child}
    </>
  )
}

Tabs.defaultProps = {
  mb: 2,
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
export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>

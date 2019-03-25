import React from "react"

/**
 * Collapse component for the web
 */
export class Collapse extends React.Component<{ open: boolean }> {
  wrapperModifyTimeout: ReturnType<typeof setTimeout>
  wrapperRef: HTMLDivElement | null = null

  onTransitionEnd = (ev: TransitionEvent) => {
    if (!this.wrapperRef) {
      return
    }
    if (ev.propertyName === "height") {
      this.wrapperRef.style.height = this.props.open ? "auto" : "0px"
    }
  }

  firstRender: { open: boolean } | null = {
    open: this.props.open,
  }

  componentDidMount() {
    if (!this.wrapperRef) {
      return
    }

    this.wrapperRef.addEventListener("transitionend", this.onTransitionEnd)
  }

  componentDidUpdate() {
    if (!this.wrapperRef) {
      return
    }
    if (this.props.open && this.wrapperRef.style.height !== "auto") {
      // open
      const prevHeight = this.wrapperRef.style.height || "0px"
      this.wrapperRef.style.height = "auto"
      const actualHeight = this.wrapperRef.offsetHeight
      this.wrapperRef.style.height = prevHeight
      this.wrapperModifyTimeout = setTimeout(() => {
        this.wrapperRef.style.height = actualHeight + "px"
      }, 10)
    } else if (!this.props.open && this.wrapperRef.style.height !== "0px") {
      // close
      const actualHeight = this.wrapperRef.offsetHeight
      this.wrapperRef.style.height = actualHeight + "px"
      this.wrapperModifyTimeout = setTimeout(() => {
        this.wrapperRef.style.height = 0 + "px"
      }, 10)
    }
  }

  componentWillUnmount() {
    this.wrapperRef.removeEventListener("transitionend", this.onTransitionEnd)
    clearTimeout(this.wrapperModifyTimeout)
  }

  render() {
    const { children, open } = this.props
    // render explicit height before first change, to let us render closed
    // elements on the server
    let heightProps = {}
    if (this.firstRender) {
      // render() might be called multiple times before the first time `open` changes
      if (this.firstRender.open !== open) {
        // `open` prop has changed for the first time
        // ditch explicit height and let `componentDidUpdate` take the wheel
        this.firstRender = null
      } else {
        heightProps = {
          height: open ? "auto" : "0px",
        }
      }
    }
    return (
      <div
        ref={ref => (this.wrapperRef = ref)}
        style={{
          transition: "height 0.3s ease",
          overflow: "hidden",
          ...heightProps,
        }}
      >
        {children}
      </div>
    )
  }
}

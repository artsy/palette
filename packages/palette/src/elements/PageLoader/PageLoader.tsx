import { random } from "lodash"
import React, { CSSProperties } from "react"
import { Spring } from "react-spring/renderprops.cjs"
import { Box } from "../Box"
import { ProgressBar } from "../ProgressBar"

interface PageLoaderProps {
  className?: string
  complete?: boolean
  percentComplete?: number
  showBackground?: boolean
  style?: CSSProperties
}

interface PageLoaderState {
  progress: number
}

/**
 * A top-level loading bar used when transitioning between pages.
 *
 * Spec: https://app.zeplin.io/project/5acd19ff49a1429169c3128b/screen/5d7166295b4fca9d4724c13d
 */
export class PageLoader extends React.Component<
  PageLoaderProps,
  PageLoaderState
> {
  state = {
    progress: 0,
  }

  static defaultProps = {
    showBackground: true,
    style: {},
  }

  currentProgress = 0
  step = random(1, 3)
  interval

  constructor(props) {
    super(props)
    this.currentProgress = this.props.percentComplete || 0

    this.state = {
      progress: this.currentProgress,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.currentProgress += this.step
      this.setState({
        progress:
          Math.round(
            (Math.atan(this.currentProgress) / (Math.PI / 2)) * 100 * 1000
          ) / 1000,
      })
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { showBackground, style, className } = this.props
    const { progress } = this.state
    const isComplete = progress === 100

    const animation = {
      from: {
        opacity: 0,
        top: 0,
      },
      to: {
        opacity: 1,
        top: 0,
      },
    }

    return (
      <Box width="100%" style={style} className={className}>
        <Spring from={animation.from} to={animation.to} reverse={isComplete}>
          {animationProps => {
            return (
              <Box style={animationProps} position="relative">
                <ProgressBar
                  percentComplete={progress}
                  highlight="purple100"
                  showBackground={showBackground}
                />
              </Box>
            )
          }}
        </Spring>
      </Box>
    )
  }
}

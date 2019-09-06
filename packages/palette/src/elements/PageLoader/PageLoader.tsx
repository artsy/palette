import React from "react"
import { Spring } from "react-spring/renderprops.cjs"
import { Box } from "../Box"
import { ProgressBar } from "../ProgressBar"

interface PageLoaderProps {
  percentComplete?: number
  showBackground?: boolean
  complete?: boolean
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

  defaultProps = {
    showBackground: true,
  }

  currentProgress = 0
  step = 0.5
  interval

  constructor(props) {
    super(props)

    let progress = this.props.percentComplete || 0
    if (this.props.complete) {
      progress = 100
    }

    this.currentProgress = progress

    this.state = {
      progress,
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
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { showBackground } = this.props
    const { progress } = this.state
    const isComplete = progress === 100

    const animation = {
      from: {
        opacity: 0,
        top: -10,
      },
      to: {
        opacity: 1,
        top: 0,
      },
    }

    return (
      <Box position="fixed" top={0} width="100%">
        <Spring
          from={animation.from}
          to={animation.to}
          delay={300}
          reverse={isComplete}
        >
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

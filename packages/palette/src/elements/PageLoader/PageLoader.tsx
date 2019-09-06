import React from "react"
import { Box } from "../Box"
import { ProgressBar } from "../ProgressBar"

interface PageLoaderProps {
  percentComplete?: number
  showBackground?: boolean
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
    progress: this.props.percentComplete || 0,
  }

  defaultProps = {
    showBackground: true,
  }

  currentProgress = this.props.percentComplete || 0
  step = 0.5
  interval

  componentDidMount() {
    this.interval = setInterval(() => {
      this.currentProgress += this.step
      this.setState({
        progress:
          Math.round(
            (Math.atan(this.currentProgress) / (Math.PI / 2)) * 100 * 1000
          ) / 1000,
      })
    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <Box position="fixed" top={0} width="100%">
        <ProgressBar
          percentComplete={this.state.progress}
          highlight="purple100"
          showBackground={this.props.showBackground}
        />
      </Box>
    )
  }
}

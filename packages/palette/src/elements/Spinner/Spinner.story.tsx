import React from "react"
import { Spinner } from "./Spinner"

export default {
  title: "Components/Spinner",
}

export const DefaultSpinner = () => {
  return <Spinner />
}

export const SpinnerWithDelayedShow = () => {
  return <Spinner delay={1000} />
}

SpinnerWithDelayedShow.story = {
  name: "Spinner with delayed show",
}

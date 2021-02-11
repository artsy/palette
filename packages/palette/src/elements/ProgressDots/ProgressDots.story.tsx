import React, { useEffect } from "react"
import { useCursor } from "use-cursor"
import { ProgressDots } from "./ProgressDots"

const Demo = () => {
  const { index, handleNext } = useCursor({ max: 5 })

  useEffect(() => {
    const interval = setInterval(handleNext, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [handleNext])

  return <ProgressDots activeIndex={index} amount={5} my={2} />
}

export default {
  title: "Components/ProgressDots",
}

export const Default = () => {
  return (
    <>
      <ProgressDots activeIndex={0} amount={5} my={2} />
      <ProgressDots activeIndex={1} amount={5} my={2} />
      <ProgressDots activeIndex={2} amount={5} my={2} />
      <ProgressDots activeIndex={3} amount={5} my={2} />
      <ProgressDots activeIndex={4} amount={5} my={2} />
    </>
  )
}

export const _Demo = () => {
  return <Demo />
}

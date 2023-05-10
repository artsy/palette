import React from "react"
import { StackableBorderBox } from "./StackableBorderBox"

export default {
  title: "Components/StackableBorderBox",
}

export const Default = () => {
  return (
    <>
      <StackableBorderBox>1</StackableBorderBox>
      <StackableBorderBox>2</StackableBorderBox>
      <StackableBorderBox>3</StackableBorderBox>
      <StackableBorderBox>4</StackableBorderBox>
    </>
  )
}

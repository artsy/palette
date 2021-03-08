import React from "react"
import { States } from "storybook-states"
import { Breadcrumbs } from "./Breadcrumbs"

export default {
  title: "Components/Breadcrumbs",
}

export const Default = () => {
  return (
    <States
      states={[
        {},
        {
          children: (
            <>
              <a href="#1">Level 01</a>
              <a href="#2">Level 02</a>
            </>
          ),
        },
        {
          children: <a href="#1">Level 01</a>,
        },
      ]}
    >
      <Breadcrumbs>
        <a href="#1">Level 01</a>
        <a href="#2">Level 02</a>
        <a href="#3">Level 03</a>
        <a href="#4">Level 04</a>
      </Breadcrumbs>
    </States>
  )
}

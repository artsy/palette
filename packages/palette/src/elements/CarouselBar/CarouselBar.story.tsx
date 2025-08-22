import { CarouselBar } from "./CarouselBar"

export default {
  title: "Components/CarouselBar",
  component: CarouselBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A carousel progress bar component that displays completion progress as a percentage.",
      },
    },
    controls: {
      include: ["percentComplete"],
    },
  },
}

export const Default = {
  args: {
    percentComplete: 40,
  },
}

export const Empty = {
  args: {
    percentComplete: 0,
  },
}

export const AlmostEmpty = {
  args: {
    percentComplete: 1,
  },
}

export const HalfComplete = {
  args: {
    percentComplete: 50,
  },
}

export const Complete = {
  args: {
    percentComplete: 100,
  },
}

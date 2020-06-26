import { TagProps } from "./Tag.shared"

export interface SmallCardProps {
  images: string[]
  title: string
  subtitle?: string
  tag?: TagProps
}

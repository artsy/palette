import { StyleProp, ViewStyle } from "react-native"

export interface TagProps {
  text: string
  textColor: string
  color: string
  borderColor?: string
  style: StyleProp<ViewStyle>
}

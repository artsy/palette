import { StyleProp, ViewStyle } from "react-native"

export interface CardTagProps {
  text: string
  textColor: string
  color: string
  borderColor?: string
  style?: StyleProp<ViewStyle>
}

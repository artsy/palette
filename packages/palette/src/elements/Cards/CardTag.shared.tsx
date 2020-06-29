import { StyleProp, ViewStyle } from "react-native"
import { Color } from "../../Theme"

export interface CardTagProps {
  text: string
  textColor: Color
  color: Color
  borderColor?: Color
  style?: StyleProp<ViewStyle>
}

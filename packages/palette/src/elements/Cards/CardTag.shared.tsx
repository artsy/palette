import { StyleProp, ViewStyle } from "react-native"
import { PositionProps } from "styled-system"
import { Color } from "../../Theme"

export interface CardTagProps extends PositionProps {
  text: string
  textColor: Color
  color: Color
  borderColor?: Color
  style?: StyleProp<ViewStyle>
}

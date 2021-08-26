import React from "react"
import { color } from "../helpers"
import { G, Icon, IconProps, Path, Title } from "./Icon"

interface ArtsyLogoBlackIconProps extends Omit<IconProps, "width" | "height"> {
  scale?: number
}

/** ArtsyLogoBlackIcon */
export const ArtsyLogoBlackIcon: React.FC<ArtsyLogoBlackIconProps> = ({
  scale = 1,
  title = "Artsy",
  ...props
}) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 94 32"
      width={`${scale * 94}px`}
      height={`${scale * 32}px`}
    >
      <Title>{title}</Title>
      <G fill={color(props.fill!)} fillRule="evenodd">
        <Path d="M2.355 2.173h89.323v27.613H53.872v-4.55h-2.119v4.55H2.355V2.173zM.162 31.953h93.71V.006H.161v31.945z" />
        <Path d="M19.168 10.297h-2.402L12.59 20.92h2.401l1.097-2.946h3.775l1.081 2.946h2.402l-4.177-10.623zm-2.435 5.732l1.233-3.33 1.22 3.33h-2.453zM40.024 10.297v2.11h3.761v8.513h2.262v-8.513h3.776v-2.11h-9.799M78.516 10.297l-2.719 4.53-2.702-4.53h-2.63l4.21 6.723v3.9h2.261v-3.9l4.21-6.723h-2.63M65.963 15.326c-.7-.505-1.658-.737-2.503-.942-.176-.043-.347-.084-.513-.127l-.105-.027c-.689-.17-1.632-.405-1.632-1.219 0-.869 1.025-1.1 1.63-1.1.686 0 1.548.202 1.758 1.172l.007.033h2.13v-.042c-.072-1.96-1.464-3.085-3.816-3.085-1.752 0-3.797.808-3.797 3.086 0 2.37 2.134 2.878 4.017 3.326.173.042.343.082.509.124.96.247 1.446.688 1.446 1.308 0 1.336-1.77 1.403-2.126 1.403-1.245 0-1.921-.459-2.128-1.443l-.006-.032H58.67l.001.041c.017.843.12 1.356.668 1.993 1.04 1.198 2.688 1.377 3.58 1.377 2.054 0 4.264-1.054 4.264-3.371 0-.984-.468-1.933-1.221-2.475M34.967 16.402c.82-.592 1.331-1.64 1.331-2.736 0-1.184-.617-2.283-1.609-2.867-.84-.502-1.691-.502-2.514-.502h-4.846V20.92h2.278v-5.251l4.225 5.25h2.758l-3.217-3.897c.576-.098 1.055-.231 1.594-.62m-5.36-1.214v-2.89h2.558c.508 0 .96.022 1.322.281.344.248.548.684.548 1.165 0 .958-.692 1.444-2.056 1.444h-2.372" />
      </G>
    </Icon>
  )
}

// TODO: remove this alias once clients have been updated
/** ArtsyLogoIcon */
export const ArtsyLogoIcon = ArtsyLogoBlackIcon

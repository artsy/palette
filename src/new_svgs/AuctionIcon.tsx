import React from "react"
import { Icon, IconProps } from "./Icon"

/** AuctionIcon */
export const AuctionIcon: React.SFC<IconProps> = props => {
  return (
    <Icon {...props}>
      <title>auction</title>
      <path
        d="M11.729 10.745l3.776 3.865-.91.89-3.766-3.855-3.446 3.446-5.052-5.052 7.94-7.939 5.051 5.052-3.593 3.593zM10.27 3.717l-6.322 6.322 3.435 3.435 6.323-6.322-3.436-3.435z"
        fill="#000"
        fillRule="nonzero"
      />
    </Icon>
  )
}

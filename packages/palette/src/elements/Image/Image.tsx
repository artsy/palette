import React from "react"
import { LazyImage, LazyImageProps } from "../LazyImage"

/** Props for a web-only Image component. */
export type WebImageProps = LazyImageProps & {
  lazyLoad?: boolean
}

/** A web-only Image component. */
export const Image: React.FC<WebImageProps> = ({ lazyLoad = false, ...rest }) => {
  return <LazyImage preload={!lazyLoad} {...rest} />
}

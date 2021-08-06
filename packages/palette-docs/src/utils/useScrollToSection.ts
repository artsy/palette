import { useEffect } from "react"
import { copyStringToClipboard } from "./copyStringToClipboard"

export function useScrollToHash({ hash, contentRef }) {
  useEffect(() => {
    copyStringToClipboard(window.location.href)

    if (!hash) {
      return
    }

    const anchor = document.querySelectorAll(`[href="${hash}"]`)[0]

    if (!anchor) {
      return
    }

    const offset =
      anchor.getBoundingClientRect().top + contentRef.current.scrollTop

    window.scroll({
      behavior: "smooth",
      top: offset - 50,
    })
  }, [hash])
}

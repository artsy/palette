import { useEffect } from "react"

export function useScrollToHash({ hash, contentRef }) {
  useEffect(() => {
    if (!hash) return
    const anchor = document.querySelectorAll(`[href="${hash}"]`)[0]
    const offset =
      anchor.getBoundingClientRect().top + contentRef.current.scrollTop

    contentRef.current.scroll({
      behavior: "smooth",
      top: offset - 50,
    })
  }, [hash])
}

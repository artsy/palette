import React from "react"
import PageIcon from "@artsy/icons/PageIcon"

export const Snippet = ({ code }: { code: string }) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <pre
      style={{
        position: "relative",
        background: "#f6f6f6",
        padding: "1rem",
        borderRadius: "4px",
        overflowX: "auto",
      }}
    >
      <button
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: isHovered ? "#e0e0e0" : "transparent",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s ease",
        }}
        title="Copy to clipboard"
      >
        <PageIcon width={20} height={20} />
      </button>
      <code>{code}</code>
    </pre>
  )
}

import { Link } from "gatsby"
import React from "react"

interface HeaderProps {
  title: string
}

export const Header: React.SFC<HeaderProps> = ({ title }) => {
  return (
    <div>
      <h1>
        <Link to="/">{title}</Link>
      </h1>
    </div>
  )
}

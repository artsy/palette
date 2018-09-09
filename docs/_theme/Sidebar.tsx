import { Docs, Link } from "docz"
import React from "react"

export const Sidebar = () => (
  <Docs>
    {({ docs }) => (
      <ul>
        {docs.map(doc => (
          <li key={doc.id}>
            <Link to={doc.route}>{doc.name}</Link>
          </li>
        ))}
      </ul>
    )}
  </Docs>
)

import { Docs, Link } from "docz"
import React from "react"
import styled from "styled-components"
import { color, Flex, Serif } from "../../src"

const BorderedContainer = styled(Flex)`
  border-right: 1px solid ${color("black10")};
`

export const Sidebar = () => (
  <BorderedContainer flexDirection="column" p={2} height="100%">
    <Serif size="5">Palette</Serif>
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
  </BorderedContainer>
)

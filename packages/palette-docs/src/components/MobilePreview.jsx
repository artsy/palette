import React from "react"
import { IPhone } from "./iPhone"
import styled from "styled-components"
import { Container } from "unstated"

export const MobilePreview = ({ children }) => (
  <IPhone>
    <InnerContainer>{children}</InnerContainer>
  </IPhone>
)

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0 5px;
`

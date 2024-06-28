import React from "react";
import { Tab } from "@chakra-ui/react";

export default function GreenTab({ children, ...style }) {
  return (
    <Tab
      fontFamily="Roboto"
      fontWeight="500"
      fontSize="14px"
      lineHeight="20px"
      color="#71757A"
      fill="#71757A"
      padding="12px 24px"
      _selected={{
        color: "#2B8C4D",
        fill:"#2B8C4D",
        pointerEvents: "none"
      }}
      _hover={{
        color: "#9D9FA3",
        fill: "#9D9FA3"
      }}
      {...style}
    >
      {children}
    </Tab>
  )
}

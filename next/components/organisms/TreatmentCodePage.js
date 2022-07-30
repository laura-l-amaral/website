import {
  VStack,
  Box,
  Text
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import React, { useEffect, useState } from "react";
import { getREADMEgithub } from "../../pages/api/datasets";
import style from "../../styles/markdown.module.css";


export function TreatmentCodePage ({ dataset, treatmentCode }) {
  function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  console.log(b64DecodeUnicode(treatmentCode))

  return (
    <VStack
      width="100%"
      height="500px"
      padding="20px"
    >
      <Box
        width="100%"
        padding="50px 15px"
        borderRadius="16px"
        backgroundColor="#252A32"
      >
        <ReactMarkdown className={style.reactMarkdow} children={b64DecodeUnicode(treatmentCode)}/>
      </Box>
    </VStack>
  )
}
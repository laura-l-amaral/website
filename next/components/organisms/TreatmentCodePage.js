import {
  VStack,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getREADMEgithub } from "../../pages/api/datasets";
import { formatJson } from "../../utils"

export function TreatmentCodePage ({ dataset }) {
  const [ README, setREADME ] = useState("")
  const datasetUrl = dataset.name.replace(/-/g, "_")
 
  useEffect(() => {
    getREADMEgithub(datasetUrl)
      .then(res => {
        console.log(res)
        setREADME(res)
      })

  },[])


  return (
    <VStack
      width="100%"
      height="500px"
      padding="20px"
    >
      <Text>
        {README}
      </Text>
    </VStack>
  )
}
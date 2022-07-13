import {
  VStack,
  Box,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getREADMEgithub } from "../../pages/api/datasets";

export function TreatmentCodePage ({ dataset }) {
  const [README, setREADME] = useState([""])
  const datasetUrl = dataset.name.replace(/-/g, "_")
 
  useEffect(() => {
    getREADMEgithub(datasetUrl)
      .then(res => {
        setREADME(res.split(`\n`))
      })
      .catch(setREADME(["Nenhum código de tratamento listado"]))
  },[dataset])

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
        {README.map(elm => (
          <Text fontFamily="ubuntu" fontSize="18px" color="#FFF" marginBottom="10px">
            {elm}
          </Text>
        ))}
      </Box>
    </VStack>
  )
}
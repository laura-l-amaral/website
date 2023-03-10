import {
  VStack,
  HStack,
  Stack,
  Center,
  Box,
  Text,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCheckMobile } from "../../hooks/useCheckMobile.hook";
import { temporalCoverageTranscript } from "../../utils";

import { SimpleTable } from "../atoms/SimpleTable";
import SectionText from "../atoms/SectionText";
import Subtitle from "../atoms/Subtitle";
import RoundedButton from "../atoms/RoundedButton";
import BaseResourcePage from "../molecules/BaseResourcePage";
import { DisclaimerBox } from "../molecules/DisclaimerBox";
import FourOhFour from "../templates/404";

import {
  getRawDataSources
} from "../../pages/api/datasets";

import RedirectIcon from "../../public/img/icons/redirectIcon"
import LanguageIcon from "../../public/img/icons/languageIcon";
import DisplayIcon from "../../public/img/icons/displayIcon";
import DataStructureIcon from "../../public/img/icons/dataStructureIcon";
import ApiIcon from "../../public/img/icons/apiIcon";
import FrequencyIcon from "../../public/img/icons/frequencyIcon";
import ObservationLevelIcon from "../../public/img/icons/observationLevelIcon";
import RegisterIcon from "../../public/img/icons/registerIcon";
import IpIcon from "../../public/img/icons/ipIcon";
import CoinIcon from "../../public/img/icons/coinIcon";
import ExclamationIcon from "../../public/img/icons/exclamationIcon";

export default function RawDataSourcesPage({
  id
}) {
  const [resource, setResource] = useState({})
  const [isError, setIsError] = useState({})

  const featchRawDataSources = async () => {
    try {
      const result = await getRawDataSources(id)
      return setResource(result)
    } catch (error) {
      setIsError(error)
      console.error(error)
    }
  }

  useEffect(() => {
    featchRawDataSources()
  },[id])

  const Languages = () => {
    if(resource?.languages === undefined || Object.keys(resource?.languages).length === 0) return "Não listado"

    const array = []

    resource?.languages?.map((elm) => {
      array.push(elm.name)
    })

    if(array.length === 0) return "Não listado"
    return array.join(", ").toString()
  }

  const TrueOrFalse = (value) => {
    switch (value) {
      case true:
        return "Sim"
        break;
      case false:
        return "Não"
        break;
      default:
        return "Não listado"
        break;
    }
  }

  const UpdateFrequency = () => {
    const value = resource?.updateFrequency
    if(value === undefined) return "Não listado"

    if(value?.number >= 0 && value?.entity?.name) return `${value.number} ${value.entity.name}`
    if(value?.entity?.name) return `${value.entity.name}`

    return "Não listado"
  }

  const ObservationLevel = () => {
    const notFound = <SectionText marginRight="4px !important">Não listado</SectionText>

    return notFound
  }

  const AddInfoTextBase = ({title, text, children, ...style}) => {
    return (
      <Box display="block" alignItems="center" gridGap="8px" {...style}>
        <Text
          fontFamily="ubuntu"
          fontSize="14px"
          fontWeight="400" 
          letterSpacing="0.3px"
          marginBottom="8px"
          color="#252A32"
        >{title}</Text>
        <SectionText>
          {text}
        </SectionText>
        {children}
      </Box>
    )
  }

  if(isError?.message?.length > 0 || resource === null || Object.keys(resource).length < 0) return <FourOhFour/>

  return (
    <BaseResourcePage title={resource?.name} >
      <VStack width="100%" spacing={4} alignItems="flex-start">
        <Subtitle>Consulta aos dados</Subtitle>
        <DisclaimerBox width="100%">
          <HStack spacing={0} flexDirection={useCheckMobile() && "column"} alignItems="flex-start">
            <Center>
              <ExclamationIcon alt="atenção" width="20px" height="20px" fill="#42B0FF"/>
              <SectionText margin="0 4px 0 12px" fontWeight="bolder" fontFamily="lato">ATENÇÃO:</SectionText>
            </Center>
            <SectionText display="flex" marginLeft={useCheckMobile() && "32px !important"}>
              Estes dados não passaram pela metodologia de tratamento da Base dos Dados.
            </SectionText>
          </HStack>
        </DisclaimerBox>

        <RoundedButton
          height="35px"
          fontSize="14px"
          minWidth="100px"
          width={useCheckMobile() && "100%"}
          color="#FFF"
          backgroundColor={resource?.url ? "#42B0FF" : "#C4C4C4"}
          padding="0 20px"
          isDisabled={resource?.url ? false : true}
          onClick={() => window.open(resource?.url)}
        >
          Acessar fonte original
          <RedirectIcon alt="hiperlink" marginLeft="8px" width="14px" height="14px" fill="#FFF"/>
        </RoundedButton>
      </VStack>

      <VStack width="100%" spacing={4} alignItems="flex-start">
        <Subtitle>Descrição</Subtitle>
        <SectionText>
          {resource.description || "Nenhuma descrição fornecida."}
        </SectionText>
      </VStack>

      <VStack width="100%" spacing={4} alignItems="flex-start">
        <Subtitle>Cobertura temporal</Subtitle>
        <SectionText>
          {temporalCoverageTranscript(resource?.coverages?.[0]?.datetimeRanges?.[0], "Nenhuma cobertura temporal fornecida")}
        </SectionText>
      </VStack>

      <VStack width="100%" spacing={5} alignItems="flex-start">
        <Stack flex="1" >
          <Subtitle>Informações adicionais</Subtitle>
        </Stack>

        <Grid width="100%" flex={1} templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={useCheckMobile() && 2} display="flex" alignItems="flex-start" gridGap="8px">
            <LanguageIcon alt="idioma" width="22px" height="22px" fill="#D0D0D0"/>
            <AddInfoTextBase
              title="Idioma"
              text={Languages()}
            />
          </GridItem>

          <GridItem colSpan={useCheckMobile() && 2} display="flex" alignItems="flex-start" gridGap="8px">
            <DisplayIcon alt="disponibilidade" width="22px" height="22px" fill="#D0D0D0"/>
            <AddInfoTextBase
              title="Disponibilidade"
              text={resource?.availability?.name || "Não listado"}
            />
          </GridItem>

          <GridItem colSpan={useCheckMobile() && 2} display="flex" alignItems="flex-start" gridGap="8px">
            <DataStructureIcon alt="Tem dados estruturados" width="22px" height="22px" fill="#D0D0D0"/>
            <AddInfoTextBase
              title="Tem dados estruturados"
              text={TrueOrFalse(resource?.containsStructureData)}
            />
          </GridItem>

          <GridItem colSpan={useCheckMobile() && 2} display="flex" alignItems="flex-start" gridGap="8px">
            <ApiIcon alt="tabela tem api" width="22px" height="22px" fill="#D0D0D0"/>
            <AddInfoTextBase
              title="Tem API"
              text={TrueOrFalse(resource?.containsApi)}
            />
          </GridItem>

          <GridItem colSpan={2} display="flex" alignItems="flex-start" gridGap="8px">
            <FrequencyIcon alt="Frequência de atualização" width="22px" height="22px" fill="#D0D0D0"/>
            <AddInfoTextBase
              title="Frequência de atualização"
              text={UpdateFrequency()}
            />
          </GridItem>

          <GridItem colSpan={2} display="flex" alignItems="flex-start" gridGap="8px">
            <ObservationLevelIcon alt="Nível da observação" width="22px" height="22px" fill="#D0D0D0"/>
            <Box width="100%">
              <Text
                fontFamily="ubuntu"
                fontSize="14px"
                fontWeight="400" 
                letterSpacing="0.3px"
                marginBottom="8px"
                color="#252A32"
              >Nível da observação</Text>
              <ObservationLevel/>
            </Box>
          </GridItem>

          <GridItem colSpan={useCheckMobile() && 2} display="flex" alignItems="flex-start" gridGap="8px">
            <RegisterIcon alt="Requer registro" width="22px" height="22px" fill="#D0D0D0"/>
            <AddInfoTextBase
              title="Requer registro"
              text={TrueOrFalse(resource?.requiredRegistration)}
            />
          </GridItem>

          <GridItem colSpan={useCheckMobile() && 2} display="flex" alignItems="flex-start" gridGap="8px">
            <IpIcon alt="IP" width="22px" height="22px" fill="#D0D0D0"/>
            <AddInfoTextBase
              title="Requer IP de algum país"
              text={resource?.areaIpAddressRequired?.[0].name || "Não listado"}
            />
          </GridItem>

          <GridItem colSpan={2} display="flex" alignItems="flex-start" gridGap="8px">
            <CoinIcon alt="é gratuito?" width="22px" height="22px" fill="#D0D0D0"/>
            <AddInfoTextBase
              title="Gratuito"
              text={TrueOrFalse(resource?.isFree)}
            />
          </GridItem>
        </Grid>
      </VStack>
    </BaseResourcePage>
  )
}

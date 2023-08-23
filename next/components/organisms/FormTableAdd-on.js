import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react"

export default function FormTableAddon() {
  const [errors, setErrors] = useState({})

  const valueFormCloudTables = (data) => {
    return {
      table: "",
      gcpProjectId: "",
      gcpDatasetId: "",
      gcpTableId: ""
    }
  }
  const [formCloudTables, setFormCloudTables] = useState(valueFormCloudTables())

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <Accordion
      allowMultiple
    >
      <AccordionItem border={0}>
        <AccordionButton
          padding="8px 0 8px 16px"
          fontWeight="600"
          _hover={{
            backgroundColor:"transparent",
            color:"#42B0FF",
            opacity: "0.8"
          }}
        >
          Cloud Tables
          <AccordionIcon margin="0 0 0 auto"/>
        </AccordionButton>

        <AccordionPanel>
          <FormControl isRequired isInvalid={!!errors.gcpProjectId}>
            <FormLabel>Gcp project id</FormLabel>
            <Input name="gcpProjectId" value={formCloudTables.gcpProjectId} onChange={handleChange} />
            <FormErrorMessage>{errors.gcpProjectId}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.gcpDatasetId}>
            <FormLabel>Gcp dataset id</FormLabel>
            <Input name="gcpDatasetId" value={formCloudTables.gcpDatasetId} onChange={handleChange} />
            <FormErrorMessage>{errors.gcpDatasetId}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.gcpTableId}>
            <FormLabel>Gcp table id </FormLabel>
            <Input name="gcpTableId" value={formCloudTables.gcpTableId} onChange={handleChange} />
            <FormErrorMessage>{errors.gcpTableId}</FormErrorMessage>
          </FormControl>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border={0}>
        <AccordionButton
          padding="8px 0 8px 16px"
          fontWeight="600"
          _hover={{
            backgroundColor:"transparent",
            color:"#42B0FF",
            opacity: "0.8"
          }}
        >
          Coverages
          <AccordionIcon margin="0 0 0 auto"/>
        </AccordionButton>
        <AccordionPanel>

        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border={0}>
        <AccordionButton
          padding="8px 0 8px 16px"
          fontWeight="600"
          _hover={{
            backgroundColor:"transparent",
            color:"#42B0FF",
            opacity: "0.8"
          }}
        >
          DateTime Ranges
          <AccordionIcon margin="0 0 0 auto"/>
        </AccordionButton>
        <AccordionPanel>

        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border={0}>
        <AccordionButton
          padding="8px 0 8px 16px"
          fontWeight="600"
          _hover={{
            backgroundColor:"transparent",
            color:"#42B0FF",
            opacity: "0.8"
          }}
        >
          Observation Level
          <AccordionIcon margin="0 0 0 auto"/>
        </AccordionButton>
        <AccordionPanel>

        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border={0}>
        <AccordionButton
          padding="8px 0 8px 16px"
          fontWeight="600"
          _hover={{
            backgroundColor:"transparent",
            color:"#42B0FF",
            opacity: "0.8"
          }}
        >
          Updates
          <AccordionIcon margin="0 0 0 auto"/>
        </AccordionButton>
        <AccordionPanel>

        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
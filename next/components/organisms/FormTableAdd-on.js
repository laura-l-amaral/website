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

  const valueFormDateTimeRanges = (data) => {
    return {
      startYear: "",
      startSemester: "",
      startQuarter: "",
      startMonth: "",
      startDay: "",
      startHour: "",
      startMinute: "",
      startSecond: "",
      endYear: "",
      endSemester: "",
      endQuarter: "",
      endMonth: "",
      endDay: "",
      endHour: "",
      endMinute: "",
      endSecond: "",
      interval: "",
      isClosed: false
    }
  }
  const [formDateTimeRanges, setFormDateTimeRanges] = useState(valueFormDateTimeRanges())

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

        <AccordionPanel display="flex" flexDirection="column" gap="20px">
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
        <AccordionPanel display="flex" flexDirection="column" gap="20px">

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
        <AccordionPanel display="flex" flexDirection="column" gap="20px">
          <FormControl isRequired isInvalid={!!errors.startDate}>
            <FormLabel>Start Date</FormLabel>
            <Stack flexDirection="row" gap="8px" spacing={0} marginBottom="8px">
              <Input
                name="startDate"
                placeholder="YYYY/MM/DD"
                value={formDateTimeRanges.startDate}
                onChange={handleChange}
              />
              <Input
                name="startDate"
                placeholder="HH:MM.SS"
                value={formDateTimeRanges.startDate}
                onChange={handleChange}
              />
            </Stack>

            <Stack flexDirection="row" gap="8px" spacing={0}>
              <Input
                name="startSemester"
                placeholder="Semester"
                value={formDateTimeRanges.startSemester}
                onChange={handleChange}
              />
              <Input
                name="startQuarter"
                placeholder="Quarter"
                value={formDateTimeRanges.startQuarter}
                onChange={handleChange}
              />
            </Stack>
            <FormErrorMessage>{errors.startDate}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.interval}>
            <FormLabel>Interval</FormLabel>
            <Input
              name="interval"
              value={formDateTimeRanges.interval}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.interval}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.startDate}>
            <FormLabel>End Date</FormLabel>
            <Stack flexDirection="row" gap="8px" spacing={0} marginBottom="8px">
              <Input
                name="endDate"
                placeholder="YYYY/MM/DD"
                value={formDateTimeRanges.endDate}
                onChange={handleChange}
              />
              <Input
                name="endDate"
                placeholder="HH:MM.SS"
                value={formDateTimeRanges.endDate}
                onChange={handleChange}
              />
            </Stack>

            <Stack flexDirection="row" gap="8px" spacing={0}>
              <Input
                name="endSemester"
                placeholder="Semester"
                value={formDateTimeRanges.endSemester}
                onChange={handleChange}
              />
              <Input
                name="endQuarter"
                placeholder="Quarter"
                value={formDateTimeRanges.endQuarter}
                onChange={handleChange}
              />
            </Stack>
            <FormErrorMessage>{errors.endDate}</FormErrorMessage>
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
          Observation Level
          <AccordionIcon margin="0 0 0 auto"/>
        </AccordionButton>
        <AccordionPanel display="flex" flexDirection="column" gap="20px">

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
        <AccordionPanel display="flex" flexDirection="column" gap="20px">

        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
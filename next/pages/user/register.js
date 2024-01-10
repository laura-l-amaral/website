import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  UnorderedList,
  ListItem,
  VStack,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { registerAccount } from "../api/user";

import Input from "../../components/atoms/SimpleInput";
import Button from "../../components/atoms/RoundedButton";
import Display from "../../components/atoms/Display";
import { MainPageTemplate } from "../../components/templates/main";
import { isMobileMod } from "../../hooks/useCheckMobile.hook"

import { EyeIcon, EyeOffIcon } from "../../public/img/icons/eyeIcon";
import Exclamation from "../../public/img/icons/exclamationIcon";
import Link from "../../components/atoms/Link";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({
    firstName: "",
    username: "",
    email: "",
    password: "",
    regexPassword: {},
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    const regexPassword = {}
    const validationErrors = {}
    e.preventDefault()

    if (!formData.firstName) {
      validationErrors.firstName = "Por favor, insira seu nome."
    }
    if (!formData.username) {
      validationErrors.username = "Nome de usuário inválido ou já existe uma conta com este nome de usuário"
    }
    if (!formData.email) {
      validationErrors.email = "Endereço de e-mail inválido ou já existe uma conta com este e-mail."
    } 
    if (!/^\S+@\S+$/.test(formData.email)) {
      validationErrors.email = "Endereço de e-mail inválido ou já existe uma conta com este e-mail."
    }
    if(!/^.{8,}$/.test(formData.password)) {
      regexPassword = {...regexPassword, amount: true}
    }
    if(!/[A-Z]/.test(formData.password)) {
      regexPassword = {...regexPassword, upperCase: true}
    }
    if(!/[a-z]/.test(formData.password)) {
      regexPassword = {...regexPassword, lowerCase: true}
    }
    if(!/(?=.*?[0-9])/.test(formData.password)) {
      regexPassword = {...regexPassword, number: true}
    }
    if(!/(?=.*?[#?!@$%^&*-])/.test(formData.password)) {
      regexPassword = {...regexPassword, special: true}
    }
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirmar a senha é necessário"
    }
    if(formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "A senha inserida não coincide com a senha criada no campo acima. Por favor, verifique se não há erros de digitação e tente novamente."
    }

    if(Object.keys(regexPassword).length > 0) validationErrors.regexPassword = regexPassword
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      createRegister(formData)
    }
  }

  const createRegister = async ({ firstName, lastName, username, email, password }) => {
    const result = await registerAccount({ firstName, lastName, username, email, password })

    let arrayErrors = {}
    if(result?.errors?.length > 0) {
      result.errors.map((elm) => {
        if(elm.field === "email") arrayErrors = ({...arrayErrors, email: "Conta com este email já existe."})
        if(elm.field === "username") arrayErrors = ({...arrayErrors, username: "Conta com este nome de usuário já existe."})
      })
    }
    setErrors(arrayErrors)

    if(result?.errors?.length === 0) {
      sessionStorage.setItem('registration_email_bd', `${email}`)
      window.open("/user/check-email", "_self")
    }
  }

  const LabelTextForm = ({ text }) => {
    return (
      <FormLabel
        color="#252A32"
        fontFamily="ubuntu"
        letterSpacing="0.2px"
        lineHeight="16px"
        fontWeight="400"
        fontSize="16px"
      >{text}</FormLabel>
    )
  }

  return (
    <MainPageTemplate
      display="flex"
      justifyContent="center"
      paddingTop="72px"
      cleanTemplate
    >
      <Stack
        display="flex"
        justifyContent="center"
        width="320px"
        height="100%"
        marginTop="50px"
        marginX="27px"
      >
        <Display
          fontSize={isMobileMod() ? "34px" : "60px"}
          lineHeight={isMobileMod() ? "44px" : "72px"}
          letterSpacing={isMobileMod() ? "-0.4px" : "-1.5px"}
          marginBottom="40px"
          textAlign="center"
        >Cadastre-se</Display>

        <VStack
          spacing={0}
          gap="24px"
        >
          <FormControl isInvalid={!!errors.firstName} >
            <LabelTextForm text="Nome"/>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Insira seu nome"
              fontFamily="ubuntu"
              height="40px"
              fontSize="14px"
              borderRadius="16px"
              _invalid={{boxShadow:"0 0 0 2px #D93B3B"}}
            />
            <FormErrorMessage fontSize="12px" color="#D93B3B" display="flex" flexDirection="row" gap="4px" alignItems="flex-start">
              <Exclamation marginTop="4px" fill="#D93B3B"/>{errors.firstName}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <LabelTextForm text="Sobrenome"/>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Insira seu sobrenome (opcional)"
              fontFamily="ubuntu"
              height="40px"
              fontSize="14px"
              borderRadius="16px"
              _invalid={{boxShadow:"0 0 0 2px #D93B3B"}}
            />
            <FormErrorMessage fontSize="12px" color="#D93B3B" display="flex" flexDirection="row" gap="4px" alignItems="flex-start">
              <Exclamation marginTop="4px" fill="#D93B3B"/>{errors.lastName}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <LabelTextForm text="E-mail" />
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Insira seu e-mail"
              fontFamily="ubuntu"
              height="40px"
              fontSize="14px"
              borderRadius="16px"
              _invalid={{boxShadow:"0 0 0 2px #D93B3B"}}
            />
            <FormErrorMessage fontSize="12px" color="#D93B3B" display="flex" flexDirection="row" gap="4px" alignItems="flex-start">
              <Exclamation marginTop="4px" fill="#D93B3B"/>{errors.email}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.username} >
            <LabelTextForm text="Nome de usuário"/>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Insira seu nome de usuário"
              fontFamily="ubuntu"
              height="40px"
              fontSize="14px"
              borderRadius="16px"
              _invalid={{boxShadow:"0 0 0 2px #D93B3B"}}
            />
            <FormErrorMessage fontSize="12px" color="#D93B3B" display="flex" flexDirection="row" gap="4px" alignItems="flex-start">
              <Exclamation marginTop="4px" fill="#D93B3B"/>{errors.username}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <LabelTextForm text="Senha" />
            <Input
              type={showPassword ? "password" : "text"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Crie uma senha"
              fontFamily="ubuntu"
              height="40px"
              fontSize="14px"
              borderRadius="16px"
              _invalid={{boxShadow:"0 0 0 2px #D93B3B"}}
              styleElmRight={{
                width: "50px",
                height: "40px",
                cursor: "pointer",
                onClick: () => setShowPassword(!showPassword)
              }}
              elmRight={showPassword ?
                <EyeOffIcon
                  alt="esconder senha"
                  width="20px"
                  height="20px"
                  fill="#D0D0D0"
                />
              :
                <EyeIcon
                  alt="exibir senhar"
                  width="20px"
                  height="20px"
                  fill="#D0D0D0"
                />
              }
            />
            <Text 
              margin="8px 0"
              color= { errors?.regexPassword ? Object.keys(errors?.regexPassword).length > 0 ? "#D93B3B" : "#7D7D7D" : "#7D7D7D" }
              fontFamily= "Ubuntu"
              fontSize= "12px"
              fontWeight= "400"
              lineHeight= "16px"
              letterSpacing= "0.3px"
              display="flex"
              flexDirection="row"
              gap="4px"
              alignItems="flex-start"
            ><Exclamation width="14px" height="14px" fill="#D93B3B" display={ errors?.regexPassword ? Object.keys(errors?.regexPassword).length > 0 ? "flex" : "none" : "none"}/> Certifique-se que a senha tenha no mínimo:</Text>
            <UnorderedList fontSize="12px" fontFamily="Ubuntu" position="relative" left="2px">
              <ListItem fontSize="12px" color={errors?.regexPassword?.amount ? "#D93B3B" :"#7D7D7D"}>8 caracteres</ListItem>
              <ListItem fontSize="12px" color={errors?.regexPassword?.upperCase ? "#D93B3B" :"#7D7D7D"}>Uma letra maiúscula</ListItem>
              <ListItem fontSize="12px" color={errors?.regexPassword?.lowerCase ? "#D93B3B" :"#7D7D7D"}>Uma letra minúscula</ListItem>
              <ListItem fontSize="12px" color={errors?.regexPassword?.number ? "#D93B3B" :"#7D7D7D"}>Um dígito</ListItem>
              <ListItem fontSize="12px" color={errors?.regexPassword?.special ? "#D93B3B" :"#7D7D7D"}>Um caractere especial</ListItem>
            </UnorderedList>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <LabelTextForm text="Confirme a senha" />
            <Input
              type={showConfirmPassword ? "password" : "text"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Insira a senha novamente"
              fontFamily="ubuntu"
              height="40px"
              fontSize="14px"
              borderRadius="16px"
              _invalid={{boxShadow:"0 0 0 2px #D93B3B"}}
              styleElmRight={{
                width: "50px",
                height: "40px",
                cursor: "pointer",
                onClick: () => setShowConfirmPassword(!showConfirmPassword)
              }}
              elmRight={showConfirmPassword ?
                <EyeOffIcon
                  alt="esconder senha"
                  width="20px"
                  height="20px"
                  fill="#D0D0D0"
                />
              :
                <EyeIcon
                  alt="exibir senhar"
                  width="20px"
                  height="20px"
                  fill="#D0D0D0"
                />
              }
            />
            <FormErrorMessage fontSize="12px" color="#D93B3B" display="flex" flexDirection="row" gap="4px" alignItems="flex-start">
              <Exclamation marginTop="4px" fill="#D93B3B"/>{errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>
        </VStack>

        <Button
          onClick={(e) => handleSubmit(e)}
          borderRadius="30px"
          marginTop="24px !important"
        >
          Cadastrar
        </Button>

        <Text
          textAlign="center"
          color= "#7D7D7D"
          fontFamily= "Ubuntu"
          fontSize= "12px"
          fontWeight= "400"
          lineHeight= "16px"
          letterSpacing= "0.3px"
          marginTop="16px !important"
        >
          Ao clicar em “Cadastrar” acima, você confirma que leu, compreendeu e aceita os Termos de uso e Políticas de privacidade da Base dos Dados.
        </Text>

        <Text
          textAlign="center"
          color= "#252A32"
          fontFamily= "Ubuntu"
          fontSize= "14px"
          fontWeight= "400"
          lineHeight= "27px"
          letterSpacing= "0.3px"
          marginTop="24px !important"
        >
          Já tem uma conta? <Link fontFamily="ubuntu" color="#42B0FF" href="/user/login">Faça login</Link>.
        </Text>
      </Stack>
    </MainPageTemplate>
  )
}
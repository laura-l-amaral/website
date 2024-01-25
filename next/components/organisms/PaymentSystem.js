import {
  Stack,
  VStack,
  Skeleton,
} from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  AddressElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import cookies from "js-cookie";
import Button from "../atoms/RoundedButton";

import {
  getUser
} from "../../pages/api/user"

import {
  getPrices,
  createCustomer,
  createSubscription
} from "../../pages/api/stripe";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_KEY_STRIPE)

const PaymentForm = ({ userData }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handlerSubmit = async (e) => {
    e.preventDefault()

    const data = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    const user = await getUser(userData?.email)
    cookies.set('userBD', JSON.stringify(user))
    window.open(`/user/${user?.username}?plans_and_payment`, "_self")
  }

  return (
    <VStack
      spacing={0}
      alignItems="start"
    >
      <form onSubmit={handlerSubmit}>
        <PaymentElement />

        <Button width="100%" type="submit" marginTop="20px !important">Iniciar inscrição</Button>
      </form>
    </VStack>
  )
}

export default function PaymentSystem({ userData }) {
  const [clientSecret, setClientSecret] = useState("")

  const appearance = {
    theme: "stripe",
    variables: {
      fontSizeBase: "16px",
      fontSizeSm: "16px",
      fontFamily: "Ubuntu",
      borderRadius: "14px",
      colorPrimary: "#42B0FF",
      colorTextPlaceholder: "#A3A3A3",
      colorDanger: "#D93B3B",
      colorBackground: "#FFF",
      colorText: "#252A32",
    },
    rules: {
      ".Input": {
        border: "1px solid #DEDFE0",
      },
      ".Input:hover": {
        border: "2px solid #42B0FF",
      },
      ".Input--selected": {
        border: "2px solid #42B0FF",
      }
    }
  }

  const options = {
    clientSecret,
    appearance,
    fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap' }],
  }

  const customerCreatPost = async () => {
    let secret = ""

    const subscriptionCreate = await createSubscription("19")
    if(subscriptionCreate?.clientSecret) {
      secret = subscriptionCreate?.clientSecret
    }
    if(secret !== "") return setClientSecret(secret)

    const result = await createCustomer()
    if(result?.id) {
      const subscriptionCreate = await createSubscription("19")
      secret = subscriptionCreate?.clientSecret
    }

    return setClientSecret(secret)
  }

  useEffect(() => {
    customerCreatPost()
  }, [])

  const SkeletonBox = ({ type, ...props }) => {
    if(type === "text") return <Skeleton height="17px" borderRadius="12px" startColor="#F0F0F0" endColor="#F3F3F3" {...props}/>
    if(type === "box") return <Skeleton height="45px" marginBottom="12px !important"  borderRadius="12px" startColor="#F0F0F0" endColor="#F3F3F3" {...props}/>
    if(type === "smallBox") return <Skeleton height="48px" width="50%"  borderRadius="12px" startColor="#F0F0F0" endColor="#F3F3F3" {...props}/>
    if(type === "bnt") return <Skeleton height="40px" borderRadius="12px" startColor="#F0F0F0" endColor="#F3F3F3" {...props}/>
  }

  if(!clientSecret) return (
    <Stack>
      <SkeletonBox type="text"/>
      <SkeletonBox type="box"/>

      <SkeletonBox type="text"/>
      <SkeletonBox type="box"/>

      <SkeletonBox type="text"/>
      <SkeletonBox type="box"/>
      
      <Stack flexDirection="row" spacing={0} gap="8px" marginBottom="16px !important">
        <SkeletonBox type="smallBox"/>
        <SkeletonBox type="smallBox"/>
      </Stack>

      <SkeletonBox type="text"/>
      <SkeletonBox type="box"/>

      <Stack width="100%" flexDirection="row" spacing={0} gap="8px" marginBottom="16px !important">
        <Stack width="100%"  spacing={0} gap="8px">
          <SkeletonBox type="text"/>
          <SkeletonBox type="smallBox" width="100%"/>
        </Stack>
        <Stack width="100%" spacing={0} gap="8px">
          <SkeletonBox type="text"/>
          <SkeletonBox type="smallBox" width="100%"/>
        </Stack>
      </Stack>

      <SkeletonBox type="bnt"/>
    </Stack>
  )

  return (
    <Elements options={options} stripe={stripePromise}>
      <AddressElement options={{mode:'billing'}}/>
      <PaymentForm userData={userData}/>
    </Elements>
  )
}
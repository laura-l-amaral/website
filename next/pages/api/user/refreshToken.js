import axios from "axios";
import cookies from 'js-cookie';

const API_URL= `${process.env.NEXT_PUBLIC_API_URL}/api/v1/graphql`

export default async function refreshToken(token) {
  try {
    const res = await axios({
      url: API_URL,
      method: "POST",
      data: {
        query: `
        mutation {
          refreshToken ( token: "${token}" ) {
            payload,
            refreshExpiresIn,
            token
          }
        }`
      }
    })
    const data = res.data?.data
    cookies.set('token', data?.refreshToken?.token)
    return data
  } catch (error) {
    console.error(error)
  }
}

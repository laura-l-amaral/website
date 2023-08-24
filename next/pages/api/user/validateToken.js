import axios from "axios";

const API_URL= `${process.env.NEXT_PUBLIC_API_URL}/api/v1/graphql`

export default async function validateToken(token) {
  try {
    const res = await axios({
      url: API_URL,
      method: "POST",
      data: {
        query: `
        mutation {
          verifyToken ( token: "${token}" ) {
            payload,
          }
        }`
      }
    })
    const data = res.data.data.verifyToken
    return data
  } catch (error) {
    console.error(error)
  }
}

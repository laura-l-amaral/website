import axios from "axios";

// const API_URL= process.env.NEXT_PUBLIC_API_URL
const API_URL= "https://staging.backend.dados.rio/api/v1/graphql"

const tokenEndpoint = `https://staging.backend.dados.rio/api/token/`

async function getToken({user, password}) {
  const res = await axios({
    url: API_URL,
    method: "POST",
    data: {
      query: `
      mutation {
        tokenAuth(
            username: ${user},
            password: ${password},
        ) {
            payload,
            refreshExpiresIn,
            token
        }
    }`
    }
  })
  try {
    const data = res.data.data.tokenAuth.token
    return data
  } catch (error) {
    console.error(error)
  }
}

export default getToken
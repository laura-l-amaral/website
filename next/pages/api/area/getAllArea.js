import axios from "axios";

const API_URL= `${process.env.NEXT_PUBLIC_API_URL}/api/v1/graphql`

export default async function getAllArea() {
  try {
    const res = await axios({
      url: API_URL,
      method: "POST",
      data: {
        query: `
        query {
          allArea {
            edges {
              node {
                _id
                slug
                name
              }
            }
          }
        }
        `
      },
      variables: null
    })
    const data = res?.data?.data?.allArea?.edges
    return data
  } catch (error) {
    console.error(error)
  }
}

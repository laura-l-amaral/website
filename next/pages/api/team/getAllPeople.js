import axios from "axios";

const API_URL= `${process.env.NEXT_PUBLIC_API_URL}/api/v1/graphql`

export default async function getAllPeople() {
  try {
    const res = await axios({
      url: API_URL,
      method: "POST",
      data: {
        query: `
        query {
          allAccount {
            edges {
              node {
                firstName
                lastName
                description
                website
                email
                twitter
                linkedin
                github
                picture
                isActiveStaff
                careers {
                  edges {
                    node {
                      _id
                      team
                      role
                      startAt
                      endAt
                    }
                  }
                }
              }
            }
          }
        }
        `
      }
    })
    const result = res?.data?.data?.allAccount?.edges
    const data = result.filter(item => item.node.isActiveStaff === 'true')
    return data
  } catch (error) {
    console.error(error)
  }
}
import { gql } from '@apollo/client'

export const GET_ARTICLES = gql`
query MyQuery {
  bookmark(where: {userId: {_eq: ""}}) {
    article {
      title
      imageUrl
    }
  }
}
`
export const GET_DETAILS_ARTICLES = gql`
query MyQuery {
  bookmark(where: {userId: {_eq: ""}}) {
    article {
      title
      content
      imageUrl
    }
  }
}
`





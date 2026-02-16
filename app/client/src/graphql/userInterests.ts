import { gql } from '@apollo/client'

export const GET_USER_INTERESTS = gql`
  query GetUserInterests($userId: uuid!) {
    user_interests(where: {userId: {_eq: $userId}}) {
      category {
        name
        id
      }
    }
  }
`

export const CREATE_USER_INTERESTS = gql`
  mutation CreateUserInterests($objects: [user_interests_insert_input!]!) {
    insert_user_interests(objects: $objects) {
      affected_rows
    }
  }
`

export const DELETE_USER_INTERESTS = gql`
  mutation DeleteUserInterests($userId: uuid!, $categoryIds: [uuid!]!) {
    delete_user_interests(where: {userId: {_eq: $userId}, categoryId: {_in: $categoryIds}}) {
      affected_rows
    }
  }
`
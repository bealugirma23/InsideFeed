import { gql } from '@apollo/client'

export const GET_ARTICLES = gql`
  query GetArticles($categoryIds: [uuid!]!) {
    articles(
      where: {
        categoryId: { _in: $categoryIds }
      }
      order_by: { publishedAt: desc }
    ) {
      id
      title
      summary
      publishedAt
      view
      category {
        id
        name
      }
    }
  }
`;


export const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($id: uuid!) {
    articles_by_pk(id: $id) {
      id
      title
      summary
      content
      imageUrl
      publishedAt
      category {
        id
        name
      }
    }
  }
`

export const GET_ARTICLES_BY_CATEGORY = gql`
  query GetArticlesByCategory($categoryId: uuid!) {
    articles(where: {categoryId: {_eq: $categoryId}}, order_by: {publishedAt: desc}) {
      id
      title
      summary
      content
      imageUrl
      publishedAt
      view
      isBreaking
      popularityScore
      category {
        id
        name
      }
    
    }
  }
`

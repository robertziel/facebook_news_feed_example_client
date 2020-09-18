import { gql } from '@apollo/client';

export const NEWS_FEEDS_QUERY = gql`
  query {
    posts {
      id
      content
      title
      createdAt
      user {
        name
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const NEWS_FEEDS_QUERY = gql`
  query {
    newsFeeds {
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

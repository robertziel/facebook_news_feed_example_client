import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
  query posts($olderThanId: ID) {
    posts(olderThanId: $olderThanId) {
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

export const POST_ADDED_SUBSCRIPTION = gql`
  subscription {
    postAdded {
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
